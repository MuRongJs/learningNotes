function core(){
    console.log('core');
}

Function.prototype.before = function (beforeFn){
    return () => {
        beforeFn();
        this();
    }
}
let newCore = core.before(() => {
    console.log('core before.....');
})
newCore()