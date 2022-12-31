function searchRRange(nums, target) {
  let leftIndex = binarySearchLeft(nums, target);
  let rightIndex = binarySearchRight(nums, target);
  return { left: leftIndex, right: rightIndex}
}

function binarySearchLeft(nums, target) {
  let left = 0,right = nums.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if(nums[mid] === target){
      right = mid;
    }else if(nums[mid] > target){
      right = mid;
    }else if(nums[mid] < target){
      left = mid + 1;
    }
  }
  return nums[left] !== target ? -1 : left;
}

function binarySearchRight(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right -left) / 2);
    if(nums[mid] === target){
      left = mid + 1;
    }else if(nums[mid] > target){
      right = mid - 1;
    }else if(nums[mid] < target){
      left = mid + 1;
    }
  }
  return nums[left - 1] !== target ? -1 : left - 1;
}

console.log(searchRRange([1, 2, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9], 1))