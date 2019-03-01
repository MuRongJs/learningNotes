[原文链接](http://www.dailichun.com/2018/03/12/whenyouenteraurl.html)
# 大纲
* 对知识体系进行一次预评级
* 为什么说知识体系如此重要？
* 梳理主干流程
* 从浏览器接收url到开启网络请求线程

    * 多进程的浏览器
    * 多线程的浏览器内核
    * 解析URL
    * 网络请求都是单独的线程
    * 更多
* 开启网络线程到发出一个完整的http请求

    * DNS查询到ip地址
    * tcp/ip请求
    * 五层因特网协议栈
* 从服务器接收到请求到对应后台接受到请求
    * 负载均衡
    * 后台的处理
* 后台和前台的http交互

    * http报文结构
    * cookie以及优化
    * gzip压缩
    * 长连接和短连接
    * http2.0
    * http
* 单独拎出来的缓存问题，http的缓存

    * 强缓存和弱缓存
    * 缓存头部简述
    * 头部的区别
* 解析页面流程

    * 流程简述
    * HTML解析，构建DOM
    * 生成css规则
    * 构建渲染树
    * 渲染
    * 简单层和复合层
    * Chrome中的调试
    * 资源外链的下载
    * loaded和domcontentloaded
* CSS的可视化格式模型

    * 包含块(Containing Block)
    * 控制框(Controlling Box)
    * BFC(Block Formatting Context)
    * IFC(Inline Formatting Context)
    * 其它
* JS引擎解析过程

    * JS解释阶段
    * JS的预处理阶段
    * JS的执行阶段
    * 回收机制
* 其它
* 总结
# 为什么说知识体系如此重要
总结：知识体系化后，对一个问题能有浅到深的解答，会更全面，可以不断的往事情的本质挖掘。
## 例子
* getComputedStyle
    * getComputedStyle返回元素最终计算出的css属性值，可以通过window.getComputedStyle和document.defaultView.getComputedStyle调用。
    * 可以举出获取元素高度和背景色，来推断出输出css属性值为当前元素计算的值。
    * getComputedStyle会引起回流，因为它需要获取祖先节点的一些信息来进行计算，产生回流引起性能问题。offsetXXX，scrollXXX，clientXXX，currentStyle等等都能产生回流问题。
* visibility: hidden 和 display: none的区别
    * 前者隐藏占据位置，后者隐藏不占据位置。
    * display由于隐藏后不占据位置，所以造成dom树的改变，会引起回流，代价比加大。
    * 当一个页面某个元素经常需要切换display时如何优化，一般会用复合层优化，或者要求低一点用absolute让其脱离普通文档流也行。然后可以将话题引到普通文档流，absolute文档流，复合图层的区别，
    * 再进一步可以描述下浏览器渲染原理以及复合图层和普通图层的绘制区别（复合图层单独分配资源，独立绘制，性能提升，但是不能过多，还有隐式合成等等）
## 前端向知识的重点
* 核心/基础知识：浏览器模型、渲染原理、JS解析过程、JS运行机制
* 重点知识，往往每一块都是一个知识点，而且这些知识点都很重要，譬如http相关，web安全相关，跨域处理等
* 拓展知识，这一块可能更多的是了解，稍微实践过，但是认识上可能没有上面那么深刻，譬如五层因特网协议栈，hybrid模式，移动原生开发，后台相关等等（当然，在不同领域，可能有某些知识就上升到重点知识层次了，譬如hybrid开发时，懂原生开发是很重要的）
# 梳理主干流程
对于这道题，我们先梳理问题的主干，再填充细节。

    1.从浏览器接受url到开启网络请求线程（这部分可以展开浏览器的机制以及进程和线程之间的关系）
    2.开启网络线程到发出一个完整到http请求（这部分有DNS查询、tcp/ip请求、五层因特网协议栈等知识）
    3.从服务器接受到请求到对应后台接受到请求（这部分有负载均衡、安全拦截、后台内部处理等）
    4.后台和前台到http交互（这部分包括http头部、响应码、报文结构、cookice等知识）
    5.单独拎出来到缓存问题，http到缓存（http缓存头部、etag、catch-control等）
    6.浏览器收到http数据包的解析流程（解析html-词法分析生成DOM树、解析css生成css规则树、合并成rander树、然后layout&&painting渲染、复合图层的合成、GPU绘制、外链资源的处理、loaded和domcontentloaded等）
    7.CSS的可视化格式模型（元素等渲染规则，如：包含块、控制框、BFC、IFC等概念）;
    8.JS引擎解析过程（JS解释阶段，预处理阶段,JS执行过程-JS生成上下文、VO、作用域链、回收机制等）
    9.其它（拓展不同的知识模块，跨域问题、web安全、hybrid模式等）
# 浏览器接受URL到开启网络请求线程
内容:浏览器进程/线程模型,JS的运行机制。
## 多进程浏览器模型
进程包括：浏览器主控进程、插件进程、GPU、Tab页进程

* browser进程：浏览器的主进程（负责协调、主控），只有一个
* 第三方插件进程：每种类型的插件对应一个进程，仅当使用该插件时才创建
* GPU进程：最多一个，用于3D绘制
* 浏览器渲染进程（内核）：默认每个Tab页一个进程，互不影响，主要控制页面渲染，脚本执行，事件处理（有时候会优化，如多个空白tab会合并成一个进程）
## 多线程等的浏览器内核
每个tab页可以看作浏览器内核进程，这个进程是多线程的，有几大类子线程
* GUI线程
* JS引擎线程
* 事件触发线程
* 定时器线程
* 网络请求线程
由此可以看出JS引擎线程是浏览器内核进程中的一个线程，这也就知道为什么JS引擎是单线程的了。
## 解析URL
URL包含以下几大部分
* protocol(协议头)，比如说http、ftp、file
* host(主机域名或IP地址)
* port(端口号)
* path(目录路径)
* query(查询参数)
* fragment(即#后的hash值，一般用来定位某个位置)
## 网络请求都是单独的线程
每次输入URL进行解析后，开启网络线程-进行网络请求，都会开启一个单独的线程，前往请求资源。

**补充浏览器多进程到JS单线程，JS运行机制**
# 开启网络线程到发出一个完整的http请求
主要内容为：DNS查询、TCP/IP请求构建、五层因特网协议栈等。
## DNS查询得到IP
当输入域名时，需要进行DNS解析，具体解析过程如下：
    
    1、首先查询本地浏览器的缓存，是否存在。
    2、查询本地缓存，是否存在。
    3、查询host，是否存在。
    3、再向DNS服务器进行域名查询，查询到IP，（在这期间会经过路由，路由也会有缓存；也会进过CDN调度器，CDN也会有存储功能）

进行DNS解析会很耗费时间，可以进行dns-prefetch优化。

**补充dns-prefetch优化**
## tcp/ip请求
http协议本质是tcp/ip，http协议进行3次握手建立连接，4次挥手断开连接，在建立连接后tcp将http长报文划分为短报文，进行可靠传输。

**三次握手、四次挥手补充**

* tcp/ip的并发限制:浏览器对同一域名并发的tcp连接是有限的（2-10个不等）,http1.0往往一个资源下载需要对应一个tcp/ip请求。
* get和post的区别:get/post本质都是tcp/ip，除了在http应用层上，tcp/ip传输层上也有区别。get产生一个tcp数据包，post两个。
    * get请求时，浏览器会将header和data一起发送出去，服务器响应200（返回数据）
    * post请求时，浏览器会先发送header，服务器响应100continue，浏览器再发送data，服务器响应200（返回数据）
# 五层因特网协议栈
从应用层http发送请求，到传输层通过三次握手建立tcp/ip连接，再到网络层的ip寻址，再到数据链路层封装成帧，再到物理层利用物理介质传输；服务端的接受顺序是反过来的步骤。

* 应用层（dns、http）DNS解析成ip发送http请求。
* 传输层（tcp、udp）建立tcp连接（三次握手）
* 网络层（ip、arp）ip寻址
* 数据链路层（ppp）封装成帧
* 物理层（利用物理介质传输比特流）物理传输（通过双绞线、电磁波、光纤）
相对与五层因特网协议，完整的OSI是七层框架：物理层、数据链路层、网络层、会话层、表示层、传输层、应用层
* 表示层:处理两个通信系统中交换信息的表示方式，包括数据格式交换，数据的加密和解密，数据压缩和终端类型转换等。
* 会话层:管理不同用户和进程之间的对话，如控制登录和注销过程。

**计算机网络补充**
# 从服务器接受的请求到对应后台接受到请求
简介服务器接收到请求的处理
## 负载均衡
用户发起的请求都指向调度服务器（反向代理服务器，比如安装了nginx控制负载均衡），然后调度服务器根据实际的调度算法，分配不同的请求给对应集群中的服务器执行，然后调度器等待实际服务器的HTTP响应，并将它反馈给用户
## 后台的处理
后台代码一般会部署到容器中
* 容器接受到请求（如tomcat容器）
* 容器中的后台代码就收到请求（如java程序）
* 后台代码处理完请求后，返回响应结果
具体概括:
* 后台一般有统一验证，如安全拦截，跨域验证；如果这一步不符合规则，就直接返回对应的http报文（如拒绝请求等）
* 通过验证后，再进行后台代码，程序接受到请求，然后执行（比如查数据库、大量计算等）
* 等程序执行完，会返回一个http响应包（一般这一步也会经过多层封装）
* 将http响应包通过因特网发送到前端，完成交互
# 后台和前台的http交互
## http报文结构
报文一般包括:通用头部、请求头部/响应头部、请求体/响应体
### 通用头部（General）
* Request Url:请求的web服务器地址
* Request Method:请求方式（get、post、options、put、head、delete、connect、teace）
    * 请求方式分两批次:1.0和1.1版本的(HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法,以及几种Additional Request Methods：PUT、DELETE、LINK、UNLINK;HTTP1.1定义了八种请求方法：GET、POST、HEAD、OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法。)
* Status Code:请求的返回状态码
    * 1xx -- 指示信息，表示请求已接受，继续处理
    * 2xx -- 成功，表示请求已经被成功接收、理解、接受
    * 3xx -- 重定向，要完成请求必须进行更进一步的操作
    * 4xx -- 客户端错误，请求有语法错误或请求无法实现。
    * 5xx -- 服务端错误，服务端无法实现合理的请求。
* Remote Address:请求的远程服务器地址（ip地址）
### 请求头部（Request Headers）/响应头部（Response Headers）
请求头部部分（Request Headers）
* Accept:接受类型，表示浏览器支持的MIME类型（对标服务端返回Content-Type）
* Accept-Encoding:浏览器支持的压缩类型，如gzip，超出类型浏览器不接收。
* Content-Type:客服端发出去实体内容的类型。
* Cache-Control:指请求和响应遵循的缓存机制。
* If-Modified-Since:用来匹配文件是否改动，只能精确在1s之内，http1.0（对标服务端的Last-modified）
* Expires:缓存控制，这个时间内不会发送请求，直接用缓存，以服务端时间为准，http1.0
* Max-age:代表缓存资源在本地缓存多少秒，有效时间内不会请求，而是使用缓存，http1.1
* If-None-Match:用来匹配文件内容是否改变，精确http1.1（对标服务端的ETag）
* Cookie:有cookie并且同域访问时会自动带上。
* Connection:当浏览器和服务端通信时对于长连接如何进行处理，如keep-live
* Host:请求的服务器的URL
* Origin:最初的请求从哪里发起的（只会精确到端口），Origin比Referer更尊重隐私
* Referer:该页面的来源URL(使用所有类型的请求，会精确到详细页面地址，CSRF拦截常用到这个字段)
* User-Agent:用户客户端的一些必要信息，如UA头部等
响应头部部分（Response Headers）
* Access-Control-Allow-Headers:服务器允许的请求Headers
* Access-Control-Allow-Methods:服务端允许的请求方法
* Access-Control-Allow-Origin:服务端允许的请求Origin头部（譬如*）
* Content-Type:服务端返回实体内容类型
* Date:数据从服务器发送的时间
* Cache-Control:告诉浏览器或其它客户，什么环境可以安全的缓存文档
* Last-Modified:请求资源最后的修改时间
* Expires:在有效缓存期外，不在缓存。
* Max-age:客户端的本地资源应该缓存多少秒，开启了Cache-Control后有效
* ETag:请求变量的实体标签的当前值
* Set-Cookie:设置和页面关联的cookie，服务端通过这个头部把cookie传给客户端
* Keep-Alive：如果客户端有keep-alive，服务端也会有响应
* Server：服务器的一些相关信息
### 请求实体/响应实体
http请求，除了头部，还有消息实体。
* 请求实体中，会将需要的参数放入（如post请求），请求实体可以放入参数的序列化形式（a=1&b=2），或者表单对象（Form Data对象，上传可以夹杂参数或者文件），等等
* 响应实体中，json、html字符串等
### CRLF
CRLF（Carriage-Return Line-Feed），意思是回车换行，一般作为分隔符存在，请求头和实体消息之间有一个CRLF分隔，响应头部和响应实体之间用一个CRLF分隔。
## Cookie以及优化
Cookie是浏览器等一种本地存储方式，一般用来客户端和服务端进行通信、校验身份，结合服务端的seesion进行使用。

Cookie的生成:登录时，服务器会生成一个session，session中有登录者的信息、sessionId（相当于登陆者在服务器中的key），服务器在登录页面写入Cookie，浏览器本地就有了Cookie值，以后访问同域名下的页面时，自动带上Cookie，自动校验，在有效期内无需二次登录。
* 通过设置httponly可以避免通过js来进行设置
* 可以对Cookie进行加密。

### Cookie优化

    1、原因:由于A域名下包含所有资源，所以当用户登录拥有Cookie时，浏览器再请求资源时默认会带上Cookie，由于静态资源不需要Cookie。优化方法:将不需要登录的静态资源放到B域名下。
    2、原因:当请求域名过多时，会降低请求速度（域名解析会很耗费时间，移动端带宽低于pc端）。优化方法:使用dns-prefetch（杂居浏览器空闲时进行提前解析）
## gzip压缩
gzip在浏览器支持的情况和服务器开启gzip压缩的情况下，可以以gzip进行传输。
## 长连接和短连接
在tcp/ip层面的定义:

    * 长链接:在tcp/ip连续发送多个数据包期间，tcp/ip保持连接，如果没有数据包发送，需要双方发送检测包进行维持连接，一般需要自己做在线维持（心跳包）。
    * 短连接:通信双方有数据交互时，就建立tcp连接，数据传输完毕后，则断开此tcp连接。

在http层面的

    * http1.0中，默认使用短连接，浏览器每建立一次http请求，就会建立一次连接，任务结束就会中断。
    * http1.1中，默认使用长连接（Connection:keep-alive）,在长连接的情况下，当访问服务器打开页面时浏览器和服务器之间的http的tcp连接不会中断，当再次访问同一服务器时会继续使用这条已经建立的长连接。
    * keep-alive不会永久保持，会在服务器中配置。要服务端和客户端同时支持才有效。
## http2.0
http1.0与http2.0

    * http1.0中，每发一次资源请求就要建立一次tcp/ip连接。当资源数量多时，由于tcp/ip并发数有限制，速度就会减慢。
    * http2.0中，一个tcp/ip请求就可以请求多个资源，也就是一次请求若干个资源，分割成更小的帧请求，速度会明显提升。
当使用http2.0时，很多http1.0的优化方案就无需使用了（打包成精灵图，静态资源多域名拆分等）

http2.0的特性
* 多路复用（一个tcp/ip连接可以请求多个资源）
* 首部压缩（http头部压缩，减少体积）
* 二进制分帧（在应用层和传输层之间添加了一个二进制分帧层，改进传输性能，实现低延迟和高吞吐量）
* 服务端推送（服务端对客户端的一个请求可以有多个响应，也可以主动通知客户端）
* 请求优先级（当流被赋予优先级，会基于这个优先级来进行处理，服务器来决定需要多少资源来进行处理该请求）
## https
https是http的安全版，https和http的区别主要是:在请求前，会建立ssl链接，确保接下来的通信都是加密的，无法被轻易截取分析。网站升级为https需要后台进行支持（后台需要申请证书），https也比http的开销大（因此需要额外建立安全链接以及加密），http2.0配合https为最佳。

SSL/TLS的握手流程，如下（简述）:

    1、在建立SSL连接时，浏览器会向服务端发送一个随机数---client random和客户端支持的加密方法，此时时明文
    2、服务端选中一组加密方法和Hash算法，回复一个随机数---Sever random，并将表示自己身份的证书发给浏览器（证书内包含了网站的地址，非对称加密的公钥，证书颁发机构等信息）
    3、浏览器收到服务端的证书后:
        * 检验证书的合法性（颁发机构是否合法、证书包含的网站是否是和正在访问的一样）
        * 接收到证书后（不管信任不信任），浏览器会生产新的随机数---premaster secret，证书中的公钥和加密方法加密‘premaster secret’，发送给服务器。
        * 利用Client random、Sever random和premaster secret通过一定的算法生成的http链接传输的对称加密key-‘session key’
        * 使用约定好的HASH算法计算握手消息，并使用之前生成的“session key”对消息进行加密，最后将之前生成的所用消息发送给服务器。
    4、服务端收到浏览器的回复
        * 利用已知的加解密方式与自己的私钥进行解密，获取到‘premaster secret’
        * 和浏览器相同规则生成`session key`
        * 使用`session key`解密浏览器发来的握手消息，并验证Hash是否与浏览器发来的一致
        * 使用`session key`加密一段握手消息，发送给浏览器
    5、 浏览器解密并计算握手消息的HASH，如果与服务端发来的HASH一致，此时握手过程结束，
之后所有的https通信数据将由之前浏览器生成的session key并利用对称加密算法进行加密
[图解SSL/TLS协议](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)
# http缓存
http缓存对于交互性能有很大到提升。
## 强缓存与弱缓存
    * 强缓存（200 from cache）时，浏览器判断本地缓存是否过期，未过期直接使用，不需发起http请求。
    * 弱缓存（304 from cache）时，浏览器会服务器发送请求进行判断缓存是否过期，未过期，使用本地缓存。
对于强缓存，在未过期时，必须更改资源路径才能发起新的请求。
## 缓存头部简述
强缓存和协议缓存的是通过不同的http头部控制的。

    * 强缓存: Cache-control/Max-Age (http1.1)、Pragma/Expires http1.0）
    * 协议缓存: If-None-Match/E-tag (http1.1)、If-Modified-Since/Last-Modified (http1.0)
## 头部的区分
# 解析页面流程
在浏览器获取到html后，浏览器进行解析、渲染
## 流程的简述
    1、解析HTML，构建DOM树
    2、解析CSS规则，生成CSS规则树
    3、合并DOM树和CSS规则树，生成rander树
    4、布局render (layout/reflow),负责各个元素的的尺寸、位子的计算
    5、绘制render树 (paint),绘制页面像素信息
    6、浏览器将各层的信息发送给GPU，GPU会将各层合成 (composite),显示在屏幕上
## HTML解析，构建DOM
简述流程: Bytes >> characters >> tokens >> nodes >> DOM
![](https://dailc.github.io/staticResource/blog/basicKnowledge/whenyouenteraurl/browser_parse_html.png)
* Conversion转换: 将浏览器得到的Bytes内容转换为字符;Bytes >> characters
* Tokenizing分词: 浏览器会将字符转换为不同的标记 token;characters >> tokens
* Lexing词法分析: 得到token，将他们转化为对象，这些对象分别定义他们的属性和规则; tokens >> nodes 
* DOM构建; nodes >> DOM
## 生成CSS规则
简述流程: Bytes >> characters >> tokens >> nodes >> CSSOM;这个流程生成了CSS规则树
## 构建渲染树
通过DOM树和CSSOM进行构建渲染树，渲染树和DOM树两者不是严格一一对应。
## 渲染
    1、计算CSS样式
    2、构建render树
    3、布局，主要定位坐标和大小，是否换行，各种position、overflow、z-index属性
    4、绘制，将图像绘制出来
在这过程中都两个概念，回流（Layout/Reflow）和重绘（Repaint）

    * 回流指的是元素的内容、结构、位置或尺寸发生了改变，需要重新进行计算样式、渲染树
    * 重绘指的是元素发生了外观的一些变化（例如，背景色，边框颜色，文字颜色等），此时只需要重新绘制元素就可以
    * 回流成本比重绘成不高，回流的改变往往会导致子元素、兄弟元素的回流
### 什么会引起回流
    * 页面渲染初始化
    * DOM结构发生改变，比如增删DOM节点
    * Render树发生了改变，比如margin、padding等，发生了改变
    * 窗口resize
    * 获取某些属性，引发回流: 浏览器会对回流进行优化，当回流达到一定数量时才会触发。但是除了render树直接发生改变时浏览器为获取一些属性时，浏览器会直接发生回流，
        1、当


