## 1. 说说你vue项目开发中碰到的问题, 原因及解决办法
    1). 创建Swiper/BScroll对象后, 轮播/滑动没有效果?
       原因: 创建对象太早, 得在数据显示后创建
       解决: watch + $nextTick() 或 callback + $nextTick()
    2). 初始显示异常
        情况1: Cannot read property 'xxx' of undefined"
        原因: 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
        解决: 使用v-if指令
        
        情况2: Cannot read property 'avatar' of null"
        原因: 初始值是null, 而模块中直接显示2层表达式
        解决: 初始值为{}
    3). 问题: 更新状态数据, 对应的界面不变化
        原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
        解决: 
            Vue.set(obj, 'xxx', value)才有数据绑定
            this.$set(obj, 'xxx', value)才有数据绑定
    4). 问题: 点击添加购物项, 会1次添加多个
        原因: 创建了多个BScroll对象来管理同一个DOM元素
        解决: 只创建一个BScroll对象 
        扩展: 单例对象: 
            创建前, 先判断是否已经存在, 只有不存在才创建
            创建后, 保存创建的对象
            
## 2. vue与react的比较?
    1). 相似处
       功能: 动态构建用户界面
       虚拟DOM: 内部都通过虚拟DOM提高效率
       组件化: 都使用组件化编程思想编写项目
       Props: 组件间通信的基本方式
       构建工具: 脚手架, webpack
       Chrome开发工具: react/redux-dev-tool  vue-dev-tool
    2). 不同点
       界面: JSX与模板
       界面更新: 状态管理 与 对象属性监视
       数据绑定: 单向与双向

## 3. chrome调试应用的常用功能(窗口)
    Elements: 查看DOM标签和样式
    Console: 查看打印和错误信息
    NetWork: 查看请求(url, 请求方式, 请求参数)和响应
    Application: 查看浏览器端存储(localStorage, sessionStorage, cookie)
    Sources: debugger调试
    
    react: 查看react组件(state, props)
    redux: 查看redux管理的state
    vue: 查看vue组件或vuex状态

## 4. 说说你对debug调试的理解
    1). 调试的目的
         1). 查找bug: 不断缩小可疑代码的范围
         2). 查看程序的运行流程(用于熟悉新接手项目的代码)
       
    2). 如何开启调试模式
         1). 添加语debugger句: 程序运行前     此方式用打包后才运行的项目
         2). 添加(打)断点: 程序运行前或者过程中   此方式用运行源码js
       
    3). 如何进行调试操作
         resume: 恢复程序执行(可能执行完或者进入下一个断点处)
         step ove: 单步跳转, 尝试执行完当前语句, 进入下一条(如果内部有断点, 自动进入内部断点处)
         step into: 跳入, 进入当前调用函数内部
         step out: 跳出, 一次性执行完当前函数后面所有语句,并出去
         deactivate breakpoints: 使所有断点暂时失效
         
         call stack: 显示是程序函数调用的过程
         scop: 当前执行环境对应的作用域中包含的变量数据
         breakpoints: 断点列表

## 5. 说说你对json数据的理解
    1). 什么: json是一种用来存储结构化数据的文本数据结构
    2). 优点: 小巧, 可以轻松的与js相互转换
    3). 整体类型: 
       json对象: {}, 与js对象对应
       json数组: []  与js数组对应
    4). 组成: 
       结构: 类型与名称
       值
    5). 模拟json数据:
       与真实json数据在结构上要相同, 值可以不同