module.exports = [
    {
        "title": "媒体标签：音频播放器标签",
        "answer": ["audio"]
    },
    {
        "title": "媒体标签：视频频播放器标签",
        "answer": ["video"]
    },
    {
        "title": "媒体标签：自动播放功能属性",
        "answer": ["autoplay 自动播放/Google Chrome不好使\npreload(none/metadata/auto) 预加载，规定是否在页面加载后载入音频 与 autoplay冲突","autoplay"]
    },
    {
        "title": "媒体标签：预加载属性，规定是否在页面加载后载入音频",
        "answer": ["preload(none/metadata/auto) 预加载，规定是否在页面加载后载入音频 与 autoplay冲突\n属性：\nnone 不加载数据\nmetadata 元数据 诸如时长、比特率、帧大小这样的原始数据，而不是媒体内容需要加载的\nauto 浏览器应当加载它认为适量的媒体内容","preload"]
    },
    {
        "title": "媒体标签：循环播放属性",
        "answer": ["loop"]
    },
    {
        "title": "媒体标签：(video 独有)当视频不可用时使用一张图片替代",
        "answer": ["poster"]
    },
    {
        "title": "媒体标签：播放控件属性",
        "answer": ["controls 播放控件 如果没有这个属性的话标签display: none","controls"]
    },
    {
        "title": "媒体标签：API 播放音频",
        "answer": ["play()","play"]
    },
    {
        "title": "媒体标签：API 暂停播放音频",
        "answer": ["pause()","pause"]
    },
    {
        "title": "媒体标签：API 重新加载音频",
        "answer": ["load()重新加载视频/音频元素，用于在更改来源或其他设置后对音频视频元素进行更新","load"]
    },
    {
        "title": "媒体标签：API 检测览器是否支持当前播放的文件格式",
        "answer": ["canPlayType(\"audio.mp3\") 相当于<source>，返回浏览器是否支持当前播放的文件格式","canPlayType"]
    },
    {
        "title": "媒体标签：播放音量属性",
        "answer": ["volume 属性表示播放音量，介于0(静音)~1(最大音量)之间，默认1超过范围会报错","volume"]
    },
    {
        "title": "媒体标签：静音模式属性",
        "answer": ["将muted属性设置为true则会进入静音模式，设置为false则会恢复之前指定的音量继续播放","muted"]
    },
    {
        "title": "媒体标签：媒体播放速度的属性 快进、快退、慢放",
        "answer": ["playbackRate 用于指定媒体播放的速度。值为1表示正常速度，大于1则表示快进，0~1之间表示慢放，负值表示回放 不同浏览器会有差别\ngoogle浏览器 可设置最小值 0 最大值 16 大于小于都会报错","playbackRate"]
    },
    {
        "title": "媒体标签：设置或返回音频播放的当前位置的属性",
        "answer": ["currentTime设置或返回音频/视频播放的当前位置","currentTime"]
    },
    {
        "title": "媒体标签：返回当前音频/视频的总时长的属性",
        "answer": ["duration 返回当前音频/视频的总时长单位秒","duration"]
    },
    {
        "title": "媒体标签：判断是否是暂停状态的属性",
        "answer": ["paused 是否是暂停状态 暂停状态返回true 播放状态返回false 只读","paused"]
    },
    {
        "title": "媒体标签：判断是否正在跳到一个新的播放点的属性",
        "answer": ["seeking 是否正在跳到一个新的播放点	为true表示播放器正在调到一个新的播放点","seeking"]
    },
    {
        "title": "媒体标签：判断是否播放完并且停下的属性",
        "answer": ["ended 如果播放完并且停下,ended为true","ended"]
    },
    {
        "title": "媒体标签：查看已经播放(看过)的时间段的属性",
        "answer": ["played 属性返回已经播放(看过)的时间段","played"]
    },
    {
        "title": "媒体标签：返回当前已经缓冲的时间段的属性",
        "answer": ["buffered 属性返回当前已经缓冲的时间段","buffered"]
    },
    {
        "title": "媒体标签：返回用户可以跳转的时间段的属性",
        "answer": ["seekable 属性返回用户可以跳转的时间段","seekable"]
    },
    {
        "title": "媒体标签：开始播放事件",
        "answer": ["play 开始播放触发 onplay = fun","play","onplay"]
    },
    {
        "title": "媒体标签：开始播放事件",
        "answer": ["pause 暂停触发事件","pause","onpause"]
    },
    {
        "title": "媒体标签：浏览器获取完媒体的元数据触发的事件",
        "answer": ["loadedmetadata 浏览器获取完媒体的元数据触发","loadedmetadata","onloadedmetadata"]
    },
    {
        "title": "媒体标签：浏览器已经加载完当前帧数据，准备播放时触发的事件",
        "answer": ["loadeddata 浏览器已经加载完当前帧数据，准备播放时触发，IE8不兼容\
        当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时，会发生 loadeddata 事件。","loadeddata","onloadeddata"]
    },
    {
        "title": "媒体标签：当前播放结束后触发的事件",
        "answer": ["ended 当前播放结束后触发","ended","onended"]
    },
    {
        "title": "媒体标签：音频/视频(audio/video)加载发生错误时触发的事件",
        "answer": ["error 音频/视频(audio/video)加载发生错误时触发","error","onerror"]
    },
    {
        "title": "媒体标签：音频的当前就绪状态",
        "answer": ["readyState 返回当前就绪状态\n0：没有关于音频是否就绪的信息\n1：关于与音频就绪的元数据\n2：关于当前播放位置数据是可用的，但是没有足够的数据来播放下一帧\n3：当前及至少下一帧的数据是可用的\n4：可用数据足以开始播放","readyState"]
    },
    {
        "title": "媒体标签：音频的错误状态",
        "answer": ["error返回一个MaudioError对象，对象的code 属性返回一个数字值，它表示音频的错误状态\
        error.code :1：取回过程被用户终止\n2：当下载时发生错误\n3：当解码时发生错误\n4：不支持音频/视频","error","error.code"]
    },
    {
        "title": "媒体标签：扩展 在最新版的Chrome浏览器（以及所有以Chromium为内核的浏览器）中，已不再允许自动播放音频和视频。就算你为video或audio标签设置了autoplay属性也一样不能自动播放。如果你用 javascript 代码显式调用play方法你将会在控制台看到如下异常：\nUncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.\
        Firefox也有类似的异常提示：\nNotAllowedError: The play method is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.",
        "answer": ["这是因为，Chrome只允许用户对网页进行主动触发后才可自动播放音频和视频。其实，严格地来说，是Chrome不允许在用户对网页进行触发之前播放音频，而视频其实是不受限制的。但因为视频文件同样包含了音频，所以也一同被禁止了。Chrome这样做的目的是为了防止开发者滥用自动播放功能而对用户产生骚扰\
        既然知道了原因，那就开始找解决方法。\n比较常规的做法是，为video标签设置muted属性，使它静音，这样视频就能自动播放了，但是没有声音。\n然后待用户在网页上有了任意触发后，再将muted去掉，或者让用户手动去打开音频（腾讯视频就是这样做的）\
        优酷页面打开后视频不自动播放，需用户点击按钮才开始播放，B站解决方法和优酷一样，爱奇艺页面打开后视频自动开始播放，但声音需用户手工开启\
        所以暂时不要去想什么hack的方法了，有办法这些大厂早用了，还是老老实实引导用户手工点一下吧。"]
    },
    {
        "title": "媒体标签：多类型资源载入",
        "answer": ["<audio id=\"music\">\
		\n<source src=\"./aa.mp3\" type=\"audio/mpeg\">\
		\n<source src=\"./aa.ogg\" type=\"audio/ogg\">\
	    \n</audio>"]
    }
]