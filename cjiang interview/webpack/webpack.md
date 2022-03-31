
###  将 webpack 整个庞大的体系抽象为三方面的知识：
> 1. 构建的核心流程
> 2. loader 的作用
> 3. plugin 架构与常用套路

三者协作构成 webpack 的主体框架：
![preview](https://pic4.zhimg.com/v2-2e1d66f4a0900fdf4ae06010f45262fb_r.jpg)

**核心流程解析**
首先，我们要理解一个点，Webpack 最核心的功能：

> At its core, webpack is a static module bundler for modern JavaScript applications.

也就是将各种类型的资源，包括图片、css、js等，转译、组合、拼接、生成 JS 格式的 bundler 文件。官网首页的动画很形象地表达了这一点：

![preview](https://pic4.zhimg.com/80/v2-a6789968d6ebfaad66b6b94df2f88e73_720w.jpg)