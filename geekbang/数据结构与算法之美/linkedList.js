function linkedList(){
    this.head = new linkedNode('head');
}
function linkedNode(val){
    this.val = val;
    this.next = null;
}
linkedList.prototype.add = function(val){
    let node = new linkedNode(val);
    let now = this.head;
    while(now.next !== null){
        now = now.next;
    }
    now.next = node;
    return this;
}
let l = new linkedList();

l.add(0).add(1).add(2).add(3).add(4).add(5);

let now = l.head;
let newList;
function reverse(node){
    if(node == null) return;
    reverse(node.next)
    if(newList === void 0){
        newList = node;
    }else{
        let now = newList;
        while(now.next !== null){
            now = now.next;
        }
        now.next = node;
    }
    console.log(node)
    console.log(newList)
}
reverse(now)
console.log(newList)
