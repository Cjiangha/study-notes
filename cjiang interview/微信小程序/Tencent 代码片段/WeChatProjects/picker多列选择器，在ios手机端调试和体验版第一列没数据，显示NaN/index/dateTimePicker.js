function withData(param){
    return param < 10 ? '0' + param : '' + param;
  }
  function getLoopArray(start,end){
    var start = start || 0;
    var end = end || 1;
    console.log(start,end)
    var array = [];
    for (var i = start; i <= end; i++) {
      array.push(withData(i));
    }
    return array;
  }
  
  // 根据最小和最大月份获取月份 数组     月
  function getMountData(minMonth, maxMonth) {
    minMonth = minMonth ? minMonth : 1
    maxMonth = maxMonth ? maxMonth : 12
    const array = getLoopArray(Number(minMonth), Number(maxMonth))
    return array;
  }
  
  // 根据年月获取当前月份的所有天数 数组    日
  function getDayData(year, month, minDay, maxDay) {
    const dayArr = getMonthFirstLastDay(year,month)
    let array = getLoopArray(dayArr[0], dayArr[1])
    let index = 0
    if (minDay) {
      index = array.indexOf(minDay)
      array = array.slice(index)
    }
    if (maxDay) {
      index = array.indexOf(maxDay)
      array = array.slice(0,index+1)
    }
    return array;
  }
  
  // 根据最小和最大时 获取时 数组   时
  function getHourData(minHour, maxHour) {
    minHour = minHour ? minHour : 0
    maxHour = maxHour ? maxHour : 23
    const array = getLoopArray(Number(minHour), Number(maxHour))
    return array;
  }
  
  // 根据最小和最大分 获取分 数组   分
  function getMinuteData(minMinute, maxMinute) {
    minMinute = minMinute ? minMinute : 0
    maxMinute = maxMinute ? maxMinute : 59
    const array = getLoopArray(Number(minMinute), Number(maxMinute))
    return array;
  }
  
  // 根据最小和最大秒 获取秒 数组   秒
  function getSecondData(minSecond, maxSecond) {
    minSecond = minSecond ? minSecond : 0
    maxSecond = maxSecond ? maxSecond : 59
    const array = getLoopArray(Number(minSecond), Number(maxSecond))
    return array;
  }
  
  // 根据年月 获取月份第一天和最后一天
  function getMonthFirstLastDay(year,month){
    var firstDay = new Date(year,month-1,1);                              //这个月的第一天
    var currentMonth = firstDay.getMonth();                               //取得月份数
    var lastDay = new Date(firstDay.getFullYear(), currentMonth + 1, 0);  //是0而不是-1
    return [firstDay.getDate() ,lastDay.getDate()]
  }
  
  // 根据时间设置当前时间的索引 数组
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
  
  // 根据最小和最大时间，设置当前日期时间 选择器的可选时间范围和 默认选中时间
  function dateTimePicker(minDate, maxDate, defaultDate) {
    minDate = minDate?minDate:'1900-01-01 00:00:00' 
    console.log(minDate)
    // minDate = '2021-11-11 00:00:00'
    maxDate = maxDate ? maxDate : '2100-12-31 23:59:59'
    defaultDate = defaultDate ? getDateTimeKeyArry(defaultDate) : getDateTimeKeyArry()
    const year = defaultDate[0]
    const mouth = defaultDate[1]
    const day = defaultDate[2]
    const hour = defaultDate[3]
    const minute = defaultDate[4]
  
    const minArr = getDateTimeKeyArry(minDate)
    console.log(minArr)
    const maxArr = getDateTimeKeyArry(maxDate)
    
    const minMonth = year == minArr[0] ? minArr[1] : ''
    const maxMonth = year == maxArr[0] ? maxArr[1] : ''
    
    const minDay = year == minArr[0] && mouth == minArr[1] ? minArr[2] : ''
    const maxDay = year == maxArr[0] && mouth == maxArr[1] ? maxArr[2] : ''
    
    const minHour = year == minArr[0] && mouth == minArr[1] && day == minArr[2] ? minArr[3] : ''
    const maxHour = year == maxArr[0] && mouth == maxArr[1] && day == maxArr[2] ? maxArr[3] : ''
    
    const minMinute  = year == minArr[0] && mouth == minArr[1] && day == minArr[2] && hour == minArr[3] ? minArr[4] : ''
    const maxMinute  = year == maxArr[0] && mouth == maxArr[1] && day == maxArr[2] && hour == maxArr[3] ? maxArr[4] : ''
    
    const minSecond = year == minArr[0] && mouth == minArr[1] && day == minArr[2] && hour == minArr[3] && minute == minArr[4] ? minArr[5] : ''
    const maxSecond = year == maxArr[0] && mouth == maxArr[1] && day == maxArr[2] && hour == maxArr[3] && minute == maxArr[4] ? maxArr[5] : ''
  
    // 返回默认显示的数组和联动数组的声明
    let dateTime = [], dateTimeArray = [[],[],[],[],[],[]];
  
    // 处理联动列表数据
    /*年月日 时分秒*/ 
    dateTimeArray[0] = getLoopArray(minArr[0],maxArr[0]);
    console.log(dateTimeArray[0])
    dateTimeArray[1] = getMountData(minMonth, maxMonth)
    dateTimeArray[2] = getDayData(year, mouth, minDay ? minDay : '', maxDay ? maxDay : '');
    dateTimeArray[3] = getHourData(minHour, maxHour);
    dateTimeArray[4] = getMinuteData(minMinute, maxMinute);
    dateTimeArray[5] = getSecondData(minSecond, maxSecond);
  
    dateTimeArray.forEach((current,index) => {
      dateTime.push(current.indexOf(defaultDate[index]));
    });
  
    // console.log(dateTimeArray)
    return {
      dateTimeArray: dateTimeArray,
      dateTime: dateTime
    }
  }
  
  function getDateTimeChange(params) {
    const { e, dateArr, arr, minDate, maxDate } = params
    var ret = [];
    var arr1 = arr;
    arr1[e.detail.column] = e.detail.value;
    
    const minArr = minDate ? getDateTimeKeyArry(minDate) : []
    const maxArr = maxDate ? getDateTimeKeyArry(maxDate) : []
    
    ret[0] = dateArr[0]
    var year = dateArr[0][arr1[0]]
    var minMouth = year == minArr[0]  ? minArr[1] : ''
    var maxMouth = year == maxArr[0] ? maxArr[1] : ''
    ret[1] = getMountData(minMouth, maxMouth);
  
    var mouth = dateArr[1][arr1[1]]
    var minDay = year == minArr[0] && mouth == minArr[1] ? minArr[2] : ''
    var maxDay = year == maxArr[0] && mouth == maxArr[1] ? maxArr[2] : ''
    ret[2] = getDayData(year, mouth, minDay, maxDay);
  
    var day = dateArr[2][arr1[2]]
    var minHour = year == minArr[0] && mouth == minArr[1] && day == minArr[2] ? minArr[3] : ''
    var maxHour = year == maxArr[0] && mouth == maxArr[1] && day == maxArr[2] ? maxArr[3] : ''
    ret[3] = getHourData(minHour, maxHour);
  
    var hour = dateArr[3][arr1[3]]
    var minMinute = year == minArr[0] && mouth == minArr[1] && day == minArr[2] && hour == minArr[3] ? minArr[4] : ''
    var maxMinute = year == maxArr[0] && mouth == maxArr[1] && day == maxArr[2] && hour == maxArr[3] ? maxArr[4] : ''
    ret[4] = getMinuteData(minMinute, maxMinute);
  
    var minute = dateArr[4][arr1[4]]
    var minSecond = year == minArr[0] && mouth == minArr[1] && day == minArr[2] && hour == minArr[3] && minute == minArr[4] ? minArr[5] : ''
    var maxSecond = year == maxArr[0] && mouth == maxArr[1] && day == maxArr[2] && hour == maxArr[3] && minute == maxArr[4] ? maxArr[5] : ''
    ret[5] =  getSecondData(minSecond, maxSecond);
    // console.log(ret)
    return ret
  }
  
  module.exports = {
    dateTimePicker,
    getDateTimeChange
  }
  