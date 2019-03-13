# 安装
* 全局方式:npm install --global gulp-cli
* 局部方式:npm install --save-dev gulp
* 查看本地版本: npx gulp -v
* npx是指gulp在未全局安装时，本地项目调用gulp模块的命令，npx gulp等同于 .\node_modules\.bin\gulp
# 使用
## gulpfile.js
`
const { series } = require('gulp');

function minify(cd){
    cd();
}

function transpile(cd){
    cd();
}

function livereload(cd){
    cd();
}

if(process.env.NODE_ENV === 'production'){
    exports.build = series(transpile, minify);
}else{
    exports.build = series(transpile, livereload);
}
`
* 其中series（串联）是一个一个执行
* parallel(并联)，同时执行
* series、parallel可以混合调用
* npx gulp --task是看执行的任务
* 通过process.env.NODE_ENV来区分开发还是生产
![](https://raw.githubusercontent.com/MuRongJs/learningNotes/master/images/gulpSeriesAndParallel.png)