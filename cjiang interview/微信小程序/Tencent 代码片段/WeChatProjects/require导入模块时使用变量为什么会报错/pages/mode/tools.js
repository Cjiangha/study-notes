module.exports = {
    //初始化页面
    /**参数列表：
     *@param  data: 包含所有数据的对象
    * @param dataType：提类型，某一类型题的数组
    * @param titleNumArr：第0位存上一个题号，第1位存当前题题号的数组
    *@param _this: 主页面里的this,在这里主要用来操作主页面里的data对象 必填
    */
    readerPage (data, dataType, titleNumArr, _this) {
        let list = [];
        let i = 0;
        for (let prop in this.renderObj(data)) {
            list[i] = prop;
            i++;
        }
        _this.setData({
            list: list,
            tiNum: `一共有${dataType.length}题可以随机`
        })
        this.addData(dataType, titleNumArr, _this);//初始化数据，默认值all
    },
    //更新数据并渲染页面
    /**参数列表：
     * @param type：提类型，某一类型题的数组 必填
     * @param titleNumArr：第0位存上一个题号，第1位存当前题题号的数组 必填
     * @param _this: 主页面里的this,在这里主要用来操作主页面里的data对象 必填
     * @param previousNum：上一题的题号，传number类型 如果不传就按随机数 选填
     */
    addData (type, titleNumArr, _this, previousNum) {
        const i = previousNum || Math.floor(Math.random() * type.length);
        if (type.length === 1 || i != titleNumArr[0]) {//判断题号是否重复
            _this.setData({
                title: type[i].title
            })
            titleNumArr[1] = titleNumArr[0];
            titleNumArr[0] = i;
        } else {
            this.addData(type, titleNumArr, _this);//和上一题题号重复，递归
        }
    },
    //判断对错
    /**参数列表：
     * @param type：题类型，某一类型题的数组 必填
     * @param titleNumArr：第0位存上一个题号，第1位存当前题题号的数组 必填
     * @param  _this: 主页面里的this,在这里主要用来操作主页面里的data对象 必填
     */
    teacher (type, titleNumArr, _this) {
        // console.log(_this.data.oInput)
        if (this.unteacher(type, titleNumArr, _this.data.oInput) || _this.data.oInput.toUpperCase() == "TOO" || _this.data.oInput === "") {//too是留的后门，遇到不会的题可以跳过（too过）
            _this.setData({
                oInput: "",//清空输入框
                firstAnswer: type[titleNumArr[0]].answer[0]//显示上一提的答案
            })
            this.addData(type, titleNumArr, _this);
        }
    },
    //因为答案不是唯一的，unteacher函数遍历所有正确答案是否与输入的匹配
    /**参数列表：
    * @param type：提类型，某一类型题的数组 必填
    * @param value:输入的答案 必填
    * @param titleNumArr：第0位存上一个题号，第1位存当前题题号的数组 必填
    */
    unteacher (type, titleNumArr, value) {
        for (let i = 0; i < type[titleNumArr[0]].answer.length; i++) {
            if (value == type[titleNumArr[0]].answer[i]) {//输入的答案正确返回true
                return true;
            }
        }
        return false;
    },
    //合并所有数据
    dataAll (obj) {
        let newArr = [];
        for (let prop in obj) {
            newArr = newArr.concat(obj[prop])
        }
        return newArr;
    },
    //生成渲染对象
    renderObj (data) {
        let obj = { all: this.dataAll(data) };
        for (let prop in data) {
            obj[prop] = data[prop];
        }
        return obj;
    },
    //获取设备宽高信息
    equipment (that) {
        wx.getSystemInfo({
            success (res) {
                that.setData({
                    pageWidth: res.windowWidth + 'px',
                    pageHeight: res.screenHeight - 70 + 'px'
                })
            }
        })
    },
}