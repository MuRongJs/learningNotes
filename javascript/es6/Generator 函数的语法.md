# 1、简介 #
### 基本概念 ###
Generator是异步编程的一种解决方案。

(1)从语法方面理解Generator，它是一个状态机，封装了多个内部状态。执行Generator函数返回一个可以遍历的对象，内部有Generator函数封装的全部状态。

(2)从形式上看，它是一个声明时需要在function和函数名中间加一个" * "，内部可以使用yield关键字的函数。在执行Genertator函数时返回一个指向内部状态的指针对象。

总结：调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
### yield 表达式 ###
概念：Generator函数返回的可遍历对象，只有调用next方法才会遍历下一个内部状态，所以Generator函数提供了一种可以暂停执行的函数，yield表达式就是暂停标志。

Generator中的next方法运行步骤：

    1.遇到yield表达式，暂停执行后面的操作，并将yield表达式后面的值，以返回对象的value属性的属性值形式返回。
    2.调用next方法时接续执行，直到遇到下一个yield表达式。
    3.如果没有遇到yield表达式，就已知运行函数到结束，直到遇到return 。
    4.如果没有return，则返回对象的value属性值为undefined。
 Generator函数执行只会返回一个可以遍历的对象，但是不会不会执行内部的代码。
 
 **注意：1、yield表达式只能在Generator函数内部使用。2、如果需要在另一个表达式用到yield表达式，必须带圆括号**
### 与Iterator接口的关系 ###
 有[Symbol.iterator]方法的对象，该方法是对象的遍历器生成函数，该方法会返回该对象的遍历对象。
 
 Generator函数也是遍历器生成函数，因此将Generator函数赋值给对象的[Symbol.iterator]属性，对象就会具有iterator接口。
 
 **Generatro函数执行会返回一个可遍历的对象，该对象有[Symbol.iterator]接口，执行[Symbol.iterator]方法的时候会返回自己本身**
# 2、next方法的参数 #
 yield表达式本身没有返回值（返回undefined），如果在next中传入参数，这个参数可以当成上个yield表达式的返回值（第一个next参数被忽略）。
 
 **Generator函数从暂停状态到恢复运行，它的上下文（context）不变，通过next方法参数，可以在Generator函数不同阶段注入不同的值，进而调整函数行为**
 <pre>
 function* foo(){
    console.log('start');
    console.log(`'first' + ${yield}`);
    console.log(`'second' + ${yield}`);
    console.log('end');
 }
 var g = foo();
 g.next();//start
 g.next('1');//first1
 g.next('2');//second2
 g.next();//end
 </pre>
# 3、for...of循环 #
 自动遍历Generator函数生成的遍历对象，不需要调用next方法。
 
 遍历一个没有iterator接口的普通对象：
 <pre>
 function* entireObj(obj){
    var objKey = Reflect.ownKeys(obj);
    for(var key of objKey){
        yield [key, obj[key]];
    }
 }
 var obj = {
    name: "crl",
    age:"24",
    addr:"beijing"
 }
 for(var [key, val] of entireObj(obj)){
    console.log("键名:" + key);
    console.log("键值:" + val);
 }
 //等同于
 function* objectEntries() {
   let propKeys = Object.keys(this);
 
   for (let propKey of propKeys) {
     yield [propKey, this[propKey]];
   }
 }
 
 let jane = { first: 'Jane', last: 'Doe' };
 
 jane[Symbol.iterator] = objectEntries;
 </pre>
# [4、Generator.prototype.throw()](http://es6.ruanyifeng.com/#docs/generator#Generator-prototype-throw) #
 Generator函数返回的遍历器对象，有一个throw方法，可以在函数体外抛出错，在Generator函数体内捕获。
 
 如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。
 
 throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。
 
 throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
 
 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。
# 5、Generator.prototype.return() #
 Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
 
 如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。
 
<pre>
function* g(){
    yield 1;
    try{
        yield 2;
        yield 3;
    }finally{
        yield 4;
        yield 5;
    }
}
var i = g();
i.next();
i.next();
i.return('7');
i.next();
i.next();
</pre>
# [6、next()、throw()、return() 的共同点](http://es6.ruanyifeng.com/#docs/generator#next%E3%80%81throw%E3%80%81return-%E7%9A%84%E5%85%B1%E5%90%8C%E7%82%B9) #
next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。

next()是将yield表达式替换成一个值。

throw()是将yield表达式替换成一个throw语句。

return()是将yield表达式替换成一个return语句。
# 7、yield* 表达式 #
yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。

如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。
<pre>
function* concat(iter1, iter2) {
  yield* iter1;
  yield* iter2;
}

// 等同于

function* concat(iter1, iter2) {
  for (var value of iter1) {
    yield value;
  }
  for (var value of iter2) {
    yield value;
  }
}
</pre>
如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。
# 8、作为对象属性的Generator函数 # 
如果对象的属性是Generator函数，可以写成如下形式：
<pre>
obj = {
    myG:funciton*(){
        ..//
    }
}
//等同于
obj = {
    * myG(){
        ..//
    }
}
</pre>
# [9、Generator函数的this](http://es6.ruanyifeng.com/#docs/generator#Generator-%E5%87%BD%E6%95%B0%E7%9A%84this) #
Generator函数运行返回一个可遍历的对象，这个对象是Generator函数的实例，继承了Generator函数的prototype对象上的属性和方法。

