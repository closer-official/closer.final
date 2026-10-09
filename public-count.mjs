const required=s=>typeof s==='string'&&s.trim().length>0;
export function validatePublicCount(value,{now=Date.now()}={}){
 if(!value||value.schemaVersion!==1||value.dataset!=='nationwide_corporate_basic_info_staging'||!Number.isSafeInteger(value.count)||value.count<1||value.includesClosed!==true||value.verification?.status!=='verified'||value.verification?.method!=='python-row-count'||!required(value.verification?.reviewReference)||!required(value.source?.name)||!required(value.source?.url)||!required(value.source?.evidenceReference))return null;
 const time=Date.parse(value.verifiedAt);let url;try{url=new URL(value.source.url);}catch{return null;}if(url.protocol!=='https:'||!Number.isFinite(time)||time>now+300000)return null;
 return Object.freeze({count:value.count,closedCount:Number.isSafeInteger(value.closedCount)&&value.closedCount>=0&&value.closedCount<=value.count?value.closedCount:null,latestAppliedDate:typeof value.latestAppliedDate==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value.latestAppliedDate)?value.latestAppliedDate:null,verifiedAt:value.verifiedAt,source:{...value.source},includesClosed:true,dataset:value.dataset});
}
