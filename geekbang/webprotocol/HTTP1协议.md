# 第七课：详解http请求行

## 请求行（一）
request-line = method SP request-target SP HTTP-version CRLF

* method方法
* request-target = origin-form / absolute-form / authority-form / asterisk-form

origin-form = absolut-path["?"query]
* 向 origin server 发起的请求，path为空时必须传递 /

absolute-form = absoulute-URI
* 仅用于向正向代理proxy发起请求时

authority-form = authority
* 仅用于 CONNECT 方法，建立vpn等隧道时才会使用。例如connect www.example.com:80 HTTP/1.1

asterisk-form = "*"
* 仅用于OPTIONS方法

## 常见方法
* GET：主要的获取信息方法，大量的性能优化都针对该方法，幂等方法
* HEAD：类似GET方法，服务端不发送BODY，获取HEAD元数据，幂等方法
* POST：常用于提交HTML From表单、新增资源等
* PUT：更新资源，带条件时是幂等方法
* DELETE： 删除资源，幂等方法
* CONNECT：建立tunnel隧道
* OPTIONS：显示服务器对访问资源支持的方法，幂等方法
* TRACE: 回显服务器收到的请求，用于定位问题，有安全风险

## 用于文档管理的WEBDAV方法（RFC2518）
* PROPFIND：从 WEB 资源中检索以 XML 格式存储的属性。它也被重载，以允许一个检索远程系统的集合结构（也叫目录层次结构）
* PROPPATCH：在单个原子性动作中更改和删除资源的多个属性
* MKCOL：创建集合或者目录
* COPY
* MOVE
* LOCK：锁定一个资源，WEBDAV支持共享锁和互斥锁。
* UNLOCK：解除资源的锁定

## WEBDAV验证环境
* 服务器
    * Nginx
    * http_dav_module模块
    * nginx_dav_ext_module模块
* 客户端
    * winscp

# HTTP 响应行
status-line = HTTP-version SP status-code SP reason-phrase CRLF

## 响应码分类：1xx
* 1xx：请求已接收到，需要进一步处理才能完成
    * 100 continue： 上传大文件前使用
        * 客户端发起请求中携带 Expect：100-continue 头部触发
    * 101 Switch protocols：协议升级使用
    * 102 processing：WebDAV 请求可能包含很多涉及文件操作的子请求，需要长时间才能完成请求。表示服务端收到并正在处理请求，但无响应可用。这样可以防止客户端超时，并假设请求丢失
* 2xx：成功处理请求
    * 200 ok：成功返回响应。
    * 201 created：有新资源在服务端被成功创建。
    * 202 Accepted：服务器接收并开始处理请求，但请求未处理完成。例如异步、需要长时间处理的任务。
    * 203 Non-Authoritative Information：当代理服务器修改了origin server的原始响应包体时，代理服务器可以通过修改200为203的方式告知客户端这一事实，方便客户端为这以行为做出响应的处理。
    * 204 No content：成功执行了请求且不携带响应包体，并暗示客户端无需更新当前的页面视图。
    * 205 Reset content： 成功执行了请求且不携带响应包体，指明客户端需要更新当前页面视图。
    * 206 Partial Content：使用 range 协议时返回部分响应内容时的响
    * 207 Multi-Status：RFC4918 ，在 WEBDAV 协议中以 XML 返回多个资源的状态。
    * 208 Already Reported：RFC5842 ，为避免相同集合下资源在207响应码下重复上报，使用 208 可以使用父集合的响应码。
* 3xx：重定向，使用location指向的资源或者缓存中的资源，重定向次数不应超过5次，以防止死循环。
    * 301 Moved Permanently：资源永久的重定向到另一个URI中。
    * 302 Found：资源临时的重定向到另一个URI中。
    * 303 See other：重定向到其他资源，常用于POST/PUT等方法的响应中。
    * 304 NOT Modified：当客户端拥有可能过期的缓存是，会携带缓存标识 etag、时间等信息询问服务器缓存是否任可复用，304则指的是可以复用缓存。
    * 307-302 308-301：明确重定向后请求方法必须与原请求方法相同，不得改变
