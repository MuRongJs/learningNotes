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
 1、[...new Set(Array)]
 2、Array.from(new Set(Array))
 //去除数组重复成员
</pre>
### Set实例的属性和方法 ###
#### 属性： ####
(1)size返回实例的成员总数。

#### 方法： ####
**操作方法（操作数据）**
	
	1、add(val):添加某个值，返回Set结构本身。
	2、delete(val):删除某个数据成员，返回Boolean值(表示是否成功删除)。
	3、has(val):查找某值是否为Set数据结构的成员，返回Boolean值。
	4、clear():清除所有成员，没有返回值。
**遍历方法（遍历成员）**

	1、