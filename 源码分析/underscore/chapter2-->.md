#underscore的全局对象挂载
在全局只挂载一个变量对象，对这个变量对象进行操作，这样可以避免全局变量污染。

    (function(){
        var root = typeof self == 'object' && self.self === self && self ||
                   typeof global == 'object' && global.global === global && global ||
                   this ||
                   {};
    })()
获取各个不同的运行环境的全局对象，然后挂载给root
##浏览器／web worker环境中的全局对象

    typeof self == 'object' && self.self === self && self 
通过浏览器端的全局对象window的属性self，来获取浏览器端的全局对象：window.self === window;或者通过web worker环境中全局对象self来获取。

#####web worker
>在 Web Worker 标准中，定义了解决客户端 JavaScript 无法多线程的问题。其中定义的 “worker” 是指执行代码的并行过程。不过，Web Worker 处在一个自包含的执行环境中，无法访问 Window 对象和 Document 对象，和主线程之间的通信业只能通过异步消息传递机制来实现。

[冴羽的web worker的demo](https://github.com/mqyqingfeng/Blog/tree/master/demos/web-worker)

多线程并发时，web worker执行环境与window执行环境不同，因而全局对象不同。
##node环境下的全局对象
    typeof global == 'object' && global.global === global && global 
##些许node的vm模块的全局对象
    this
this是在node环境中vm模块中的全局变量。[冴羽的node vm中获取全局对象的demo](https://github.com/mqyqingfeng/Blog/blob/master/demos/node-vm/index.js)
##微信小程序中的全局对象
    
    {}
由于以上全局对象都不能获取，{}就成为小程序的全局对象。
