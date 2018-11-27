#jQuery的链式调用
链式调用可以理解为，每个函数为一个"操作"，需要什么"操作"就调用并返回"操作"之后的"结果"，并能连续调用多个"操作"。实现代码类似以下：

    (function(){ 
        var JQuery = function(sel){
            var idDom = document.getElementById(sel);
            this.elements = idDom;
            return this;
        }
        JQuery.prototype = {
            show: function(){
                this.elements.style = "display:block";
                return this;
            },
            hidden: function(){
                this.elements.style = "display:none";
                return this;
            }
        }
        window.$ = function(selDom){
            return new JQuery(selDom);
        }
    })()
#_.chain、chainResult的链式调用
在上面的JQuery中返回this来支持链式写法，方便链式调用。而underscore则用来函数(_.chain、chainResult)来返回的 _(obj) 实例对象支持链式写法。

    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };
    _.chain(obj);   //{_chain: true,_wrapped: obj}
    _(obj).chain();  //{_chain: true,_wrapped: obj}
__.chain(obj)等同于_(obj).chain();两者都返回一个 _(obj) 实例对象。并添加了 _chain属性，true时进行链式调用。

    var chainResult = function (instance, obj) {
        return instance._chain ? _(obj).chain() : obj;
    };
chainResult函数的作用犹如JQuery返回的this。

当 _(obj) 实例对象的 _chain属性不为true时，直接返回没有包装前的obj;为true时，返回 _(obj).chain()执行过后的 _ 实例对象{ _chain:true, _wapper:obj}，从而调用 _.prototype上的方法。
    
    _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
              var args = [this._wrapped];
              push.apply(args, arguments);
              return chainResult(this, func.apply(_, args));
            };
        });
        return _;
     };
     _.mixin(_);
当 _ 函数对象每个方法都加在 _.prototype原型上时都添加返回chainResult函数，这时如果有 _chain 属性为true就能进行链式调用。

**链式调用调用的时_.prototype对象上的方法**

#cb、optimizeCb 函数。
cb函数源码：

    var cb = function(value, context, argCount) {
        if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
        return _.property(value);
     };
value：function、object、基本类型。

context：执行cd回调函数的上下文。

argCount：optimizeCb函数中的不同情况处理。

    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    
    _.iteratee = builtinIteratee = function(value, context) {
        return cb(value, context, Infinity);
      };
_.iteratee函数被自定义时，直接返回自定义的函数。

    if (value == null) return _.identity;
    
    _.identity = function(value) {
        return value;
    };
当value为null时返回直接返回_.identity函数。

    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    
    