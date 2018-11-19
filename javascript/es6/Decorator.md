# 1、类的修饰器 #

修饰器就是对类进行处理的函数（提案）。可以对类添加静态属性、实例属性、私有属性。

**注意**:修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。
<pre>
function addAttr(attr, attrVal){
    return function(target){
        target.attr = attrVal;
        target.prototype.attr = attrVal;
    }
}
@addAttr("name", "murong")
class person{
    
}
</pre>
# [2、属性的修饰](http://es6.ruanyifeng.com/#docs/decorator#%E6%96%B9%E6%B3%95%E7%9A%84%E4%BF%AE%E9%A5%B0) #
修饰器不仅可以修饰类，还可以修饰类的属性。

修饰器函数修饰属性时，一共接受三个参数，目标对象、属性名、描述对象。
<pre>
function add1(target, name, descriptor){
    let fVal = descriptor.value;
    descriptor.value = function () {
        arguments[0]++;
        return fVal.apply(this, arguments);
    }
    return descriptor;
}
function  log(target, name, descriptor) {
    let fVal = descriptor.value;
    descriptor.value = function () {
        console.log(`${name}` , arguments);
        return fVal.apply(this, arguments);
    }
    return descriptor;
}
@addAttr("name", "murong")
class person{
    @add1
    @log add(a, b){
        return a + b;
    }
}
let p = new person();
console.log(p.add(1,2));//增加类add1修饰器，会在第一个参数加1；
console.log(Object.getPrototypeOf(p).add.toString());
console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(p) , "add").value.toString());
//在类内部定义的属性（也可以称为在类的原型对象上定义的属性）通过修饰符函数修饰。value为修饰函数修饰后的值。
</pre>
如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

它将是 JavaScript 代码静态分析的重要工具。
# [3、为什么修饰器不能用于函数？](http://es6.ruanyifeng.com/#docs/decorator#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BF%AE%E9%A5%B0%E5%99%A8%E4%B8%8D%E8%83%BD%E7%94%A8%E4%BA%8E%E5%87%BD%E6%95%B0%EF%BC%9F) #
修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。

如果一定要修饰函数，可以采用高阶函数的形式直接执行。
<pre>
function doSomething(name) {
  console.log('Hello, ' + name);
}

function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}

const wrapped = loggingDecorator(doSomething);
</pre>
# [4、core-decorator.js](http://es6.ruanyifeng.com/#docs/decorator#core-decorators-js) #
core-decorators.js是一个第三方模块，提供了几个常见的修饰器，通过它可以更好地理解修饰器。

### (1)@autobind ###
autobind修饰器使得方法中的this对象，绑定原始对象。
### (2)@readonly ###
readonly修饰器使得属性或方法不可写。
### (3)@override ###
override修饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。
### (4)@deprecate (别名@deprecated) ###
deprecate或deprecated修饰器在控制台显示一条警告，表示该方法将废除。
### (5)@suppressWarnings ###
suppressWarnings修饰器抑制deprecated修饰器导致的console.warn()调用。但是，异步代码发出的调用除外。
# 5、[使用修饰器实现自动发布事件](http://es6.ruanyifeng.com/#docs/decorator#%E4%BD%BF%E7%94%A8%E4%BF%AE%E9%A5%B0%E5%99%A8%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%8A%A8%E5%8F%91%E5%B8%83%E4%BA%8B%E4%BB%B6) #
<pre>
const postal = require("postal/lib/postal.lodash");

export default function publish(topic, channel) {
  const channelName = channel || '/';
  const msgChannel = postal.channel(channelName);
  msgChannel.subscribe(topic, v => {
    console.log('频道: ', channelName);
    console.log('事件: ', topic);
    console.log('数据: ', v);
  });

  return function(target, name, descriptor) {
    const fn = descriptor.value;

    descriptor.value = function() {
      let value = fn.apply(this, arguments);
      msgChannel.publish(topic, value);
    };
  };
}
</pre>
上面代码定义了一个名为publish的修饰器，它通过改写descriptor.value，使得原方法被调用时，会自动发出一个事件。它使用的事件“发布/订阅”库是[Postal.js](https://github.com/postaljs/postal.js)。
# 6、Mixin #
在修饰器的基础上，可以实现Mixin模式。所谓Mixin模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。

