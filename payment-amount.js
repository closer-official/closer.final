export function classifyPaymentAmount(totalYen,verifiedCreditYen=0){
 if(!Number.isSafeInteger(totalYen)||totalYen<1||!Number.isSafeInteger(verifiedCreditYen)||verifiedCreditYen<0||verifiedCreditYen>totalYen)throw Error('INVALID_PAYMENT_AMOUNT');
 const remainingYen=totalYen-verifiedCreditYen;
 return Object.freeze({totalYen,verifiedCreditYen,remainingYen,route:remainingYen===0?'independent_zero':remainingYen<50?'adjust_or_contact':'card',stripeAllowed:remainingYen>=50});
}
