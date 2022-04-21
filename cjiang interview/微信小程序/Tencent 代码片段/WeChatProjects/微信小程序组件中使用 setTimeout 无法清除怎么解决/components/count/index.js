Component({

  options: {
    addGlobalClass: true,
  },
  properties: {
    endTime: {
      type: Number
    },
  },
  attached() {
    this._start()
    console.log('attached')
  },

  lifetimes: {
    detached() {
      clearTimeout(this.data.setTimer)
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    setTimer:'',
  },

  observers: {
    endTime(val) {
      this._start()
    }
  },

  pageLifetimes: {
    hide() {
      clearTimeout(this.data.setTimer)
      console.log('hide')
    },
    detached() {
      clearTimeout(this.data.setTimer)
      console.log('detached')
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _start() {
      const _this = this
      let _st  = setTimeout(function() {
        console.log("1111")
      }, 1000)
      _this.setData({
        setTimer: _st
      })
    } 
  }
})