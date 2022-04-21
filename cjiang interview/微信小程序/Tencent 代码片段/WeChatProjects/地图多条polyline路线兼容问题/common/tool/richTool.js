/* 替换服务返回的富文本 中 color="#fff" => style="color:#fff" */
export const replaceColor = (str, styleObj) => {
  if (!str) {
    return "";
  }

  let style = "";

  if (styleObj) {
    style = Object.keys(styleObj).reduce(
      (s, v) => `${v}:${styleObj[v]};${s}`,
      ""
    );
  }

  return str.replace(
    /color=(["'])/gi,
    (match, p1) => `style=${p1}${style}color:`
  );
};
/**
 * 要转换的key
 */

const ATTR_KEY = {
  size: "font-size",
  color: "color",
  face: "font-family",
};
/**
 * 字符串转换成对象
 * @param {*} str  " size='84px' color='#000000DE' face='AlibabaSans102-Bold'"
 * @returns {size: '84px' color: '#000000DE' face: 'AlibabaSans102-Bold'}
 */

const strToObj = (str) => {
  if (!str) {
    return;
  }

  const obj = {};
  const arr = str.split(" ");

  for (const item of arr) {
    if (!item) {
      continue;
    }

    const subItem = item.split("="); //去单引号，并且有px的替换为rpx,等anyui修复限制微信小程序富文本识别‘rpx’的功能后，可使用该方案
    // obj[subItem[0]] = (subItem[1]).replace(/'/g, '').replace(/px/, 'rpx');
    // anyui限制了微信小程序富文本识别‘rpx’的功能，暂时使用‘px’

    let value = subItem[1].replace(/'/g, "");

    if (/^\d+(px)$/.test(value)) {
      value = Number.parseInt(value);
      value = value / 2 + "px";
    }

    obj[subItem[0]] = value;
  }

  return obj;
};
/**
 * 对象转换成字符串
 * @param {*} obj  {size: "84rpx", color:"#000000DE", face:"AlibabaSans102-Bold"}
 * @returns  'font-size:84rpx;color:#000000DE;font-family:AlibabaSans102-Bold'
 */

const objToStr = (obj) => {
  if (!obj || JSON.stringify(obj) === "{}") {
    return;
  }

  let newStr = "";

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newStr += `${ATTR_KEY[key]}: ${obj[key]}; `;
    }
  }

  return newStr;
};
/**
 * 富文本转换成小程序可识别形式,
 * 该方法只能处理包含一种标签的富文本；如果有多个标签，需要提前预处理，保证richText只包含一种标签
 * @param richText "<font size='84px' color='#000000DE' face='AlibabaSans102-Bold'>9.4</font><font size='32px' color='#212121'>元</font>"
 * @param richTag 原始标签
 * @param newTag 新标签
 * @param extraStyleObj 额外添加的样式
 * @returns
 *  <font style="font-size: 84rpx; color: #000000DE; font-family: AlibabaSans102-Bold;">9.4</font><font style="font-size: 32rpx; color: #212121;">元</font>
 */

export const richTextTransforme = ({
  richText = "",
  richTag = "",
  newTag = "",
  extraStyleObj = "",
}) => {
  if (!richText || !richTag) {
    return "";
  }

  const $contentReg = new RegExp("(?<=>)[^<>]+(?=<)", "g"); //正则内容

  const $attrReg = new RegExp(`(?<=(<${richTag}))[^<>]+(?=>)`, "g");
  const contents = richText.match($contentReg); // ["9.4", "元"]

  const attrs = richText.match($attrReg); //[" size='84px' color='#000000DE' face='AlibabaSans102-Bold'", " size='32px' color='#212121'"]

  if (!contents || !attrs) {
    //解析有问题时，返回原字符串
    return richText;
  }

  const styles = attrs.map((element) => {
    const tempObj = strToObj(element);
    const tempStr = objToStr(tempObj);
    return tempStr;
  });
  let extraStyle = "";

  if (extraStyleObj) {
    extraStyle = Object.keys(extraStyleObj).reduce(
      (s, v) => `${v}:${extraStyleObj[v]};${s}`,
      ""
    );
  }

  newTag = newTag || richTag;
  const arr = contents
    .map((val, index) => {
      return (
        val &&
        `<${newTag} style="${styles[index]}${extraStyle}">${val}</${newTag}>`
      );
    })
    .join("");
  return `${arr}`;
};
