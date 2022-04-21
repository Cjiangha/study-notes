<template>
	<view class="slide-verify" :style="{ width: w + 'px' }" id="slideVerify" onselectstart="return false; ">
		<!-- 图片加载遮蔽罩 -->
		<view :class="{ 'slider-verify-loading': loadBlock }"></view>

		<!-- <canvas type="2d" id="block" class="slide-verify-block" ref="block"></canvas> -->
		<!-- container -->
		<movable-area>
			<canvas :style="{width: w + 'px',height:h+ 'px'}" ref="canvas" canvas-id="canvas" v-if="canRefsh"></canvas>
			<!-- <canvas type="2d" id="canvas" ref="canvas"></canvas> -->
			<view v-if="show" @click="refresh" class="slide-verify-refresh-icon">
				<img src="./slideIco/login_refresh.png" alt="" />
			</view>

			<view v-show="!success" class="slide-verify-slider" :class="{
        'container-active': containerActive,
        'container-success': containerSuccess,
        'container-fail': containerFail,
      }">
				<view class="slide-verify-slider-mask" :style="{ width: sliderMaskWidth }">
					<!-- slider -->
					<movable-view direction="horizontal" @touchend="touchEnd" @touchstart="touchstart"  >
						<view :style="{width: blockW + 'px',height:h+ 'px'}" class="slide-verify-block">
							<canvas canvas-id="block" style="width: 100%;height: 100%;" v-if="canRefsh">
							</canvas>
						</view>
						<view class="slide-verify-slider-mask-item" style=" position: absolute;
				    top: 177px;">
							<view class="slide-verify-slider-mask-item-icon"></view>
						</view>
					</movable-view>
				</view>
				<text class="slide-verify-slider-text">{{ sliderText }}</text>
			</view>
		</movable-area>
		<view v-if="success" class="slide-verify-slider-success">
			<img src="./slideIco/login_success.png" alt="" />
			<view>只用了{{ second }}s，这速度简直完美</view>
		</view>
		<view v-if="containerFail" class="slide-verify-slider-fail">
			<img src="./slideIco/login_fail.png" alt="" />
			<view>验证失败，请重试</view>
		</view>
	</view>
