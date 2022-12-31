let arr1 = [1,3,5,7,9];
let arr2 = [2,4,6,8,10];
let newArr = [];
let i = 0;
let j = 0;
let len1 = arr1.length;
let len2 = arr2.length;
while(i < len1 && j < len2){
  if(arr1[i] > arr2[j]){
    newArr.push(arr2[j]);
    j++;
  }else{
    newArr.push(arr1[i]);
    i++;
  }
}
if(i < len1){
  newArr = newArr.concat(arr1.slice(i, len1));
}else{
  newArr = newArr.concat(arr2.slice(j, len2));
}