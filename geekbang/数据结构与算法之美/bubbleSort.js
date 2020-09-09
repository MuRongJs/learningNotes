function bubbleSort(arr){
    let len = arr.length;
    for(let i = 0; i < len; i++){
        console.log('#######',i)
        let flag = false
        for(let j = 0; j < len - i - 1; ++j){
            console.log(arr[j] > arr[j+1], arr[j],arr[j+1],j)
            if(arr[j] > arr[j+1]){
                flag = true;
                let tmp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = tmp;
            }
        }
        if(!flag) break;
    }
    return arr
}