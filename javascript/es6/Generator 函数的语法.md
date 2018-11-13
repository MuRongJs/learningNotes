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
 # 4、Generator.prototype.throw() #
 