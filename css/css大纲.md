# 盒模型
盒模型是DOM在渲染时采用的布局模型，可以通过box-sizing进行设置。
* content-box（W3C标准盒模型）:在标准盒子模型的情况下，width的长度就是内容的宽度，不包括padding、border
* border-box（IE盒模型）:在ie盒子模型的情况下，width的长度包括内容、padding、border
* pading-box（浏览器未实现）
* margin-box（浏览器未实现）
# BFC
BFC（block formatting context）是一个独立的渲染区，让处于BFC的内部元素与外部元素相互隔离，不会相互影响。
## 触发条件
* 根元素
* float属性不为none
* position属性为absolute或fixed
* display属性为inline-block、flex、inline-flex、table、table-cell、table-caption
* overflow属性不为visible
## 规则
* 内部元素box在垂直方向，一个接一个的放置
* 两个box的垂直方向的margin会重叠
* BFC区域不会和float的元素区域重叠
* 计算BFC的高度时，浮动元素也会参与计算（不会浮动坍塌）
# 层叠上下文
分层显示机制，z-index
## 触发条件
* 根层叠上下文（html）
* position
* css3属性:flex、transform、opacity、filter、will-change、-webkit-overflow-scrolling
## 层叠等级（优先级低到高）
* background/border
* z-index为负值
* 块级元素
* 浮动元素
* 行内元素
* 没有设置z-index到层叠上下文（z-index 0/auto）
* z-index为正值
# 居中布局
## 水平居中
* 行内元素:text-align:center
* 块级元素:margin:0 auto;
* absolute + transform
* flex + justify-content:center
## 垂直居中
* line-height: height
* absolut + transform
* flex + align-items:center
* table
## 水平垂直居中
* absolute + transform
* flex + justify-content + align-items

