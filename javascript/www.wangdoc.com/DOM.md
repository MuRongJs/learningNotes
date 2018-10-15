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

# 3、NodeList接口、HtmlCollection接口 #
容纳多个节点。NodeList为各类节点，HtmlCollection只包含HTML节点元素
## 1、NodeList接口 ##
	1.1 NodeList是一个类似数组的对象，成员是节点对象，通过（Node.childNodes/
	document.querySelectorAll()等）得到NodeList实例
	1.2 NodeList.prototype.length : 返回 NodeList 实例包含的节点数量。
	1.3 NodeList.prototype.forEach() : 遍历 NodeList 的所有成员。
	1.4 NodeList.prototype.item() : 接受一个整数，返回该位置上的成员。
	1.5 NodeList.prototype.keys()，
		NodeList.prototype.values()，
		NodeList.prototype.entries() : keys()返回键名的遍历器，values()返回键值的遍历器，
		entries()返回的遍历器同时包含键名和键值的信息。
## 2、HTMLCollection接口 ##
只能包含元素节点（element）结合。

	2.1 没有forEach方法 。
	2.2 HTMLCollection.prototype.length
	2.3 HTMLCollection.prototype.item()
	2.4 HTMLCollection.prototype.namedItem() : id属性或name属性的,返回对应的元素节点。

----------

# 4、ParentNode接口，ChildNode接口 #
每个接口除了继承Node接口，还会继承其他接口。
## 1、ParentNode接口 ##
当前节点是父节点就会继承ParentNode接口，只有元素节点、文档节点、文档片段节点拥有子节点。

	1.1 ParentNode.children : 返回一个HTMLCollection实例，成员是当前节点的所有子节点。
	1.2 ParentNode.firstElementChild : 返回当前节点的第一个元素子节点
	1.3 ParentNode.lastElementChild : 返回最后一个元素子节点
	1.4 ParentNode.childElementCount : 返回一个整数，当前节点所有元素子节点的数目。
	1.5 ParentNode.append() : 追加子节点，在当前节点的最后一个子元素节点后添加。
		ParentNode.prepend() : 也是添加子节点，在当前节点的第一个子元素节点前添加。
## 2、childNode接口 ##
有父节点，就会继承childNode接口

	2.1 childNode.remove() : 从父节点删除当前节点。
	2.2 childNode.before() : 在当前节点前插入同级节点。
	2.3 childNode.after() : 在当前节点后插入同级节点。
	2.4 childNode.replaceWith() : 替换当前节点，可以是元素节点或者文本节点。

----------
# 5、Document节点 #

## 1、概述 ##
获取Document的方式

	1.1 正常页面document或者window.document。
	1.2 iframe框架里面的，使用iframe节点的contentDocument属性。
	1.3 Ajax操作返回的文档，使用XMLHttpRequest对象的responseXML属性。
	1.4 内部节点的ownerDocument属性。
## 2、属性 ##
### 2.1 快捷方式属性 ###
	1、document.defaultView : 返回document对象所属的window对象
	2、document.doctype : document对象一般有两个子节点，第一个是document.doctype,
	指向<DOCTYPE>节点。
	3、document.documentElement : 返回当前文档的跟元素节点，一般是<html>节点。
	4、document.body，document.head
	5、document.scrollingElement : 返回文档的滚动元素，当文档整体滚动时，到底是哪个元素在滚动。
	6、document.activeElement : 返回当前焦点的DOM元素。
	7、document.fullscreenElement : 返回当前以全屏状态展示的Dom元素
### 2.2节点集合属性 ###
以下属性返回HTMLCollection实例

	1、document.links : 返回当前文档所有设定href属性的<a>和<area>
	2、document.forms : 返回所有<form>表单节点。还能使用id属性和name属性来引用表单。
	3、document.images : 返回所有<img>图片节点。
	4、document.embeds，document.plugins : 返回所有<embed>节点。
	5、document.scripts : 返回所有<script>节点。
	6、document.styleSheets : 返回文档内嵌或引入的样式集合。
小结：

除了document.styleSheets，以上的集合属性返回的都是HTMLCollection实例。

HTMLCollection实例是类似数组的对象，所以这些属性都有length属性，都可以使用方括号运算符引用成员。如果成员有id或name属性，还可以用这两个属性的值，在HTMLCollection实例上引用到这个成员。
### 2.3文档静态信息属性 ###
	1、document.documentURI, document.URL : 返回当前文档的网址。
	documentURI继承自Document接口，可用于所有文档；
	URL继承自HTMLDocument接口，只能用于 HTML 文档。
	2、document.domain : 返回当前文档的域名，不包含协议和接口。
	3、document.location : 提供URL相关的信息和操作方法。
	4、document.lastModified : 返回当前文档最后修改的时间。
	5、document.title : 返回当前文档的标题。
	6、document.characterSet : 返回当前文档的编码。
	7、document.referrer : 表示当前文档的访问者来自哪里。
	8、document.dir : 返回文字方向。
	9、document.compatMode : 返回浏览器处理文档的模式。
### 2.4文档状态属性 ###
	1、document.hidden : 返回一个布尔值，表示当前页面是否可见。
	如果窗口最小化、浏览器切换了tab都不可见。
	2、document.visibilityState : 返回文档的可见状态。（visible:页面可见、hidden:页面不可见、
	prerender:页面处于正在渲染、unloaded:页面从内存里卸载）
	这个属性可以用在页面加载时，防止加载某些资源；或者页面不可见时，停掉一些页面功能。
	3、document.readyState : 返回当前文档的状态（
	loading：加载 HTML 代码阶段（尚未完成解析）、
	interactive：加载外部资源阶段、
	complete：加载完成）
### 2.5 document.cookie ###
### 2.6 document.designMode ###
控制当前文档是否可编辑。该属性只有两个值on和off，默认值为off。一旦设为on，用户就可以编辑整个文档的内容。
### 2.7 document.implementation ###
返回一个DOMImplementation对象。该对象有三个方法:

	1、DOMImplementation.createDocument()：创建一个 XML 文档。
	2、DOMImplementation.createHTMLDocument()：创建一个 HTML 文档。
	3、DOMImplementation.createDocumentType()：创建一个 DocumentType 对象。