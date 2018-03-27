<template>
  <chart :options="polar" auto-resize></chart>
</template>
<style lang="less" scoped>
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
<script>
  export default {
    name: 'lineChart',
    data() {
      return {
        polar: {
          //NO3.布局
          grid: {
            left: 60,
            right: 30,
            top: 30,
            bottom: 60
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#3d5166'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                color: '#ffffff',
                fontSize: 14,
              }
            },
            data: []
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            max: 'dataMax',
            min: 'dataMin',
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: 14,
              }
            },
          },
          series: [
            {
              type: 'line',
              showSymbol: false,
              smooth: true,
              lineStyle: {
                normal: {
                  width: 3,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#e7665c' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#89ff66' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              hoverAnimation: false,
              data: []
            }
          ]
        }
      }
    },
    props: ['chartData'],
    watch: {
      chartData: {
        handler: function (val, oldval) {
          this.polar.xAxis.data = val.xdata
          this.polar.series[0].data = val.ydata
        },
        deep: true
      }
    }
  }
</script>