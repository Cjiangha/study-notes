import { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Canvas, Image } from '@tarojs/components';
import deviceInfoStore from '@/store/deviceInfo';
import {
  wxAuthorize,
  wxGetSetting,
  wxOpenSetting,
  wxGetImageInfo,
  wxCanvasToTempFilePath,
  wxSaveImageToPhotosAlbum,
} from '@/plugins/wxApi/wxApi';

import './shopPoster.scss';


type Image = {
  src: string;
  onload: () => void;
};

type HTMLCanvasElement = {
  createImage: () => Image;
};

type Ctx = Taro.CanvasContext;

type CanvasType = {
  ctx: Ctx;
  canvas: HTMLCanvasElement;
};

type ShopItem = {
  shopId: string;
  userName: string; // 用户名
  wxQRCode: string; // 小程序码
  userAvatar: string; // 用户头像
  shopImage: string; // 商品主图
  shopDescribe?: string; // 商品描述
  userDescribe: string; // 用户描述
  lookDescribe: string; // 查看文字
  lookUserAvatar: Array<string>; // 查看头像
};

type PageStateProps = {
  onRef: (node) => void;
  onCancel?: () => void;
  onSuccess?: () => void;
};

type PageState = {
  width: number;
  ratio: number;
  height: number;
  visible: boolean;
  canvasId: string;
  isVersion: boolean;
  posterPath: string;
  // shopItem: ShopItem;
};

type PageDate = {
  shopItem: ShopItem;
};

interface ShopPoster {
  props: PageStateProps;
  state: PageState;
  data: PageDate;
}
const imgReg = new RegExp('http://');
const fillColor = '#fff';
const cachePoster = {};

const timeOut = 30;
class ShopPoster extends Component {
  state: PageState = {
    visible: false,
    isVersion: deviceInfoStore.isVersion,
    posterPath: '',
    ratio: deviceInfoStore.systemInfo.pixelRatio,
    width: 646,
    height: 920,
    canvasId: `canvas_id_${new Date().getTime()}`,
  };

  componentWillMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.clearTime();
  }

  _timer: NodeJS.Timeout | null;
  _timeOut: NodeJS.Timeout | null;
  _initTimer: NodeJS.Timeout | null;
  _timeTotal: number;
  _shopItem: ShopItem;

  // 显示
  init(shopItem: ShopItem): void {
    // console.log(JSON.stringify(shopItem, null, 1));
    if (!shopItem.wxQRCode) return;
    if (cachePoster[shopItem.shopId]) {
      this.setState({ visible: true, posterPath: cachePoster[shopItem.shopId] });
      this.props.onSuccess && this.props.onSuccess();
      Taro['loading'].hide();
    } else {
      this.setState(
        {
          posterPath: '',
          canvasId: `canvas_id_${new Date().getTime()}`,
        },
        () => {
          this.rejectPoster();
          this._shopItem = Object.assign({}, shopItem, { userDescribe: '为你推荐' });
          this._initTimer && clearTimeout(this._initTimer);
          this._initTimer = setTimeout(() => {
            // 版本号如果不是大于2.9.0。就是用type不是2D
            if (!this.state.isVersion) {
              this.getContext();
            } else {
              this.getCanvas();
            }
          }, 0);
        }
      );
    }
  }

  // 海报生成时间超过10秒，则为失败
  rejectPoster(): void {
    this.clearTime();
    this._timeTotal = 0;
    this._timeOut = setInterval(() => {
      this._timeTotal += 1;
      if (this._timeTotal >= timeOut) {
        Taro['toast']('海报生成失败');
        this.setState({ visible: false });
        this.clearTime();
      }
    }, 1000);
  }

  clearTime(): void {
    this._timer && clearTimeout(this._timer);
    this._timeOut && clearTimeout(this._timeOut);
    this._initTimer && clearTimeout(this._initTimer);
    this._timer = null;
    this._timeOut = null;
    this._initTimer = null;
  }

  // 计算
  getNumber(num: number): number {
    // return (num / 750 * deviceInfoStore.systemInfo.screenWidth) * this.state.ratio; //  * w_ratio
    return num * this.state.ratio;
  }

  // 下载
  download(): void {
    this.downloadPoster();
  }

  // 显示
  show(): void {
    this.setState({ visible: true });
  }

  // 隐藏
  hide(): void {
    this.props.onCancel && this.props.onCancel();
    this.setState({ visible: false });
    this.clearTime();
  }

  // 从写方法
  InitContext(ctx: Ctx): Ctx {
    ctx.setStrokeStyle =
      ctx.setStrokeStyle ||
      function (color: string) {
        ctx.strokeStyle = color;
      };
    ctx.setFillStyle =
      ctx.setFillStyle ||
      function (color: string) {
        ctx.fillStyle = color;
      };
    ctx.setFontSize =
      ctx.setFontSize ||
      function (size: number) {
        ctx.font = size + 'px PingFangSC-Regular, PingFang SC';
      };
    return ctx;
  }

  // 获取conText
  async getContext(): Promise<any> {
    console.log('getContext');
    const { width, height, ratio, canvasId } = this.state;
    const ctx = this.InitContext(Taro.createCanvasContext(canvasId, this)); //Taro.createCanvasContext(canvasId, this);
    if (!ctx) return;
    const canvas = ctx['_context'] ? ctx['_context'].canvas : { width: 1, height: 1 };
    Taro['loading'].show('海报生成中...');
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 先清除画布
    ctx.scale(parseFloat((1 / ratio).toFixed(2)), parseFloat((1 / ratio).toFixed(2)));
    try {
      await this.drawPosterBg(ctx, canvas.width, canvas.height); // 画整体背景和圆角
      await this.drawAvatarText(ctx); // 头像文字
      await this.drawAvatarImage({ ctx, canvas }); // 头像
      await this.drawMasterImage({ ctx, canvas }); // 主图
      await this.drawMaterText(ctx); // 主图文字, 比例, 文字行数最多
      await this.drawMaterQRCode({ ctx, canvas }); // 画主图右边的小程序码
      await this.drawAllSuperpositionImage({ ctx, canvas }); // 画主图主题下面的看过图片
      await this.drawMaterLookText(ctx); // 画看过文字
    } catch (error) {
      console.error(error);
      this.setState({ visible: false });
      Taro['toast']('海报生成失败');
      this.clearTime();
    }
  }

  // 获取canvas
  getCanvas(): void {
    console.log('getCanvas');
    const { width, height, ratio, canvasId } = this.state;
    const query = Taro.createSelectorQuery();
    query
      .select(`#${canvasId}`)
      .fields({ node: true, size: true })
      .exec(async res => {
        const canvas = res[0].node;
        if (!canvas) return;
        Taro['loading'].show('海报生成中...');
        const ctx = this.InitContext(canvas.getContext('2d')); // canvas.getContext('2d');
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 先清除画布
        ctx.scale(parseFloat((1 / ratio).toFixed(2)), parseFloat((1 / ratio).toFixed(2)));
        try {
          await this.drawPosterBg(ctx, canvas.width, canvas.height); // 画整体背景和圆角
          await this.drawAvatarImage({ ctx, canvas }); //头像
          await this.drawAvatarText(ctx); // 头像文字
          await this.drawMasterImage({ ctx, canvas }); // 主图
          await this.drawMaterText(ctx); // 主图文字, 比例, 文字行数最多
          await this.drawMaterQRCode({ ctx, canvas }); // 画主图右边的小程序码
          await this.drawAllSuperpositionImage({ ctx, canvas }); // 画主图主题下面的看过图片
          await this.drawMaterLookText(ctx); // 画看过文字
          await this.createPosterImage(canvas);
        } catch (error) {
          console.error(error);
          this.setState({ visible: false });
          Taro['toast']('海报生成失败');
          this.clearTime();
        }
      });
  }

  // 判断有没有draw
  setDraw(ctx: Ctx, type: boolean, resolve: (value) => void): void {
    if (ctx.draw) {
      ctx.draw(type, () => {
        resolve && resolve('true');
      });
    } else {
      resolve && resolve('true');
    }
  }

  /**
   * 圆角半径
   * @param ctx
   * @param x 距离左边的X轴
   * @param y 距离上边的y轴
   * @param w 宽度
   * @param h 高度
   * @param r 圆角半径
   */
  roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!ctx) return reject('ctx实例不存在-roundRect');
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.setStrokeStyle(fillColor);
      ctx.stroke();
      ctx.clip();
      resolve('true');
    });
  }

  /**
   * 计算文字
   * @param ctx
   * @param text 文本
   * @param x 距离左边的X轴
   * @param y 距离上边的y轴
   * @param maxW 文本的最长宽度
   * @param textTotal 文本最多几行
   */
  computeText(ctx: Ctx, text: string, x: number, y: number, maxW: number, textTotal: number, omit = '...'): Promise<any> {
    return new Promise((resolve, reject) => {
      if (text.length <= 0) return resolve('暂无需要绘制的文字');
      const textW = ctx.measureText(text).width;
      let drawTotal = 1;
      if (textW <= maxW) {
        ctx.fillText(text, x, y);
        ctx.restore(); //需要编辑canvas内容则需要写入
        resolve('文字绘制成功');
      } else {
        let str = '';
        for (let i = 0; i < text.length; i++) {
          str += text[i];
          if (ctx.measureText(str).width >= maxW) {
            if (drawTotal >= textTotal) {
              ctx.fillText(str.substring(0, str.length - 1) + omit, x, y + (drawTotal - 1) * this.getNumber(44));
              ctx.restore(); //需要编辑canvas内容则需要写入
              resolve('文字绘制成功');
              break;
            } else {
              ctx.fillText(str, x, y + (drawTotal - 1) * this.getNumber(44));
              drawTotal += 1;
              str = '';
              if (i - (text.length - 1) === 0) {
                ctx.restore(); //需要编辑canvas内容则需要写入
                resolve('文字绘制成功');
              }
            }
          } else if (i - (text.length - 1) === 0) {
            // 内容绘制完毕，但是剩下的内容宽度不到maxW
            ctx.fillText(str, x, y + drawTotal * this.getNumber(20));
            ctx.restore(); //需要编辑canvas内容则需要写入
            resolve('文字绘制成功');
          }
        }
      }
    });
  }

  /**
   * 画整体背景和圆角
   * @param ctx
   * @param w 宽度
   * @param h 高度
   */
  drawPosterBg(ctx: Ctx, w: number, h: number): Promise<any> {
    // 画圆角
    return new Promise((resolve, reject) => {
      ctx.save();
      this.roundRect(ctx, 0, 0, w, h, this.getNumber(24))
        .then(() => {
          ctx.setFillStyle(fillColor);
          ctx.fillRect(0, 0, w, h);
          ctx.restore();
          this.setDraw(ctx, true, resolve);
        })
        .catch(err => {
          console.error(err, '画整体背景和圆角-drawPosterBg');
          reject(err);
        });
    });
  }

  /**
   * 获取图片数据,https无法画出来,需要下载
   * @param src 图片路径,http需要下载
   * @param canvas
   * @returns
   */
  getImage(src: string, canvas: HTMLCanvasElement): Promise<any> {
    const { isVersion } = this.state;
    return new Promise((resolve, reject) => {
      if (!src) resolve(!isVersion ? '' : canvas.createImage());
      src = src.replace(imgReg, 'https://'); // 企业微信头像返回是http
      console.log('图片地址：' + src);
      // Taro.downloadFile({
      //   url: src,
      //   success(res) {
      //     if (res.statusCode) {
      //       if (isVersion) {
      //         const img = canvas.createImage();
      //         img.src = res.tempFilePath;
      //         img.onload = () => {
      //           resolve(img);
      //         };
      //         img.onerror = () => {
      //           console.log('图片错误');
      //         };
      //       } else {
      //         resolve(res.tempFilePath);
      //       }
      //     } else {
      //       Taro['loading'].hide();
      //       reject(res);
      //     }
      //   },
      //   fail(err) {
      //     Taro['loading'].hide();
      //     console.error(err, '获取图片数据-获取图片失败-downloadFile');
      //     reject(err);
      //   },
      // });

      return wxGetImageInfo({ src })
        .then(res => {
          if (isVersion ) {
            const img = canvas.createImage();
            img.src = res.path;
            img.onload = () => {
              resolve(img);
            };
            img.onerror = () => {
              console.log('图片错误');
            };
          } else {
            resolve(res.path);
          }
        })
        .catch(err => {
          Taro['loading'].hide();
          console.error(err, '获取图片数据-获取图片失败-wxGetImageInfo');
          reject(err);
        });
    });

  }

  /**
   * 画头像
   * @param param0
   */
  drawAvatarImage({ ctx, canvas }: CanvasType): Promise<any> {
    return new Promise((resolve, reject) => {
      // ctx, 图片对象， 图片的宽高，图片距离X,Y位置， 图片的半径
      const imgW = this.getNumber(96); // 图片的宽高
      const x = this.getNumber(32); // 图片距离X,Y位置
      const y = this.getNumber(36); // 图片距离X,Y位置
      const r = this.getNumber(96 / 2); // 图片的半径
      ctx.save();
      this.roundRect(ctx, x, y, imgW, imgW, r)
        .then(() => {
          return this.getImage(this._shopItem.userAvatar, canvas);
        })
        .then(img => {
          ctx.beginPath();
          // 距离x，y的位置，需要加添图片半径，半径，起始点，圆
          ctx.arc(x + r, y + r, r, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(img, x, y, imgW, imgW);
          ctx.restore(); //需要编辑canvas内容则需要写入
          this.setDraw(ctx, true, resolve);
        })
        .catch(err => {
          console.error(err, '画头像失败-drawAvatarImage');
          reject(err);
        });
    });
  }

  // 画头像文字
  drawAvatarText(ctx: Ctx): void {
    const { userName, userDescribe } = this._shopItem;
    // 绘制文本
    ctx.save();
    ctx.setFillStyle('#141622');
    ctx.setFontSize(this.getNumber(30));
    this.computeText(ctx, userName, this.getNumber(152), this.getNumber(80), Math.floor(this.getNumber(380)), 1, '');

    // 绘制文本
    ctx.setFillStyle('#9c9c9c');
    ctx.setFontSize(this.getNumber(22));
    ctx.fillText(userDescribe || '', this.getNumber(152), this.getNumber(120));
    ctx.restore(); //需要编辑canvas内容则需要写入
  }

  // 画中间主图
  drawMasterImage({ ctx, canvas }: CanvasType): Promise<any> {
    return new Promise((resolve, reject) => {
      const x = this.getNumber(32);
      const y = this.getNumber(152);
      const imgW = this.getNumber(582);
      const imgH = this.getNumber(582);
      // 692
      ctx.save();
      this.roundRect(ctx, x, y, imgW, imgH, this.getNumber(24))
        .then(() => {
          return this.getImage(this._shopItem.shopImage, canvas);
        })
        .then(img => {
          ctx.drawImage(img, x, y, imgW, imgH);
          ctx.restore(); //需要编辑canvas内容则需要写入
          this.setDraw(ctx, true, resolve);
        })
        .catch(err => {
          console.error(err, '画中间主图失败-drawMasterImage');
          reject(err);
        });
    });
  }

  // 画主图下面文字
  drawMaterText(ctx: Ctx): Promise<any> {
    return new Promise((resolve, reject) => {
      const text = (this._shopItem.shopDescribe || '').replace(/\r/g, ' ').replace(/\n/g, ' ');
      const maxW = this.getNumber(380);
      const size = this.getNumber(30);
      const x = this.getNumber(30);
      const y = this.getNumber(784);
      ctx.save();
      ctx.setFillStyle('#141622');
      ctx.setFontSize(size);
      return this.computeText(ctx, text, x, y, maxW, 2).then(resolve);
    });
  }

  // 画主图右边的小程序码
  drawMaterQRCode({ ctx, canvas }: CanvasType): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getImage(this._shopItem.wxQRCode, canvas)
        .then(img => {
          const x = this.getNumber(464);
          const y = this.getNumber(750);
          const imgW = this.getNumber(152);
          const imgH = this.getNumber(152);
          ctx.save();
          // 距离x，y的位置，需要加添图片半径，半径，起始点，圆
          ctx.drawImage(img, x, y, imgW, imgH);
          ctx.restore(); //需要编辑canvas内容则需要写入
          resolve('');
        })
        .catch(err => {
          console.error(err, '画主图右边的小程序码失败-drawMaterQRCode');
          reject(err);
        });
    });
  }

  // 添加批量查看用户头像
  drawAllSuperpositionImage({ ctx, canvas }: CanvasType): Promise<any> {
    return new Promise((resolve, reject) => {
      this.drawSuperpositionImage({ ctx, canvas }, 0, resolve);
    });
  }

  // 批量生产图片叠加
  drawSuperpositionImage({ ctx, canvas }: CanvasType, index: number, resolve: (value) => void): void {
    const { lookUserAvatar } = this._shopItem;
    if (!Array.isArray(lookUserAvatar) || lookUserAvatar.length <= 0) return resolve('');
    this.drawMaterLookImage({ ctx, canvas }, index, lookUserAvatar[index]).then(() => {
      if (index >= lookUserAvatar.length - 1 || index >= 2) return resolve('');
      index += 1;
      this.drawSuperpositionImage({ ctx, canvas }, index, resolve);
    });
  }

  /**
   * 画主图主题下面的看过图片-叠加
   * @param param
   * @param {number} total 叠加数量
   * @param {string} imgSrc 路径
   */
  drawMaterLookImage({ ctx, canvas }: CanvasType, total: number, imgSrc: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const x = this.getNumber(30) + this.getNumber(total * 24);
      const y = this.getNumber(860);
      const imgW = this.getNumber(40);
      const imgH = this.getNumber(40);
      const r = imgW / 2; // 图片的半径
      ctx.save();
      this.roundRect(ctx, x, y, imgW, imgH, r)
        .then(() => {
          return this.getImage(imgSrc, canvas);
        })
        .then(img => {
          ctx.beginPath();
          // 距离x，y的位置，需要加添图片半径，半径，起始点，圆
          ctx.arc(x + r, y + r, r, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(img, x, y, imgW, imgW);
          ctx.restore(); //需要编辑canvas内容则需要写入
          this.setDraw(ctx, true, resolve);
        })
        .catch(err => {
          console.error(err, '画过图片-叠加失败-drawMaterLookImage');
          resolve(err);
        });
    });
  }

  // 画看过文字
  drawMaterLookText(ctx: Ctx): void {
    const _this = this;
    const { lookUserAvatar, lookDescribe } = this._shopItem;
    const avatarLen =
      !Array.isArray(lookUserAvatar) || lookUserAvatar.length <= 0 ? 0 : lookUserAvatar.length >= 3 ? 3 : lookUserAvatar.length;
    const imgW = this.getNumber(40);
    const w = avatarLen >= 1 ? this.getNumber(16) * avatarLen - 1 - imgW : 0;
    const x = imgW * avatarLen - w + this.getNumber(30);
    // 绘制文本
    ctx.save();
    ctx.setFillStyle('#9c9c9c');
    ctx.setFontSize(this.getNumber(24));
    ctx.fillText(lookDescribe + '人看过', x, this.getNumber(888));
    ctx.restore(); //需要编辑canvas内容则需要写入
    _this.setDraw(ctx, true, () => {
      _this.createPosterImageForQW();
    });
  }

  // 生成海报图
  createPosterImageForQW(): void {
    const _this = this;
    const { width, height, canvasId } = this.state;
    this._timer && clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      wxCanvasToTempFilePath(
        {
          canvasId,
          destHeight: this.getNumber(height),
          destWidth: this.getNumber(width),
        },
        _this
      )
        .then(res => {
          if (res.errMsg === 'canvasToTempFilePath:ok') {
            Taro['loading'].hide();
            this.clearTime();
            this.setState({ posterPath: res.tempFilePath, visible: true });
            cachePoster[this._shopItem.shopId] = res.tempFilePath;
            this.props.onSuccess && this.props.onSuccess();
          }
        })
        .catch(err => {
          console.error(err);
          Taro['toast']('图片生成失败');
        });
    }, 100);
  }

  // 生成海报图
  createPosterImage(canvas: HTMLCanvasElement): void {
    const _this = this;
    const { width, height, ratio, canvasId } = this.state;
    const scale = Number((1 / ratio).toFixed(2));
    this._timer && clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      wxCanvasToTempFilePath(
        {
          canvas,
          canvasId,
          destHeight: height * ratio,
          destWidth: width * ratio,
          height: height * scale,
          width: width * scale,
        },
        _this
      )
        .then(res => {
          if (res.errMsg === 'canvasToTempFilePath:ok') {
            Taro['loading'].hide();
            this.clearTime();
            this.setState({ posterPath: res.tempFilePath, visible: true });
            cachePoster[this._shopItem.shopId] = res.tempFilePath;
            this.props.onSuccess && this.props.onSuccess();
          }
        })
        .catch(err => {
          console.error(err);
          Taro['toast']('图片生成失败');
        });
    }, 100);
  }

  // 下载海报
  async downloadPoster(): Promise<any> {
    const _this = this;
    const res = await wxGetSetting();
    if (!res.authSetting['scope.writePhotosAlbum']) {
      try {
        const wxAuth = await wxAuthorize({ scope: 'scope.writePhotosAlbum' });
        if (wxAuth.errMsg === 'authorize:ok') {
          _this.savePictureSystem();
        } else {
          _this.handleAuthorize();
        }
      } catch (error) {
        _this.handleAuthorize();
      }
    } else {
      _this.savePictureSystem();
    }
  }

  // 手动授权
  handleAuthorize(): void {
    Taro.showModal({
      title: '授权',
      content: '是否授权保存海报到相册？',
      success(modal) {
        if (modal.confirm) {
          wxOpenSetting().then(set => {
            set.authSetting = {
              'scope.userInfo': true,
              'scope.userLocation': true,
            };
          });
        } else {
          Taro['toast']('取消授权,海报无法保存到相册');
        }
      },
    });
  }

  // 保存到相册
  savePictureSystem(): void {
    wxSaveImageToPhotosAlbum({
      filePath: this.state.posterPath,
    })
      .then(() => {
        this.hide();
        Taro['toast']('保存成功');
      })
      .catch(err => {
        console.error(err);
        Taro['toast']('保存到相册失败');
        this.hide();
      });
  }

  render() {
    const { width, height, visible, posterPath, isVersion, canvasId } = this.state;
    const CanvasStyle = { width: `${width}px`, height: `${height}px` };
    const ShopPosterStyle = { overflow: 'hidden', width: `${width}px`, height: `${height}px` };
    const imgStyle = { overflow: 'hidden', width: `${width}rpx`, height: `${height}rpx` };
    return (
      <>
        {/* 海报地址 */}
        <View key="canvas_poster_img" className={`shop-poster_fixed ${visible ? 'shop-poster_visible' : ''} `}>
          <View className="poster-remove iconfont icon-remove" onClick={() => this.hide()}></View>
          {/* <View> */}
          {posterPath && <Image src={posterPath} mode="aspectFill" className="shop-poster_img" style={imgStyle} />}
          {/* </View> */}
          <View className="poster-button" onClick={() => this.download()}>
            保存海报
          </View>
        </View>
        <View className="shop-poster_layout" style={ShopPosterStyle}>
          <View className="poster-canvas_wrap" style={CanvasStyle} key="canvas_post">
            {!posterPath && (
              <Canvas
                id={canvasId}
                canvasId={canvasId}
                className="shopPoster"
                type={!isVersion ? '' : '2d'}
                style={CanvasStyle}
              ></Canvas>
            )}
          </View>
        </View>
      </>
    );
  }
}

export default ShopPoster;