</template>
<script>
	const PI = Math.PI

	function sum(x, y) {
		return x + y
	}

	function square(x) {
		return x * x
	}
	export default {
		name: 'SlideVerify',
		props: {
			// block length
			l: {
				type: Number,
				default: 42,
			},
			// block radius
			r: {
				type: Number,
				default: 10,
			},
			// canvas width
			w: {
				type: Number,
				default: 367,
			},
			// canvas height
			h: {
				type: Number,
				default: 165,
			},
			sliderText: {
				type: String,
				default: '请向右拖动滑块完成拼图',
			},
			accuracy: {
				type: Number,
				default: 5, // 若为 -1 则不进行机器判断
			},
			show: {
				type: Boolean,
				default: true,
			},
			imgs: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				containerActive: false, // container active class
				containerSuccess: false, // container success class
				containerFail: false, // container fail class
				canvasCtx: null,
				blockCtx: null,
				block: null,
				block_x: undefined, // container random position
				block_y: undefined,
				L: this.l + this.r * 2 + 3, // block real lenght
				img: undefined,
				originX: undefined,
				originY: undefined,
				isMouseDown: false,
				trail: [],
				sliderLeft: 0, // block right offset
				sliderMaskWidth: 0, // mask width,
				success: false, // Bug Fixes 修复了验证成功后还能滑动
				loadBlock: true, // Features 图片加载提示，防止图片没加载完就开始验证
				timestamp: null,
				blockW: 0,
				ImageData: null,
				blockMoveLeft: 0,
				canRefsh: true,
				moving: false,
			}
		},
		computed: {
			second() {
				return (this.timestamp / 1000).toFixed(1)
			},
		},
		mounted() {
			this.imgs = [
					require('../../static/images/slideIco/1a.jpg'),
					require('../../static/images/slideIco/2a.jpg'),
					require('../../static/images/slideIco/3a.jpg'),
					require('../../static/images/slideIco/4a.jpg'),
					require('../../static/images/slideIco/5a.jpg')
				]
			this.init();
		},
		methods: {
			touchstart(e){
				this.timestamp = +new Date()
				this.moving = true;
				this.blockMoveLeft = e.changedTouches[0].pageX;
			},
			touchEnd(e) {
				this.moving = false;
				this.timestamp = +new Date() - this.timestamp
				let start = this.blockMoveLeft;
				let end = e.changedTouches[0].pageX;
				let move = end - start;
				if( Math.abs(this.block_x - move)<4 && Math.abs(this.block_x - move)>-4){
					this.success = true
					setTimeout(() => {
						this.$emit('success')
					}, 300);
				}else{
					this.containerFail = true;
					setTimeout(()=>{ 
						this.resetImg()
					},1000)
				}
			},
			init() {
				this.initDom()
			},
			initDom() {
				this.blockW = this.w;
				this.canvasCtx = wx.createCanvasContext('canvas', this.$scope)
				this.blockCtx = wx.createCanvasContext('block', this.$scope)
				this.drawBlock()
			},
			drawBlock() {
				this.block_x = this.getRandomNumberByRange(
					this.L + 10,
					this.w - (this.L + 10)
				)
				this.block_y = this.getRandomNumberByRange(
					10 + this.r * 2,
					this.h - (this.L + 10)
				)
				const src = this.getRandomImg();
				this.loadBlock = false
				let {
					block_x: x,
					block_y: y,
					r,
					L
				} = this
				let _y = y - r * 2 - 1
				let that = this
				this.draw(this.canvasCtx, this.block_x, this.block_y, 'fill')
				this.draw(this.blockCtx, this.block_x, this.block_y, 'clip')
				setTimeout(() => {
					this.canvasCtx.drawImage(src, 0, 0, this.w, this.h)
					this.canvasCtx.draw()
					this.blockCtx.drawImage(src, 0, 0, this.w, this.h)
					this.blockCtx.draw(false, () => {
						wx.canvasGetImageData({
							canvasId: 'block',
							x: x,
							y: _y,
							width: L,
							height: L,
							success(res) {
								let ImageData = res.data;
								that.blockW = L;
								setTimeout(() => {
									wx.canvasPutImageData({
										canvasId: 'block',
										x: 0,
										y: _y,
										width: L,
										data: ImageData,
										success(res) {
											console.log(res)
										}
									}, that.$scope)
								}, 500)
							}
						}, that.$scope)
					})
				}, 500)
			},
			draw(ctx, x, y, operation) {
				let {
					l,
					r
				} = this
				let that = this
				ctx.beginPath()
				ctx.moveTo(x, y)
				console.log(x, y, r)
				ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
				ctx.lineTo(x + l, y)
				ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
				ctx.lineTo(x + l, y + l)
				ctx.lineTo(x, y + l)
				ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
				ctx.lineTo(x, y)
				ctx.lineWidth = 2
				ctx.fillStyle = 'rgba(0, 0, 0, 1)'
				ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
				ctx.stroke()
				ctx[operation]()
				// Bug Fixes 修复了火狐和ie显示问题
				ctx.globalCompositeOperation = 'destination-over'
			},
			// 随机生成img src
			getRandomImg() {
				const len = this.imgs.length
				return len > 0 ?
					this.imgs[this.getRandomNumberByRange(0, len)] :
					'https://picsum.photos/300/150/?image=' +
					this.getRandomNumberByRange(0, 1084)
			},
			getRandomNumberByRange(start, end) {
				return Math.round(Math.random() * (end - start) + start)
			},
			refresh() {
				this.resetImg()
				this.$emit('refresh')
			},
			
			resetImg() {
				this.success = false
				this.containerActive = false
				this.containerSuccess = false
				this.containerFail = false
				this.sliderLeft = 0
				this.blockMoveLeft = 0
				this.sliderMaskWidth = 0
				this.canRefsh = false;
				this.blockW = this.w;
				this.$nextTick(() => {
					this.canRefsh = true;
				})
				// canvas
				let {
					w,
					h
				} = this
				this.initDom();
				this.$emit('fulfilled')
			},
		},
	}
