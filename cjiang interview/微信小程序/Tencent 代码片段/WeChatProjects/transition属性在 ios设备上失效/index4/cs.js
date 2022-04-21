var longs=0;
var latis=0;

  
function getlocations() {
  var jd = 0;
  var wd = 0;
  wx.startLocationUpdateBackground({
    success: (res) => {
      wx.onLocationChange((result) => {
        jd = result.longitude;
        wd = result.latitude;
      })
    },
  })
 console.log(jd)
}
module.exports = {
  wz: getlocations
}