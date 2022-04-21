module.exports = [
    {
        "title": "HTML5：设置永久的缓存 客户端存储 除非手动删除",
        "answer": ["localStorage.name = 'name';\nlocalStorage.setItem('name','name');", "localstorage", "localStorage"]
    },
    {
        "title": "HTML5：设置临时的缓存 客户端存储 窗口关闭就没有了",
        "answer": ["sessionStorage.name = 'name';\nsessionStorage.setItem('name','name');", "sessionStorage", "sessionstorage"]
    },
    {
        "title": "HTML5：删除某条storage缓存记录",
        "answer": ["localStorage.removeItem('name')\nsessionStorage.removeItem('name')",
            "localStorage.removeItem", "localstorage.removeitem", "sessionStorage.removeItem", "sessionstorage.removeitem"]
    },
    {
        "title": "HTML5：清空storage缓存",
        "answer": ["localStorage.clear()\nsessionStorage.clear()", "localStorage.clear", "localstorage.clear", "sessionStorage.clear",
            "sessionstorage.clear"]
    },
    {
        "title": "HTML5：获取Geolocation对象 用来获取地理位置信息",
        "answer": ["window.navigator.geolocation"]
    },
    {
        "title": "HTML5：用Geolocation对象 获取当前的位置信息，需要传三个参数，第一个必填",
        "answer": ["window.navigator.geolocation.getCurrentPosition(success,error,options)系统会给回调函数传一个获取成功或失败的对象",
            "getCurrentPosition(success,error,options)", "getCurrentPosition(success,error)", "getCurrentPosition(success)",
            "getcurrentposition(success,error,options)", "getcurrentposition(success,error)", "getcurrentposition(success)",
            "getcurrentposition", "getCurrentPosition", "window.navigator.geolocation.getCurrentPosition", "window.navigator.geolocation.getcurrentposition"]
    },
    {
        "title": "HTML5：获取当前的位置 纬度信息",
        "answer": ["e.coords.latitude\ngetCurrentPosition(success) success返回的对象中有e.coords和e.timestamp:时间戳两个属性\ne.coords包含经纬度、海拔、加速度、方向等信息",
            "e.coords.latitude", "coords.latitude", "latitude"]
    },
    {
        "title": "HTML5：获取当前的位置 经度信息",
        "answer": ["e.coords.longitude\ngetCurrentPosition(success) success返回的对象中有e.coords和e.timestamp:时间戳两个属性\ne.coords包含经纬度、海拔、加速度、方向等信息",
            "e.coords.longitude", "coords.longitude", "longitude"]
    },
    {
        "title": "HTML5：获取当前的海拔",
        "answer": ["e.coords.altitude\ngetCurrentPosition(success) success返回的对象中有e.coords和e.timestamp:时间戳两个属性\ne.coords包含经纬度、海拔、加速度、方向等信息",
            "e.coords.altitude", "coords.altitude", "altitude"]
    },
    {
        "title": "HTML5：获取当前的定位精准度，单位m",
        "answer": ["e.coords.accuracy\ngetCurrentPosition(success) success返回的对象中有e.coords和e.timestamp:时间戳两个属性\ne.coords包含经纬度、海拔、加速度、方向等信息",
            "e.coords.accuracy", "coords.accuracy", "accuracy"]
    },
    {
        "title": "HTML5：监听设备加速度变化的事件",
        "answer": ["window.ondevicemotion事件源对象属性:\nacceleration获取加速度（不包含重力加速度 x y z）\naccelerationIncludingGravity（包括重心引力,z轴方向加了9.8,在x,y方向上的值两者相同）重力加速度 （需要陀螺仪支持）x y z\
        \nrotationRate(alpha = z轴, beta = x轴, gamma = y轴)旋转速率\ninterval 获取的时间间隔\n以上均为只读属性",
            "devicemotion", "window.ondevicemotion", "ondevicemotion"]
    },
    {
        "title": "HTML5：监听设备在方向上的变化的事件",
        "answer": ["window.ondeviceorientation事件源对象属性:\nalpha 表示设备沿z轴上的旋转角度，范围为0~360 在chrome浏览器中要减270度 在火狐浏览器中要减180度 才相对准确\nbeta 表示设备在x轴上的旋转角度，范围为-180~180。它描述的是设备由前向后旋转的情况\
        \ngamma 表示设备在y轴上的旋转角度，范围为-90~90。它描述的是设备由左向右旋转的情况\n4、webkitCompassHeading：与正北方向的角度差值。正北为0度，正东为90度，正南为180度，正西为270度。因为0度是正北，所以叫指北针。ios\
        \n5、webkitCompassAccuracy：指北针的精确度，表示偏差为正负多少度。一般是10。ios",
            "deviceorientation", "window.ondeviceorientation", "ondeviceorientation"]
    }
]