</script>
<style lang="scss" scoped>
	.slide-verify {
		position: relative;
		width: 100% !important;
	}

	/* 图片加载样式 */
	.slider-verify-loading {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.9);
		z-index: 999;
		animation: loading 1.5s infinite;
	}

	@keyframes loading {
		0% {
			opacity: 0.7;
		}

		100% {
			opacity: 9;
		}
	}

	.slide-verify-block {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 99;
	}

	movable-area {
		width: 100%;
		height: auto;

		movable-view {
			width: 72rpx;
			height: 220px;
			background-size: 100% 310rpx;
		}
	}

	.slide-verify-refresh-icon {
		position: absolute;
		right: 0;
		top: 128px;
		width: 34px;
		height: 34px;
		cursor: pointer;
		background-size: 34px 471px;
		z-index: 199;
	}

	.slide-verify-refresh-icon img {
		width: 34px;
		height: 34px;

	}

	.slide-verify-slider-success {
		position: relative;
		text-align: center;
		width: 100%;
		height: 32px;
		line-height: 32px;
		margin-top: 20px;
		background: rgba(0, 184, 141, 0.08);
		border-radius: 2px;
		font-size: 14px;
		color: #00b88d;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slide-verify-slider-success img {
		width: 12px;
		height: 12px;
		margin-right: 12px;
	}

	.slide-verify-slider-fail {
		position: relative;
		text-align: center;
		width: 100%;
		height: 22px;
		line-height: 22px;
		margin-top: 17px;
		border-radius: 2px;
		font-size: 14px;
		color: #e60027;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slide-verify-slider-fail img {
		width: 12px;
		height: 12px;
		margin-right: 12px;
	}

	.slide-verify-slider {
		position: relative;
		text-align: center;
		width: 100%;
		height: 32px;
		line-height: 32px;
		margin-top: 20px;
		background: rgba(30, 112, 254, 0.08);
		border-radius: 2px;
	}

	.slide-verify-slider-mask {
		position: absolute;
		left: 0;
		top: 0;
		height: 32px;
		border: 0 solid #1991fa;
		background: #d1e9fe;
	}

	.slide-verify-slider-mask-item {
		position: absolute;
		top: 120px;
		left: 0;
		width: 67px;
		height: 52px;
		cursor: pointer;
		transition: background 0.2s linear;
	}

	.slide-verify-slider-mask-item:hover {
		/* background: #1991fa; */
	}

	.slide-verify-slider-mask-item:hover .slide-verify-slider-mask-item-icon {
		/* background-position: 0 -13px; */
	}

	.slide-verify-slider-mask-item-icon {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url('./slideIco/login_slide.png') -7px 0 no-repeat;
		background-size: 100% 100%;
	}

	.container-active .slide-verify-slider-mask-item {
		top: -11px;
	}

	.container-active .slide-verify-slider-mask {
		height: 30px;
		border-width: 1px;
	}

	.container-success .slide-verify-slider-mask-item {
		top: -11px;

	}

	.container-success .slide-verify-slider-mask {
		height: 30px;
		border: 1px solid #52ccba;
		background-color: #d2f4ef;
	}

	.container-success .slide-verify-slider-mask-item-icon {
		/* background-position: 0 0 !important; */
	}

	.container-fail .slide-verify-slider-mask-item {
		top: -11px;
	}

	.container-fail .slide-verify-slider-mask {
		height: 30px;
		border: 1px solid #f57a7a;
		background-color: #fce1e1;
	}

	.container-fail .slide-verify-slider-mask-item-icon {}

	.slide-verify-slider-text {
		font-size: 14px;
		color: #1e70fe;
	}

	.container-active .slide-verify-slider-text,
	.container-success .slide-verify-slider-text,
	.container-fail .slide-verify-slider-text {
		display: none;
	}
</style>
