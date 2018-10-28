# 1、概念 #
Proxy用于修改某些操作的默认行为，等同于在语言层面上的修改，属于一种“元编程”，即对编程语言进行编程。

Proxy可以理解为对目标对象架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
<pre>var proxy = new Proxy(target, handler);</pre>
Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
<pre>
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
</pre>
第一个参数是所要代理的目标对象（上例是一个空对象），

第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。比如，上面代码中，配置对象有一个get方法，用来拦截对目标对象属性的访问请求。

总之Proxy对象是为要拦截的目标对象制定拦截行为的，同一个拦截器函数可以设置多个拦截操作。
Proxy对象支持一共13种拦截操作：

	1.get(target , propKey , receiver):拦截对象属性的读取，比如proxy.foo和proxy['foo']。
	2.set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
	3.has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
	4.deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
	5.ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。
	该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
	6.getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
	7.defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
	8.preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
	9.getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
	10.isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
	11.setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
	12.apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
	13.construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
	
# 2、Proxy实例的方法 #
### get() ###
# 3、Proxy.revocable() #
<pre>
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
</pre>
Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。

Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
# this问题 #
