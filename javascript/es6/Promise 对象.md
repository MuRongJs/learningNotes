# 1. Promise 的含义 #
Promise是异步编程的一种解决方案，Promise提供统一的API，使异步事件变得可控。

Promise对象有两个特点：

	1.Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）；异步操作只有一种状态。
	2.Promise状态一旦改变，就不会再改变。Promise状态有两种改变：（1）pending到fulfilled；（2）pending到rejected。只要有这两种改变，状态就会凝固（resolved“已定型”），这时候你再向Promise对象添加回调函数，会立即执行，这与事件（event）完全不同。
# 2. 基本用法 #
Promise是一个构造函数，能创建一个Promise实例，创建Promise实例的时候接受一个函数为参数，该函数有两个参数：（resolve、rejected为javascript引擎自带的）。这两个参数分别的作用为：

    （1）resolve是将Promise对象状态由pending转为fulfilled;
     (2)rejected是将Promise对象状态由pending转为rejected。
<pre>
//创建一个Promise实例
let asyncFun = new Promise(function(resovle, reject){
    if(){//成功
        resovle(val);
    }else{//失败
        rejected(err);
    }
})
//Promise实例两种状态下then方法的处理
asyncFun.then(function(val){
    //当前Promise为fulfilled时当回调函数，可以取resovle传过来的参数。
    
},function(err){
    //当前Promise为rejected时当回调函数，可以取rejected传过来的参数
    
})
</pre>
Promise实例生成以后，用then方法可以指定resolve和rejected两种状态的回调函数，then方法接受两个回调函数参数。

    （1）第一个回调函数参数是resolve状态的回调函数；
    （2）第二个回调函数参数是rejected状态的回调函数；
    
当Promise实例中当resolve函数中参数是别的Promise实例时，then方法的对象就是参数的实例。rejected无。
<pre>
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2.then(result => console.log(result),err=> console.log(err))
</pre>

**then方法是当前同步程序执行完后执行的。比setTimeout(function(){},0)还要提前执行**
# 3. Promise.prototype.then() #
then方法主要是接受两个回调函数（已成功、已失败），当Promise对象状态改变的时候进行来调用。它可以返回一个新的Promise对象，这样可以链式写法，then后面还有then...
# [4. Promise.prototype.catch()](http://es6.ruanyifeng.com/#docs/promise#Promise-prototype-catch) #
Promise.prototype.catch()是 .then(null, rejected) 的别名。

在需要设置rejected回调函数的时候，最好以Promise.prototype.catch()方法。
# 5. Promise.prototype.finally() #
Promise.prototype.finally()方法是在Promise对象无论什么状态，最后都执行的。finally是then方法都特例。
<pre>
promise
.finally(function(){
//..执行

})

//等同于(finally的特例)
promise
.then(
    result => {
        return result;
    },
    err => {
        return err;
    }
)

//finally的实现
Promise.prototype.finally = function(callback){
    let p = this.construct;
    return this.then(
        val => p.resovle(callback()).then(()=> return val;),
        err => p.resovle(callback()).then(()=> {throw err})
    )
}
</pre>
finally总会返回原来的值。
# [6. Promise.prototype.all()](http://es6.ruanyifeng.com/#docs/promise#Promise-all) #
Promise.all方法接受具有Iterator接口的对象作为参数，且每个成员都是Promise实例。Promise.all方法将包装成新的Promise实例，参数对新实例的影响：
    
    1.参数中的每个Promise对象，都为fulfilled，新实例的状态才为fulfilled。每个参数中的Promise返回值会以数组的形式返回给新实例。
    2.参数中的某个Promise对象，为rejected，新实例的状态为rejected，并把rejected返回值返回给Promise。
    3.参数中的Promise对象设置来catch方法时，不会调用新实例中的catch方法。
# 7. Promise.race() #
Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

参数对象中某个参数不是Promise实例时，会先用Promise.resolve将参数转为Promise实例。

# 8. Promise.resolve() #
Promise.resolve函数是将参数转换为Promise对象。具体的转换有以下四种：
### （1） 参数为一个Promise实例 ###
resolve函数会不进行修改，原封不动的返回这个实例。
### （2） 参数是一个thenable对象 ###
thenable对象指的是具有then方法的对象，比如下面这个对象。
<pre>
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
</pre>
Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
### (3) 参数不是具有then方法的对象，或根本就不是对象 ###
如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
### (4) 不带有任何参数 ###
Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

**setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行**
# 9. Promise.reject() #
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数