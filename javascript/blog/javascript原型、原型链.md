# 原型、原型链
**每个函数都会有prototype属性**

![](https://github.com/MuRongJs/learningNotes/images/javaScript原型_原型链.png)

关于实例对象与原型的关系，两者为委托关系，并没有拷贝原型上的属性，只是在两者创建了练习，产生了原型链。

# 词法作用域和动态作用域
词法作用域是定义函数的时候就决定了。动态作用域是函数在调用的时候决定的。
```var scope = "global scope";
   function checkscope(){
       var scope = "local scope";
       function f(){
           return scope;
       }
       return f();
   }
   checkscope();
   
   var scope = "global scope";
   function checkscope(){
       var scope = "local scope";
       function f(){
           return scope;
       }
       return f;
   }
   checkscope()();
```
> JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。
# 执行上下文栈(Execution context stack)
