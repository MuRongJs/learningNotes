// 链接：https://mp.weixin.qq.com/s/M1KfTfNlu4OCK8i9PSAmug



// 零、二查找框架

//code
/*
function binarySearch(nums, target) {
  let left = 0, right = nums.length;
  while() {
    let mid = left + (right - left) / 2;
    if (nums[mid] == target) {

    } else if (nums[mid] < target) {
      left
    } else if (nums[mid] > target) {

    }
  }
  return ;
}
*/



// 一、寻找一个数（基本的二分搜索）
/**
 * 关键点：搜索区间
 * 1、使用<=,而不是<
 * 2、left、right的动态取值
 * 3、缺陷，多个target存在数组中
 */

// code
/*
function binarySearch(nums, target) {
  let left = 0,right = nums.length - 1;
  while (left <= right) {
    const mid = left + parseInt((right - left) / 2);
    if(nums[mid] === target){
      return mid;
    }else if(nums[mid] < target){
      left = mid + 1;
    }else if(nums[mid] > target){
      right = mid - 1;
    }
  }
  return -1;
}

console.log(binarySearch([1,2,3,4,5,6,7,8,9], 10));
*/



// 二、寻找左侧边界的二分搜索

// code: 左闭右开
/*
function binarySearch(nums, target) {
  let left = 0,right = nums.length;
  while (left < right) {
    const mid = parseInt((left + right) / 2);
    if(nums[mid] === target){
      right = mid;
    }else if(nums[mid] > target){
      right = mid;
    }else if(nums[mid] < target){
      left = mid + 1;
    }
  }
  if(left === nums.length) return -1;
  return nums[left] === target ? left : -1;
}
*/
// 左闭右闭：寻找右侧边界的二分搜索
/*
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + parseInt((right - left)/2);
    if(nums[mid] === target){
      left = mid + 1;
    }else if(nums[mid] > target){
      right = mid - 1;
    }else if(nums[mid] < target){
      left = mid + 1;
    }
  }
  return left === nums.length  && nums[left] !== target ? -1 : left;
}
*/
// 左闭右闭：寻找左侧边界的二分搜索
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + parseInt((right - left)/2);
    if(nums[mid] === target){
      right = mid - 1;
    }else if(nums[mid] > target){
      right = mid - 1;
    }else if(nums[mid] < target){
      left = mid + 1;
    }
  }

  return right < 0  && nums[right] !== target ? -1 : right;
}

console.log(binarySearch([1, 2, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9], 9));