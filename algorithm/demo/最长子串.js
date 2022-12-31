function childStr(str) {
  let compareObj = {};
  let len = 0;
  let minStr = '';
  for (let i = 0; i < str.length; i++) {
    const item = str.charAt(i);
    if(compareObj[item]){
      const compareObjArr = Object.keys(compareObj);
      const compareLen = compareObjArr.length
      if(len <= compareLen){
        len = compareLen;
        minStr = compareObjArr.join('');
      }
      compareObj = {};
      compareObj[item] = true;
    }else{
      compareObj[item] = true;
    }
  }
  return {
    len,
    minStr
  };
}
function maxChildStr(str) {
  let left = 0;
  let strLen = str.length;
  let lastIndex = strLen - 1;
  let maxStr = str.charAt(0);
  for (let i = 0; i < lastIndex; i++) {
    const nextIndex = i + 1;
    let targetStr = str.slice(left, nextIndex);
    const nextChar = str.charAt(nextIndex);
    const charIndex = targetStr.indexOf(nextChar);
    if(charIndex > -1){
      left = left + charIndex + 1;
    }else{
      targetStr += nextChar;
      if (targetStr.length >= maxStr.length){
        maxStr = targetStr;
      }
    }
  }
  return maxStr;
}

console.log(maxChildStr('au'));