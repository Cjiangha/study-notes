Component({
  options:{
    addGlobalClass:true,
  },
  properties: {
    // listPage:{
    //   observer(newVal:any){
    //     this.setData({loaddingStr:"点击加载下一页"});
    //   }
    // },
    // listLength:{
    //   value:0,
    //   observer(newVal:number){
    //     this.setData({listLen:newVal||0});
    //   }
    // },
    // hideNoList:{
    //   type:Boolean,
    //   value:false,
    // },
    // filter:null,
    // tip:{
    //   type:String,
    //   value:"",
    // }
  },
  data: {
    listLen:0,
    listPage:{
      page:0,
      page_count:1,
    },
    loaddingStr:"点击加载下一页"
  },
  methods: {
    getList(){
      this.triggerEvent('getList');
    },
    listLoadding(hasStorageList?:true){
      //hasStorageList参数用于storageList分页，接口分页不需要传此参数
      if(hasStorageList!=undefined){
        if(hasStorageList){
          this.setData({
            listPage:{
              page:1,
              page_count:2,
            }
          })
        }else{
          this.setData({
            listPage:{
              page:1,
              page_count:1,
            }
          })
        }
      }
      this.setData({loaddingStr:"加载中，请稍后..."});
    }
  }
})
