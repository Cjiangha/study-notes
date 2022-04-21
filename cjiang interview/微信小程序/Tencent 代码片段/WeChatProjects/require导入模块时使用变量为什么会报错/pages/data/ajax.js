module.exports = [
    {
        "title": "ajax: 获取ajax对象",
        "answer": ["var xhr = new XMLHttpRequest()//获取ajax对象\nxhr = new ActiveXObject(\"Microsoft.XMLHttp\");兼容ie",
    "XMLHttpRequest","ActiveXObjecct","new XMLHttpRequest","new ActiveXObject"]
    },
    {
        "title": "ajax: 初始化数据",
        "answer": ["ajax.open(GET/POST,\"url\",true)参数 请求方式，请求地址，是否异步","open"]
    },
    {
        "title": "ajax: 发送请求",
        "answer": ["ajax.send()如果是POST请求在send(data)里传数据\npost请求需要在send()之前设置请求头\nGET请求在url后面拼接 url?data","send"]
    },
    {
        "title": "ajax: 设置请求头",
        "answer": ["ajax.setRequestHeader(\"content-type","application/x-www-form-urlencoded\")\n把指定首部设置为所提供的值。在设置任何首部之前必须先调用open()\n规定在发送表单数据之前如何对其进行编码\napplication/x-www-form-urlencoded在发送前编码所有字符（默认）\nmultipart/form-data	(<input type='file'>)不对字符编码。在使用包含文件上传控件的表单时，必须使用该值",
        "setRequestHeader","setRequestHeader(\"content-type","application/x-www-form-urlencoded\")"]
    },
    {
        "title": "ajax: 状态码监听事件",
        "answer": ["onreadystatechange状态码ajax.readyState发生改变时触发","onreadystatechange"]
    },
    {
        "title": "ajax: 状态码",
        "answer": ["ajax.readyState对象状态:\n0 = 未初始化，未调用send()方法\n1 = 读取中，已调用send()，正在发送请求\n2 = 已读取，send方法执行完成，接收到全部响应内容\n3 = 交互中，正在解析响应内容\n4 = 完成，响应内容解析完成","readyState"]
    },
    {
        "title": "ajax: 服务器返回的状态码",
        "answer": ["ajax.status\n404 = “文件未找到”\n200 = “成功” \n500 = “服务器内部错误”\n 304=“资源未被修改”\nstatusText服务器返回的状态文本信息","status"]
    },
    {
        "title": "ajax: 获得字符串形式的响应数据",
        "answer": ["ajax.responseText\n永远获取的是字符串形式的响应体\najax.response获取到的结果会根据 ajax.responseType 的变化而变\najax.responseType = 'json'; 告诉请求代理对象，服务端响应给我们的是 JSON\n在客户端这样设置responseType会有兼容问题","responseText"]
    },
    {
        "title": "ajax: 设置当请求发出后等待接受响应的时间",
        "answer": ["ajax.timeout","timeout"]
    },
    {
        "title": "ajax: XMLHttpRequest的缺点",
        "answer": [`XMLHttpRequest的缺点:
                    1. 所有的功能全部集中在同一个对象上，容易书写出混乱不宜维护的代码
                    2. 采用传统的事件驱动模式，无法适配新的Promise Api`]
    },
    {
        "title": "ajax: Fetch Api的特点",
        "answer": [`Fetch Api的特点
        1. 并非取代ajax,而是对ajax传统API的改进
        2. 精细的功能分割，：头部信息、请求信息、响应信息等均分不到不同的对象，更利于处理各种复杂的ajax场景
        3. 使用 Promise Api,更利于异步代码的书写`]
    },
    {
        "title": "ajax: XMLHttpRequest的缺点",
        "answer": [`XMLHttpRequest的缺点:
                    1. 所有的功能全部集中在同一个对象上，容易书写出混乱不宜维护的代码
                    2. 采用传统的事件驱动模式，无法适配新的Promise Api`]
    },
]