## 高阶函数

**封装**
```js
function core(a,b,c){
    console.log(a,b,c);
    console.log('core');
}

Function.prototype.before = function (beforeFn){
    return (...args) => {
        beforeFn();
        this(...args);
    }
}
let newCore = core.before(() => {
    console.log('core before.....');
})
newCore(1,2,3)
```

* 传入参数为函数；返回一个函数
* 箭头函数（没有this、arguments、prototype）
* 偏函数（每次入参数量不一定）、柯里化(每次入参是一个参数)
* 闭包： 定义函数的作用域和调用的作用域不是同一个
* typeOf（判断类型，不能区分对象）、constructor、instanceof、Object.prototype.tostring.call()



### 柯里化

**依次传参**
```js
const curring = (fn, arr = []) => {
    let len = fn.length;
    return function(...arges){
        let newArges = [...arr, ...arges];
        if(newArges.length == len){
            return fn(...newArges);
        }else{
            return curring(fn, ...newArges);
        }
    }
}

function isType(type, val){
    return Object.prototype.toString.call(val) === `[object ${type}]`
}

let typeArr = ['String', 'Number', 'Boolean', 'Null', 'Undefined', 'Symbol', 'Function', 'Object', 'Array'];
let utils = {};
typeArr.forEach(item => {
    utils['is' + item] = curring(isType, [item]);
})

console.log(utils);
console.log(utils.isString('aaaa'));
console.log(utils.isString(1111));
console.log(utils.isNumber(1111));
console.log(utils.isNumber('aaaa'));
```



### 工厂函数

> 返回实例

### 异步请求数据

**异步不能通过try catch进行捕获异常**

* fs模块返回的第一个参数是err
