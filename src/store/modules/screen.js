/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-17 07:47:35
 * @modify date 2017-10-25 04:20:55
 * @desc [大屏store]
*/
import api from '@/api/urls'
import request from '@/api/request'
import {getDicMax, getCurrentTime, formatSecond} from "@/utils/index"
const screen = {
  state: {
    minute: {
      xdata: [],
      ydata: []
    },
    dayNumber: '00000',
    realNumber: '00',
    duration: '0',
    historyDay: '0',
    historyYear: {
      total: 0,
      percent: 0
    },
    tags: {
      gender: [],
      star: { data: [], indicator: [] },
      age: { data: [], axisData: []},
      business: { data: [], axisData: []},
      interest: [],
      apptype: { data: [], indicator: []}
    },
    hotPoint: {
      list: [],
      point: [],
      factor: 1
    }
  },

  mutations: {
    SET_MINUTE (state, data) {
      state.minute = data
    },
    SET_DAY (state, data) {
      state.dayNumber = data
    },
    SET_REALTIME (state, data) {
      state.realNumber = data
    },
    SET_HISTORYDAY (state, data) {
      state.historyDay = data
    },
    SET_HUANBI (state, data) {
      state.historyYear = data
    },
    SET_DURATION (state, data) {
      state.duration = data
    },
    SET_TAG (state, data) {
      state.tags = data
    },
    SET_HOT (state, data) {
      state.hotPoint = data
    },
  },
  actions: {
    // 获取实时来宾
    GET_MINUTE ({ commit }, data) {
      request({
        url: api.getMinute,
        data: data
      }).then(res => {
        let _data = res.data[data.agsid][data.begin_date]
        let keys = Object.keys(_data).sort()
        let xdata = []
        let ydata = []
        var currentTime = getCurrentTime()
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i]
          if (key < currentTime) {
            xdata.push(key)
            ydata.push(_data[key]['uv'])
          }
        }
        commit('SET_MINUTE', { xdata: xdata, ydata: ydata })
      })
    },
    // 获取今日来宾
    GET_DAY ({ commit }, data) {
      request({
        url: api.getDay,
        data: data
      }).then(res => {
        let _data = res.data[data.agsid][data.begin_date]
        // 今日累计来宾
        let uvin = _data['uv']
        if (uvin >=0 && uvin < 10) {
          uvin = '0000' + uvin.toString()
        } else if (uvin >= 10 && uvin < 100) {
          uvin = '000' + uvin.toString()
        } else if (uvin >= 100 && uvin < 1000) {
          uvin = '00' + uvin.toString()
        } else if (uvin >= 1000 && uvin < 10000) {
          uvin = '0' + uvin.toString()
        } else if (uvin >=10000 && uvin <= 99999) {
          uvin = uvin.toString()
        } else {
          uvin = '99999'
        }
        commit('SET_DAY', uvin)
        // 获取停留时长
        let duration = _data['duration_avg']
        duration = formatSecond(duration)
        commit('SET_DURATION', duration)
      })
    },
    GET_REALTIME ({ commit }, data ) {
      request({
        url: api.getRealtime,
        data: data
      }).then(res => {
        let _data = res.data[data.agsid]
        // 实时来宾数
        let uvin = '0'
        if (_data == null) {
          // 实时来宾数
          uvin = '0'
        } else {
          uvin = _data['uv']
        }
        commit('SET_REALTIME', uvin)
      })
    },
    GET_HISTORYDAY ({ commit }, data) {
      request({
        url: api.getHistoryday,
        data: data
      }).then(res => {
        let sum = res['sum']
        commit('SET_HISTORYDAY', sum)
      })
    },
    GET_TAG ({ commit }, data) {
      request({
        url: api.getTag,
        data: data
      }).then(res => {
        let _data = res['data']
        // 性别画像开始
        let genderArr = []
        let gender = _data['gender']['all']
        for (let i = 0; i< gender.length; i++) {
          let genderItem = gender[i]
          let tempDic = {}
          tempDic["value"] = genderItem["rate"]
          tempDic["name"] = `${genderItem["tag_name"]} ${genderItem["rate"]} %`
          genderArr.push(tempDic)
        }
        // 性别画像结束
        // 星座开始
        let star = _data["star"]["all"];
        let starData = []
        let starIndicator = []
        // 获取数组中的最大值
        let maxValue = getDicMax(star, 'rate')
        for (var i = 0; i< star.length; i++) {
          let item = star[i]
          let tempDic = {}
          tempDic['name'] = item["tag_name"]
          tempDic["max"] = maxValue
          starIndicator.push(tempDic)
          starData.push(item["rate"])
        }
        // 星座结束
        // 年龄开始
        let age = _data["age"]["all"]
        let ageData = []
        let ageAxisData = []
        for (let i = 0; i< age.length; i++) {
          let item = age[i]
          ageData.push(item["rate"])
          ageAxisData.push(item["tag_name"])
        }
        // 年龄结束
        // 职业开始
        let business = _data["business"]["all"]
        let businessData = []
        let businessAxisData = []
        for (let i = 0; i< business.length; i++) {
          let item = business[i]
          businessData.push(item["rate"])
          let job = item["tag_name"].toString()
          if (job === "公司职员") {
            job = "职员"
          } else if (job === "个体经营/服务人员") {
            job = "服务"
          } else if (job === "医务人员") {
            job = "医生"
          } else if (job === "教职工") {
            job = "教师"
          } else if (job === "媒体从业者") {
            job = "媒体"
          } else if (job === "科研人员") {
            job = "科研"
          } else if (job === "金融从业者") {
            job = "金融"
          }
          businessAxisData.push(job)
        }
        // 职业结束
        // 购物兴趣开始
        let interest = _data["interest"]["all"]
        let interestData = []
        if (interest.length > 6) {
          interest = interest.slice(0, 6)
        }
        for (let i = 0; i< interest.length; i++) {
          let item = interest[i]
          let tempDic = {}
          let _name = item["tag_name"]
          tempDic["name"] = _name.split('/')[0]
          tempDic["value"] = item["rate"];
          // tempDic["itemStyle"] = { normal: { color: 'rgba(255, 255, 255, 0.1)'} }
          interestData.push(tempDic)
        }
        // 购物兴趣结束
        // 上网偏好开始
        let apptype = _data["apptype"]["all"]
        let apptypeData = []
        let apptypeIndicatorData = []
        // 获取数组中的最大值
        let apptypeMaxValue = getDicMax(apptype, 'rate')
        for (let i = 0; i< apptype.length; i++) {
          let item = apptype[i]
          let tempDic = {}
          tempDic["name"] = item["tag_name"]
          tempDic["max"] = apptypeMaxValue
          apptypeIndicatorData.push(tempDic)
          apptypeData.push(item["rate"])
        }
        // 上网偏好结束
        commit('SET_TAG', {
          gender: genderArr,
          star: { data: starData, indicator: starIndicator },
          age: { data: ageData, axisData: ageAxisData},
          business: { data: businessData, axisData: businessAxisData},
          interest: interestData,
          apptype: { data: apptypeData, indicator: apptypeIndicatorData},
        })
      })
    },
    GET_HUANBI ({ commit }, data) {
      request({
        url: api.getHuanbi,
        data: data
      }).then(res => {
        commit('SET_HUANBI', { total: res.totalGuests, percent: (res.percent * 100).toFixed(1) })
      })
    },
    GET_HOT ({ commit }, data) {
      request({
        url: api.getHot,
        data: data
      }).then(res => {
        let _list = []
        let _point = []
        let _factor = 1
        let address = ['24014349099200', '24014413062301', '24014416211837', '24014419095361']
        for (let i = 0; i < res.length; i++) {
          let item = res[i]
          if (i === 0) {
            _factor = item.factor
          }
          if (address.indexOf(item.shopId) > -1) {
            let dic = {}
            dic['uv'] = item.uv
            dic['areaName'] = item.areaName
            _list.push(dic)
          }
          //  列表结束
          _point = _point.concat(item.point)
        }
        commit('SET_HOT', { list: _list, point: _point, factor: _factor })
      })
    },
  }
}

export default screen
