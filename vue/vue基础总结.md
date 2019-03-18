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
### 父组件主动向子组件获取数据和方法
父组件内部通过指令ref，定义子组件唯一标示，在js事件内通过this.$refs.标示  获取子组件实例,通过子组件实例就可以获取子组件内的事件和方法了。
### 子组件主动向父组件获取数据和方法
在js事件中通过this.$parent来获取父组件实例，通过父组件实例就可以获取父组件内的事件和方法了。
### 非父子组件传值
1、新建vue实例 2、需要通信的组件引用此实例 3、在生命周期函数上监听事件指定事件(vue新实例).$on(e,回调函数) 4、在methods事件上广播事件(vue新实例).$emit(e,data);
## 路由
### 路由的配置
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
### 动态路由路由传值
* 配置路由：routes:[{path:'./xx/xx/:id', component: xxx}]
* 在route-link里面绑定to属性
* 在组件内获取路由传输的值：this.$route.params
### 动态路由get传值
* 其它同上
* 四点不一样：1、获取传输的值不一样：this.$route.query；2、不需要在配置路由的时候在路由上添加':'冒号；3、在router-link上在路由    :to='"/content?id=" + item.aid'；必须在hash模式下才能使用
**在hash模式下，可以进行路由传值、get传值、编程式传值；在history模式下，不能进行路由传参，能进行编程式传参,而且必须后台支持**
### 路由跳转
除了<router-link to='xxx'></router-link>，还有js跳转的方法，比如:
* this.$router.push('xxx')
* this.$router.push({path:'xxx'})
* 命名路由this.$router.push({name:'xxx',params:{}})：首先在挂载路由的对象上设置name属性，params是传递的参数
### 路由的嵌套
* 配置子路由，children属性下配置在此组件下的子路由
* 在父组件内添加 <router-view></router-view>    
### 路由模块分离
将路由的代码分离为路由模块，专门作为路由的配置
# 基于vue的ui框架（Element ui pc端、MintUi 移动端)
## 基于Vue的Ui框架
* Element Ui    基于vue  pc端的UI框架  
* MintUi         基于vue 移动端的ui框架
### element UI的使用：
	1.找官网  http://element.eleme.io/#/zh-CN/component/quickstart

	2.安装  cnpm i element-ui -S         -S表示  --save

	3.引入element UI的css 和 插件
		import ElementUI from 'element-ui';
		import 'element-ui/lib/theme-chalk/index.css';
		Vue.use(ElementUI);
	4、webpack.config.js  配置file_loader      http://element.eleme.io/1.4/#/zh-CN/component/quickstart
		  {
			test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
			loader: 'file-loader'
	          }


	5.看文档直接使用。
### element UI组件的单独使用（第一种方法）：
	1、cnpm install babel-plugin-component -D    
    2、找到.babelrc 配置文件把
		{
		  "presets": [
		    ["env", { "modules": false }],
		    "stage-3"
		  ]
		}
		改为  注意：	
		{
		  "presets": [["env", { "modules": false }]],
		  "plugins": [
		    [
		      "component",
		      {
			"libraryName": "element-ui",
			"styleLibraryName": "theme-chalk"
		      }
		    ]
		  ]
		}
	3、
        import { Button, Select } from 'element-ui';

        Vue.use(Button)
        Vue.use(Select)
element UI组件的单独使用（第二种方法）：
        import { Button, Select } from 'element-ui';
        Vue.use(Button)
        Vue.use(Select)
    引入对应的css
        import 'element-ui/lib/theme-chalk/index.css';
    如果报错： webpack.config.js  配置file_loader
        {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        }
# vuex
* Vuex解决不同组件的数据共享问题
* 数据持久化
## 使用
* 安装: cnpm install vuex -S
### state
state在vuex主要用于存储数据
### mutations
mutations主要放的是方法，方法主要用于改变state里面的数据
`
import Vue from 'Vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    count:1
}

const mutations = {
     inCount(){
         state.count++;
     }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store
`
建立好仓库后，暴露stroe。
* 在需要的组件内引入store，在将store在data层级挂载上
* 通过this.$store.state.数据来使用store中的state的数据
* 或者通过this.$store.commit('xxx')触发mutations中定义的方法，也可以在这个方法中改变state中的数据

### getter
相当于组件内的计算属性
`
const getters = {
    computedCount: (state.count) => {
        return start.count*2;
    }
}
`
