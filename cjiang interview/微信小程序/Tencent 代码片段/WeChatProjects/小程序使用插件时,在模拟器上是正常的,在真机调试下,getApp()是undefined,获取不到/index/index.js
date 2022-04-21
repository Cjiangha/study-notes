const app = getApp()

Page({
  data: {

  },

  onShow() {
    console.log(getApp(), "getApp()") //   引用我们自己私有包,和医网信的插件后,getApp(),在真机调试下是undefined,但是用我们自己的私有包或者使用医网信的插件,单独使用,是没有问题的
  },

})