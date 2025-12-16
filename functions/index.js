// ★ここが最重要！ '/v1' をつけて第1世代を強制的に呼び出します
const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

// 定数定義 (要件定義書 Source 149)
const CONSTANTS = {
    C: 5,        // 信頼定数 (Confidence)
    MU: 3.0,     // 全体平均 (Global Mean)
    CAP_BONUS: 1.5 // 加点上限
};

// 東京リージョン(asia-northeast1)で動くように設定
exports.calculatePostScore = functions
    .region('asia-northeast1') 
    .firestore
    .document('posts/{postId}/votes/{voteId}')
    .onCreate(async (snap, context) => {
        const voteData = snap.data();
        const postId = context.params.postId;

        // --- 投票データの取得 ---
        const voteValue = voteData.value || 0; // 1.5, 4.5, 5.0 etc.
        const userWeight = voteData.weight || 1.0; // ユーザーの重み（ランク等）
        const voteType = voteData.type || 'logic'; // 'logic' or 'save'

        const postRef = db.collection('posts').doc(postId);

        try {
            await db.runTransaction(async (transaction) => {
                const postDoc = await transaction.get(postRef);

                if (!postDoc.exists) {
                    console.log("Post not found:", postId);
                    return;
                }

                const postData = postDoc.data();
                
                // 現在の集計値を取得 (初期値0)
                let currentWeightedScore = postData.weightedTotalScore || 0;
                let currentWeightedCount = postData.weightedVoteCount || 0;
                let currentSaves = postData.saves || 0;

                // --- 1. カテゴリ別重み付け & 集計更新 ---
                // ※ index.js側ではカテゴリ倍率は投票時のvalueに含まれているか、weightに含まれている前提で処理するか、
                // あるいはここで再度適用するかですが、ここでは単純に「重み付きスコア」として加算します。
                
                // 今回の投票による増加分
                const weightedScoreIncrement = voteValue * userWeight;
                const weightedCountIncrement = 1 * userWeight;

                // 集計更新
                let newWeightedScore = currentWeightedScore + weightedScoreIncrement;
                let newWeightedCount = currentWeightedCount + weightedCountIncrement;
                
                // 保存アクションの場合はsavesもインクリメント
                let newSaves = currentSaves;
                if (voteType === 'save') {
                    newSaves += 1;
                }

                // --- 2. ベイジアン平均の計算 (Source 147) ---
                // Formula: S_act = (Sum(v*w) + C*MU) / (Sum(w) + C) + Bonus
                
                const bayesianAvg = (newWeightedScore + (CONSTANTS.C * CONSTANTS.MU)) / (newWeightedCount + CONSTANTS.C);

                // --- 3. 保存数ボーナスの計算 ---
                // Formula: min(0.5 * log10(Saves + 1), 1.5)
                const saveBonus = Math.min(0.5 * Math.log10(newSaves + 1), CONSTANTS.CAP_BONUS);

                // --- 4. 最終スコア ---
                const finalScore = bayesianAvg + saveBonus;

                // 更新実行
                transaction.update(postRef, {
                    weightedTotalScore: newWeightedScore,
                    weightedVoteCount: newWeightedCount,
                    saves: newSaves,
                    score: finalScore,
                    lastVoteAt: admin.firestore.FieldValue.serverTimestamp()
                });
            });
            console.log(`Bayesian Score updated for post: ${postId}`);

        } catch (error) {
            console.error("Transaction failure:", error);
        }
    });