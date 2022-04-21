import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { View, Button } from '@tarojs/components';
import ShopPoster from '../../components/shopPoster/shopPoster';

import * as TSD from './index.d';
import './index.scss';

interface Index {
  props: TSD.PageStateProps;
  state: TSD.PageState;
}

@inject('store')
@observer
class Index extends Component {

  componentDidMount() { }

  componentWillUnmount() {

  }

  _shopPosterRef: TSD.ShopPosterRef; // 海报

  // 分享
  handleShare(): void {
    this.initPoster();
  }

  // 初始化海报
  initPoster(): void {
    this._shopPosterRef.init({
      userName: "用户名", // 用户名
      userAvatar: 'https://nbshop-dev-public.oss-accelerate.aliyuncs.com/1458680108962357250/operator-avatar/619c86f1e4b0c9eaf460f13e.jpeg', // 用户头像
      shopId: '12312325',
      wxQRCode: 'https://nbshop-dev-public.oss-accelerate.aliyuncs.com/1458680108962357250/wxma-code/619ccd72e4b08ca2fc950a6a.jpeg', //, // 小程序码
      shopImage: 'https://nbshop-dev-public.oss-accelerate.aliyuncs.com/1458680108962357250/product-media/619cafe1e4b0c9eaf4611473.jpg', // 商品主图
      shopDescribe: '女童睡衣冬季加厚儿童家居服加绒夹棉法兰绒宝宝珊瑚绒保暖', // 商品描述
      lookDescribe: '为你推荐', // 查看文字
      lookUserAvatar: ['https://nbshop-dev-public.oss-accelerate.aliyuncs.com/1458680108962357250/operator-avatar/619c86f1e4b0c9eaf460f13e.jpeg'], // 查看头像
    });

  }

  // 海报下载成功
  handleSuccess(): void {
    
  }

  render() {

    return (
      <View className="index">
        <Button onClick={() => this.handleShare()}>海报分享</Button>

        {/* 海报 */}
        <ShopPoster onRef={vm => (this._shopPosterRef = vm)} onSuccess={() => this.handleSuccess()} />
      </View>
    );
  }
}

export default Index;
