<template>
  <div class="right-top">
    <p class="right-top-tab u-clearfix">
      <span class="u-left" :class="{ active: activeState === 1 }">星座</span>
      <span class="u-left" :class="{ active: activeState === 2 }">年龄</span>
      <span class="u-left" :class="{ active: activeState === 3 }">性别</span>
    </p>
    <div class="right-top-chart">
      <!--<transition mode="out-in">-->
        <chart :options="starPolar" auto-resize v-if="activeState === 1"></chart>
        <chart :options="agePolar" auto-resize v-else-if="activeState === 2"></chart>
        <chart :options="genderPolar" auto-resize v-else="activeState === 3"></chart>
      <!--</transition>-->
    </div>
  </div>
</template>
<style lang="less" scoped>
  .right-top {
    width: 100%;
    height: 100%;
    &-tab {
      span {
        display: block;
        height: 34px;
        font-size: 20px;
        line-height: 34px;
        letter-spacing: 1.1px;
        padding: 0 15px;
        text-align: center;
        color: #ffffff;
        & + span {
          margin-left: 20px;
        }
      }
      span.active {
        color: #050f19;
        border-radius: 35px;
        background-color: #47b0ed;
        box-shadow: inset 0 1px 2px 0 rgba(0, 0, 30, 0.5);
      }
    }
    &-chart {
      width: 100%;
      height: 275px;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        starPolar: {
          radar: {
            name: {
              textStyle: {
                color: '#ffffff',
                fontSize: 18,
              }
            },
            radius: '65%',
            // 文字和图形之间的间隔
            nameGap: 10,
            // 去掉分割区域颜色
            splitArea: {
              show: false
            },
            splitNumber: 0,
            // 雷达图线的颜色
            axisLine: {
              lineStyle: {
                color: '#3d5166'
              }
            },
            // 外边框颜色
            splitLine: {
              lineStyle: {
                color: '#3d5166'
              }
            },
            indicator: []
          },
          series: [{
            name: '星座画像',
            type: 'radar',
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#18f092' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#fe6d61' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            // 连接线的颜色
            lineStyle: {
              normal: {
                color: '#7ff4ff',
                width: 1,
              }
            },
            // 小圆点的颜色
            itemStyle: {
              normal: {
                borderColor: '#7ff4ff',
                borderWidth: 3,
              }
            },
            data: []
          }]
        },
        agePolar: {
          grid: {
            left: 10,
            right: 40,
            bottom: 70
          },
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: -45,
              textStyle: {
                color: '#ffffff',
                fontSize: 14
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            // 去掉网格
            splitLine: {
              show: false,
            },
            data: []
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            // 去掉网格
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              type: 'bar',
              legendHoverLink: false,
              barWidth: '50%',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  offset: [0, -8],
                  formatter: '{c}%',
                  textStyle: {
                    color: '#e0fcff',
                    fontSize: 12
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#ffd54c' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#ff884c' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              data: []
            }
          ]
        },
        genderPolar: {
          color: ['#7ff4ff', '#ffd54c'],
          legend: {
            orient: 'horizontal',
            bottom: 10,
            textStyle: {
              color: '#ffffff',
              fontSize: 18,
            },
            data: []
          },
          series: [
            {
              name: '来宾性别画像',
              type: 'pie',
              center: ['50%', '50%'],
              radius: ['50%', '65%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: 30,
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: []
            }
          ]
        }
      }
    },
    props: ['activeState', 'trendData'],
    watch: {
      trendData: {
        handler: function (val, oldval) {
          //  星座开始
          this.starPolar.radar.indicator = val.star.indicator
          this.starPolar.series[0].data = [{
            value: val.star.data,
            name: '星座画像'
          }]
          //  星座结束
          //  年龄开始
          this.agePolar.xAxis.data = val.age.axisData
          this.agePolar.series[0].data = val.age.data
          //  年龄结束
          let legend = []
          for (let i = 0; i < val.gender.length; i++ ) {
            let item = val.gender[i]
            let dic = {}
            dic['name'] = item['name']
            dic['icon'] = 'circle'
            legend.push(dic)
          }
          //  性别开始
          this.genderPolar.legend.data = legend
          this.genderPolar.series[0].data = val.gender
          //  性别结束
        },
        deep: true
      }
    },
    mounted: function () {
    }
  }
</script>