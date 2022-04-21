import { promisify } from '../utils.js'
function _replaceObjAttr(target, diffs) {
  for(let key in diffs) {
    if(Object.keys(diffs[key]).includes(target[key])) {
      target[key] = diffs[key][target[key]]
    }
  }
  return target
}

function getSystemInfo(obj = {}) {
  wx.getSystemInfo({
    ...obj,
    success: res => {
      res.app = "wechat"
      console.warn("storage、currentBattery不支持")
      // 需要去差别化的返回值
      const jsonKeys = {
        platform: {
          ios: 'iOS',
          android: 'Android'
        },
        language: {
          zh_CN: 'zh-Hans',
          zh_TW: 'zh-Hant'
        }
      }
      // 微信端的system会加上系统名称，制服版仅返回系统版本
      res.system = res.system.split(' ')[1]
      res = _replaceObjAttr(res, jsonKeys)
      res.titleBarHeight = (wx.getMenuButtonBoundingClientRect().top - res.statusBarHeight)* 2 + wx.getMenuButtonBoundingClientRect().height
      obj.success && obj.success(res)
    }
  })
}

export default promisify(getSystemInfo)