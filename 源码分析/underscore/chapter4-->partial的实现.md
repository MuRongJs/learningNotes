# partial函数的定义
**元是指函数的参数，有n参数就是n元函数**
##### es6实现的partial函数，分析
partial是固定函数的一个或者多个参数，也就是将n元函数转换成一个n-x函数。

    function partial(fn, ...partialArgs){
        return function(...args){
            args = args.concat(partialArgs);
            return fn.apply(this, args);
        }
    }
    fucntion add(a, b, c){
        return a+b+c;
    }
    var addOne = partial(add, 1);
    addOne(2, 3);//6
>[冴羽es6实现的partial函数](https://github.com/mqyqingfeng/Blog/issues/60)

 partial函数会传递一个函数和要固定的参数，返回一个固定了参数的函数表达式。上面代码固定了add函数的第一个参数为1。
# underscore中的partial函数实现
    var restArguments = function(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
            var length = Math.max(arguments.length - startIndex, 0),
                rest = Array(length),
                index = 0;
    
            for (; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
    
            // 增加的部分
            switch (startIndex) {
                case 0:
                    return func.call(this, rest);
                case 1:
                    return func.call(this, arguments[0], rest);
                case 2:
                    return func.call(this, arguments[0], arguments[1], rest);
            }
    
            var args = Array(startIndex + 1);
            for (index = 0; index < startIndex; index++) {
                args[index] = arguments[index];
            }
    
            args[startIndex] = rest;
            return func.apply(this, args);
        };
    };
    _.partial = restArguments(function(func, boundArgs) {
        var placeholder = _.partial.placeholder;
        var bound = function() {
            var position = 0, length = boundArgs.length;
            var args = Array(length);
            for (var i = 0; i < length; i++) {
                args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
            }
            while (position < arguments.length) args.push(arguments[position++]);
            return executeBound(func, bound, this, this, args);
        };
        return bound;
    });
## restArguments函数
restArgs函数代替了es6写法中的 ... 符号，并添加了可以指定从参数的某个索引开始固定。
##### 当restArguments函数传入函数和（参数的开始固定的索引值）时，返回一个偏函数。
    
    function add(a, b, c, d){
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
    }
    var fixFun = restArguments(add,3);
    fixFun(1, 2, 3, 4, 5);//参数中第三个索引位起固定，所以传递给add函数的参数为(1, 2, 3, [4, 5])
    
    var fixFun = restArguments(add,2);
    fixFun(1, 2, 3, 4, 5);//参数中第三个索引位起固定，所以传递给add函数的参数为(1, 2, [3, 4, 5])
## _.partial函数
    function add(a, b, c) {
        return a + b + c;
    }

    _.partial = restArguments(function firstTargetFun(func, boundArgs){});//源代码变型，举个栗子
    _.partial(add, 1, 2) // 相当于 firstTargetFun.apply(add, 1, 2);
    
    var addThree = _.partial(add, 1, 2);//返回bound函数。
    addThree(3);//6
由上面代码，可以看出_.partial固定了两个参数，将add 三元函数转换为一个一元函数。
