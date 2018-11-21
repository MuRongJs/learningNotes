# [1、概述](http://es6.ruanyifeng.com/#docs/module#%E6%A6%82%E8%BF%B0) #
es6的模块加载称为"编译时加载"或者静态加载，即在编译时就完成的模块加载。

ES6 模块还有以下好处。

    1、就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。
    2、不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
    3、将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
    4、不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供
# [2、严格模式](http://es6.ruanyifeng.com/#docs/module#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F) #
# 3、export命令 #
export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

    1、export命令除了输出变量，还可以输出函数或类（class）。
    2、可以使用as关键字重命名。
    3、export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
    4、export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
    5、export／import命令可以出现在模块的任何位置，只要处于模块顶层就可以。
export的写法
<pre>
export var a = "1111";

export function foo(){};

var a = "1111";
function foo(){};
export {a,foo};
export {a as one, foo as fun};
</pre>
# 4、import命令 #
import命令接受一对大括号，里面指定要从其他模块倒入的变量名。必须要与导入模块中对外的接口名称相同。

可以通过as关键字重新命名接入的接口名。

import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

import语句会执行所加载的模块。import 'lodash';代码仅仅执行lodash模块，但是不输入任何值。
# 5、模块的整体加载 #
使用 "*"指定一个变量，所有导入的接口都加载在这个变量对象上。
# [6、export default 命令](http://es6.ruanyifeng.com/#docs/module#export-default-%E5%91%BD%E4%BB%A4) # 
export default命令是模块默认输出，一个模块只有一个默认输入，也可以理解为输入一个default的变量和方法。

import命令语句可以同时输入默认方法和其他接口。
<pre>
import _,{xx,xx,xx} from '模块'
</pre>
其中不再大括号的项是默认的输入方法。
# [7、export 和 import的复合写法](http://es6.ruanyifeng.com/#docs/module#export-%E4%B8%8E-import-%E7%9A%84%E5%A4%8D%E5%90%88%E5%86%99%E6%B3%95) #
<pre>
//例一
    export {foo,bar} from "module";
    //等同于
    import {foo,bar} from "module";
    export {foo,bar};
    
    //接口改名
    export {foo as newFoo} from "module";
    //等同于
    import foo from "module";
    export {foo as newFoo};
    
    //整体输出
    export * from "module";
    
    //默认接口
    export {default} from "module";
    
    //具名接口改为默认接口的写法如下。
    export { es6 as default } from './someModule';
    // 等同于
    import { es6 } from './someModule';
    export default es6;

    //默认接口也可以改名为具名接口。
    export { default as es6 } from './someModule';
    
//例二
    //下面三种import语句，没有对应的复合写法。
    import * as someIdentifier from "someModule";
    import someIdentifier from "someModule";
    import someIdentifier, { namedIdentifier } from "someModule";
    //为了做到形式的对称，现在有提案，提出补上这三种复合写法。
    export * as someIdentifier from "someModule";
    export someIdentifier from "someModule";
    export someIdentifier, { namedIdentifier } from "someModule";
</pre>
# 8、模块的继承 #
模块的继承
<pre>
//A_module
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}

//B_module
import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
</pre>
A模块定义类自己的接口并返回circle模块的所有接口（不包括默认接口），B模块可以即用到A模块的接口也可以用到circle模块的接口。
# [9、跨模块常量](http://es6.ruanyifeng.com/#docs/module#%E8%B7%A8%E6%A8%A1%E5%9D%97%E5%B8%B8%E9%87%8F) #
跨模块常量，当常量需要多个模块共享的时候，可以创建常量模块，需要常量时进行加载。
# [10、import()](http://es6.ruanyifeng.com/#docs/module#import) #
import()返回一个 Promise 对象。

    1.import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。
    2.没有静态连接关系，这点也是与import语句不相同。
    
### 适用场合 ###
    1.按需加载。
    2.条件加载
    3.动态的模块路径
### [注意点](http://es6.ruanyifeng.com/#docs/module#%E6%B3%A8%E6%84%8F%E7%82%B9) ###
可以参考的写法。

    