但是由于Generatot函数不能使用new命令，所以在Generator函数内部的this上定义的属性并不能继承。于是就可以写成如下例子：
<pre>
//Generator函数运行产生的可遍历的对象，执行[Symbol.iterator]方法时返回的是本身。
function* g(){
    yield 1;
}
var gObj = g();
gObj[Symbol.iterator]() === gObj;

//怎样产生既是Generaotr函数的实例又继承了Generator函数内部this 的对象。
function* myGen(){
    this.a = "aaa";
    this.b = "bbb";
    yield "adf";
}
var f = myGen.call(myGen.prototype);
//等同于
function* myGen(){
    this.a = "aaa";
    this.b = "bbb";
    yield "adf";
}
function getMyGen(){
    return myGen.call(myGen.prototype);
}
var f = new getMyGen();
//也可以传参
</pre>
**Generator函数执行返回一个实例，但是Generator函数内部并没有执行，只有使用next方法时会执行内部代码，并且只执行到当前下个yield关键字之间的代码**
# 10、含义 #
### [Generator与状态机](http://es6.ruanyifeng.com/#docs/generator#Generator-%E4%B8%8E%E7%8A%B6%E6%80%81%E6%9C%BA) ###
Generator拥有状态信息（是否处于暂停状态）
### [Generator与协程](http://es6.ruanyifeng.com/#docs/generator#Generator-%E4%B8%8E%E5%8D%8F%E7%A8%8B) ###
协程是一种程序执行的方式，可以理解为"协作的线程"或"协作的函数"。

协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。

#### （1）协程和子例程的差异 ####
传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。

协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

从实现上看，在内存中，子例程只使用一个栈（stack），而协程是同时存在多个栈，但只有一个栈是在运行状态，也就是说，协程是以多占用内存为代价，实现多任务的并行。
#### (2) 协程与普通线程的差异 ####
协程适合用于多任务运行的环境。在这个意义上，它与普通的线程很相似，都有自己的执行上下文、可以分享全局变量。它们的不同之处在于，同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他协程都处于暂停状态。此外，普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。

由于 JavaScript 是单线程语言，只能保持一个调用栈。引入协程以后，每个任务可以保持自己的调用栈。这样做的最大好处，就是抛出错误的时候，可以找到原始的调用栈。不至于像异步操作的回调函数那样，一旦出错，原始的调用栈早就结束。

Generator 函数是 ES6 对协程的实现，但属于不完全实现。Generator 函数被称为“半协程”（semi-coroutine），意思是只有 Generator 函数的调用者，才能将程序的执行权还给 Generator 函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。

如果将 Generator 函数当作协程，完全可以将多个需要互相协作的任务写成 Generator 函数，它们之间使用yield表达式交换控制权。
### [Generator与上下文](http://es6.ruanyifeng.com/#docs/generator#Generator-%E4%B8%8E%E4%B8%8A%E4%B8%8B%E6%96%87) ###
JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（active）的上下文，由此形成一个上下文环境的堆栈（context stack）。

这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

Generator 函数不是这样，它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
# 11、应用 #
### [(1)异步操作的同步化表示](http://es6.ruanyifeng.com/#docs/generator#%EF%BC%881%EF%BC%89%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C%E7%9A%84%E5%90%8C%E6%AD%A5%E5%8C%96%E8%A1%A8%E8%BE%BE) ###
<pre>
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}

var it = main();
it.next();
</pre>
### [(2)控制流管理](http://es6.ruanyifeng.com/#docs/generator#%EF%BC%882%EF%BC%89%E6%8E%A7%E5%88%B6%E6%B5%81%E7%AE%A1%E7%90%86) ###
**同步执行下的控制流管理，例如：**
<pre>
function step1(){
    return "第一步：返回值可以传递给下一步";
}
function step2(){
    return "第二步：返回值可以传递给下一步";
}
function step3(){
    return "第三步：返回值可以传递给下一步";
}
function step4(){
    return "第四步：返回值可以传递给下一步";
}
//例一
function* gen(){
    var res1 = yield step1();
    console.log(res1);
    var res2 = yield step2();
    console.log(res2);
    var res3 = yield step3();
    console.log(res3);
    var res4 = yield step4();
    console.log(res4);
}
function runGen(genFunRes){
    var iterRes = genFunRes.next(genFunRes.value);//genFunRes.value 是Generator函数产生的迭代器对象，用户自定义的value值。
    if(!iterRes.done){
        genFunRes.value = iterRes.value;//iterRes.value 是迭代器对象next方法产生的对象。
        return runGen(genFunRes);
    }else{
        return;
    }
}
</pre>
### (3)部署Iterator接口 ###
### (4)作为数据结构 ### 
Generator可以看作是数据结构，准确的说是数组结构，它返回的值可以提供类似数据的接口。
<pre>
function* doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}
//上面的写法可以用数组模拟
function doStuff() {
  return [
    fs.readFile.bind(null, 'hello.txt'),
    fs.readFile.bind(null, 'world.txt'),
    fs.readFile.bind(null, 'and-such.txt')
  ];
}
</pre>