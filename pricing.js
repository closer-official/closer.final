export const PRICE_POLICY=Object.freeze({version:'2026-10-08-v2',currency:'jpy',taxIncluded:true,regularUnitYen:10,dataLinkUnitYen:5});
export function calculateEstimate(rawQuantity,rate='regular'){
 const raw=String(rawQuantity??'');
 if(!raw)return {ok:false,error:'送信件数を入力してください。'};
 if(!/^[1-9][0-9]*$/.test(raw))return {ok:false,error:'1以上の整数を半角数字で入力してください。'};
 // Technical arithmetic guard only, never a business order limit.
 if(raw.length>16)return {ok:false,error:'この件数は安全に試算できません。注文上限を示すものではありません。'};
 const quantity=BigInt(raw);const unitYen=rate==='regular'?PRICE_POLICY.regularUnitYen:rate==='data_link'?PRICE_POLICY.dataLinkUnitYen:null;
 if(unitYen===null)return {ok:false,error:'料金区分を確認してください。'};
 const total=quantity*BigInt(unitYen);
 if(quantity>BigInt(Number.MAX_SAFE_INTEGER)||total>BigInt(Number.MAX_SAFE_INTEGER))return {ok:false,error:'この件数は安全に試算できません。注文上限を示すものではありません。'};
 return {ok:true,quantity:Number(quantity),unitYen,totalYen:Number(total),priceVersion:PRICE_POLICY.version,currency:PRICE_POLICY.currency,taxIncluded:true};
}
// Future internal backend contract only; not exposed by the preview server.
export function resolveServerQuote(request,{dataLinkEligible=false}={}){
 if(['amount','total','totalYen','unitYen','unitPrice','discount','coupon'].some(key=>Object.hasOwn(request,key)))throw Error('CLIENT_PRICE_NOT_ACCEPTED');
 if(request.priceVersion!==PRICE_POLICY.version)throw Error('PRICE_VERSION_MISMATCH');
 // Data linkage is not implemented. Eligibility must never enable the planned price yet.
 if(dataLinkEligible)throw Error('DATA_LINK_NOT_AVAILABLE');
 const result=calculateEstimate(request.quantity,'regular');
 if(!result.ok)throw Error('INVALID_QUANTITY');
 return Object.freeze(result);
}
export function isAuthoritativeQuote(q){
 if(!q||q.priceVersion!==PRICE_POLICY.version)return false;
 // Planned data-link estimates are not authoritative payable quotes.
 const rate=q.unitYen===PRICE_POLICY.regularUnitYen?'regular':null;
 if(!rate)return false;
 const expected=calculateEstimate(String(q.quantity),rate);
 return expected.ok&&q.totalYen===expected.totalYen&&q.currency==='jpy'&&q.taxIncluded===true;
}
