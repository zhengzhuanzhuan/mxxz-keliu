/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-11 04:15:24
 * @modify date 2017-08-11 04:15:24
 * @desc [utils工具函数]
*/
//  日期格式化
export function dateParse(dt, fmt) {
  if (typeof dt === 'string') {
    dt = new Date(dt)
  } else {
    dt = new Date(dt + '')
  }
  var o = {
    'y+': dt.getFullYear(),
    'M+': dt.getMonth() + 1,                 // 月份
    'd+': dt.getDate(),                    // 日
    'h+': dt.getHours(),                   // 小时
    'm+': dt.getMinutes(),                 // 分
    's+': dt.getSeconds(),                 // 秒
    'q+': Math.floor((dt.getMonth() + 3) / 3), // 季度
    'S+': dt.getMilliseconds()             // 毫秒
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k === 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
      } else if (k === 'S+') {
        var lens = RegExp.$1.length
        lens = lens === 1 ? 3 : lens
        fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens))
      } else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
  }
  return fmt
}
export function getIntervalDate (dayCount) {
  var dd = new Date()
  dd.setDate(dd.getDate() + dayCount) //  获取AddDayCount天后的日期
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1 //  获取当前月份的日期
  var d = dd.getDate();
  if (m >= 1 && m <= 9) {
    m = '0' + m
  }
  if (d >= 0 && d <= 9) {
    d = '0' + d
  }
  return y + '-' + m + '-' + d
}
//  获取最大值
export function getDicMax (temDic, name) {
  let max = temDic[0][name]
  for (let i = 1; i < temDic.length; i++) {
    let item = temDic[i]
    if (item[name] > max) {
      max = item[name]
    }
  }
  return max
}

export function getCurrentTime () {
  var time = new Date()
  var hour = time.getHours()
  var minute = time.getMinutes()
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  if (minute >= 0 && minute <= 9) {
    minute = '0' + minute
  }
  return hour + ':' + minute
}
export function formatSecond (second) {
  let time = second
  if (time !== null && time !== '') {
    if (time > 60 && time < 60 * 60) {
      time = "00:" + parseInt(time / 60.0) + "'" + parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60) + '"'
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time = parseInt(time / 3600.0) + ":" + parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60) + "'" +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60)+ '"'
    } else {
      time = "00:"+ "00'" + parseInt(time)+ '"'
    }
  }
  return time
}

export function getMonthFirst() {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  return `${year}-${month}-01`
}
