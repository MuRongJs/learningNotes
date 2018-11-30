[冴羽underscore 系列之如何写自己的 underscore](https://github.com/mqyqingfeng/Blog/issues/56)
# underscore的全局对象挂载
在全局只挂载一个变量对象，对这个变量对象进行操作，这样可以避免全局变量污染。

    (function(){
        var root = typeof self == 'object' && self.self === self && self ||
                   typeof global == 'object' && global.global === global && global ||
                   this ||
                   {};
    })()
获取各个不同的运行环境的全局对象，然后挂载给root
## 浏览器／web worker环境中的全局对象

    typeof self == 'object' && self.self === self && self 
通过浏览器端的全局对象window的属性self，来获取浏览器端的全局对象：window.self === window;或者通过web worker环境中全局对象self来获取。

##### web worker
>在 Web Worker 标准中，定义了解决客户端 JavaScript 无法多线程的问题。其中定义的 “worker” 是指执行代码的并行过程。不过，Web Worker 处在一个自包含的执行环境中，无法访问 Window 对象和 Document 对象，和主线程之间的通信业只能通过异步消息传递机制来实现。

[冴羽的web worker的demo](https://github.com/mqyqingfeng/Blog/tree/master/demos/web-worker)

多线程并发时，web worker执行环境与window执行环境不同，因而全局对象不同。
## node环境下的全局对象
    typeof global == 'object' && global.global === global && global 
## 些许node的vm模块的全局对象
    this
this是在node环境中vm模块中的全局变量。[冴羽的node vm中获取全局对象的demo](https://github.com/mqyqingfeng/Blog/blob/master/demos/node-vm/index.js)
## 微信小程序中的全局对象
    
    {}
由于以上全局对象都不能获取，{}就成为小程序的全局对象。
# _ 函数对象
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
      };
_ 函数对象是核心函数，可以通过函数编程的思想进行调用，也可以通过面向对象的形式调用。

    _([1,2,3,4,5]).each(alert)  //面向对象形式，调用的是 _ 函数原型对象上定义的函数。
    _.each([1,2,3,4,5], alert)  //函数编程，调用的是 _ 函数对象上的定义的函数。
## 分析 _ 函数
#### _ 面向对象形式调用
1.obj是 _ 的实例对象，是返回obj。

2.(调用 _ 的对象)不是 _ 的实例对象，执行new _(obj)。

3.创建的一个新的 _ 实例对象，执行到this.wrapped = obj。将传入到obj参数保存在新实例的_wrapped属性上。
### 函数编程形式调用
直接执行 _ 函数对象上挂载的函数。

# mixin函数
为了通过两种不同形式的调用，当用面向对象形式调用是我们需要在 _.prototype上添加 _ 函数对象定义的函数。

    _.functions = function(obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
    _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
              var args = [this._wrapped];
              push.apply(args, arguments);
              return chainResult(this, func.apply(_, args));
            };
        });
        return _;
     };
     _.mixin(_);

首先将 _ 函数对象定义的函数名获取到，再遍历添加到 _.prototype对象上，再定义在 _.prototype对象上的函数。

    var each = _.each
    _([1,2,3,4,5]).each(alert) 等价 each.call(_, [1,2,3,4,5], alert);
**chainResult函数为实现链式写法**
# 导出
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
将自执行函数定义的 _ 局部变量暴露给全局对象的 _  属性上。
