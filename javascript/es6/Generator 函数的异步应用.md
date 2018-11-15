# 1、异步编程的传统方法 #
ES6 诞生以前，异步编程大概有四种方法，例如：

    1.回调函数
    2.事件监听
    3.发布／订阅
    4.Promise对象
# 2、基本概念 #
### [异步](http://es6.ruanyifeng.com/#docs/generator-async#%E5%BC%82%E6%AD%A5) ###
### [回调函数](http://es6.ruanyifeng.com/#docs/generator-async#%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0) ###
就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。回调函数的英语名字callback，直译过来就是"重新调用"。
### [Promise](http://es6.ruanyifeng.com/#docs/generator-async#Promise) ###
Promise 对象就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。
# Generator函数 #


