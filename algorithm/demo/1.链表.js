class ListNode{
  constructor(val){
    this.val = val;
    this.node = null;
  }
}
let memo = {};
function fid(num) {
  if(num === 1 || num === 2) return 1;
  if (memo.hasOwnProperty(num)){
    return memo[num];
  } else {
    return fid(num - 1) + fid(num - 2);
  }
}

function fid(n) {
  if (num <= 0) return 0;
  if (num === 1 || num === 2) return 1;
  let prev = 1; curr = 1;
  for (let index = 3; index < n; index++) {
    let sum = prev + curr;
    curr = sum;
    prev = curr;
  }
  return curr;
}

fid(20)


function coinChange(selList, amount) {
  function dp(n) {
    if(n === 0) return 0;
    if(n < 0) return -1;
    let res = Infinity;
    for (const key in selList) {
      if (Object.hasOwnProperty.call(selList, key)) {
        const element = selList[key];
        const sub = dp(n - element);
        if(sub === -1) continue;
        res = Math.min(res, 1 + sub);
      }
    }
    return res;
  }
  return dp(amount);
}
coinChange([1,2,3,4,5], 50);