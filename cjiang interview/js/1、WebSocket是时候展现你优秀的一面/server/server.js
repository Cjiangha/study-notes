/*
    1、websocket
*/ 

// const express = require('express');
// const app = express();
// // 设置静态文件夹
// app.use(express.static(__dirname));
// // 监听3000端口
// app.listen(3000);
// // =============================================
// // 开始创建一个websocket服务
// const Server = require('ws').Server;
// // 这里是设置服务器的端口号，和上面的3000端口不用一致
// const ws = new Server({ port: 9999 });

// // 监听服务端和客户端的连接情况
// ws.on('connection', function(socket) {
//     // 监听客户端发来的消息
//     socket.on('message', function(msg) {
//         console.log(msg);   // 这个就是客户端发来的消息
//         // 来而不往非礼也，服务端也可以发消息给客户端
//         socket.send(`这里是服务端对你说的话： ${msg}`);
//     });
// });

/*
    2、socket.io
*/ 

const express = require('express');
const app = express();
// 设置静态资源
app.use(express.static(__dirname))
// 通过node的http模块来创建一个server服务
const server = require('http').createServer(app);
// WebSocket是依赖HTTP协议进行握手的
const io = require('socket.io')(server);
// 监听客户端与服务端的连接
io.on('connection', function(socket) {
    // send方法来给客户端发消息
    socket.send('青花瓷');
    // 监听客户端的消息是否接收成功
    socket.on('message', function(msg) {
        console.log(msg);  // 客户端发来的消息
        socket.send('天青色等烟雨，而我在等你' );
    });
});
// 监听3000端口
server.listen(3000);