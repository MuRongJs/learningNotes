# webpack核心概念
#### Entry
入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
#### Module：模块
在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
#### Chunk：代码块
一个 Chunk 由多个模块组合而成，用于代码合并与分割。
####Loader：模块转换器
用于把模块原内容按照需求转换成新内容。
#### Plugin：扩展插件
在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
#### Output：输出结果
在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

    const path = require('path');
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    module.exports = {
        //javaScript 执行入口文件
        entry: './main.js',
        output: {
            //把所有依赖模块合并输出到一个bundle.js文件
            //filename: 'bundle.js',
            
            path: path.resolve(__dirname , './dist')//输入文件都放到 dist 目录下
        },
        module:{//module.rules 数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换。
            rules:[
                // {
                    //遇到以 .css 结尾的文件时先使用 css-loader 读取 CSS 文件，再交给 style-loader 把 CSS 内容注入到 JavaScript 里。
                    // test: /\.css$/,
                    // use:['style-loader', 'css-loader?minmize']
                // }
                {
                    //将css文件提取到单独文件
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use:['css-loader'],
                    })
                }
            ]
        },
        plugins:[
            new ExtractTextPlugin({//构建工程
                filename: `[name]_[contenthash:8].css`,
            })
        ]
    }
# 配置
## Entry
entry是配置模块的入口，当进行webpack构建时，从入口文件开始解析。
### context
webpack构建时，会以context为根目录，进行寻找相对路径的文件。也即是context为启动webpack时默认的当前工作目录。可以配置，如下：
    
    module.exports = {
        context: path.resolve(__dirname, 'app');
    }
### Entry类型
Entry类型可以是一下三种中的一个或者相互组合
    
    1.string: './app'
    2.array: ['./app/entry1', './app/entry2']; 搭配 output.library 配置项使用时，只有数组里的最后一个入口文件的模块会被导出。
    3.object: { a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2']}; 配置多个入口，每个入口生成一个 Chunk
### Chunk名称
Webpack 会为每个生成的 Chunk 取一个名称，Chunk 的名称和 Entry 的配置有关。

    1.Entry是string、array，只会生成一个Chunk，这个Chunk的名称是main；
    2.Entry是object，会出现多个 Chunk，这时 Chunk 的名称是 object 键值对里键的名称。
### 配置动态 Entry
当有多个页面需要为每个页面的入口配置一个 Entry ，我们可以配置一个动态的配置。
    
    entry:函数
## Output
输出最终的代码
### filename
配置输出文件名称。
    
    1.filename:'bundle.js';只需输出一个文件，静态写法。
    2.filename:'[name].js';当有多个Chunk要输出时，可以通过Chunk的名称来动态分配。
    Chunk内置变量包括:（id:Chunk的唯一标示、 name:Chunk的名称、 hash:Chunk的唯一标识、 Chunkhash:Chunk内容的Hash值)
### chunkFilename
chunkFilename 只用于指定在运行过程中生成的 Chunk 在输出时的文件名称。
### path
配置输出文件存放在本地的目录，通常通过 Node.js 的 path 模块去获取绝对路径。  
    
    path: path.resolve(__dirname, 'dist_[hash]')
### publicPath
异步加载资源，配置对应的URL地址，可以在复杂项目中进行和Entry配合进行资源异步加载。

    //dev时的配置
    filename:'[name]_[chunkhash:8].js'
    publicPath: 'https://cdn.example.com/assets/'
    
    //线上html
    <script src='https://cdn.example.com/assets/a_12345678.js'></script>
### crossOriginLoading
配置异步加载资源中script标签的crossorigin的属性：

    1.anonymous(默认) 在加载此脚本资源时不会带上用户的 Cookies
    2.use-credentials 在加载此脚本资源时会带上用户的 Cookies
### libraryTraget 和 library
Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们。

    output.libraryTarget 配置以何种方式导出库。
    output.library 配置导出库的名称。
output.libraryTarget 是字符串的枚举类型，支持以下配置:
##### var(默认)
编写的库将通过 var 被赋值给通过 library 指定名称的变量。

假如配置了 output.library='LibraryName'，则输出和使用的代码如下：

    // Webpack 输出的代码
    var LibraryName = lib_code;
    
    // 使用库的方法
    LibraryName.doSomething();
假如 output.library 为空，则将直接输出：
    
    lib_code
>其中 lib_code 代指导出库的代码内容，是有返回值的一个自执行函数。
##### commonjs
##### commonjs2
##### this
##### window
##### global
## Module
module 配置如何处理模块。
### 配置Loader
#####rules 配置模块的读取和解析规则
    1.条件匹配：通过 test 、 include 、 exclude 三个配置项来命中 Loader 要应用规则的文件。
    2.应用规则：对选中后的文件通过 use 配置项来应用 Loader，可以只应用一个 Loader 或者按照从后往前的顺序应用一组 Loader，同时还可以分别给 Loader 传入参数。
    3.重置顺序：一组 Loader 的执行顺序默认是从右到左执行，通过 enforce 选项可以让其中一个 Loader 的执行顺序放到最前或者最后。
例如：

    module: {
      rules: [
        {
          // 命中 JavaScript 文件
          test: /\.js$/,
          // 用 babel-loader 转换 JavaScript 文件
          // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
          use: ['babel-loader?cacheDirectory'],
          // 只命中src目录里的js文件，加快 Webpack 搜索速度
          include: path.resolve(__dirname, 'src')
        },
        {
          // 命中 SCSS 文件
          test: /\.scss$/,
          // 使用一组 Loader 去处理 SCSS 文件。
          // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
          use: ['style-loader', 'css-loader', 'sass-loader'],
          // 排除 node_modules 目录下的文件
          exclude: path.resolve(__dirname, 'node_modules'),
        },
        {
          // 对非文本文件采用 file-loader 加载
          test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
          use: ['file-loader'],
        },
      ]
    }
use数组可以传入每项loader的配置对象。

    use: [
      {
        loader:'babel-loader',
        options:{
          cacheDirectory:true,
        },
        // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
        // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
        enforce:'post'
      },
      // 省略其它 Loader
    ]
### noParse
noParse 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理。

noParse 是可选配置项，类型需要是 RegExp、[RegExp]、function 其中一个。

    // 使用正则表达式
    noParse: /jquery|chartjs/
    
    // 使用函数，从 Webpack 3.0.0 开始支持
    noParse: (content)=> {
      // content 代表一个模块的文件路径
      // 返回 true or false
      return /jquery|chartjs/.test(content);
    }
### parser
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          parser: {
          amd: false, // 禁用 AMD
          commonjs: false, // 禁用 CommonJS
          system: false, // 禁用 SystemJS
          harmony: false, // 禁用 ES6 import/export
          requireInclude: false, // 禁用 require.include
          requireEnsure: false, // 禁用 require.ensure
          requireContext: false, // 禁用 require.context
          browserify: false, // 禁用 browserify
          requireJs: false, // 禁用 requirejs
          }
        },
      ]
    }

