// ★ここが最重要！ '/v1' をつけて第1世代を強制的に呼び出します
const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

// 東京リージョン(asia-northeast1)で動くように設定
exports.calculatePostScore = functions
    .region('asia-northeast1') 
    .firestore
    .document('posts/{postId}/votes/{voteId}')
    .onCreate(async (snap, context) => {
        const voteData = snap.data();
        const postId = context.params.postId;

        // --- 投票データの取得 ---
        const score = voteData.value;
        const weight = voteData.weight || 1.0; 

        const postRef = db.collection('posts').doc(postId);

        try {
            await db.runTransaction(async (transaction) => {
                const postDoc = await transaction.get(postRef);

                if (!postDoc.exists) {
                    console.log("Post not found:", postId);
                    return;
                }

                // スコアの計算と更新
                const weightedScoreIncrement = score * weight;
                const weightedCountIncrement = 1 * weight;

                transaction.update(postRef, {
                    weightedTotalScore: admin.firestore.FieldValue.increment(weightedScoreIncrement),
                    weightedVoteCount: admin.firestore.FieldValue.increment(weightedCountIncrement),
                });
            });
            console.log(`Score updated for post: ${postId}`);

        } catch (error) {
            console.error("Transaction failure:", error);
        }
    });