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
## 类和原型
原型对象和类都是为了实现对象的继承实现的机制。

* 原型对象主要方法
    * 输出原型对象的：Object.getPropertyOf()
    * 设置原型对象：Object.setPropertyOf()
    * 根据原型创造对象：Object.create()
    * 混合目标对象的属性：Object.assign()
* class
`
    class son类 extends parent{
        static //静态方法、属性，只能通过类进行调用
        constructor //构造函数;内部能通过this关键字，在创建实例时实例化属性
        标识符 //在类内部顶层设置的变量，为实例中的实例化属性
        私有属性、方法 //提案用'#'关键字;或者通过在类外部声明函数,在类内部通过call方法调用。
        new.target // new.target返回构造函数的
        super //调用父类的构造函数
    }
    // 私有方法实现
    class Widget {
        foo (baz) {
            bar.call(this, baz);
        }
        // ...
    }

    function bar(baz) {
        return this.snaf = baz;
    }
`
## 对象分类
javascript中分宿主对象和内置对象。
* 宿主对象：浏览器中自带的对象
* 内置对象：javascript语言内部自带的对象。
#　CSS规则
* @规则
    * @chartset
    * @media
    * @import
    * @page
    * @counter-style
    * @key-frames
    * @fontface
    * @support
    * @namespace
    * @viewport
* 普通规则
    * 选择权
    * 声明列表
        * 属性
        * 值的类型
            * 字段
            * 函数
# 浏览器如何工作的
浏览器通过url调用网络请求线程>解析报文>生成DOM树>解析css生成css规则树>合并DOM树和CSS规则树生成rander树>布局rander（layout/reflow）