- [npm 功能](#npm-功能)
- [npm 常用命令](#npm-常用命令)
  - [npm 常用命令](#npm-常用命令-1)
  - [npm 依赖相关命令](#npm-依赖相关命令)
- [npm 代理设置相关](#npm-代理设置相关)
- [其他](#其他)
- [发布包三步曲命令](#发布包三步曲命令)
- [nrm 基本使用](#nrm-基本使用)
- [参考资料](#参考资料)
- [转自文章](#转自文章)
## npm 功能

> 特别说明：所有 -g 全局操作，在mac下都需要添加sudo 权限执行

功能：

- 包管理工具（包括：下载，删除，更新，查看，链接，发布）

安装：

- 随着node的安装会自动安装 （版本升级：sudo npm install npm -g）

缺点：

- 默认源服务器在国外：需要设置成国内的代理源，或者使用proxy代理网络访问
  - 慢
  - 丢包

## npm 常用命令

### npm 常用命令

- npm版本查看： npm -v

- npm帮助文档：

  - npn help // 简单帮助文档

  - npm -l // 详细帮助文档
  - npm config --help // 查看子命令，简单文档
  - npm help config // 查看子命令,详细文档

- 查看npm配置文件：

  - npm config list // 查看
  - npm config edit // 编辑

### npm 依赖相关命令

- 安装依赖
  - 本地安装
    - 无需打包（devDependencies）：
      - npm i prettier， npm i prettier -D // 两种写法效果一样
    - 需要打包（dependencies对象中）：
      - npm install vue-router@0.7.13 -S // 安装指定版本的依赖
    - 安装package.json指定的依赖：
      - npm i
  - 全局安装(要执行全局安装的命令)：
    - npm i typescript -g
- 卸载依赖
  - npm uninstall react
  - npm uninstall typescript -g
- 清除npm缓存：
  - npm cache clean
  - npm cache clean --force

## npm 代理设置相关

- 代理设置：npm会通过你的代理地址，请求远程包
  - npm config set proxy=[http://127.0.0.1:2012](https://link.segmentfault.com/?enc=oSIz2c7WeSXo3mHVflAHRA%3D%3D.rgvtyMQxtLC%2B5fHhLCsFaYYIhLuTo4Aed0D%2F4TgHiIE%3D) //
  - npm config set https-proxy [http://127.0.0.1:2012](https://link.segmentfault.com/?enc=pAb3tn%2BYPOM9ilpDs2E%2Biw%3D%3D.mvTbKY%2FRTakarm%2B9Brkf8UCzhrsu2s5unlIvSqff4R0%3D) // 效果和上面一样
- npm 源指定 (这里设置会永久生效，建议使用nrm来管理，方便切换淘宝源，和官方源，毕竟有时间淘宝源同步时效有问题，没官方准确)
  - npm config set registry=[http://registry.npmjs.org](https://link.segmentfault.com/?enc=N1k6QwnGeN5DoOh4WGhucQ%3D%3D.1vcL23jBhfGhf0JyOIqmQ9mt6m1pQQi%2BD3Xts66Jzls%3D) // 使用npm官方源
  - npm config set registry [https://registry.npmmirror.com](https://link.segmentfault.com/?enc=BKwTDWpkguX1%2B69ptpgHMw%3D%3D.TFKVBx9NEbHOkh8VUkIARYEOARRFAIgWu6KsZlObTEo%3D) // 使用淘宝源
  - npm install -g cnpm --registry=[https://registry.npm.taobao.org](https://link.segmentfault.com/?enc=L1zBLdHjC9%2FCVACWSI6LkA%3D%3D.7BEz9VGyH6MSYvQnZzmmIHy4WluGIbDwzdVXsw0i61c%3D) // install 和 registry联合使用，cnpm ,npm命令分开**【推荐】**
- 取消代理
  - npm config delete proxy // 取消网络代理
  - npm config delete https-proxy //取消http协议的代理
  - npm config set proxy null
  - npm config set https-proxy null
- npm 代理设置查看
  - npm get registry // 代理源查看
  - npm get proxy, npm get http-proxy
  - npm get registry

## 其他

- npm link // 连接到本地
- npm unlink myCli // 取消连接到本地
- npm view react versions // 查看某个依赖的全部版本：

## 发布包三步曲命令

- npm init // 初始化：本地生成package.json文件
- npm login // 登陆： 也可以使用 npm adduser命令注册
- npm publish // 发布 (撤消发布：npm unpublish myCli@1.0.1)

## nrm 基本使用

- npm i nrm -g // 全局安装nrm
- nrm ls // 查看源列表
- nrm test // 测试源速度
- nrm use taobao // 使用指定的源

## 参考资料

- npm菜鸟教程：[https://www.runoob.com/nodejs...](https://link.segmentfault.com/?enc=5zEmHWPCpECOaHIPdK9mmg%3D%3D.%2FlZIhlm%2BurUY0pcvXtvHY%2BkO1xFshFcCNkGMhE8nJLtr3K94qBBIorLABhbOOJ3V)
- 淘宝npm镜像设置：[http://www.npmmirror.com/?spm...](https://link.segmentfault.com/?enc=CHjQz3oZOflwdqie8S76aw%3D%3D.Jv2li%2BZGog%2FmHOECIJeAyLU6XUKta0ncE7URK0wKWz2noalTC9R9ME4C%2BpEzFBw7LEOZr0j0VVJVqyajELCkBw%3D%3D)
- npm官网命令大全：[https://docs.npmjs.com/cli/v8...](https://link.segmentfault.com/?enc=EoHKJRgq5zDcW5IjPrJ0PA%3D%3D.WHNc5PR94PmKF%2BLl3l0d%2B18tPb%2F1vUp41CuVVN5JrHWADdth%2B4%2FkwvLJ%2F%2BWhTsVS)
- 整理总结：npm常用命令与操作篇 [https://zhuanlan.zhihu.com/p/...](https://link.segmentfault.com/?enc=Vw7V2%2FWHW%2B1P7ILOqfhjmw%3D%3D.%2F1VuibXTwjBCUs0NnbyXwvxDncBQBw3v5TFEyWOXWQaZ5XrhEQUt5HkEu2xBZgpM)


## 转自文章
https://segmentfault.com/a/1190000041049754