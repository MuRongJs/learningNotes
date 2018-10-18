# 1、Set #
### 基本用法 ###
es6提供了新的数据结构Set。它类似数组，但是成员的值都是唯一的，没有重复的值。
<pre>
 const s = new Set();
 [1,2,3,4,1,2,3,4,1,2,3,4].forEach(i => s.add(i));
 s
 //Set(4) {1, 2, 3, 4}
 [...s]
 //[1,2,3,4]
 s.size
 //4
 s.add(NaN);s.add(NaN);
 //Set(5) {1, 2, 3, 4, NaN}
 s.add({});s.add({});
 //Set(5) {1, 2, 3, 4, NaN,{},{}}
</pre>
### Set实例的属性和方法 ###
