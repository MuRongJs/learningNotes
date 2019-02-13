# Flex布局是什么？
为盒模型提供更大的灵活性，提供弹性布局；
```
    .box {
        display : flex;
    }
```
> 任何容器都可以指定为Flex布局。
```
    .box {
        display :inline-flex;
    }
```
> 行内元素也可以使用Flex布局。
# Flex基本概念
![](https://raw.githubusercontent.com/MuRongJs/learningNotes/master/images/flexBasicConcepts.png)
* 采用Flex布局的元素，称为Flex容器（Flex container），简称“容器”
* 容器等子元素为容器成员，称为Flex项目（Flex item），简称“项目”。
* 容器默认有两根轴：水平的主轴（main axis）和 垂直的交叉轴（cross axis）

    * 主轴等开始位置叫做（main start），结束位置叫做（main end）；
    * 交叉轴开始位置叫做（cross start），结束位置叫做（cross end）；
    * 项目默认沿着主轴排列。单个项目占据等主轴空间叫做 main size，占据等交叉轴空间为cross size。
# 容器的属性
以下6重属性是设置在容器上的。
```
    1、flex-direction
    2、flex-wrap
    3、flex-flow
    4、justify-content
    5、align-items
    6、align-content
```
## flex-direction属性
flex-direction属性决定主轴的方向（即项目的排布方向）,以下是四种属性值情况：

* row（默认情况），主轴为水平方向，起点为左端。
* row-reverse，主轴为水平方向，起点为右端。
* column，主轴为垂直方向，起点在上沿。
* column-reverse，主轴为垂直方向，起点在下沿。
## flex-wrap属性
默认情况下项目都排在一根“轴线”上，flex-wrap属性定义当一条轴线排不下，如何换行。

* nowrap（默认），不换行
* wrap，换行，第一行在上方
* wrap-reverse，换行，第一行在下方
## flex-flow属性
flex-flow属性是flex-direction和flex-wrap简写形式，默认为 row nowrap。
```
    .box {
        flex-flow: <flex-direction> || <flex-wrap>;
    }
```
## justify-content属性
justify-content定义项目在主轴上的对齐方式。**以下情况（主轴为默认条件）的表现**：
```
    .box {
        justify-content: flex-start | flex-end | center | space-between | space-around;
    }
```
* flex-start:主轴的起点对齐
* flex-end:主轴的终点对齐
* center:居中
* space-between:两端对齐，项目之间的间隔都相等。
* space-around:每个项目两侧的间隔相等，所以每个项目之间的间隔比项目与边框之间的间隔大一倍。
## align-items属性
align-item属性定义项目在交叉轴上如何对齐。**以下情况（交叉轴为默认条件）的表现**：

```
    .box {
        align-items: flex-start | flex-end | center | baseline | stretch;
    }
```
* flex-start:交叉轴的起点对齐
* flex-end:交叉轴的终点对齐
* center:交叉轴的中点对齐
* baseline:项目的第一行文字的基线对齐
* stretch（默认值）:如果项目未设置高度或设置为auto，将占忙整个容器的高度。


