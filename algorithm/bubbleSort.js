let arr = [3, 5, 4, 1, 2, 6];
let comNum = 0;
function bubbleSort (arr){
  let len = arr.length;
  let flag;
  if( len < 2) return arr;
  for(let i = 0; i < len; i++){
    flag = true;
    for(let j = 0; j < len - i - 1; j++){
      console.log(arr);
      if(arr[j] > arr[j + 1]){
        let midVal = arr[j];
        arr[j] = arr[j + 1];
        arr[j+1] = midVal;
        flag = false;
      }
    }
    comNum++;
    if(flag) break;
  }
  return arr;
}

bubbleSort(arr);
console.log(arr, comNum);