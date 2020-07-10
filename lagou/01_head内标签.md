# meta标签： 自动刷新/跳转

```
<meta http-equiv="refresh" content="5;xxx.html">
```

## script
* async 属性： 下载js文件和渲染页面同时进行，下载完毕后停止渲染立即执行内容
* defer 属性： 下载js文件和渲染页面同时进行，解析完html后在执行文件内容
* type 属性： 
    * module 效果如defer，可以设置async
