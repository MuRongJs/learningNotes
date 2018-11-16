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
# 3、Generator 函数 #
### 协程的 Generator 函数实现 ###
Generator函数是协程在es6的实现，特点是可以交出函数的执行权。

    1.执行Generator函数会返回一个内部指针对象（遍历器）.
    2.调用指针对象的next方法，会移动内部指针，指向下个遇见yield语句，并执行yield语句前的代码。
    3.调用next方法，会返回一个对象，表示当前阶段的信息（value属性和done属性）。
    4.value属性是yield语句后面表达式的值，表示当前阶段的值；done属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。
### [Generator 函数的数据交换和错误处理](http://es6.ruanyifeng.com/#docs/generator-async#Generator-%E5%87%BD%E6%95%B0%E7%9A%84%E6%95%B0%E6%8D%AE%E4%BA%A4%E6%8D%A2%E5%92%8C%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86) ###

出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。
# 4、Thunk 函数 #
### 参数的求值策略 ###
    1.传值调用--->>进入函数体时参数就已经计算完了。
    2.传名调用--->>直接将参数的表达式传入。
### Thunk 函数的含义 ###
编译器"传名调用"的实现，往往是将参数放到一个临时函数中，再将这个临时函数传入函数体。这个临时函数就叫做Thunk函数。
<pre>
var x = 3;
function foo(m){
    return m * 2;
}
foo(x + 5);

//等同于
var x = 3;
function thunk(){
    return x + 5;
}
function foo(thunk){
    return thunk() * 2;
}
</pre>
函数 foo 的参数x + 5被一个函数替换了。凡是用到原参数的地方，对Thunk函数求值即可。
### javascirpt 语言的 Thunk 函数 ###


