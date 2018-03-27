<template>
  <div class="month-stat u-clearfix">
    <div class="month-stat-left u-left">
      <p class="title">本月累计来宾数</p>
      <p class="number">{{ amount }}</p>
      <div class="trend">
        <p class="title">环比</p>
        <p class="arrow" :class="{'arrow-down': yearAmount.percent < 0 }">
          <span class="percent">{{ yearAmount.percent }}%</span>
        </p>
      </div>
    </div>
    <div class="month-stat-right u-left">
      <div class="month-stat-right-top">
        <p class="title">本年累计来宾数</p>
        <p class="number">{{ yearAmount.total }}</p>
      </div>
      <div class="month-stat-right-bottom">
        <p class="title">平均停留时长</p>
        <p class="number">{{ time }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .month-stat {
    width: 100%;
    .title {
      height: 22px;
      line-height: 22px;
      font-size: 16px;
      text-align: center;
      color: #ffffff;
    }
    &-left {
      width: 206px;
      height: 170px;
      padding: 6px 5px 10px 5px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.1);
      .number {
        height: 50px;
        line-height: 50px;
        margin-top: 8px;
        font-size: 36px;
        font-weight: 500;
        letter-spacing: 4px;
        text-align: center;
        color: #fe5b4e;
      }
      .trend {
        margin-top: 4px;
        position: relative;
        .title {
          position: absolute;
          left: 42px;
          top: 42px;
        }
        .arrow {
          position: relative;
          width: 79px;
          height: 70px;
          margin: 4px 0 0 73px;
          background: url("../../../assets/img/arrow-up.png") no-repeat center;
          background-size: 100% 100%;
          .percent {
            position: absolute;
            left: 5px;
            top: 14px;
            height: 28px;
            line-height: 28px;
            font-size: 20px;
            text-align: left;
            color: #fe5b4e;
          }
        }
        .arrow-down {
          background: url("../../../assets/img/arrow-down.png") no-repeat center;
          background-size: 100% 100%;
          .percent {
            top: 15px;
            color: #21d586;
          }
        }
      }
    }
    &-right {
      width: 206px;
      height: 170px;
      margin-left: 6px;
      &-top {
        width: 100%;
        height: 83px;
        padding: 6px 5px 10px 5px;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0.1);
        .number {
          height: 40px;
          line-height: 40px;
          margin-top: 4px;
          font-size: 28px;
          font-weight: 500;
          letter-spacing: 3.3px;
          text-align: center;
          color: #00b8ff;
        }
      }
      &-bottom {
        width: 100%;
        height: 83px;
        padding: 4px 5px 10px 5px;
        margin-top: 4px;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0.1);
        .number {
          height: 40px;
          line-height: 40px;
          font-size: 24px;
          font-weight: 500;
          letter-spacing: 3px;
          text-align: center;
          color: #21d586;
        }
      }
    }

  }
</style>
<script>
  export default {
    props: ['amount', 'time', 'yearAmount'],
//    computed: {
//      duration: function () {
//        let _arr = this.time.split(':')
//        return `${_arr[0]}:${_arr[1]}'${_arr[2]}"`
//      }
//    }
  }
</script>