const app = getApp();
var recorder_manager='null';
var duration_max=300;
var count_senconds_recording=0;
var interval_senconds_recording=null;

Page({
  data: {

  },
  onLoad() {
    recorder_manager='null';
    duration_max=300;
    count_senconds_recording=0;
    interval_senconds_recording=null;
  },


  
  init_recording_start: function(){
    console.log('recording_start');
    var page_obj=this;
    //请求授权允许录音
    recorder_manager='null';
    wx.getSetting({
      success: function(res){
        if(!res.authSetting['scope.record']){
          wx.authorize({
            scope: 'scope.record',
            success: function(){
              // 用户已经同意小程序使用录音功能，后续调用接口不会弹窗询问
              recorder_manager=wx.getRecorderManager();
              page_obj.recording_start(recorder_manager);
            },
            fail: function(){
              wx.showModal({
                title: '温馨提示',
                content: '即时录制语音需要同意授权才能使用，请不要拒绝授权。【解决办法】：重新点击开始录音，然后同意授权',
                showCancel: false,
                confirmText: '我知道了',
                success: function(res){
                  if(res.confirm){
                    console.log('用户点击我知道了');
                  }
                }
              });
            }
          });
        }else{
          recorder_manager=wx.getRecorderManager();
          page_obj.recording_start(recorder_manager);
        }
      },
      fail: function(){
        wx.authorize({
          scope: 'scope.record',
          success: function(){
            // 用户已经同意小程序使用录音功能，后续调用接口不会弹窗询问
            recorder_manager=wx.getRecorderManager();
            page_obj.recording_start(recorder_manager);
          },
          fail: function(){
            wx.showModal({
              title: '温馨提示',
              content: '即时录制语音需要同意授权才能使用，请不要拒绝授权。【解决办法】：重新点击开始录音，然后同意授权',
              showCancel: false,
              confirmText: '我知道了',
              success: function(res){
                if(res.confirm){
                  console.log('用户点击我知道了');
                }
              }
            });
          }
        });
      }
    });
  },



  recording_start: function(){
    console.log('获得授权后开始配置RecorderManager');
    var page_obj=this;
    if(recorder_manager=='null'){
      wx.showToast({
        title: '授权被拒，无法录音',
        icon: 'none',
        duration: 5000,
        mask: true
      });
      return;
    }
    //如果正在播放音频，须先停止播放
    // if(audio_context.paused==false){
    //   audio_context.stop();
    // }
    //初始化
    count_senconds_recording=0;
    //配置RecorderManager
    var json_options={
      duration: duration_max,
      sampleRate: 16000,
      encodeBitRate: 64000,
      format: 'mp3'
    };
    //recording_status，0是初始状态，1是正在录音，2是录音暂停，3是录音继续，4是录音完成
    recorder_manager.onStart(function(){
      //启动计时器，每秒更新已录制的时长
      //更新recording_status
      //如果已录制的时长大于等于duration_max，停止录制
      page_obj.setData({
        'recording_status': 1
      });
      clearInterval(interval_senconds_recording);
      interval_senconds_recording=setInterval(function(){
        count_senconds_recording+=1;
        page_obj.setData({
          'recording_status': 1,
          'count_senconds_recording': count_senconds_recording,
        });
        if(count_senconds_recording>=duration_max){
          recorder_manager.stop();
        }
      },1000);
    });
    recorder_manager.onInterruptionBegin(function(){
      //监听录音因为受到系统占用而被中断开始事件。以下场景会触发此事件：微信语音聊天、微信视频聊天。此事件触发后，录音会被暂停，并触发pause事件
      //注销计时器，取消每秒更新
      //更新recording_status
      recorder_manager.pause();
      clearInterval(interval_senconds_recording);
      page_obj.setData({
        'recording_status': 2,
        'count_senconds_recording': count_senconds_recording,
      });
    });
    recorder_manager.onInterruptionEnd(function(){
      //启动计时器，每秒更新已录制的时长
      //更新recording_status
      //如果已录制的时长大于等于duration_max，停止录制
      recorder_manager.resume();
      page_obj.setData({
        'recording_status': 3,
      });
      clearInterval(interval_senconds_recording);
      interval_senconds_recording=setInterval(function(){
        count_senconds_recording+=1;
        page_obj.setData({
          'recording_status': 3,
          'count_senconds_recording': count_senconds_recording,
        });
        if(count_senconds_recording>=duration_max){
          recorder_manager.stop();
        }
      },1000);
    });
    recorder_manager.onStop(function(res){
      //注销计时器，取消每秒更新
      //获取audio_path用于上传音频
      //更新options_provide_audio
      //更新recording_status
      console.log('recorder_manager.onStop');
      clearInterval(interval_senconds_recording);
      var audio_path=res.tempFilePath;
      console.log('audio_path ->'+audio_path);
      console.log('count_senconds_recording ->'+count_senconds_recording);
    });
    //获得授权后启动录音
    recorder_manager.start(json_options);
  },





})
