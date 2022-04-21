// compos/SearchList/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 显隐
    visible: {
      type: Boolean,
      value: false
    },
    // 传递字段
    props: {
      type: Object,
      value: {
        title: 'title',
        id: 'id',
        keyword: 'keyword'
      }
    },
    // 是否多选
    multiple: {
      type: Boolean,
      value: false
    },
    // 选中
    active: {
      type: Array,
      value: []
    },
    // 输入框提示语
    placeholder: {
      type: String,
      value: '请输入关键字'
    },
    // 输入框搜索值
    searchValue: {
      type: String,
      value: ''
    },
    // 查询接口地址
    url: {
      type: String,
      value: ''
    },
    // 接口查询参数
    cond: {
      type: Object,
      value: {
        page: 1,
        num: 10
      }
    },
    // 传递过来的clientId 用于筛选
    clientId: {
      type: String,
      value: ''
    }
  },
  
  /**
   * 监听
   */
  observers: {
    // 监听初始化字段
    props: function(val) {
      let obj = JSON.parse(JSON.stringify(this.data.fields))
      for (let i in val) {
        obj[i] = val[i]
      }
      this.setData({
        fields: obj
      })
    },
    // 监听选中数据
    active: function(val) {
      this.setData({
        activeList: JSON.parse(JSON.stringify(val))
      })
    },
    // 监听显隐
    visible: function(val) {
      this.setData({
        show: val
      })
      if (val) {
        this.setData({
          cond: this.properties.cond
        })
        this.readList()
      }
    }
  },
  
  /**
   * 组件的生命周期
   */
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached () {
      // 获取缓存中的角色id
      let that = this
      wx.getStorage({
        key: 'roleid',
        success (res) {
          that.setData({
            getRoleId: res.data
          })
        }
      })
    },
    // 在组件实例被从页面节点树移除时执行
    detached () {
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 查询
    loading: false,
    // 展开
    show: false,
    // 字段
    fields: {
      // 列表 展示名称
      title: 'title',
      // 列表 是否选中判断标识
      id: 'id',
      // 搜索框 默认搜索字段
      keyword: 'keyword'
    },
    // 选中数据
    activeList: [],
    // 请求
    cond: {
      page: '1',
      num: '10'
    },
    // 渲染
    list: [],
    // 总条数
    total: 0,
    // 角色id
    getRoleId: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focuesInopu () {
      console.log(5645645648978978978978789)
    },
    /*
    * 查询数据
    */
   readList () {
    },
    // 选中/取消选中
    listClick (e) {
      // 获取
      const item = e.currentTarget.dataset.item
      if (this.properties.multiple) {
        // 多选
        const juadgArray = this.data.activeList.filter(i => { if (i[this.data.fields.id] === item[this.data.fields.id]) return i })
        const selectArray = this.data.activeList.filter(i => { if (i[this.data.fields.id] !== item[this.data.fields.id]) return i })
        if (juadgArray.length === 0) {
          // 设置选中项
          this.setData({ activeList: [...this.data.activeList, item] })
        } else {
          // 设置选中项
          this.setData({ activeList: [...selectArray] })
        }
      } else {
        // 单选 设置选中项
        this.setData({ activeList: [item] })
      }
    },
    // 键盘完成 / 搜索
    searchComplete () {
      let obj =  JSON.parse(JSON.stringify(this.data.cond))
      obj[this.data.fields.keyword] = this.properties.searchValue
      this.setData({
        cond: obj,
        list: []
      })
      this.readList()
    },
    // 关闭
    close () {
      // 回调
      this.triggerEvent('close', {visible: false})
      this.setData({ activeList: [], list: [], searchValue: '' })
    },
    // 确定
    submit () {
      // 回调
      this.triggerEvent('action', {visible: false, active: this.data.activeList, cond: this.data.cond})
      this.setData({ activeList: [], list: [], searchValue: '' })
    },
    /*
    * 滚动条触底 47
    */
    scrollBottom () {
    }
  }
})
