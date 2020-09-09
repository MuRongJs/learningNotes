const fs = require('fs');

let obj = {};

function after(timer, callback){
    return function(){
        --timer === 0 && callback();
    }
}

let fn = after(2, () => {
    console.log(obj)
});


fs.readFile('name.txt', 'utf8', function(err, data){
    if(err) return console.log(err);
    obj.name = data;
    fn();
})
fs.readFile('age.txt', 'utf8', function(err, data){
    if(err) return console.log(err);
    obj.age = data;
    fn();
})