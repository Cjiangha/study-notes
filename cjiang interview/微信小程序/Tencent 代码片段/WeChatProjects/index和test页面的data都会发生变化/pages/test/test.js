Page({
  data: {
    editData: {
      arr: {}
    },
  },
  onLoad: function (options) {
        let that__ = this
        let allpages__ = getCurrentPages()
        let prevPage__ = allpages__[allpages__.length - 2] //上一页
        let prevData__ = prevPage__.data
        let editData = {}
        editData["arr"] = prevData__.indexData
        that__.setData({
          editData,
        })
  },
  bindKeyInput(res) {
    let that__ = this
    let editData = that__.data.editData
    console.log('\n')
    console.log(editData.arr)
    editData.arr[editData.arr.choosen] = res.detail.value
    console.log(editData.arr)
    let allpages__ = getCurrentPages()
    let prevPage__ = allpages__[allpages__.length - 2] //上一页
    let prevData__ = prevPage__.data
    let indexData = prevData__.indexData
    console.log(indexData)
    // prevPage__.setData({ indexData })
  },
})