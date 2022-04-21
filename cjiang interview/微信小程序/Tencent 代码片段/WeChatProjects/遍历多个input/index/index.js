const app = getApp()
const globalData = getApp().globalData;

Page({
  data: {
    taskData: [{
      ying: "phenomenon",
    },
    {
      ying: "anaesthetist",
    },
    {
      ying: "remuneration",
    },
    {
      ying: "statistics ",
    },
    {
      ying: "ethnicity",
    },
  ],

  taskIndex: 0,
  typeIndex: 0,
  },
  onLoad() {
    this.setData({
     
    })
  },


  getType(e) {
    console.log(e);
    if (e.detail.value.length == 1) {
      this.setData({
        typeIndex: this.data.typeIndex + 1,
      })
    }
   
    if (this.data.typeIndex == this.data.taskData[this.data.taskIndex].ying.length) {
      this.setData({
        taskIndex: this.data.taskIndex + 1,
        typeIndex: 0
      })
    }
  },

})
