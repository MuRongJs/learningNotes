let arr = [3, 5, 4, 1, 2, 6];
let len = arr.length;
function merge(arr, s, e){
  if(s >= e) return;
  let mid = parseInt((s+e)/2);
  merge(arr, s, mid);
  merge(arr, mid+1, e);
}
merge(arr, 0, len);
