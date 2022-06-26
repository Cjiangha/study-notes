- [下载地址](#下载地址)
- [命令提示说明](#命令提示说明)

## 下载地址
https://github.com/coreybutler/nvm-windows/releases

我的是windows的 会下载 nvm-setup.zip

无脑下一步 

输入nvm会出现nvm相关的说明配置信息

## 命令提示说明

nvm arch [32|64]：显示node是运行在32位还是64位。
nvm current： 显示活动版本。
nvm install <version> [arch]：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过- 远程服务器的SSL。
nvm list [available]：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
nvm on：开启node.js版本管理。
nvm off：关闭node.js版本管理。
nvm proxy [url]：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
nvm uninstall <version>：卸载指定版本node。
nvm use [version] [arch]：使用制定版本node。可指定32/64位。
nvm root [path]：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
nvm version：显示nvm版本。version可简化为v。
nvm node_mirror [node_mirror_url]：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
nvm npm_mirror [npm_mirror_url]：设置npm镜像。默认是https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。


**参考文章：**
[使用nvm管理node版本，一条龙解决前端开发环境配置](https://juejin.cn/post/7011398696999288839)

文章里面有我自己的踩坑记录 
>npm config set registry registry.npm.taobao.org
换成npm install cnpm -g --registry=registry.npm.taobao.org
不要直接设置 cnpm cnpm有时候会有坑，比如node-sass的安装