* 4xx：客户端出现错误
    * 400 Bad Request： 服务器认为客户端出现了错误，不明确错误
    * 401 unauthorized：用户认证信息缺失或者不正确
    * 407 Proxy Authentication Required： 对需要经由代理的请求，认证信息未通过代理服务器的验证
    * 403 Forbidden：服务器理解请求的含义，但没有权限执行此请求
    * 404 Not Found：服务器没有找到对应的资源
    * 410 Gone：服务器没有找到对应的资源，并且告知该位置永久性找不到该资源
    * 405 Method Not Allowed：服务器不支持请求行中的method方法
    * 406：对客户端指定的资源表述不存在，服务器返回表述列表供客户端选择。
    * 408：服务器接收请求超时
    * 409：资源冲突，例如上传文件时目标位置已经存在版本更新的资源
    * 411 Length Required：如果请求含有包体且未携带 Content-Length 头部，且不属于chunk类请求时，返回 411
    * 412 Precondition Failed：复用缓存时传递的 If-Unmodified-Since 或 If- None-Match 头部不被满足
    * 413 Payload Too Large/Request Entity Too Large：请求的包体超出服务器能处理的最大长度
    * 414 URI Too Long：请求的 URI 超出服务器能接受的最大长度
    * 415 Unsupported Media Type：上传的文件类型不被服务器支持
    * 416 Range Not Satisfiable：无法提供 Range 请求中指定的那段包体
    * 417 Expectation Failed：对于 Expect 请求头部期待的情况无法满足时的响应码
    * 421 Misdirected Request：服务器认为这个请求不该发给它，因为它没有能力处理。
    * 426 Upgrade Required：服务器拒绝基于当前 HTTP 协议提供服务，通过 Upgrade 头部告知客户端必须升级协议才能继续处理。
    * 428 Precondition Required：用户请求中缺失了条件类头部，例如 If-Match
    * 429 Too Many Requests：客户端发送请求的速率过快
    * 431 Request Header Fields Too Large：请求的 HEADER 头部大小超过限制
    * 451 Unavailable For Legal Reasons：RFC7725 ，由于法律原因资源不可访问
* 5xx: 服务器出现错误
    * 500 Internal Server Error：服务器内部错误，且不属于以下错误类型
    * 501 Not Implemented：服务器不支持实现请求所需要的功能
    * 502 Bad Gateway：代理服务器无法获取到合法响应
    * 503 Service Unavailable：服务器资源尚未准备好处理当前请求
    * 504 Gateway Timeout：代理服务器无法及时的从上游获得响应
    * 505 HTTP Version Not Supported：请求使用的 HTTP 协议版本不支持
    * 507 Insufficient Storage：服务器没有足够的空间处理请求
    * 508 Loop Detected：访问资源时检测到循环
    * 511 Network Authentication Required：代理服务器发现客户端需要进行身份验证才能获得网络访问权限

# 从 TCP 编程上看 HTTP 请求处理

(C1) 获取IP地址和端口号
(C2) 创建新的套接字 (socket)
(C3) 连接到服务器IP：port上去 (connet)
(C4) 连接成功
(C5) 发送HTTP 请求 (write)
(C6) 等待HTTP响应 (read)
(C7) 处理HTTP 响应
(C8) 关闭连接 (close)
                            (S1) 创建新的套接字 (socket)
                            (S2) 将套接字绑定到端口80上去 (bind)
                            (S3) 允许套接字进行连接 (listen)
                            (S4) 等待连接 (accept)
                            (S5) 通知应用程序有连接到来
                            (S6) 开始读取请求 (read)
                            (S7) 处理HTTP请求报文
                            (S8) 回送HTTP响应 (write)
                            (S9) 关闭连接 (close)