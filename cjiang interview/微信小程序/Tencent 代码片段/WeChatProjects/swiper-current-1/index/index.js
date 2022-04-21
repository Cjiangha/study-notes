const app = getApp()
const list = [];
for(let i = 0; i < 50; i++ ){
  list.push({
    id: i,
    text: '测试测试' + i
  });
}
Page({
  data: {
    swiperList: [list[0], list[1], list[2]],
    current: 0,
  },
  onLoad() {
    this.listIndex = 0;
    this.recordCurrent = 0;
  },
  updateSwiperList(index){
      if (index < 0 || index >= list.length) {
        return;
      }
      
      this.setData({
        swiperList:[list[index - 1], list[index], list[index + 1]],
      });
      const current = index === 0 ? 0 : 1;
      this.setData({
        'current': current
      });

      this.listIndex = index;
      this.recordCurrent = current;
  },
  oncurrentchange({ detail }) {
    if (detail.source === 'touch') {
      this.updateSwiperList(this.listIndex + detail.current - this.recordCurrent);
    }
  },
})
