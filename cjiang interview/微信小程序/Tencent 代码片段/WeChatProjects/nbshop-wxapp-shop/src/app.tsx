import { Component } from 'react';
import { Provider } from 'mobx-react';
import Taro from '@tarojs/taro';
import store from './store/index';

import './app.scss';

// 封装提示框
Taro['toast'] = (title: string): void => {
  Taro.showToast({
    title,
    icon: 'none',
    duration: 1500,
    mask: false,
  });
};

// loading
Taro['loading'] = {
  show(text = '加载中...') {
    Taro.showLoading({
      title: text,
      mask: true,
    });
  },
  hide() {
    Taro.hideLoading();
  },
};


class App extends Component {
  componentDidMount() {
    this.getIPhoneX();
  }

  componentDidShow() {
    this.getIPhoneX();
    this.getUpdateManager();

    // console.log(Taro.getLaunchOptionsSync());
  }

  componentDidHide() { }

  componentDidCatchError() { }

  // 判断是否是iphone x
  getIPhoneX(): void {
    const { screenHeight } = store.deviceInfoStore.systemInfo;
    if (screenHeight === 0) {
      const deviceSystemInfo = Taro.getSystemInfoSync();
      store.deviceInfoStore.commitIsQW(deviceSystemInfo.environment === 'wxwork');
      const ios = !!(deviceSystemInfo.system.toLowerCase().search('ios') + 1);
      if (ios && deviceSystemInfo.safeArea.top >= 44) {
        store.deviceInfoStore.commitIsIpx(true);
      }
      store.deviceInfoStore.setSystemInfo(deviceSystemInfo);
    }
  }

  // 检查跟新
  getUpdateManager(): void {
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(function () {
      // 请求完新版本信息的回调
    });
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        showCancel: false,
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      console.error('新版本下载失败');
    });
  }

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
