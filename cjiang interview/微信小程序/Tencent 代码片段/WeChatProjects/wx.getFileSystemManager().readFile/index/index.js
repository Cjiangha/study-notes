Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDel: true,
    count: 9,
    initCount: 9,
    imgTotalLen: 0,
  },

    chooseImg: function (type) {
      const self = this;
      let sourceType = [type];
      let count = type === 'camera' ? 1 : this.data.count;
      wx.chooseImage({
      // wx.chooseMessageFile({
        count,
        sizeType: ['original'],
        sourceType,
        success: res => {
          // console.log(res,'----文件')          
          wx.showLoading({
            title: '上传中',
            mask: true
          });
          const {
            tempFiles
          } = res;
          // var spark = new sMD5.ArrayBuffer();
          // spark.append(res.data);
          // var hexHash = spark.end(false);
          console.log(tempFiles)
          const imgTotalLen = tempFiles.length;      
          self.setData({
            imgTotalLen, 
          }, () => {        
            for (let item of tempFiles) {
              self.uploadImg(item);
            }
          });
        }
      });
    },
    toggleActionSheet: function () {
      const self = this;
      let itemList = [] 
      itemList = ['拍摄', '从手机相册选择', '从聊天界面选择文件'];
     
      //第二种方式
      wx.showActionSheet({
        itemList,
        success(res) {
          if (res.errMsg === 'showActionSheet:ok') {
            if (res.tapIndex == 0) {
              self.chooseImg('camera');
            } else if (res.tapIndex === 1) {
              self.chooseImg('album');
            } else if (res.tapIndex === 2 ) {
              self.chooseFileAll();
            }
          }
        }
      })
    },
  chooseFileAll: function () {
      const self = this;
      // wx.chooseImage({      
      wx.chooseMessageFile({
        count: 1,
        type: 'all',
        success: res => {
          wx.showLoading({
            title: '上传中',
            mask: true
          });
          const {
            name,
            type
          } = res.tempFiles[0];
          console.log(res.tempFiles[0])
          const nameArr = name.split('.');
          if (nameArr[1]) {
            if(type == "image"){
              self.uploadImg(res.tempFiles[0]);
            }else if(type == "file"){
              self.uploadImg(res.tempFiles[0]);
            }         
          } 
        }
      });
    },
    chooseFile: function () {
      const self = this;
      // wx.chooseImage({      
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        success: res => {
          wx.showLoading({
            title: '上传中',
            mask: true
          });
          const {
            name,
          } = res.tempFiles[0];
          const nameArr = name.split('.');
          if (nameArr[1] && nameArr[1].toLowerCase() === 'pdf') {
            self.uploadImg(res.tempFiles[0]);
          } else {
            wx.showToast({
              title: '请上传PDF文件',
              icon: 'none'
            });
            return;
          }
        }
      });
    },
    uploadImg: function (item,autographObj) {
     
      const self = this;
      let {
        path,
        size,
        name
      } = item; //
      console.log(item.path)
      console.log(item)
       let newSize = parseFloat(size / 1024 / 1024).toFixed(2);
       if (newSize > 20) {
         wx.hideLoading();      
         //处理图片上传         
         return;
       }

       // 生成文件md5    
       console.log('---02','readFile()')  
      wx.getFileSystemManager().readFile({
        filePath: path, //选择图片返回的相对路径
        // encoding: 'base64', //编码格式
        success: res => {
           //成功的回调
           wx.hideLoading();
           console.log('---03',res.data)
        }
      })      
      }  


})