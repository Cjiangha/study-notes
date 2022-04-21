const app = getApp()

Page({
  data: {

  },
  onLoad() {
    //真机上提示:can't find variable:WXWebAssembly
    console.log("WXWebAssembly:"+WXWebAssembly);
  },
})
