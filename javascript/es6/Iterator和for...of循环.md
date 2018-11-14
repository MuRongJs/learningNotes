# 1.iterator(遍历器)的概念 #

1、为不同的数据结构，提供统一的访问接口；

2、使得数据结构的成员能够按某种次序排序；

3、for...of语句来遍历含有iterator接口的数据；

4、遍历过程：（1）创建一个指针对象。（2）指针指向数据成员的位置。（3）使用next方法让指针指向下一个数据成员

5、next方法：每次调用next方法时返回都会包含value和done两个属性的对象，其中value是当前成员的值，done是一个表示遍历是否结束的布尔值。

iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。

----------
#2、 默认iterator #

原生具有iterator接口的数据结构如下：

	1.array
	2.map
	3.set
	4.string
	5.typedarray
	6.函数的arguments对象
	7.nodelist对象
不具备iterator接口的只要在symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。

for...of遍历有iterator接口对象时，首先	会先返回一个遍历对象，对象有next方法。
<pre>
例一：
	const obj = {
	  [symbol.iterator] : function () {
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
	class rangeiterator {
	  constructor(start, stop) {
	    this.value = start;
	    this.stop = stop;
	  }
	
	  [symbol.iterator]() { return this; }
	
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
	  return new rangeiterator(start, stop);
	}
	
	for (var value of range(0, 3)) {
	  console.log(value); // 0, 1, 2
	}
</pre>
# 3、调用iterator接口的场合 #
(1. 解构赋值

(2. 扩展运算符（...)可以将任何具有iterator接口的数据结构转为数组 ： var str="asdfgh"; [...str];	//["a", "s", "d", "f", "g", "h"]

(3. yield*
<pre>
var iterator = function*(){
	yield 1;
	yield* [2,3,4];
}
</pre>
(4. 其他场合：任何接受数组的参数的场合，都调用了遍历接口。
	
	for...of
	array.from()
	map()、set()、weakmap()、weakset()
	promise.all()
	promise.race()
# [4、字符串的iterator接口](http://es6.ruanyifeng.com/#docs/iterator#%e5%ad%97%e7%ac%a6%e4%b8%b2%e7%9a%84-iterator-%e6%8e%a5%e5%8f%a3) #
# 5、iterator接口与generator函数 #
用generator函数实现一个有iterator接口的对象。
<pre>
var myiterator = {
	[symbol.iterator]:function* (){
		yield:1;
		yield:2;
		yield:3;
		yield:4;
	}
}
//等同于
var myiterator = {
	* [symbol.iterator](){
		yield 'hello';
    	yield 'world';
	}
}
</pre>
generator函数执行，产生一个有iterator接口的对象。
# [6、遍历器对象的 return(),throw()](http://es6.ruanyifeng.com/#docs/iterator#%e9%81%8d%e5%8e%86%e5%99%a8%e5%af%b9%e8%b1%a1%e7%9a%84-return%ef%bc%8cthrow) #
return方法主要在for...of循环中提前退出（出错，break语句）的时候调用。如果在对象完成遍历前，需要清理或释放资源，就可以部署return方法。

**return方法必须返回一个对象**
# 7、for...of循环 #
用来遍历所有数据结构的统一方法。数据结构只要部署了[symbol.iterator]属性，就视为有iterator接口，就可以用for...of来遍历。for...of遍历的数据结构就是遍历[symbol.iterator]返回的对象。

for...of循环可以使用的范围包括数组、set 和 map 结构、某些类似数组的对象（比如arguments对象、dom nodelist 对象）、后文的 generator 对象，以及字符串。

### 数组 ###
数组情况下：

for...in循环，只能获取键名，不能获取到键值。for...of循环直接遍历可得到键值（如果要得到键名借助数组实例的entries方法和keys方法）

for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。例如：
<pre>
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
</pre>
### set 和 map结构 ###
set数据结构，使用for...of循环遍历的时候，每次遍历返回的是一个值。

map数据结构，使用for...of循环遍历的时候，每次遍历返回的是一个数组（当前map成员的键名和键值）。
### 计算生成的数据结构 ###
    1.entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。
    2.keys() 返回一个遍历器对象，用来遍历所有的键名。
    3.values() 返回一个遍历器对象，用来遍历所有的键值。
### 类似数据的对象 ###
类似数据的对象（字符串、DOM NodeList 对象、arguments对象）。

for...of可以识别32位utf-16的字符。

并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。
### 对象 ###
普通对象，可以使用for...in循环遍历对象的键名，但是不能直接使用for...of循环遍历（因为普通对象没有[Symbol.iterator]接口个）

普通对象可以使用Generator生成器生成一个可以遍历的对象，然后就可以使用for...of循环遍历了。
### [与其他遍历语法的比较](http://es6.ruanyifeng.com/#docs/iterator#%E4%B8%8E%E5%85%B6%E4%BB%96%E9%81%8D%E5%8E%86%E8%AF%AD%E6%B3%95%E7%9A%84%E6%AF%94%E8%BE%83)) ###

    