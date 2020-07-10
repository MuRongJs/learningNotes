function arrQueue(num){
    this.queue = new Array(num);
    this.len = num;
    this.head = 0;
    this.tail = 0;
}
arrQueue.prototype.enQueue = function(item){
    if(this.tail == this.len) return false;
    this.queue[this.tail++] = item;
    return true;
}
arrQueue.prototype.deQueue = function(){
    if(this.head == this.tail) return null;
    return this.queue[this.head++];
}