import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../store/index'

Page({
  onLoad() {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['list'],
      actions: ['setList'],
    })
    // 从服务器端读取数据
    wx.showLoading()
    getServerData((data) => {
    console.log(data)
      wx.hideLoading()
      // 调用 action ，将数据写入 store
      this.setList(data)
    })
  },
  onUnload() {
    // 解绑
    this.storeBindings.destroyStoreBindings()
  },
})

// 模仿服务器端返回数据，用于测试
function getServerData(callback) {
  // 这里模仿 1000ms 后服务器端返回数据的效果
  setTimeout(() => callback([
    {
      date: '10月30日',
      summary: '晴',
      temperature: '10℃ ~ 20℃',
      weather: '大晴天',
      airQuality: '优',
    }, {
      date: '10月29日',
      summary: '雨',
      temperature: '11℃ ~ 20℃',
      weather: '小雨，局部中雨',
      airQuality: '中',
    }, {
      date: '10月28日',
      summary: '晴',
      temperature: '13℃ ~ 19℃',
      weather: '大晴天，少云',
      airQuality: '量良',
    }
  ]), 1000)
}
