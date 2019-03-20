## 1. 说说在Vue项目中使用swiper的问题及解决办法
    问题: 创建Swiper对象后, 轮播/滑动没有效果?
    原因: 创建对象太早, 得在数据显示后创建
    解决: watch + $nextTick() 或 callback + $nextTick()
    
## 2. 说说你对代理的理解
    1). 是什么?
       具有特定功能的程序
    2). 运行在哪?
       前台应用端
       只能在开发时使用
    3). 作用?
        解决开发时的ajax请求跨域问题
        a. 监视并拦截请求(3000)
        b. 转发请求(4000)
    4). 配置代理
       告诉代理一些信息: 转发的目标地址

## 3. 说说你对项目构建的理解
    1). 构建项目到底做些什么
       编译项目中的js, sass, less, stylus
       合并js/css等资源文件
       压缩js/css/html等资源文件
       JS语法的检查
    2). 构建工具
       作用: 简化项目构建, 实现自动化构建
       常用: gulp/webpack

## 4. webpack模块化打包的基本流程
    1> 连接: webpack从入口JS开始, 递归查找出所有相关联的模块, 并`连接`起来形成一个图(网)的结构
    2> 编译: 将JS模块中的模块化语法`编译`为浏览器可以直接运行的模块语法(当然其它类型资源也会处理)
    3> 合并: 将图中所有编译过的模块`合并`成一个或少量几个bundle文件, 而浏览器运行是打包生成的bundle文件
    
## 5. 比较loader与plugin
    1). loader:  用于加载特定类型的资源文件, webpack本身只能打包js, 如果打包css就需要css-loader/style-loader, 如果打包图片就需要file-loader
    2). plugin: 用来扩展webpack其它方面的功能, 如生成页面需要html-webpack-plugin, 压缩js需要uglifyjs-webpack-plugin
