Reflect是操作对象的新API。

	1.将Object对象属于语言内部的方法，放到Reflect对象上，可以通过Reflect对象拿到语言内部的方法。
	2.修改返回值，变的合理。（Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。）
	3.可以将命令形式的操作，执行成函数行为。
	4.