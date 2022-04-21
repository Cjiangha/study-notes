module.exports = [
    {
        "title": "git题：git命令：\n初始化 创建一个隐藏的.git文件夹",
        "answer": ["git init"]
    },
    {
        "title": "git题：git命令：\n读取设置用户名",
        "answer": ["git config --global user.name读取\ngit config --global user.name name //设置用户名", "git config --global user.name", "git config --global user.name name"]
    },
    {
        "title": "git题：git命令：\n读取设置邮箱地址",
        "answer": ["git config --global user.email读取\ngit config --global user.email email设置", "git config --global user.email", "git config --global user.email email"]
    },
    {
        "title": "git题：git命令：\n关联本地仓库",
        "answer": ["git remote add origin url"]
    },
    {
        "title": "git题：git命令：\n查看远程仓库",
        "answer": ["git remote -v"]
    },
    {
        "title": "git题：git命令：\n远程仓库重命名",
        "answer": ["git remote origin newname"]
    },
    {
        "title": "git题：git命令：\n克隆远程仓库",
        "answer": ["git clone url"]
    },
    {
        "title": "git题：git命令：\n提交到本地仓库",
        "answer": ["git commit -m \"\""]
    },
    {
        "title": "git题：git命令：\n查看当前文件的缓存区状态 查看状态",
        "answer": ["git status"]
    },
    {
        "title": "git题：git命令：\n提交内容到远程仓库",
        "answer": ["git push origin master"]
    },
    {
        "title": "git题：git命令：\n撤销工作区修改",
        "answer": ["git checkout -- <filename>撤销工作区修改 它是找离自己最近的暂存区的内容 git checkout .撤回所有\ngit reset HEAD<file>暂存区文件撤销（不覆盖工作区）", "git checkout .", "git checkout filename"]
    },
    {
        "title": "git题：git命令：\n提交到暂存区",
        "answer": ["git add <filename>提交到暂存区 git add . 把所有文件提交到暂存区", "git add ."]
    },
    {
        "title": "git题：git命令：\n 查看日志 查看在什么时间进行了什么操作",
        "answer": ["git log"]
    },
    {
        "title": "git题：git命令：\n 查看历史版本ID 查看历史操作记录",
        "answer": ["git reflog"]
    },
    {
        "title": "git题：git命令：\n 回退一个版本",
        "answer": ["git reset --(hard | mixed | soft) HEAD ^|~num\ngit reset --hard HEAD^\n--hard回退一个完整的版本（本地仓库和暂存区内容一致）git commit -m 之后\n\
        --mixed暂存区内容和工作区内容不一致 git add .之前\n--soft暂存区和工作区一至 git commit -m 之前", "git reset --hard HEAD^"]
    },
    {
        "title": "git题：git命令：\n 回退到指定id版本",
        "answer": ["git reset --hard <版本id>\ngit reset --hard id", "git reset --hard id"]
    },
    {
        "title": "git题：git命令：\n 回退到指定第几个版本",
        "answer": ["git reset --hard HEAD~x x是变量", "git reset --hard HEAD~x"]
    },
    {
        "title": "git题：git命令：\n 比较工作区与暂存区的差异",
        "answer": ["git diff"]
    },
    {
        "title": "git题：git命令：\n 比较暂存区与本地仓库中最近一次commit的内容差异",
        "answer": ["git diff --cached"]
    },
    {
        "title": "git题：git命令：\n 比较工作区与本地仓库中最近一次commit的内容差异",
        "answer": ["git diff HEAD"]
    },
    {
        "title": "git题：git命令：\n 查看分支",
        "answer": ["git branch"]
    },
    {
        "title": "git题：git命令：\n 创建新分支",
        "answer": ["git branch name"]
    },
    {
        "title": "git题：git命令：\n 切换分支",
        "answer": ["git checkout name"]
    },
    {
        "title": "git题：git命令：\n 创建并切换分支",
        "answer": ["git checkout -b name"]
    },
    {
        "title": "git题：git命令：\n 删除本地分支",
        "answer": ["git branch -d name"]
    },
    {
        "title": "git题：git命令：\n 删除远端分支",
        "answer": ["git push -d origin name"]
    },
    {
        "title": "git题：git命令：\n 合并分支 有冲突合并和无冲突合并",
        "answer": ["git merge name"]
    },
    {
        "title": "git题：忽略不需要备份保存的文件或目录的配置文件名",
        "answer": [".gitignore"]
    }
]