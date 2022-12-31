# css相关
## 居中
* margin: 0 auto; 块级元素居中
* text-align: center; 行内元素居中
* 绝对定位，上下左右全0，margin: auto
```
.father{
    position: relative;
}
.son{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
}
```
* 绝对定位，50%减自身宽高
```
.father{
    position: relative;
}
.son{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
* 弹性盒子: flex
```
.father{
    display: flex;
    justify-content: center;
    align-items: center;
}
```
* 弹性盒子: flex + margin
```
.father{
    display: flex;
}
.son{
    margin: auto;
}
```
* table-cell: table单元格居中效果

```
.father{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
```
* grid: 网格布局

```
.father{
    display: grid;
}
.son{
    justify-self: center;
    align-self: center;
}
```
* ::after
```
.father{
    text-align: center;
}
.father::after{
    content: '';
    display: inline-block;
    vertical-align: middle;
}
fater>img{
    vertical-align: middle;
}
```
* ::before
```
.wrapper {
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;

    text-align: center;
    font-size: 0;
}

.wrapper::before {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    content: '';
    height: 100%;
}

.wrapper > img {
    vertical-align: middle;
    font-size: 14px;
}

```

## BFC
> 块级格式化上下文： 使浮动元素不会到处乱跑，与浮动元素产生边界

* 通过float不为none
* 绝对定位position(absolue, fixed)
* overflow不为visible

## 盒模型

* 标准模型： box-sizing： content-box; 宽高不包括内边距和边框
* 怪异模型： box-sizing： border-box; 

## 浮动


