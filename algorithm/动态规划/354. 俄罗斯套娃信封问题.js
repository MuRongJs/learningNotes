/**
 * LIS 最长递增子序列
 * @param {Array} nums 目标数组
 * @returns 最长递增子序列
 */
function lis(nums) {
  const numsLen = nums.length;
  if(numsLen === 0){
    return 0;
  }
  let dpArr = [];
  let i = 0;
  let maxLen = 0;
  let maxIndex = -1;
  while (i < numsLen) {
    let len = 0;
    let lisArr = [];
    for (let j = 0; j < dpArr.length; j++) {
      if (nums[i] > nums[j]){
        if (dpArr[j].len >= len) {
          len = dpArr[j].len + 1;
          lisArr = dpArr[j].lisArr.concat([nums[i]]);
        }
      }
    }
    if(maxLen <= len){
      maxLen = len;
      maxIndex = i;
    }
    if(len === 0){
      dpArr[i] = {
        len: 1,
        lisArr: [nums[i]]
      };
    }else{
      dpArr[i] = {
        len,
        lisArr
      };
    }
    i++;
  }
  return dpArr[maxIndex];
}

console.log(lis([0,1,0,3,2,3]));


/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  if (!envelopes.length) {
    return 0;
  }

};