import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../store/index'

Page({
  onLoad(args) {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['list'],
    })
    // 用 setData 设置要展示的项目
    this.setData({
      index: args.index
    })
  },
  onUnload() {
    // 解绑
    this.storeBindings.destroyStoreBindings()
  },
})
