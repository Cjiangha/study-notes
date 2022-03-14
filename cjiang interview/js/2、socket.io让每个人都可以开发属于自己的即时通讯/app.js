const express = require('express');
const app = express();
// 设置静态文件夹，会默认找到当前目录下的index.html 文件当作访问页面
app.use(express.static(__dirname));

//WebSocket 是依赖HTTP协议进行握手的
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const SYSTEM = '系统';

//监听与客户端的连接事件
io.on('connect', socket => {
    console.log('服务器连接成功');
    // 记录用户名，用来记录是不是第一次进入，默认是undefined
    let username;

    //监听客户端发送过来的消息
    socket.on('message', msg => {
        //如果用户名存在
        if (username) {
            // 服务器发送message事件，把msg消息再发送给客户端.
            io.emit('message', {
                user: username,
                content: msg,
                createAt: new Date().toLocaleString() //日期转为字符串
            })
        } else { //用户名不存在
            username = msg;
            // 向除了自己的所有人广播，毕竟没进入自己是知道的，没必要跟自己再说一遍
            socket.broadcast.emit('message',{
                user:SYSTEM,
                content: `${username}加入了聊天`,
                createAt: new Date().toLocaleString() //日期转为字符串
            });


        }

    })
});

// ☆ 这里要用server去监听端口，而非app.listen去监听(不然找不到socket.io.js文件)
server.listen(4000)