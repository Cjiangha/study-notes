//
let socket = io();
//监听与服务器的连接
socket.on('connect', () => {
    console.log('连接成功');
})

// 列表list，输入框content，按钮sendBtn
let list = document.getElementById('list')
input = document.getElementById('input')
sendBtn = document.getElementById('sendBtn')

//发送消息的方法
function send() {
    let value = input.value
    if (value) {
        socket.emit('message', value);
        input.value = '';
    } else {
        alert('你输入的内容不能为空')
    }

}
sendBtn.onclick = send;

//回车发送消息的方法
function enterSend(event) {
    let code = event.keyCode;
    if (code === 13) send();
}

// 在输入框onkeydown的适合发送消息
input.onkeydown = function (event) {
    enterSend(event)
}

//监听message事件来接收服务器发来的消息
socket.on('message', data => {
    //创造新的li元素，最终将其添加到list列表
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
        <p style="color: #ccc;">
            <span class="user">${data.user}</span>
            ${data.createAt}
            </p>
        <p class="content">${data.content}</p>
    `
    //将li添加到list列表中
    list.appendChild(li);
    // 将聊天区域的滚动条设置到最新内容的位置
    list.scrollTop = list.scrollHeight;

})