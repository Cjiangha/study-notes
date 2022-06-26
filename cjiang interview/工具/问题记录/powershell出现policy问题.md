# npm : 无法加载文件 D:\...\nodejs\npm.ps1，因为在此系统上禁止运行脚本


## **问题：** 在[VSCode](https://so.csdn.net/so/search?q=VSCode&spm=1001.2101.3001.7020)终端使用npm命令时，出现如下报错信息： 

```
npm : 无法加载文件 D:\ProgramFiles\nodejs\npm.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?Link
ID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ npm i
+ ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess

```

## 解决方法：

在终端输入get-ExecutionPolicy查看执行策略/权限；
输出Restricted(受限制的)；
终端输入Set-ExecutionPolicy -Scope CurrentUser命令给用户赋予权限；
输入RemoteSigned；
终端输入get-ExecutionPolicy查看一下权限，显示RemoteSigned就可以了。

## 截图信息
![记录的截图](./images/RecordImages.png)


**参考帖子：**[npm : 无法加载文件 D:\...\nodejs\npm.ps1，因为在此系统上禁止运行脚本](https://blog.csdn.net/pro_fan/article/details/120457551)







