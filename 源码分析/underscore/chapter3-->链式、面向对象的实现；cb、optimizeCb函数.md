# jQuery的链式调用
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
# _.chain、chainResult的链式调用
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

# cb、optimizeCb 函数。
建议和_.map方法断点调试。

cb函数为不同状态，返回要执行的函数。cb函数源码：

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

#### 状态一：_.iteratee函数被自定义时，cb直接返回自定义的函数。

    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    
    _.iteratee = builtinIteratee = function(value, context) {
        return cb(value, context, Infinity);
      };
#### 状态二：当value为null时cb返回_.identity函数。

    if (value == null) return _.identity;
    
    _.identity = function(value) {
        return value;
    };
#### 状态三：当value为fucntion时cb返回optimizeCb函数的返回值。

    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    
    var optimizeCb = function(func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
          case 1: return function(value) {
            return func.call(context, value);
          };
          // The 2-argument case is omitted because we’re not using it.
          case 3: return function(value, index, collection) {
            return func.call(context, value, index, collection);
          };
          case 4: return function(accumulator, value, index, collection) {
            return func.call(context, accumulator, value, index, collection);
          };
        }
        return function() {
          return func.apply(context, arguments);
        };
      };
###### (1)当context没有指定，返回value函数，不指定context。

###### (2)当context指定了，argCount默认为3，也可以自定义为（1，3，4）。
    
    //argCount为1时，optimizeCb返回：
    function（value）{
        return func.call(context, value);
    }
    
    //argCount为3时，optimizeCb返回：
    function(value, index, collection) {
        return func.call(context, value, index, collection);
    };
    
    //argCount为4时，optimizeCb返回：
    function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
    };
    
    //argCount不为上面的任何选项时，optimizeCb返回：
    function() {
      return func.apply(context, arguments);
    };
#### 状态四：当value值为object并且不为Array时，返回_.matcher函数的返回值。
    
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    
    _.matcher = function(attrs) {
        attrs = _.extend({}, attrs);
        return function(obj) {
          return _.isMatch(obj, attrs);
        };
    };
    
    _.isMatch = function(object, attrs) {
        var keys = _.keys(attrs), length = keys.length;
        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
          var key = keys[i];
          if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };
#### 状态五：value为基本类型、数组时，返回_.property函数的返回值。
这时value为path(路径)，路径为查找obj对象中某个属性的路径如：obj.shap.circle.area --> obj , ["shap", "circle", "area"]

    _.property = function(path) {
        // 如果不是数组
        if (!_.isArray(path)) {
          return shallowProperty(path);
        }
        return function(obj) {
            return deepGet(obj, path);
        };
    };
    
    var shallowProperty = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    };
    
    // 根据路径取出深层次的值
    var deepGet = function(obj, path) {
        var length = path.length;
        for (var i = 0; i < length; i++) {
            if (obj == null) return void 0;
            obj = obj[path[i]];
        }
        return length ? obj : void 0;
    };
   