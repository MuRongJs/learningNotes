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
> 行内元素也可以使用Flex布局。
# Flex基本概念
![](https://raw.githubusercontent.com/MuRongJs/learningNotes/master/images/flexBasicConcepts.png)
* 采用Flex布局的元素，称为Flex容器（Flex container），简称“容器”
* 容器等子元素为容器成员，称为Flex项目（Flex item），简称“项目”。
* 容器默认有两根轴：水平的主轴（main axis）和 垂直的交叉轴（cross axis）

    * 主轴等开始位置叫做（main start），结束位置叫做（main end）；
    * 交叉轴开始位置叫做（cross start），结束位置叫做（cross end）；
    * 项目默认沿着主轴排列。单个项目占据等主轴空间叫做 main size，占据等交叉轴空间为cross size。
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
flex-direction属性决定主轴的方向（即项目的排布方向）,以下是四种属性值情况：

* row（默认情况），主轴为水平方向，起点为左端。
* row-reverse，主轴为水平方向，起点为右端。
* column，主轴为垂直方向，起点在上沿。
* column-reverse，主轴为垂直方向，起点在下沿。
## flex-wrap属性
默认情况下项目都排在一根“轴线”上，flex-wrap属性定义当一条轴线排不下，如何换行。

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
justify-content定义项目在主轴上的对齐方式。**以下情况（主轴为默认条件）的表现**：
```
    .box {
        justify-content: flex-start | flex-end | center | space-between | space-around;
    }
```
* flex-start:主轴的起点对齐
* flex-end:主轴的终点对齐
* center:居中
* space-between:两端对齐，项目之间的间隔都相等。
* space-around:每个项目两侧的间隔相等，所以每个项目之间的间隔比项目与边框之间的间隔大一倍。
## align-items属性
align-item属性定义项目在交叉轴上如何对齐。**以下情况（交叉轴为默认条件）的表现**：

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
## align-content属性
align-content属性定义多根轴线的对齐方式，当只有一根轴线的时候不起走用。（轴线以行为单位）
```
    .box {
        align-content: flex-start | flex-end | center | space-between | space-around | stretch;
    }
```
* flex-start: 与交叉轴的起点对齐
* flex-end: 与交叉轴的终点对齐
* center: 与交叉轴的中点对齐
* space-between: 与交叉轴的两端对齐，轴线之间的间隔平均分布。
* space-around: 每条轴线两侧的间隔相等，所以每条轴线的间隔比轴线与边框的间隔大一倍。
* stretch（默认值）:轴线占满整个交叉轴。
# 项目的属性
以下6种属性是设置在项目上的
```
    1、order
    2、flex-grow
    3、flex-shrink
    4、flex-basis
    5、flex
    6、align-self
```
## order属性
order属性定义项目的排列顺序，数值越小，排列越靠前，默认值为0。
```
    .item {
        order:<integer>
    }
```
## flex-grow属性
flex-grow属性定义项目放大比例，默认情况为0，如果存在剩余空间，也不放大。
```
    .item{
        flex-grow:<number>
    }
```
flex-grow设置为1时，如果有剩余空间的条件下，将剩余空间等分。如果某个项目为2，其它项目为1，则前者占用的剩余空间比后者占用的剩余空间多一倍。
## flex-shrink属性
flex-shrink属醒定义了项目的缩小比例，如果空间不够，该项目缩小。
```
    .item {
        flex-shrink:<number>
    }
```
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。
## flex-basis属性
flex-basis属性定义了分配多余空间前，项目占据主轴空间。浏览器通过该属性计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
```
    .item {
        flex-basis: <length> | auto;
    }
```
如果项目设置了flex-basis属性值，则项目占据固定空间。
## flex属性
flex属性是flex-grow、flex-shrink、flex-basis的简写，默认值为 0 1 auto。后两个属性可选。
```
    .item {
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
    }
```
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
## align-self属性
align-self属性允许单个项目与其它项目不一样的对齐方式，可以覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```
    .item {
        align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }
```
该属性有六个值，除了auto属性与align-items不一样，其它与align-items属性一致。