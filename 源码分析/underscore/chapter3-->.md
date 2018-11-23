#jQuery的链式调用
链式调用可以理解为，每个函数为一个"操作"，需要什么"操作"就调用并返回"操作"之后的"结果"。实现代码类似以下：

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
#_.chain
    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };