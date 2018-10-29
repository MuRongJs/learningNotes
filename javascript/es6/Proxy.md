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
### [get()](http://es6.ruanyifeng.com/#docs/proxy#get) ###
get用于拦截某个属性的读取操作，接受三个参数：目标对象，属性名、Proxy实例本身。
### [set()](http://es6.ruanyifeng.com/#docs/proxy#set) ###
set用于拦截某个属性的赋值操作，接受四个参数：目标对象、属性名、属性值、Proxy实例本身。
<pre>
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
myObj.foo === myObj // true
</pre>
**目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。**
### [apply()](http://es6.ruanyifeng.com/#docs/proxy#apply) ###
apply方法拦截函数的调用、call和apply操作;接受三个参数：目标对象、目标对象的上下文对象（this）、目标对象的参数数组。
<pre>
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
</pre>
### [has()](http://es6.ruanyifeng.com/#docs/proxy#has) ###
has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。接受两个参数：目标对象，属性名

**目标对象是禁止扩展的，使用has拦截会报错**
### [construct()](http://es6.ruanyifeng.com/#docs/proxy#construct) ###
construct方法用于拦截new命令。可以接受两个参数：目标对象、构造函数的参数对象。

**construct方法返回的必须是一个对象，否则会报错**
### [deleteProperty()](http://es6.ruanyifeng.com/#docs/proxy#deleteProperty) ###
deleteProperty用于拦截delete操作。

**目标对象不可配置的属性，不能被deleteProperty方法删除。**
### [defineProperty()](http://es6.ruanyifeng.com/#docs/proxy#defineProperty) ###
defineProperty方法拦截了Object.defineProperty操作。
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
