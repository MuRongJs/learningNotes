![](https://raw.githubusercontent.com/MuRongJs/learningNotes/master/images/appear_onec_num.jpeg)
可以通过异或(xor)运算符的特性来解答：

    1、  x ^ x = 0;
    2、  0 ^ x = x;
    3、  x ^ y ^ x = x ^ x ^ y = y;

通过者三个性质可以来解答这个算法。
```
var singleNumber = function(nums) {
    return nums.reduce((x, y) => x ^ y);
}
```
# 数组概念
* 数组转换为字符串的方法：join、toString;返回值
* 增删数组的方法：push、unshift从尾部、首部增加元素; pop、shift从尾部、首部删除元素;操作本身
* 数组的转换：
    * 本身的转换：reverse、splice、sort
        * reverse反转数组
        * splice(i, len, ...other)从指定i索引删除len个元素，再从指定i索引添加...other元素;索引i可以为负数，从数组从后往前数。
        * sort排序，默认会将元素转换为字符串按照字典顺序进行排序；可以录入一个函数进行自定义的排序，return大于0时两元素位置交换。
    * 产生新数组：concat、slice、map、filter
        * concat连接两个数组，产生新数组
        * slice截取数组，slice(start, end)截取索引从start到end的数组
        * map用来遍历数组，对每个数组元素进行操作，并返回操作之后的数组。map(function(value, index, arr){return value的操作},this)
* 迭代：forEach、some、every、reduce、reduceRight
    * forEach遍历数组，forEach(value, index, arr),输出对象遍历值，也可以进行指向this进行操作原数组。
    * some遍历数组，可以对数组每个元素进行判断，某个元素满足条件返回true。some(value, index, arr)
    * every遍历数组，可以对数组每个元素进行判断，每个元素满足条件返回true。every(value, index, arr)
    * reduce、reduceRight两个函数主要作用是累积，匿名函数接受四个参数(a, b, index, arr);a默认为数组第一个元素&a是之后的累计、b默认为数组中第二个元素&b是当前元素;index默认为0,表示当前元素
* 位置：indexOf、lastIndexOf; indexOf返回第一个匹配到当前元素的索引、lastIndexOf返回最后一个匹配到当前元素的索引值。

        