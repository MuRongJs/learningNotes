function mergeSort(arr){
    mergeSortC(arr, 0, arr.length);
}
function mergeSortC(arr, s, e){
    if(s >= e) return;
    q = parseInt((s + e)/2);
    mergeSortC(arr, s, q);
    mergeSortC(arr, q+1, e);
    merge(arr.slice(s, q), arr.slice(q, e));
}
function merge(arr1 ,arr2){
    let len1 = arr1.length;
    let len2 = arr2.length;
    let i = 0;
    let j = 0;
    let tmpArr = [];
    while(i < len1 && j < len2){
        if(arr1[i] > arr2[j]){
            tmpArr.push(arr2[j]);
            j++;
        }else{
            tmpArr.push(arr1[i]);
            i++;
        }
    }
    if(i > j){
        tmpArr = tmpArr.concat(arr2.slice(j, len2))
    }else{
        tmpArr = tmpArr.concat(arr1.slice(i, len1))
    }
    return tmpArr;
}