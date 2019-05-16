# noConflict
    var previousUnderscore = root._ ;//预先保存全局变量。
    
    _.noConflict = function(){
        root._ = previousUnderscore;
        return this;
    }
    
为了避免与全局变量的冲突，提供了_.noConflict函数，可以重新指定全局变量，并将之前的 _ 变量重新恢复为原来的值。

    //在全局变量中
    var $ = _.noConflict();
# _.constant
    _.constant = function(value){
        return function(){
            return value;
        }
    }
_.constant函数可以保存常量，也可以当作默认函数使用。
    
    var con = _.constant(2333);
    con();//2333
    