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

