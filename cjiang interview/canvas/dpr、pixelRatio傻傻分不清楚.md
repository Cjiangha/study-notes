## 参考文章
[ReactNative中的pixelRatio](http://yangguang1029.github.io/2017/07/26/rn-pixelRatio/)
[dpr是啥](https://www.jianshu.com/p/ac9c1c7957ab)
[设备像素比(DPR)](https://www.jianshu.com/p/7184c56b6a48)
[Viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag)

## 1、dpr是什么？
>dpr即设备像素比（Device Pixel Ratio, DPR）：其实指的是 window.devicePixelRatio, 被所有WebKit浏览器以及Opera所支持，一个设备的物理像素与逻辑像素之比。


## 2、pixelRatio是什么？
>pixelRatio即是像素密度比就是物理像素除以独立像素的值。

* 比如坚果pro，它的物理像素是1080*1920，设备独立像素是360*640，所以它的像素密度是3。 在上面界面里也可以看到，例如ipad, GalaxyTab等平板一般像素密度是1，中断设备像素密度是2，高端些的设备像素密度就是3，当然也有一些设备像素密度是1.5或者2.5等。

* 首先我们要明确一点，我们在给图片设置尺寸时，是不需要写单位的，实际上单位就是独立像素。

* 假设有两个设备，它们的独立像素相同，都是360*640，那么我有一张图片，设置宽度为180，在这两个设备上都是占了一半屏幕宽。而如果有一个pad它的独立像素是768*1024，我们仍然希望它占一半屏幕的话，就需要把宽度设置为768*0.5=384了。例如对于背景图片，显然需要在任何设备上都占满屏幕，所以给它设置尺寸直接就是设备独立像素的值，也就是Dimension.get(“window”)得到的值。有的时候我们不希望随着屏幕变，例如那张图片仍然设置宽度为180，那么它在pad上宽度只占了23.4%。所以我们可以得知，给图片设置尺寸时，只决定于它在不同的独立像素屏幕上，需要显示成什么效果。最简单的方案是两种，要么设为固定值，要么跟屏幕独立像素成比例。否则就根据不同的屏幕来细分了。

* **那么这个像素密度拿来做什么用呢？**
  仍然说那两个设备，它们独立像素都是360*640，A设备像素密度为1，B设备像素密度为3，很容易得知A设备物理像素为360*640，而B设备物理像素为1080*1920。我有一张图片，美术给的尺寸是360*360,现在我给它设的尺寸宽度为180*180，根据上面所说，在这两个设备上图片都占屏幕一半宽，但A设备屏幕一半的物理像素是180，对于图片物理像素宽度360来说，缩小了一半。B设备屏幕一半的物理像素是540，对于图片物理像素宽度360来说，放大了1.5倍。不论放大还是缩小，都会导致图片显示模糊。如果要达到最好的显示效果，就应该给A设备提供180*180尺寸的图片，给B设备提供540*540尺寸的图片，这就是像素密度的作用。

* 是否要根据不同屏幕提供多套素材资源，取决于项目要求。我们在实际项目中可以使用pixelRation接口来实现物理像素和独立像素之间数值的转换，只要记住物理像素=独立像素*像素密度这个公式即可。

## 补充知识点：Viewport meta tag 即 \<meta>
相关代码
```HTML
<meta name="viewport" content="width:device-width, initial-scale=1.0, maximum=1.0, minimum=1.0, user-scalable=no">
<!-- 这行代码把视觉视窗大小设置成和布局视窗大小相等，这样我们在代码设置css像素时，设置的跟渲染出来效果也是一样。 -->
```

## [视口基础知识](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag#viewport_basics)

典型的移动优化网站包含以下内容：

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

并非所有设备都具有相同的宽度；您应该确保您的页面在各种屏幕尺寸和方向上都能正常工作。

“视口”`<meta>`标签的基本属性包括：

- `width`

  控制视口的大小。它可以设置为特定数量的像素，例如`width=600`或特殊值`device-width`，即[100vw](https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_viewport)或视口宽度的 100%。最低：`1`. 最大值：`10000`. 负值：忽略。

- `height`

  控制视口的大小。它可以设置为特定数量的像素，例如`height=400`或特殊值`device-height`，即[100vh](https://developer.mozilla.org/en-US/docs/Web/CSS/length#vh)或视口高度的 100%。最低：`1`. 最大值：`10000`. 负值：忽略。

- `initial-scale`

  控制第一次加载页面时的缩放级别。最低：`0.1`. 最大值：`10`. 默认值：`1`。负值：忽略。

- `minimum-scale`

  控制页面上允许的缩小程度。最低：`0.1`. 最大值：`10`. 默认值：`0.1`。负值：忽略。

- `maximum-scale`

  控制页面允许放大多少。任何小于 3 的值都无法访问。最低：`0.1`. 最大值：`10`. 默认值：`10`。负值：忽略。

- `user-scalable`

  控制页面上是否允许放大和缩小操作。有效值：`0`、`1`、`yes`或`no`。默认值：`1`，与 相同`yes`。将值设置`0`为 与 相同`no`，这违反了 Web 内容可访问性指南 (WCAG)。

> ⚠**警告⚠：**使用`user-scalable=no`可能会导致有视力障碍（例如低视力）的用户出现可访问性问题。[WCAG](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable#guideline_1.4_make_it_easier_for_users_to_see_and_hear_content_including_separating_foreground_from_background)要求至少 2 倍缩放；但是，最佳做法是启用 5 倍变焦。

