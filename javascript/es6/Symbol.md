# 1、概述 #
1、Symbol是javascript语言中的第七种数据类型。

2、Symbol值是Symbol函数生成的，这样对象除了可以用字符串声明属性，还可以用新出的Symbol类型声明属性。这样就会独一无二，不会与其他属性名产生冲突。

3、Symbol函数前不能使用new命令，否者会报错。这是因为生成的Symbol是一个原始类型的值，不是对象，更像字符串类型的数据类型。

4、Symbol可以接受一个字符串作为参数，表示对Symbol实例的描述。参数只接受对Symbol值的描述，相同参数产生的Symbol实例是不相等的。

5、Symbol值不能与其他值进行运算，可以转化为boolean值，不能转化为数值。
# 2、作为属性名的Symbol #
	1、可以防止对象属性名同名。
	2、Symbol 值作为对象属性名时，不能用点运算符。
	3、在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
	不放在方括号中，该属性就会是一个字符串
	4、Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
	5、该属性还是公开属性，不是私有属性。
# 3、实例：消除魔术字符串 #
魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的**变量代替**。
<pre>
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = 5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
</pre>
上面代码中，字符串Triangle就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。
<pre>
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = 5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
</pre>
**适合对数据的处理。**

上面代码中，我们把Triangle写成shapeType对象的triangle属性，这样就消除了强耦合。

如果仔细分析，可以发现**shapeType.triangle等于哪个等于哪个值并不重要**，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。
<pre>
const shapeType = {
  triangle: Symbol()
};
</pre>
**这种方式适合，公共对象、函数调用。不适合对数据的处理。**
# 4、属性名的遍历 #
1、Symbol作为属性名，该属性不会出现在for...in,for...of循环中，也不会被不会被Object.keys()、Object.getOwnPropertpertyNames()、JSON.stringify()返回。

2、可以通过以通过Object.getOwnPropertpertySymbols方法，获取指定对象的Symbol属性名。返回包含所有Symbol成员属性的数组。

3、当需要返回所有类型的键名时，可以通过以通过Reflect.ownKeys()得到()得到。

4、也可以用Symbol值在对象中定义一些非私有，但是希望只用于内部的方法。
# 5、Symbol.for(),Symbol.keyFor()#
1、
1、Symbole.for()方法()方法会接受一个字符串作为参数，然后搜索有没有以此参数作为名称的Symbol值。如果有返回这个Symbol值，如果没有先新建并返回以该字符串为名词的Symbol值。

2、
2、Symbole.for()和S()和Symbol()区别，前者会被登记在全局，后者不会。前者会在创建的时候检查key是否已经存在，不存在才会新建这个值。后者没有登记机制，所以每次调用都会返回一个新值。

3、
3、Symbol.keyFor()方法()方法会返回一个**已登记的Symbol类型值的key**。
# [6、实例:模块的Singleton模式](http://es6.ruanyifeng.com/#docs/symbol#%E5%AE%9E%E4%BE%8B%EF%BC%9A%E6%A8%A1%E5%9D%97%E7%9A%84-Singleton-%E6%A8%A1%E5%BC%8F) #
Singleton模式指的是调用一个累,任何时候都返回同一个实例。
# 7、内置的Symbol值 #
#### Symbol.hasInstance #####
对象的对象的Symbol.hasInstance属性ce属性指向内部的一个方法，用来判断是否是该对象的实例。
**foo instanceof Foo 相当于 Foo[Symbol.hasInstance\](foo)** 
#### Symbol.isConcatSpreapreadable ####
对象的对象的Symbol.isConcatSpreapreadable属性是个布尔值，表示为被用于被用于Array.prototype.concat()时，是否可以展开。

	1.数组默认是展开的，Symbol.isConcatSpreapreadable属性为undefined；
	2.类似数组的对象默认是不展开的，只有Symbol.isConcatSpreapreadable为true时是展开的。

。

Symbol.isConcatSpreapreadable也可以定义在类里面。
####Symbol.species####
对象的对象的Symbol.species属性，指向一个构造函数。创建衍生对象的时，会使用该属性。

。

Symbol.species的作用在的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。