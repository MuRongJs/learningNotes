# 1.Iterator(遍历器)的概念 #

1、为不同的数据结构，提供统一的访问接口；

2、使得数据结构的成员能够按某种次序排序；

3、for...of语句来遍历含有Iterator接口的数据；

4、遍历过程：（1）创建一个指针对象。（2）指针指向数据成员的位置。（3）使用next方法让指针指向下一个数据成员

5、next方法：每次调用next方法时返回都会包含value和done两个属性的对象，其中value是当前成员的值，done是一个表示遍历是否结束的布尔值。

Iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。

----------
#2、 默认Iterator #

原生具有Iterator接口的数据结构如下：

	1.Array
	2.Map
	3.Set
	4.String
	5.TypedArray
	6.函数的arguments对象
	7.NodeList对象
不具备Iterator接口的只要在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。

for...of遍历有Iterator接口对象时，首先	会先返回一个遍历对象，对象有next方法。
<pre>
例一：
	const obj = {
	  [Symbol.iterator] : function () {
	    return {
	      next: function () {
	        return {
	          value: 1,
	          done: true
	        };
	      }
	    };
	  }
	};
例二：
	class RangeIterator {
	  constructor(start, stop) {
	    this.value = start;
	    this.stop = stop;
	  }
	
	  [Symbol.iterator]() { return this; }
	
	  next() {
	    var value = this.value;
	    if (value < this.stop) {
	      this.value++;
	      return {done: false, value: value};
	    }
	    return {done: true, value: undefined};
	  }
	}
	
	function range(start, stop) {
	  return new RangeIterator(start, stop);
	}
	
	for (var value of range(0, 3)) {
	  console.log(value); // 0, 1, 2
	}
</pre>
# 3、调用Iterator接口的场合 #
(1. 解构赋值

(2. 扩展运算符（...)可以将任何具有Iterator接口的数据结构转为数组 ： var str="asdfgh"; [...str];	//["a", "s", "d", "f", "g", "h"]

(3. yield*
<pre>
var iterator = function*(){
	yield 1;
	yield* [2,3,4];
}
</pre>
(4. 其他场合：任何接受数组的参数的场合，都调用了遍历接口。
	
	for...of
	Array.from()
	Map()、Set()、WeakMap()、WeakSet()
	Promise.all()
	Promise.race()
# [4、字符串的Iterator接口](http://es6.ruanyifeng.com/#docs/iterator#%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84-Iterator-%E6%8E%A5%E5%8F%A3) #
# 5、Iterator接口与Generator函数 #
用Generator函数实现一个有Iterator接口的对象。
<pre>
var myIterator = {
	[Symbol.iterator]:function* (){
		yield:1;
		yield:2;
		yield:3;
		yield:4;
	}
}
//等同于
var myIterator = {
	* [Symbol.iterator](){
		yield 'hello';
    	yield 'world';
	}
}
</pre>
Generator函数执行，产生一个有Iterator接口的对象。
# [6、遍历器对象的 return(),throw()](http://es6.ruanyifeng.com/#docs/iterator#%E9%81%8D%E5%8E%86%E5%99%A8%E5%AF%B9%E8%B1%A1%E7%9A%84-return%EF%BC%8Cthrow) #
return方法主要在for...of循环中提前退出（出错，break语句）的时候调用。如果在对象完成遍历前，需要清理或释放资源，就可以部署return方法。

**return方法必须返回一个对象**
# 7、for...of循环 #
用来遍历所有数据结构的统一方法。数据结构只要部署了[Symbol.iterator]属性，就视为有Iterator接口，就可以用for...of来遍历。for...of遍历的数据结构就是遍历[Symbol.iterator]返回的对象。

for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

### 数组 ###
数组情况下：

for...in循环，只能获取键名，不能获取到键值。for...of循环直接遍历可得到键值（如果要得到键名借助数组实例的entries方法和keys方法）

for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。