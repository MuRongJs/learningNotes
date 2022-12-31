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