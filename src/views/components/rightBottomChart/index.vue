<template>
  <div class="right-bottom">
    <p class="right-bottom-tab u-clearfix">
      <span class="u-left" :class="{ active: activeState === 1 }">职业</span>
      <span class="u-left" :class="{ active: activeState === 2 }">购物兴趣</span>
      <span class="u-left" :class="{ active: activeState === 3 }">上网偏好</span>
    </p>
    <div class="right-bottom-chart">
      <chart :options="jobPolar" auto-resize v-if="activeState === 1"></chart>
      <chart :options="shopPolar" auto-resize v-else-if="activeState === 2"></chart>
      <chart :options="interPolar" auto-resize v-else="activeState === 3"></chart>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .right-bottom {
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
      height: 358px;
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
        jobPolar: {
          grid: {
            left: 0,
            right: 0,
          },
          xAxis: {
            axisLabel: {
              interval: 0,
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
            max: "dataMax",
            min: 0,
            // 去掉网格
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              type: 'bar',
              legendHoverLink: false,
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
        shopPolar: {
          calculable: false,
          color: ['rgba(255, 156, 0, 0.8)',
            'rgba(0, 149, 255, 0.8)',
            'rgba(253, 51, 148, 0.8)',
            'rgba(253, 184, 51, 0.8)',
            'rgba(255, 205, 160, 0.8)',
            'rgba(90, 255, 126, 0.8)'],
          series: [{
            name: '',
            type: 'treemap',
            left: 0,
            right: 0,
            top: 28,
            bottom: 0,
            itemStyle: {
              normal: {
                borderColor: 'transparent',
                gapWidth: 3
              }
            },
            label: {
              normal: {
                fontSize: 14,
                fontWeight: 'bold',
                align: 'center'
              }
            },
            breadcrumb: { //关闭面包屑路径
              show: false
            },
            roam: false,  //关闭平移拖动
            nodeClick: false, //关闭节点点击
            silent: false,  //关闭鼠标事件
            data: []
          }]
        },
        interPolar: {
          radar: {
            name: {
              textStyle: {
                color: '#ffffff',
                fontSize: 14,
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
        }
      }
    },
    props: ['activeState', 'trendData'],
    watch: {
      trendData: {
        handler: function (val, oldval) {
          //  职业开始
          this.jobPolar.xAxis.data = val.business.axisData
          this.jobPolar.series[0].data = val.business.data
          //  职业结束
          this.shopPolar.series[0].data = val.interest
          //  上网偏好开始
          this.interPolar.radar.indicator = val.apptype.indicator
          this.interPolar.series[0].data = [{
            value: val.apptype.data,
            name: '上网偏好'
          }]
          //  上网偏好结束
        },
        deep: true
      }
    },
    methods: {
    },
    mounted: function () {
    }
  }
</script>