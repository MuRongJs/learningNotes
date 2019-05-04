# 链表概念
* 单链表：节点内包含当前节点的值，以及下个节点的地址。
* 循环链表：首尾相连，没有头部节点和尾部节点
* 双向链表：两个节点内包含当前节点的值，以及上个节点和下个节点的地址。

单链表的代码实现
`
    class Node{
        constructor (element){
            this.value = element;
            this.next = null;
        }
    }

    class linkedList{
        constructor (){
           this.head = new Node("head")
        }
        <!-- 通过链表值找到对应节点 -->
        findByValue(element){
            let currentElement = this.head;
            while(currentElement !== null && element !== currentElement.value){
                currentElement = currentElement.next;
            }
            return currentElement === null? -1 : currentElement;
        }
        <!-- 将新节点插入到目标节点后 -->
        insert(currentEle, ele){
            let insertNode = this.findByValue(currentEle);
            let newNode = new Node(ele);
            if(insertNode  !== -1){
                newNode.next = insertNode.next;
                insertNode.next = newNode;
            }else{
                console.err("未找到该元素")
            }
        }
        <!-- 查找目标节点的前一个节点 -->
        findNodePre(element){
            let currentElement = this.head;
            while(currentElement.next !== null && element !== currentElement.next.value){
                currentElement = currentElement.next;
            }
            return currentElement.next === null? -1 : currentElement.next;
        }
        <!-- 删除 -->
        deleteNode(currentELement){
            let delePreNode = this.findNodePre(currentELement);
            let deleNode = this.findByValue(currentELement);
            if(deleNode === -1){
                console.err("未找到该元素")
            }else{
                delePreNode.next = deleNode.next;
            }
        }
    }
`