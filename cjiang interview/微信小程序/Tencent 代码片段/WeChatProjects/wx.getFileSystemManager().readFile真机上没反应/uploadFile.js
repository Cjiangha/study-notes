// components/uploadImg/uploadimg.js
const myApp = getApp().globalData;
const uids = require('../../utils/uids.js');
const sMD5 = require('../../utils/spark-md5.js')
const ExifReader = require('../../utils/exif-reader.js')
const myexif = require('../../utils/myexif.js');
import {
  showToast,
  showToastSucc
} from '../../utils/helper';
import {
  get,
  post
} from '../../utils/request';
let houseNumber = null;
let address = null;
let imgNum = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isVerifyHouseFile: Boolean,
    isCamera: Boolean,
    totalCount: Number,
    deletable: {
      type: Boolean,
      value: true //默认值
    },
    isDisabled:{
      type: Boolean,
      value: true //默认值
    },
    showPDF: String,
    fileList: {
      type: String,
      observer: function (a, b) {
        let fileList = a ? a.split(',') : [];
        let newFileList = [];
        console.log(a,fileList)
        for (let item of fileList) {
          if (item.indexOf('_pdf_') > -1) {
            newFileList.push({
              path: item,
              type: '_pdf_'
            });
          } else {
            newFileList.push({
              path: item,
              type: '_img_'
            });
          }
        }

        this.setData({
          filePathList: fileList,
          newFileList
        }, () => {});
      }
    },
    fileName: String,
    caseNum: String,
    isAllFile:{
      type: Boolean,
      value: true //默认值
    }
  },
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    isDel: true,
    count: 9,
    initCount: 9,
    previewImageHost: myApp.previewImageHost,
    imgTotalLen: 0,
    newFileList: [],
    filePathList: [],
    autograph: {}
  },
  lifetimes: {
    attached: function () {
      const self = this;
      let {
        isDel,
        count
      } = this.data;
      let deletable = this.properties.deletable;
      let totalCount = this.properties.totalCount;
      if (typeof deletable === 'boolean' && !deletable) {
        isDel = deletable;
      }
      if (totalCount && totalCount <= count) {
        count = totalCount;
      }
      this.setData({
        isDel,
        count
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    maskToggle() {
      this.setData({
        mask_show: '',
        translateY: ''
      })
    },
    chooseImg: function (type) {
      const self = this;
      let sourceType = [type];
      let count = type === 'camera' ? 1 : this.data.count;
      imgNum = 0;
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
            // 获取OSS签名
            let autograph = {}
                  wx.request({
                    url: myApp.host1+'/oss/ali/getAliOssPolicy', //
                    data: {},
                    header: { 
                      'content-type': 'application/json' // 默认值
                    },
                    success (ress) {
                      console.log(ress.data) 
                      autograph.host = ress.data.host,
                      autograph.signature = ress.data.signature,
                      autograph.ossAccessKeyId = ress.data.accessid,
                      autograph.policy = ress.data.policy,
                      autograph.key = ress.data.dir,
                      autograph.callback = ress.data.callback
                      self.setData({
                        autograph:Object.assign(autograph,{})
                      },()=>{
                        console.log('---01',ress.data)
                        for (let item of tempFiles) {
                          self.uploadImg(item,self.data.autograph);
                        }
                      })
                      console.log(self.data.autograph)
                    },
                    fail (res) {
                      console.log(res)
                    }
                    
                  })
           
          });
        }
      });
    },
    toggleActionSheet: function () {
      const self = this;
      const showPDF = this.properties.showPDF;
      let itemList = []
      if(self.data.isAllFile){
        itemList = ['拍摄', '从手机相册选择', '从聊天界面选择文件'];
      }else{
        itemList = ['拍摄', '从手机相册选择', '从聊天界面选择PDF'];
      }   
      if (showPDF === '0') {
        itemList = ['拍摄', '从手机相册选择'];
      }
      //第二种方式
      wx.showActionSheet({
        itemList,
        success(res) {
          if (res.errMsg === 'showActionSheet:ok') {
            if (res.tapIndex == 0) {
              self.chooseImg('camera');
            } else if (res.tapIndex === 1) {
              self.chooseImg('album');
            } else if (res.tapIndex === 2 && self.data.isAllFile) {
              self.chooseFileAll();
            } else if (res.tapIndex === 2) {
              self.chooseFile();
            }
          }
        }
      })
    },
    // uploadPDF: function (item,val) {
    //   let {
    //     count,
    //     initCount,
    //     filePathList
    //   } = this.data;
    //   const self = this;
    //   const fileName = this.properties.fileName;
    
    //   let newFileList = this.data.newFileList;
    //   let totalCount = this.properties.totalCount
    //   wx.uploadFile({
    //     filePath: item,
    //     name: 'file',
    //     url: myApp.uploadFileHost + '/File/UploadLimited',
    //     header: {
    //       // "Content-Type": "multipart/form-data",
    //       "accept": "application/json",
    //       "user": "admin",
    //       "SysInfo": "WeChat"
    //     },
    //     success: res => {
    //       wx.hideLoading();
    //       console.log(res.data,'--------')
    //       const data = JSON.parse(res.data);
    //       const file = (data && data.Data) ? data.Data.replace("\"", "").replace("\"", "") : ''; //去掉多余的引号
    //       if (data.Status && data.Status !== "Success") {
    //         wx.showToast({
    //           title: '上传失败!',
    //           icon: 'none',
    //           mask: true
    //         });
    //       } else {        
    //         if(val == "image"){   
    //           filePathList.push(file + '_img_');
    //           newFileList.push({
    //             path: file,
    //             type: '_img_'
    //           });
    //         }else if(val == "file"){    
    //           filePathList.push(file + '_pdf_');
    //           newFileList.push({
    //             path: file,
    //             type: '_pdf_'
    //           });
    //         } 
    //         if (totalCount) {
    //           let v = totalCount - filePathList.length;
    //           if (v < initCount) {
    //             count = v;
    //           }
    //         }

    //         self.setData({
    //           count,
    //           filePathList,
    //           newFileList
    //         }, () => {
    //           self.triggerEvent('afterread', {
    //             filePathList: filePathList,
    //             fileName
    //           });
    //         });
    //       }
    //     }
    //   });
    // },
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
  //   chooseFile2: function () {
  //     const self = this;
  //     // wx.chooseImage({      
  //       wx.getFileSystemManager().getSavedFileList({ 
  //       success: res => {
  //         console.log(res)
  //         // wx.showLoading({
  //         //   title: '上传中',
  //         //   mask: true
  //         // });
  //         // const {
  //         //   name,
  //         //   path,
  //         // } = res.tempFiles[0];
  //         // const nameArr = name.split('.');
  //         // if (nameArr[1] && nameArr[1].toLowerCase() === 'pdf') {
  //         //   self.uploadPDF(path);
  //         // } else {
  //         //   wx.showToast({
  //         //     title: '请上传PDF文件',
  //         //     icon: 'none'
  //         //   });
  //         //   return;
  //         // }
  //       }
  //   })
  // },
    onPreview: function (e) {
      const imgPreviewHost = 'http://hsbackup1.oss-accelerate.aliyuncs.com/';
      const {
        path,
        type
      } = e.currentTarget.dataset.item;
      let files = [];

      this.data.newFileList.map(item => {
        files.push(imgPreviewHost + item.path);
      });
      console.log(type)
      if (type === '_pdf_') {
        wx.downloadFile({
          url: imgPreviewHost + path,
          success: function (res) {
            var filePath = res.tempFilePath;
            wx.openDocument({
              filePath: filePath,
              fileType: 'pdf',
              success: function (res) {
                console.log("打开文档成功");
              },
              fail: function (res) {
                console.log('fail');
              }
            })
          },
          fail: function (res) {
            console.log('fail');
          }
        })
      } else {
        wx.previewImage({
          current: imgPreviewHost + path,
          urls: [...files],
          success: function (res) {},
          fail: function (err) {}
        });
      }
    },
    deleteImg: function (e) { //删除图片
      const {
        path,
        type,
      } = e.currentTarget.dataset.item;
      let {count, initCount, filePathList, newFileList} = this.data;
      const fileName = this.properties.fileName;
      let totalCount = this.properties.totalCount;
      let delHint = "是否确认删除此照片";
      if (type === '_pdf_') {
        delHint = "是否确认删除此PDF";
      }
      const self = this;
      wx.showModal({
        title: '',
        content: delHint,
        success: (result) => {
          if (result.confirm) {
            const filePaths = filePathList.filter((val) => {
              return val !== path;
            });
            const newFilePaths = newFileList.filter((item) => {
              return item.path !== path;
            });
            if (totalCount) {
              let v = totalCount - newFilePaths.length;
              if (v < initCount) {
                count = v;
              }
            }
            self.setData({
              count,
              filePathList: [...filePaths],
              newFileList: [...newFilePaths]
            });

            // "73f827c2-2af6-4d59-b47f-dc3c6619cfd5,75e2ad1e-7154-4468-948e-93035a211b52,0727f6ca-5ca4-478c-85b0-890e0b3d7809,67d91360-d485-4ebc-9742-a5a25b425452,34bc106b-d8bc-440b-9168-c2593828c9b4,a48bdace-1d55-489b-993c-33e492727352,61f0556a-dc4d-47d3-bfa0-c666ae8277cd"
            self.triggerEvent('afterread', {
              filePathList: filePaths,
              fileName
            });

          }
        }
      });
    },
    verifyHouseFile: function (imgId) {
      const self = this;
      get('/Ocr/GetIdentificationInfoByOCR', {
        fileGuidString: imgId
      }).then(res => {
        if (res.code === '0') {
          wx.hideLoading();
          // "[{"houseNumber":null,"dateOfRegistration":null,"rightOwner":"徐文应、徐嘉解","houseLocation":"南宁路501弄7号","sourceOfLand":"国有建设用地使用权","ownership":"让","houseUsage":"宅","lotLocation":"汇区河泾街道303街坊15/","lotSize":null,"areaOfUtility":null,"periodOfUsage":"月9日至2076年5月31","individualArea":null,"commonArea":null,"buildingNo":"号","roomNo":"位801","constructionArea":"83.45","buildingType":"公房","usage":"居住","totalFloors":"14","dateOfCompletion":"2010年","issuingInstitution":"世","type":"上海新旧版房产证"}]"

          const data = JSON.parse(res.data);
          const newData = data[0];
          console.log(newData,'==========文件更新操作')
          if (newData.houseNumber) {
            houseNumber = newData.houseNumber;
          }
          if (newData.houseLocation) {
            address = newData.houseLocation;
          }
          self.setData({
            houseNumber,
            address
          }, () => {
            self.triggerEvent('returnhousefileinfo', {
              houseNumber,
              address
            });
          });
        } else {
          wx.hideLoading();
          showToast(res.message);
        }
      });
    },
    uploadImg: function (item,autographObj) {
      let {
        imgTotalLen,
        filePathList,
        count,
        initCount
      } = this.data;
      let totalCount = this.properties.totalCount;
      const fileName = this.properties.fileName;
      let newFileList = this.data.newFileList;
      const self = this;
      let {
        path,
        size,
        name
      } = item; //
      console.log(item)
       // 对上传文件的格式处理 
       let suffixFile = ''
       let suffixName = ''
       let fileUuid = '' // 文件名
       let filesType = ''
       if (/\.(png|jpg|gif|bmp|jpeg)$/g.test(path)) {
         suffixFile = "image/";
         filesType = "image"
       } else if (path.endsWith(".pdf")) {
         suffixFile = "pdf/";
         filesType = "flie"
       } else {
         // console.log("image")
         suffixFile = "flie/";
         filesType = "flie"
       }
       let isSpot = path.lastIndexOf(".");// 取到文件名开始到最后一个点的长度 
       let fileLength = path.length;// 取到文件名长度
       suffixName = path.substring(isSpot + 1, fileLength);// 截取后缀名
       // 生成uuid的文件名
       fileUuid = name?name:uids.wxuuid(32,16) + '.' + suffixName
       let newSize = parseFloat(size / 1024 / 1024).toFixed(2);
       if (newSize > 20) {
         imgNum = imgNum + 1;
         if (imgNum === imgTotalLen) {
           wx.hideLoading(); 
           self.triggerEvent('afterread', {
             filePathList: filePathList,
             fileName
           });
         }
         //处理图片上传
         showToast('用户单张图片不能超过20M!');
         return;
       }
       
      if(JSON.stringify(autographObj) !== '{}'){
       // 生成文件md5    
       console.log('---02','readFile()')  
      wx.getFileSystemManager().readFile({
        filePath: path, //选择图片返回的相对路径
        // encoding: 'base64', //编码格式
        success: res => {
           //成功的回调
         
           console.log('---03',res)
          var spark = new sMD5.ArrayBuffer();
          spark.append(res.data);
          var hexHash = spark.end(false);
          // console.log(hexHash)
          const tags = myexif.handleBinaryFile(res.data)
          // const tags = ExifReader.load(res.data, { expanded: true })
          //经纬度
          // let GPSLatitude = tags.exif.GPSLatitude.description
          // let GPSLongitude = tags.exif.GPSLongitude.description
          console.log('---04',tags)    
          
          // console.log(local,'----local')
          // 用文件md5判断OSS是否存在此文件
          // get('10.10.2.110:8000/hongshen-file/oss/ali/file/fileCheck', {
          //   fileMd5: hexHash
          // }).then(res => {
          //   console.log(res)
          // if(res.data.code !=='0'){
          //   // 文件在OSS不存在

          // }else{
          //   // 文件存在
          // }
          // })
          wx.request({
            url:  myApp.host1+'/oss/ali/file/fileCheck', // 根据文件MD5验证文件
            data: {
              fileMd5: hexHash
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log('---05',res.data.code)
              imgNum = imgNum + 1;
              if(res.data.code !=='0'){
                // 文件在OSS不存在,走oss直传
                wx.uploadFile({
                  filePath: path, 
                  name: 'file',
                  url: autographObj.host,
                  header: {
                    "Content-Type": "multipart/form-data",
                    // "accept": "application/json",
                    // "user": "admin",
                    // "SysInfo": "WeChat",
                    // "x-oss-callback": autographObj.callback
                  },
                  formData: {
                    // image、pdf、file
                    key: autographObj.key + suffixFile + fileUuid ,
                    policy: autographObj.policy,
                    OSSAccessKeyId: autographObj.ossAccessKeyId,
                    signature: autographObj.signature,
                    success_action_status: '200',
                    callback: autographObj.callback
                    // 'x-oss-security-token': securityToken // 使用STS签名时必传。
                  },
                  success: ress => {                                      
                    console.log(ress,'--------0')
                    const data = JSON.parse(ress.data);
                    console.log(ress,'--------1')
                    // const file = (data && data.Data) ? data.Data.replace("\"", "").replace("\"", "") : ''; //去掉多余的引号
                    const file = data.data.fileUrl
                    if (ress.statusCode !== 200) {
                      wx.showToast({
                        title: '此图片没有上传成功!',
                        icon: 'none',
                        mask: true
                      });
                    }else{         
                      if (self.properties.isVerifyHouseFile) {
                        wx.showLoading({
                          title: '识别中',
                        });
                        self.verifyHouseFile(file);
                      }
                      // else{
                        // 更新文件信息
                        self.updateFile(data.data,{'flieMD5':hexHash,'fileName':fileUuid})
                      // }      
                     
                      if(filesType == "image"){   
                        filePathList.push(file);
                        newFileList.push({
                          path: file,
                          type: '_img_'
                        });
                      }else if(filesType == "file"){    
                        filePathList.push(file + '_pdf_');
                        newFileList.push({
                          path: file,
                          type: '_pdf_'
                        });
                      }
                    }          
                  },
                  fail: res => {
                    wx.showToast({
                      title: res.errMsg,
                      icon: 'none',
                      mask: true
                    });
                    console.log(res)
                  }
                });
              }else{
                // 文件存在，拿到回调 更新文件信息
                console.log(res)
                const data = JSON.parse(JSON.stringify(res.data));
                const file = data.data.fileUrl
                if (self.properties.isVerifyHouseFile) {
                  wx.showLoading({
                    title: '识别中',
                  });
                  self.verifyHouseFile(file);
                }
                // else{
                  // 更新文件信息
                  self.updateFile(data.data,{'flieMD5':hexHash,'fileName':fileUuid})
                // }      
                if(filesType == "image"){   
                  filePathList.push(file);
                  newFileList.push({
                    path: file,
                    type: '_img_'
                  });
                }else if(filesType == "file"){    
                  filePathList.push(file + '_pdf_');
                  newFileList.push({
                    path: file,
                    type: '_pdf_'
                  });
                }
              }
              if (totalCount) {
                let v = totalCount - filePathList.length;
                if (v < initCount) {
                  count = v;
                }
              }
              self.setData({
                count,
                filePathList,
                newFileList
              });
    
              if (imgNum === imgTotalLen) {
                wx.hideLoading();
                self.triggerEvent('afterread', {
                  filePathList: filePathList,
                  fileName
                });
              }
            }
          })
        }
      })      
      }  
    },
   
    // 文件信息补充更新
    updateFile(resInfo,Obj){
      const {userInfo} = myApp;
      const fileName = this.properties.fileName;
      const caseNumS = this.properties.caseNum;
      console.log(resInfo,Obj,userInfo,fileName,caseNumS)
      wx.request({
        url:  myApp.host1+'/oss/ali/file/updateFileInfo', //
        data: {
          uuid: resInfo.uuid, // 数据uuid
          fileName: Obj.fileName, // 文件原始文件名
          fileRemark: resInfo.remark, // 文件备注
          fileGps:'', // GPS信息
          fileMd5: Obj.flieMD5, // MD5码
          uploadIp:'', // 上传者IP地址
          uploadUser: userInfo.mobile, // 上传者用户ID
          fromSystem:'wxapp', // 上传来源系统
          caseNum: caseNumS, // 上传于来源系统中哪个案件编号
          caseColumnName: fileName // 上传于来源系统中哪个字段
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          wx.hideLoading();
          console.log(res.data)
        }
      })
   
  }
}
})