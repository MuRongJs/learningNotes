function arrStack(len){
    this.stack = new Array(len);
    this.count = 0;
    this.len = len
}
arrStack.prototype.push = function(item){
    if(this.count >= this.len) return console.error('有序栈已满！');
    this.stack[this.count] = item;
    ++this.count;
}
arrStack.prototype.pop = function(){
    if(this.count < 0) return console.error('有序栈以空！');
    let tmp = this.stack[--this.count];
    return tmp;
}

let arrS = new arrStack(10);
arrS.push(0);
arrS.push(1);
arrS.push(2);
arrS.push(3);
arrS.push(4);
arrS.push(5);
arrS.push(6);
arrS.pop();
arrS.pop();
arrS.push(7);
arrS.push(8);
arrS.push(9);