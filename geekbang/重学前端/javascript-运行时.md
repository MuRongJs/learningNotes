# 类型转换
类型在运行时与定义时，都或多或少的有不同的类型转换。
## 装箱操作
* 在基本类型上能调用方法，是在使用“.”运算符时提供了装箱操作，给基本类型构造一个临时对象。
* 每个基本类型都有对应的类对象，装箱操作时是对基本类型转换为对应的对象。
* call方法也是装箱操作的一种实践。
* typeof主要作用还是区分基本类型和对象类型。
* 每个装箱对象，都有私有类型class，通过Object.prototype.toString()可以检测唯一类型描述，比instanceOf更精准
## 拆箱转换
* 拆箱操作指的是将对象类型转换为基本类型。
* 拆箱操作主要规格为ecma 中的 ToPrimitive(input[,preferredType]),如果有传入类型或者规则，则优先进行转换为数字或者字符串
* es6之后可以修改默认toPrimitive函数o[symbol.toPrimitive],可以修该默认的拆箱操作
例子：对对象原型链上的valueOf()、toString()进行改造，当进行拆箱操作的时候加法规则使得先调用valueOf规则。
`
    var o ={
        valueOf : () =>{return "world!"},
        toString : () => {return "xueLing!"}
    };
    console.log("hello " + o);
    //hello world!
`
# javaScript对象
## 对象的特点
* 有唯一标识
* 有状态
* 有行为
javascript中有唯一的标识，但是状态和行为统一定义为了属性。
## 属性
* 属性类型
    * 普通属性
        * 描述属性 writable、value、enumerable、configurable
    * 访问器属性
        * 描述属性 getter、setter、enumerable、configurable