Page({
  data: {
    current: 1,
    list: [1,2,3]
  },
  transition(event){
    // console.log(event);
    console.log('event.detail.dx: ', event.detail.dx);
  },
  onLoad() {
  },
})
