function quickSort(arr, s, e){
    if( s >= e) return ;
    let q = parseInt((s+e)/2);
    return quickSort()
}

function partition(arr){
    let i = j = 0;
    let len = arr.length;
    let pivot = arr[len-1];
    for(;j < len; j++){
        if(arr[j] < pivot){
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
        }   
    }
    arr[len-1] = arr[i];
    arr[i] = pivot;
    return arr;
}