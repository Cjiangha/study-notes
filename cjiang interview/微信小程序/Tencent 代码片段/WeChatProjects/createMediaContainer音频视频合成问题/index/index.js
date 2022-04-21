const app = getApp()

Page({
  data: {

  },
  onLoad() {
    //音频，视频合成下载获取临时路径-分离视频/音频轨道-将视频/音频轨道addTrack-导出视频，下载到本地，提示下载失败
    var urls = ["http://v9-xg-web-s.ixigua.com/8c0c6bd76e1c5857620dfe572ce1329c/621c18ec/video/tos/cn/tos-cn-o-0004/94aa6a2ebc9f4bb48635fab119ce1bdb/media-audio-und-mp4a/?a=1768&br=0&bt=0&cd=0%7C0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=&er=0&ft=tF_ik88-o1rDp7nz7TQ_plXxuhsdIIA6tqY&l=20220228073203010211174077030EE1DA&lr=default&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajx0cDhuPHI1NTMzNDczM0ApZy42cWVpXjBqLmAtLWQtYXNzOmM%3D&vl=&vr=", "http://v9-xg-web-s.ixigua.com/df7fe00a98360aa947b1094ded7984ad/621c18ec/video/tos/cn/tos-cn-o-0004/fd0cfae2964347db9c0077089f7c418e/media-video-avc1/?a=1768&br=1347&bt=1347&cd=0%7C0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=0&ft=tF_ik88-o1rDp7nz7TQ_plXxuhsdIIA6tqY&l=20220228073203010211174077030EE1DA&lr=default&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajx0cDhuPHI1NTMzNDczM0ApN2VpOzY6Z2QzN2RlOjk3OGcuNnFlaV4wai5gLS1kLWFzcy0wYmIzMmBeNjViNDQyMS06Yw%3D%3D&vl=&vr="]
    for (let i = 0; i < urls.length; i++) {
      wx.downloadFile({
        url: urls[i],
        success: res => {
          urls[i] = res.tempFilePath
          if (i + 1 == urls.length && res.statusCode === 200) {
            let mc = wx.createMediaContainer()
            mc.extractDataSource({
              source: urls[0],
              success: mt => {
                let audioKind = mt.tracks[0]
                mc.extractDataSource({
                  source: urls[1],
                  success: md => {
                    let videoKind = md.tracks[0]
                    mc.addTrack(audioKind)
                    mc.addTrack(videoKind)
                    //3.导出视频
                    mc.export({
                      success: (result) => {
                        let tempArr1 = result.tempFilePath.split('//')
                        let tempArr2 = tempArr1[1].split('/')
                        let tempArr3 = tempArr2[tempArr2.length - 1].split('.')
                        let tempString2 = ''
                        for (let i = 0; i < tempArr2.length - 1; i++) {
                          tempString2 += tempArr2[i] + '/'
                        }
                        let newPath = tempArr1[0] + '//' + tempString2 + new Date().getTime() + '.' + tempArr3[1];
                        wx.saveVideoToPhotosAlbum({ //类型为视频
                          filePath: newPath,
                          success: res => {
                            console.log(newPath)
                            console.log(res)
                            resolve(newPath)
                          },
                          fail: err => {
                            console.log(err);
                          }
                        })

                        // wx.getFileSystemManager().renameSync({
                        // 	oldPath: `${result.tempFilePath}`,
                        // 	newPath: `${newPath}`,
                        // 	success: res => {
                        // 		console.log(res)
                        // 		mc.removeTrack(audioKind)
                        // 		mc.removeTrack(videoKind)
                        // 	},
                        // })
                        // 4.移除内容，清空容器
                        // wx.saveVideoToPhotosAlbum({ //类型为视频
                        // 	filePath: newPath,
                        // 	success: res => {
                        // 		// wx.getFileSystemManager().unlink({
                        // 		// 	filePath: '',
                        // 		// 	success: res => {
                        // 		// 		showToast('下载成功');
                        // 		// 	}
                        // 		// })
                        // 	},
                        // 	fail: err => {
                        // 		console.log(err);
                        // 		showToast(err.errMsg, 'none');
                        // 	}
                        // })
                      }
                    });
                  }
                })
              }
            })
          }
        },
        fail: err => {
          console.log(err);
          showToast(err.errMsg, 'none');
        }
      })
    }
  },
})