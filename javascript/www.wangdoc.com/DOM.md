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
	