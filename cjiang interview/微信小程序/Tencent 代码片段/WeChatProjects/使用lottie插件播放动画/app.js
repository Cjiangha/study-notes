App({
  onLaunch() {
    var a = getDateTimeKeyArry('2021-11-11 00:00:00')
    console.log(a)
    console.log(new Date('2021-11-11 00:00:00').getFullYear())
    console.log(new Date('2021/11/11 00:00:00').getFullYear())
  }
})
  function getDateTimeKeyArry(dateTime){
    // 当前时间的处理
    var newDate = dateTime ? new Date(dateTime) : new Date();
    var year = withData(newDate.getFullYear()),
        mont = withData(newDate.getMonth() + 1),
        date = withData(newDate.getDate()),
        hour = withData(newDate.getHours()),
        minu = withData(newDate.getMinutes()),
        seco = withData(newDate.getSeconds());
    return [year, mont, date, hour, minu, seco];
  }
  function withData(param){
    return param < 10 ? '0' + param : '' + param;
  }