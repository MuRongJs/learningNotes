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
    * tcp/ip请求
    * 五层因特网协议栈
* 从服务器接收到请求到对应后台接受到请求
    * 负载均衡
    * 后台的处理
* 后台和前台的http交互

    * http报文结构
    * cookie以及优化
    * gzip压缩
    * 长连接和短连接
    * http2.0
    * http
* 单独拎出来的缓存问题，http的缓存

    * 强缓存和弱缓存
    * 缓存头部简述
    * 头部的区别
* 解析页面流程

    * 流程简述
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
**总结:**知识体系化后，对一个问题能有浅到深的解答，会更全面，可以不断的往事情的本质挖掘。
## 例子
* getComputedStyle
    * getComputedStyle返回元素最终计算出的css属性值，可以通过window.getComputedStyle和document.defaultView.getComputedStyle调用。
    * 可以举出获取元素高度和背景色，来推断出输出css属性值为当前元素计算的值。
    * getComputedStyle会引起回流，因为它需要获取祖先节点的一些信息来进行计算，产生回流引起性能问题。offsetXXX，scrollXXX，clientXXX，currentStyle等等都能产生回流问题。
