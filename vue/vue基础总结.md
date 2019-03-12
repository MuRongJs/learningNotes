# vue基础
## 安装
* 全局安装脚手架工具vue-cli：npm install --g @vue/cli
* 安装默认工程：vue create xxx
## vue实例
## 组件
* 引用组件:在vue实例下引用组件条件为，先引用，再挂载
* 组件内样式子作用域为属性为scoped
* vue是组件化的框架，在根组件下可以有很多子组件，子组件也可以引入组件。
## 生命周期函数
* beforeCreate
* created
* beforeMount
* mounted:请求数据，操作dom
* beforeUpdate
* updated
* beforeDestroy
* destroyed
在这些钩子函数中，子父组件的执行顺序
![](https://raw.githubusercontent.com/MuRongJs/learningNotes/master/images/vueLifecycle.png)
## 请求数据
* vue-resource
    1、安装：cnpm i vue-resource --save
    2、引用：import vueResource from 'vue-resource';
    3、使用vue-resource模块，在Vue实例上挂载：Vue.use(vueResource);
    4、使用vue-resource模块的方法--在组件内：this.$http.get('').then(成功回调函数，失败回调函数);
    备注：当使用箭头回调函数的时候，函数内部的this的上下文不改变。不使用箭头函数时，要把this赋值给其它变量才能调用Vue 实例对象。
* axios
    1、安装：cnpm i axios --save
    2、引用：那个组件需要，就在哪里应用---import axios from 'axios';
    3、使用axios模块：axios.get(xxx).then();返回的是promise对象
* fetch-jsonp
## 组件直接通信
### 父向子通信
* 在父组件引用子组件后通过绑定，将父组件的声明的值绑定在子组件的属性上。
* 子组件通过props属性，以数组形式，将自定义属性进行声明，通过属性名就可以得到父组件绑定的值。
* 也可以通过父组件绑定this给子组件属性，子组件因此可以获取到父组件的数据和方法。
* 可以通过在props中设置每个传过来值的类型，
## 路由
### 
* 安装：cnpm i vue-router --save
* 在根实例上引用：import vueRouter from 'vue-router';
* 根实例上挂载vue-router插件：Vue.use(vueRouter);
* 配置路由
    1、创建组件：者内入定义、引入组件。
    2、定义路由：每个路由映射一个组件；默认路由为redirect
    3、实例化vue-router：const router = new vueRouter({     routes  //（缩写）相当于 routes:routes  });这里面的routes就是定义的路由
    4、在根组件上配置挂载router
    5、在根组件内添加 <router-view></router-view>,此为路由中组件的视窗
    6、跳转为 <router-link to='xxx'></router-link>
