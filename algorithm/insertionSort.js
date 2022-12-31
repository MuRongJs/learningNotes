let arr = [3, 5, 4, 1, 2, 6];

function insertion( arr ){
  let len = arr.length;
  if(len < 2) return arr;
  for(let i = 1; i < len; i++){
    let value = arr[i];
    let j = i - 1;
    console.log(arr)
    for(; j >= 0; j--){
      if(value < arr[j]){
        arr[j+1] = arr[j];
      }else{
        break;
      }
    }
    arr[j+1] = value;
  }
  return arr;
}
insertion(arr);
console.log(insertion(arr))