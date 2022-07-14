## git常用指令
* git init-------初始化一个仓库
* ssh-keygen -t rsa -C "youremail@example.com"-------生成ssh公钥
* git add . ------添加文件到暂存区
* git commit -m '提交说明' -----提交暂存到当前分支
* git clone 项目地址 ----从远程库克隆项目
* git branch-----命令会列出所有分支，当前分支前面会标一个*号
* git remote -v -----查看远程仓库
* git remote remove origin -----删除远程仓库
* git push 远程分支名 master -----提交本地分支到远程
* git pull 远程分支名  本地分支名  -----拉取分支
* git push -f gitee2 master -----强制提交覆盖远程分支
* git remote add gitee2 git@gitee.com:divhub/ErJieDuan.git ---关联一个远程仓库
* git config --global user.name "***" ----本地用户名
* git config –-global user.email "*****"-----本地邮箱
* git config user.name -----查看用户名
* git config user.email -----查看邮箱地址
* git branch -a-----查看所有分支
* git branch -d 分支名-----删除一个本地分支
* git branch --v -----查看本地所有分支对应的远程分支使用命令
* git branch --set-upstream-to=origin/dev dev 本地分支关联远程分支
* git branch -help  -----查看命令行参数
* git checkout 分支名-----切换到某分支
* git log----查看提交记录
* git log --pretty=oneline----查看提交记录简略信息
* git checkout -- 文件名-----丢弃工作区修改
* git reset --hard HEAD^----回滚至上一个版本，可丢弃暂存区修改
* git reset --hard 提交的id-----回滚至指定版本
* git rm ------删除文件
* git checkout -b 分支名 ------创建一个分支并切换到该分支
* git merge 分支名-----合并指定分支到当前分支
* git config -l -- 查看现在的git环境详细配置
* git status  --用于查看在你上次提交之后是否有对文件进行再次修改。
* git fatal: 拒绝合并无关的历史
* 解决方法是：允许其合并历史。只需要在分支名后加上：--allow-unrelated-histories  即可（注意是两个中划线）；

## git提交前缀
* build：表示构建，发布版本可用这个
* ci：更新 CI/CD 等自动化配置
* chore：杂项，其他更改
* docs：更新文档
* feat：常用，表示新增功能
* fix：常用：表示修复 bug
* perf：性能优化
* refactor：重构
* revert：代码回滚
* style：样式更改
* test：单元测试更改
