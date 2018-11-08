# 1. 静态方法 #
Reflect是操作对象的新API。

	1.将Object对象属于语言内部的方法，放到Reflect对象上，可以通过Reflect对象拿到语言内部的方法。例如：
	Reflect.defineProperty(targetObj , property , attributes)
	2.修改返回值，变的合理。例如：
	（Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。）
	3.可以将命令形式的操作，执行成函数行为。例如：
	name in obj 或 delete obj[name] ===>> Reflect.has(obj , name) 或 Reflect.deleteProperty(obj , name)
	4.Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。Reflect方法，保证原生行为能够正常执行。
# 2. 静态方法 #
### [Reflect.get(target, name, receiver)](http://es6.ruanyifeng.com/#docs/reflect#Reflect-gettarget-name-receiver) ###
Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined；

如果属性部署了读取函数(getter),则读取函数的this绑定receiver。
### [Reflect.set(target, name, value, receiver)](http://es6.ruanyifeng.com/#docs/reflect#Reflect-settarget-name-value-receiver) ###
Reflect.set方法设置target对象的name属性等于value。

如果属性部署了赋值函数(setter),赋值函数的this绑定到receiver。
### Reflect.has(obj, name) ###
Reflect.has方法对应in运算符。
### Reflect.deleteProperty(obj, name) ###
Reflect.deleteProperty方法对应delete运算符。
### Reflect.construct(target, args) ###
Reflect.construct方法等同于new target(...args)。
<pre>
function Greeting(name){
	this.name = name;
}
//new 的写法
var obj = new Greeting("crl");

//Reflect.construct 的写法
var obj = Reflect.construct(Greeting, ['crl']);
</pre>
### Reflect.getPrototypeOf(obj) ###
Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj).
### Reflect.setPrototypeOf(obj, newProto) ###
Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。返回一个布尔值，表示是否设置成功。
### Reflect.apply(func, thisArg, args) ###
Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args),用于绑定this对象后执行给定函数。

Function.Prototype.apply.call(func, thisArg, args)可以分解成以下步骤：

1. 现将内置的Function原型对象的apply方法，call给func，并传递thisArg和args两个参数；
2. 再执行func.apply(thisArg, args);
### Reflect.defineProperty(target, propertyKey, attributes) ###
Reflect.defineProperty 等同于 Object.defineProperty,用来为对象定义属性。
### Reflect.getOwnPropertyDescriptor(target, propertyKey) ###
Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor
