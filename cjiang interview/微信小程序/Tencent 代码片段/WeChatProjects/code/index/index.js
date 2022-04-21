const app = getApp()

Page({
  data: {

  },
  onLoad() {
    const fs = wx.getFileSystemManager()

    const fd = fs.openSync({
      filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
      flag: 'a+'
    })
    const arr = ['hhh', 'aaa', 'sss']
    for (let i = 0; i < arr.length; i++) {
      fs.writeSync({
        fd: fd,
        data: arr[i],
        position: 0
      })

      const text = fs.readFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, 'utf8', 0)
      console.log(text);
    }
  },
})