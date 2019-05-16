**[中文api](https://www.css88.com/doc/underscore)**

javascript可以进行函数式编程，支持高阶函数和闭包，而underscore提供了一系列的函数式接口。

# 集合(collections) #
underscore为集合类(Array、Object)提供一致的接口。

## map/filter ##
可以作用于Object，与Array中的map、filter方法类似。传入参数中的函数形式为function(val, key)
<pre>
var obj = {
    name:"小白",
    age:"23",
    addr:"beijing"
}
var objMap = _.map(obj , function(val, key){
    return val+key;
})
console.log(objMap);//["小白name", "23age", "beijingaddr"]
var objFil = _.filter(obj, function (val) {
    return val !== '小白';
})
console.log(objFil);//["23", "beijing"]
var objMapObj = _.mapObject(obj, function (val) {
    return val !== '小白';
})
console.log(objMapObj);//{name: false, age: true, addr: true}
</pre>
## every/some ##
_.every当所有条件满足时返回true，_.some当条件满足一条时返回true。
<pre>
var obj = {
    name:"小白",
    age:"23",
    addr:"beijing"
}
var objEvery = _.every(obj, function (val) {
    return val === "23";
})
console.log(objEvery);//false

var objSome = _.some(obj, function (val) {
    return val === "23";
})
console.log(objSome);//true
</pre>
## max/min ##
返回集合中当最大最小值，如果集合时object，只考虑value值。
<pre>
var arr = [0,3,4,23,4,5,7,4,7,6,"245",23];
var arrMax = _.max(arr);
console.log(typeof arrMax === "string");//true
console.log(arrMax);//245

var arrMin = _.min(arr);
console.log(arrMin);//0
</pre>
传入当数组或者对象参数时需要判断是否空。字符串会转换
## groupBy ##
集合按照value分类。
<pre>
var arr = [0,3,4,23,4,5,7,4,7,6,"245",23];
var arrGroup = _.groupBy(arr, function (val) {
    if(val < 10){
        return "小于十";
    }else if(val < 50){
        return "小于五十";
    }else if(val < 500){
        return "小于五百";
    }
})
console.log(arrGroup);//{小于十:[0, 3, 4, 4, 5, 7, 4, 7, 6], 小于五十:[23, 23], 小于五百:["245"]}
</pre>
## shuffle/sample ##
shuffle用洗牌算法随机打乱一个集合。sample随机选择一个或多个元素(个数是自己设置，默认一个)。
<pre>
var arr = [0,3,4,23,4,5,7,4,7,6,"245",23];
var arrShuffle = _.shuffle(arr);
console.log(arrShuffle);//打乱的数组

var arrSample = _.sample(arr, n);
console.log(arrSample);//随机取n个arr中的数
</pre>
# Arrays(数组) #
更多工具函数。
## first/last ##
取数组中第一个、最后一个元素。
<pre>
var arr = [0,3,4,23,4,5,7,4,7,6,"245",23];
var arrFirst = _.first(arr);//0
var arrLast = _.last(arr);//23
</pre>
## flatten ##
让多维数组，变成一维数组。
<pre>
var arr = [[1,2,3,4],[[[43],323,32],2345],324];
var arrFlatten = _.flatten(arr);//[1, 2, 3, 4, 43, 323, 32, 2345, 324]
</pre>
## zip/unzip ##
zip将传入的多个数组参数，按照索引进行合并。unzip则是相反
<pre>
var names = ['Adam', 'Lisa', 'Bart'];
var scores = [85, 92, 59];
_.zip(names, scores);// [['Adam', 85], ['Lisa', 92], ['Bart', 59]]

var namesAndScores = [['Adam', 85], ['Lisa', 92], ['Bart', 59]];
_.unzip(namesAndScores);// [['Adam', 'Lisa', 'Bart'], [85, 92, 59]]
</pre>
## object ##
object与zip函数相似，将传入的两个数组参数按照索引合并为对象。
<pre>
var names = ['Adam', 'Lisa', 'Bart'];
var scores = [85, 92, 59];
_.object(names, scores);// {Adam: 85, Lisa: 92, Bart: 59}
</pre>
# range #
生成一个有规律的序列。
<pre>
_.range(1, 10)//大于1，小于10，步长为1
_.range(1, 10, 2)//大于1，小于10，步长为2
</pre>
# Functions(函数) #
## bind ##
bind方法用于将目标函数绑定到目标对象上。
<pre>
var str = "hi  ",str1 = "hiii   ";
var trim = str.trim;
var str1Trim = _.bind(trim, str1);
str1Trim();//"hiii";
//也可以写为
Function.prototype.apply.call(trim, str1);
</pre>
## partial ##
partial方法是将目标函数中到某个参数固定，可以用"_"占位符来替换不需要固定的参数。
<pre>
var objTem = _.partial(_.object, ["name", "age", "addr"]);
objTem(["小白", "23", "beijing"]);//{name: "小白", age: "23", addr: "beijing"}
</pre>
## memoize ## 
_.memoize(function, [hashFunction]) 如果传递了 hashFunction 参数，就用 hashFunction 的返回值作为key存储函数的计算结果。memoize将函数执行结果缓存下来。
<pre>
var fibonacci = _.memoize(function(n) {
  return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
});
fibonacci(10)//将fibonacci参数10以内的结果都缓存下来
</pre>
## once ##
once函数保证某个函数仅执行一次。
<pre>
var register = _.once(function () {
    alert('Register ok!');
});
register();
register();
register();
</pre>
# Objects #
## key/allkeys ##
key返回实例对象自身的key;allkeys返回原型链继承的属性的和自身的所有属性。
## values ##
values返回对象自身不包含原型链上的所有值。
## mapObject ##
是对象的map版本
## invert ##
将对象中的key-value交换。
<pre>
var obj = {
    Adam: 90,
    Lisa: 85,
    Bart: 59
};
_.invert(obj); // { '59': 'Bart', '85': 'Lisa', '90': 'Adam' }
</pre>
# 链式语法(Chaining) #
<pre>
var lyrics = [
  {line: 1, words: "I'm a lumberjack and I'm okay"},
  {line: 2, words: "I sleep all night and I work all day"},
  {line: 3, words: "He's a lumberjack and he's okay"},
  {line: 4, words: "He sleeps all night and he works all day"}
];

_.chain(lyrics)
  .map(function(line) { return line.words.split(' '); })
  .flatten()
  .reduce(function(counts, word) {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
  }, {})
  .value();

=> {lumberjack: 2, all: 4, night: 2 ... }
</pre>