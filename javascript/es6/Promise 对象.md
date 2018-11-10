# 1.Promise 的含义 #
Promise是异步编程的一种解决方案，Promise提供统一的API，使异步事件变得可控。

Promise对象有两个特点：

	1.Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）；异步操作只有一种状态。
	2.Promise状态一旦改变，就不会再改变。Promise状态有两种改变：（1）pending到fulfilled；（2）pending到rejected。只要有这两种改变，状态就会凝固（resolved“已定型”），这时候你再向Promise对象添加回调函数，会立即执行，这与事件（event）完全不同。
# 2. 基本用法 #

