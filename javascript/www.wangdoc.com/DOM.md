# 1、DOM概述 #
## 1、节点 ##
节点类型有7种：

1. Document：整个文档树的顶层节点
2. DocumentType：doctype标签（比如<!DOCTYPE html>）
3. Element：网页的各种HTML标签（比如<body\>、<a\>等）
4. Attribute：网页元素的属性（比如class="right"）
5. Text：标签之间或标签包含的文本
6. Comment：注释
7. DocumentFragment：文档的片段

浏览器提供了节点对象Node，节点都继承了Node对象。
## 2、节点树 ##
**浏览器提供了document节点，代表整个文档**

**<html\>是整个树结构的根节点**

除了根节点，其他节点都有三种节点关系：
1. 父节点关系（parentNode）：直接的那个上级节点
2. 子节点关系（childNodes）：直接的下级节点
3. 同级节点关系（sibling）：拥有同一个父节点的节点

----------
# 2、Node接口 #
所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法。这是 DOM 操作的基础。
## 1、属性 ##
	
	1.1	Node.prototype.nodeType : 返回一个整数，表示节点的类型。
	1.2 Node.prototype.nodeName : 返回节点的名称。
	1.3 Node.prototype.nodeValue : 返回一个字符串，表示当前节点本身的文本值，该属性可读写。只有文本节点和注释节点有文本值，其他节点返回null。
	1.4 Node.prototype.textContent : 返回当前节点和它的所有后代节点的文本内容。(自动对 HTML 标签转义)
	1.5 Node.prototype.baseURI : 返回当前网页的绝对路径。
		该属性的值一般由当前网址的 URL（即window.location属性）决定，但是可以使用 HTML 的<base>标签，改变该属性的值。设置了以后，baseURI属性就返回<base>标签设置的值。
	1.6 Node.prototype.ownerDocument : 返回当前节点的Document对象
	1.7 Node.prototype.nextSibling ： 返回当前节点后面的第一个同级节点	
	1.8 Node.prototype.previousSibling : 返回当前节点前面的、距离最近的一个同级节点。(包括文本节点和注释节点)
	1.9 Node.prototype.parentNode : 返回当前节点的父节点。
	1.10 Node.prototype.parentElement : 返回当前节点的父元素节点。
	1.11 Node.prototype.firstChild,Node.prototype.lastChild : 返回当前节点的第一个子节点，返回当前节点的最后一个子节点。
	1.12 Node.prototype.childNodes : childNodes属性返回一个类似数组的对象（NodeList集合），成员包括当前节点的所有子节点。
	1.13 Node.prototype.isConnected : 返回一个布尔值，表示当前节点是否在文档中。
## 2、方法 ##
	2.1 Node.prototype.appendChild() : 接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。
	2.2 Node.prototype.hasChildNodes() : 判断是否有**子节点**
	2.3 Node.prototype.cloneNode() : 接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。
	2.4 Node.prototype.insertBefore() : 受两个参数，第一个参数是所要插入的节点newNode，第二个参数是父节点parentNode内部的一个子节点referenceNode。
	newNode将插在referenceNode这个子节点的前面。
	2.5 Node.prototype.removeChild() : 当前节点移除该子节点
	2.6 Node.prototype.replaceChild() : 将一个新的节点，替换当前节点的某一个子节点。
	2.7 Node.prototype.contains() : 参数节点为当前节点、当前节点的子节点、当前节点的后代节点，返回布尔值。
	2.8 Node.prototype.compareDocumentPosition() : 返回当前节点的关系。 
	2.9 Node.prototype.isEqualNode()，Node.prototype.isSameNode() : isEqualNode方法返回一个布尔值，用于检查两个节点是否相等。
	isSameNode方法返回一个布尔值，表示两个节点是否为同一个节点。
	2.10 Node.prototype.normalize() 
	2.11 Node.prototype.getRootNode() : 与ownerDocument属性的作用相同。

----------

#  #