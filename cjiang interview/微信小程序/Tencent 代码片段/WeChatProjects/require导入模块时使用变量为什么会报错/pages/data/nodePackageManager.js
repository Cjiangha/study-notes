module.exports = [
    {
        "title": "包管理器：查看npm版本",
        "answer" : ["npm -v 或 npm --version\n - 表示简写 -- 表示全写","npm -v","npm --version"]
    },
    {
        "title": "包管理器：设置/读取npm的registry地址",
        "answer" : ["npm config set registry https://registry.npm.taobao.org \n npm config get registry",
    "npm config set registry url","npm config set registry https://registry.npm.taobao.org","npm config get registry"]
    },
    {
        "title": "包管理器：初始化npm package.json配置文件",
        "answer" : ["npm init\nnpm init -y\nnpm init --yes","npm init","npm init -y","npm init --yes"]
    },
    {
        "title": "包管理器：本地安装所有依赖dependencies + devDependencies",
        "answer": ["npm install 或 npm i","npm install","npm i"]
    },
    {
        "title": "包管理器：仅安装生产环境的依赖 dependencies",
        "answer": ["npm install --production","npm i --production"]
    },
    {
        "title": "包管理器：为了更方便的添加依赖，npm支持在使用install命令时，加入一些额外的参数，用于将安装的依赖包保存到package.json文件中\n安装到生产环境",
        "answer": ["npm install 包名 或 npm i 包名 或 npm i --save 包名 或 npm i -s 包名","npm i","npm i --save","npm install --save","npm install -s","npm install"]
    },
    {
        "title": "包管理器：为了更方便的添加依赖，npm支持在使用install命令时，加入一些额外的参数，用于将安装的依赖包保存到package.json文件中\n安装到开发环境",
        "answer": ["npm i --save -dev 包名 或 npm i -D 包名","npm i --save -dev","npm install --save -dev","npm i -D","npm install -D"]
    },
    {
        "title": "包管理器：npm支持脚本配置，只需要在package.json中配置script字段，即可配置各种脚本名称\n之后，我们可以运行简单的命令来完成各种操作\n运行方式是",
        "answer": ["npm run 脚本名称\nnpm对某些常用的脚本名称进行了简化，下面的脚本名称是不需要使用run的：\nstart stop test\n脚本中可以省略npx\nstart脚本有默认值：node server.js","npm run start","npm run"]
    },
    {
        "title": "包管理器：node中有一个全局变量global,该变量是一个对象，对象中的所有属性均可直接使用，global中有一个属性是process,该属性是一个对象，包含了当前运行node程序的计算机的很多信息，其中有一个是env，是一个对像，包含了计算机中所有的系统变量（环境变量）。一般通过系统变量NODE_ENV的值，来判定node程序处于何种环境\n可以配置script脚本，在设置好了NODE_ENV后启动程序 windows临时设置环境变量",
        "answer": ["set NODE_ENV=test&&node index.js\n为了避免不同系统的设置方式的差异，可以使用第三方库cross-env对环境变量进行设置\ncross-env NODE_ENV=devepoment node index.js","set node_env=test&&inde idex.js","set node_env=test"]
    },
    {
        "title": "包管理器：查询包安装路径",
        "answer": ["npm root [-g]","npm root","npm root -g"]
    },
    {
        "title": "包管理器：精确安装最新版本",
        "answer": ["npm install --save -exact 包名\nnpm install -E 包名","npm install -E","npm install --save-exact","npm i -E","npm i --save-exact"]
    },
    {
        "title": "包管理器：查询安装的包",
        "answer": ["npm list [-g] [--depth=依赖深度]\n别名：ls la ll","npm list","npm ls","npm la","npm ll","npm list -g --depth=0"]
    },
    {
        "title": "包管理器：检查有哪些包需要更新",
        "answer": ["npm outdated"]
    },
    {
        "title": "包管理器：更新包",
        "answer": ["npm update [-g] [包名]\n别名：up upgrade","npm update","npm up","npm upgrade"]
    },
    {
        "title": "包管理器：卸载包",
        "answer": ["npm uninstall [-g] 包名\n别名：remove rm r un unlink","npm uninstall","npm remove","npm rm","npm r","npm un","npm unlink"]
    }
]