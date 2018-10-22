# 1、let 命令 #
#### 基本用法 ####


	

	1.let在所在的在所在的代码块里有效。
	2.在for循环中，设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
<pre>	
例一：
{
 	let y = "children";
	(function fun(){
		
		console.log(y);
	})()
}
let y = "parent";
//输出children
console.log(y)
//输出parent
例二：
for (let i = 0; i < 3; i++) {
	let i = 'abc';
	;
	console.log(i);
}
// abc
// abc
// abc
</pre>
#### 不存在变量提升 ####
<pre>
// var 的情况
情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
情况
console.log(bar); // 报错ReferenceError
let bar = 2;
</pre>
# 2、块级作用域 #
#### 为什么要用块级作用域 ####
	1.内层变量可能会覆盖外层变量。
	2.用来计数的循环变量泄露为全局变量。
<pre>
例一：
var y = "parent";
(function f(){
	{
	console.log(y)
	if(true){
		var y ='chilren';
		
		consle.log(y);
	}
})()
//undefined
//chilren
</pre>
#### ES6的块级作用域 ####
let命令实际为javascript增加了块级作用域，外层代码块不会受内层代码块影响。	
	
#### [块级作用域和函数声明](http://es6.ruanyifeng.com/#docs/let#%E5%9D%97%E7%BA%A7%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E5%87%BD%E6%95%B0%E5%A3%B0%E6%98%8E) ####
在ES6浏览器环境下：

	会出现变量提升。
在ES6浏览器环境下：

	1.允许在块级作用域下声明函数。（做好不要这样做，必须要的话，尽量使用表达式）
	2.函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
	  同时，函数声明还会提升到所在的块级作用域的头部。
在ES6其他环境下和ES5一样规定：函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
# 3、const命令 #
#### 基本用法 ####
	1.const声明一个只读的常量。一旦声明，常量的值就不能改变
	2.只声明不赋值，也会报错。
	3.只在声明所在的块级作用域内有效。
	4.没有变量提升。
	5.和let一样不可以重复声明。
#### 本质 ####
对于引用类型的数据，const声明的话，只是不能修改内存地址但是实际数据的指针指向的数据可以修改。
#### ES6声明变量的6种方式 ####
	1.var
	2.function
	3.let
	4.const
	5.import
	6.class
# 4、顶层对象的属性 #
ES6开始会慢慢将全局变量和顶层对象的属性脱钩。

	1.用var声明的变量既是顶层对象的属性，也是全局变量。
	2.用let声明变量只能是全局变量。
# 5、global对象 #
同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性。
	
	1.全局环境中，this会返回顶层对象。但是Node 模块和 ES6 模块中，	this返回的是当前模块。
	2.函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，
	this会指向顶层对象。但是严格模式下，这时this会返回undefined。
	3.不管是严格模式，还是普通模式，new Function('return this')()，
	总是会返回全局对象。如果浏览器用了 CSP（Content Security Policy，
	内容安全策略），那么eval、new Function这些方法都可能无法使用。
为了取到全局对象。可以用下面两种方法：
<pre>
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
</pre>
垫片库system.global，可以在所有环境拿到global。
<pre>
//方法一
// CommonJS 的写法
require('system.global/shim')();
var global = require('system.global')();
//方法二
// ES6 模块的写法
import shim from 'system.global/shim'; shim();
import getGlobal from 'system.global';
const global = getGlobal();
</pre>