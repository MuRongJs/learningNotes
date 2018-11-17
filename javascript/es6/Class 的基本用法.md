# [1、简介](http://es6.ruanyifeng.com/#docs/class#%E7%AE%80%E4%BB%8B) #
注意:

    1、定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。
    2、方法之间不需要逗号分隔，加了会报错。
    3、类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
    4、类的属性名，可以采用表达式。
ES6 的类，完全可以看作构造函数的另一种写法。
<pre>
class Point(){
    //...
}

typeof Point //function
Point === Point.prototype.constructor
</pre>
构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
<pre>
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
</pre>
Object.assign方法可以一次性添加多个属性给目标对象。
# 2、严格模式 #
类和模块的内部，默认就是严格模式。
# 3、constructor方法 #
constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
# [4、类的实例对象](http://es6.ruanyifeng.com/#docs/class#%E7%B1%BB%E7%9A%84%E5%AE%9E%E4%BE%8B%E5%AF%B9%E8%B1%A1) #
实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）
# 5、Class 表达式 #
<pre>
var myClass = class me{
    constructor(){
    
    }
}
</pre>
这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。

在Class表达式后面加上()可以立即执行并传参。
# 6、不存在变量提升 #
class声明的'类'是不会变量提升的。
# 7、私有方法和私有属性 #
### 现有方法 ###
使用symbol值成为私有方法方法名。
### 私有属性的提案 ###
    1.在属性名之前，使用#表示
    2.允许在类内部饮用私有属性，不能直接从实例引用私有属性。
# [8、this 的指向](http://es6.ruanyifeng.com/#docs/class#this-%E7%9A%84%E6%8C%87%E5%90%91) #
class类部的this指的类的实例。**一般方法中的this指向调用它的对象,但是以下方法中的this指向class创建的实例对象。**
<pre>
//例一
class myClass{
	constructor(){
		this.firstName = "c";
		this.printName = this.printName.bind(this);
	}
    printName(Sname){
		console.log(this.firstName + Sname);
	}
}
var m = new myClass()
m.printName("rl")//crl
let {printName} = m;
printName("rl")//crl
let obj={firstName:"x"};
printName.call(obj,"l");//chengl
m.firstName = "xue";
printName.call(obj,"l")//xuel
var m1 =new myClass();//{firstName: "cheng", printName: ƒ}
//例二
class myClass{
	constructor(){
		this.firstName = "c";   
		this.printName = (name)=>{	
            console.log(this.firstName + name);
		}
	}
}
//例三：使用Proxy，获取方法的时候，自动绑定this。
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
</pre>
# 9、name属性 #
name属性总是返回紧跟在class关键字后面的类名。
# 10、Class 的取值函数（getter）和存值函数（setter） #
在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

存值函数和取值函数是设置在属性的 Descriptor 对象上的。
<pre>
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
</pre>
# 11、[Class的Generator 的方法](http://es6.ruanyifeng.com/#docs/class#Class-的-Generator-方法) #
# 12、Class的静态方法 #
    1.类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
    2.类中的static关键字，表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    3.静态方法中的this关键字，这个this指的是类，而不是实例。
    4.静态方法可以与非静态方法重名。
    5.父类的静态方法，可以被子类继承。(可以从super对象上调用)；
 <pre>
 class Foo {
   static bar () {
     this.baz();
   }
   static baz () {
     console.log('hello');
   }
   baz () {
     console.log('world');
   }
 }
 
 Foo.bar()
 </pre>
 # 13、Class的静态属性和实例属性 #
 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
 <pre>
 //目前只有这样的写法能声明类的静态属性。
 class Foo {
 }
 
 Foo.prop = 1;
 Foo.prop // 1
 </pre>
有新的提案，[链接](http://es6.ruanyifeng.com/#docs/class#Class-%E7%9A%84%E9%9D%99%E6%80%81%E5%B1%9E%E6%80%A7%E5%92%8C%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)
# 14、new.target属性 #
ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如

    1、Class 内部调用new.target，返回当前 Class。(在函数外部，使用new.target会报错。)
    2、子类继承父类时，new.target会返回子类。(可以写出不能独立使用、必须继承后才能使用的类);
<pre>
// 例一
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}

var obj = new Square(3); // 输出 false
／／例二
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
</pre>
