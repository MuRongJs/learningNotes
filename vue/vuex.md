# vuex的基本概念
## state
* 通过this.$store.state.xxx调用vuex中的状态时，最好添加在每个组件内的计算属性中。
* 当一个组件需要获取多个vuex中的状态时，不建议添加到一个一个的添加到计算属性中，我们可以通过mapState函数生成计算属性。
* 当使用mapState时，我们可以通过数组或对象的形式进行添加state状态，数组为不处理，对象可以处理。
## getters 
* getters是vuex的计算属性，可以将计算的规则统一写一份，不必在每个组件内写。
* getters在组件内使用时，也可以通过mapGetters进行注册。
** 状态和计算属性通过compute在组件内注册 **
## mutations
* vuex中的全局状态state改变值时，通过过mutations进行修改，在组件内通过commit('xx',agr)进行传值，xx为mutation中注册的时间。
* 在同步进行修改值是通过mutations，异步修改通过actions
## actions
* 通过actions进行调用mutations注册的函数，进行改变state中的值。（content， arg）content是包括store的上下文。
* 使用action，在组件内通过 this.$store.dispatch('xx')进行调用
* 可以通过mapActions在组件内进行注册actions中的属性 。
** 修改状态的mutations和actions方法在组件内通过methods进行注册 **
## module
* 将store进行分割，每个模块都有自己的state、getters、mutations、actions等属性，模块也可以进行嵌套。