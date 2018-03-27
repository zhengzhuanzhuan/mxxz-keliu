<template>
<div class="main">
  <div class="main-header">
    
    <div class="main-header-logo">
      <img src="../../assets/img/logo.png" alt="梦想小镇">
    </div>
    <div class="main-header-title">
      <p class="zn-name">梦想小镇客流画像</p>
      <p class="en-name">Dream Town Customer Profile</p>
    </div>
    <div class="main-header-time">
      <p class="date">{{ date }}</p>
      <p class="time">{{ time }}</p>
    </div>
  </div>
  <div class="main-wrap u-clearfix">
    <div class="main-wrap-left">
      <div class="left-top">
        <title-bar label="实时来宾"></title-bar>
        <div class="chart-wrap">
          <left-chart :chartData="minute"></left-chart>
        </div>
      </div>
      <div class="left-bottom">
        <title-bar label="来宾指数"></title-bar>
        <div class="chart-wrap">
          <!-- historyDay的定义及用法的是实现-->
          <left-stat :amount="historyDay" :time="duration" :yearAmount="historyYear"></left-stat>
          <left-gif :amount="realNumber"></left-gif>
        </div>
      </div>
    </div>
    <div class="main-wrap-middle">
      <div class="main-wrap-middle-top">
        <middle-amount :amount="dayNumber"></middle-amount>
      </div>
      <div class="main-wrap-middle-bottom">
        <title-bar label="梦想小镇热力图"></title-bar>
        <div class="bottom-wrap">
          <middle-map :hotData="hotPoint"></middle-map>
        </div>
      </div>
    </div>
    <div class="main-wrap-right">
      <div class="main-wrap-right-top">
        <title-bar label="实时来宾"></title-bar>
        <div class="chart-wrap">
          <right-topChart :activeState="tabActive" :trendData="tags"></right-topChart>
        </div>
      </div>
      <div class="main-wrap-right-bottom">
        <title-bar label="深度洞察"></title-bar>
        <div class="chart-wrap">
          <right-bottomChart :activeState="tabActive" :trendData="tags"></right-bottomChart>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { dateParse, getIntervalDate, getMonthFirst } from "@/utils/index";
import { deepClone } from "xp-utils";
import titleBar from "../components/titleBar/index.vue";
import leftChart from "../components/leftChart/index.vue";
import leftStat from "../components/leftStat/index.vue";
import leftGif from "../components/leftGif/index.vue";
import middleAmount from "../components/middleAmount/index.vue";
import middleMap from "../components/middleMap/index.vue";
import rightTopChart from "../components/rightTopChart/index.vue";
import rightBottomChart from "../components/rightBottomChart/index.vue";
import { mapGetters } from "vuex";
export default {
  name: "main",
  data() {
    return {
      date: "",
      time: "",
      dateTimer: null,
      tabTimer: null,
      globalTimer: null,
      tabActive: 1,
      agsid: "23927145295817",
      shopIds: [
        "24014413062301",
        "24014416211837",
        "24014349099200",
        "24014419095361",
        "32913461571870",
        "32913466816296",
        "32913479131167"
      ]
    };
  },
  components: {
    titleBar,
    leftChart,
    leftStat,
    leftGif,
    middleAmount,
    middleMap,
    rightTopChart,
    rightBottomChart
  },
  computed: {
    ...mapGetters([
      "minute",
      "dayNumber",
      "realNumber",
      "historyDay",
      "historyYear",
      "hotPoint",
      "duration",
      "tags"
    ])
  },
  methods: {
    getDate() {
      let _date = new Date();
      this.date = dateParse(_date, "yyyy年MM月d日");
      this.time = dateParse(_date, "hh:mm:ss");
    },
    timer() {
      this.getDate();
      clearTimeout(this.dateTimer);
      this.dateTimer = setInterval(this.getDate, 1000);
    },
    //  获取标签数据
    getTagData() {
      //  获取标签数据
      let param = {
        agsid: this.agsid,
        begin_date: dateParse(getIntervalDate(-4), "yyyy-MM-dd"),
        end_date: dateParse(getIntervalDate(0), "yyyy-MM-dd"),
        tag: "gender,age,business,star,interest,apptype"
      };
      this.$store.dispatch("GET_TAG", param);
    },
    // 右边数据定时器
    getTagTime() {
      this.getTagData();
      clearInterval(this.tabTimer);
      this.tabTimer = setInterval(() => {
        this.getTagData();
        this.tabActive = ++this.tabActive;
        if (this.tabActive > 3) {
          this.tabActive = 1;
        }
      }, 5000);
    },
    //  获取大屏数据
    getScreenData() {
      let _date = new Date();
      let param = {
        agsid: this.agsid,
        begin_date: dateParse(_date, "yyyy-MM-dd"),
        end_date: dateParse(_date, "yyyy-MM-dd")
      };
      //  实时来宾趋势图
      this.$store.dispatch("GET_MINUTE", param);
      //  今日来宾数
      this.$store.dispatch("GET_DAY", param);
      //  实时来宾数
      this.$store.dispatch("GET_REALTIME", param);
      //  本月累计来宾数
      let history = deepClone(param);
      history.begin_date = dateParse(getMonthFirst(), "yyyy-MM-dd");
      this.$store.dispatch("GET_HISTORYDAY", history);
      //  环比
      this.$store.dispatch("GET_HUANBI", { shopId: this.agsid });
      this.$store.dispatch("GET_HOT", { shopIds: this.shopIds });
    },
    getScreenTime() {
      this.getScreenData();
      clearInterval(this.globalTimer);
      this.globalTimer = setInterval(this.getScreenData, 300 * 1000);
    }
  },
  mounted: function() {
    this.timer();
    //  获取tab数据
    this.getTagTime();
    this.getScreenTime();
  }
};
</script>

<style lang="less">
// .bg{
//     background-image: url("../../assets/img/bg.jpg");
.main {
  width: 100%;
  height: 100%;
  padding: 18px 61px 20px 61px;
  box-sizing: border-box;

  background: radial-gradient(
    circle at 50% 50%,
    rgba(6, 28, 126, 0.5),
    rgba(0, 2, 10, 0.5)
  );
  background-size: 100% 100%;
  &-header {
    position: relative;
    &-logo {
      position: absolute;
      left: 11px;
      top: 10px;
      width: 240px;
      height: 67px;
      img {
        max-width: 100%;
        height: auto;
      }
    }
    &-title {
      width: auto;
      text-align: center;
      color: #ffffff;
      .zn-name {
        height: 67px;
        line-height: 67px;
        font-size: 48px;
        font-weight: 600;
        letter-spacing: 15px;
      }
      .en-name {
        height: 28px;
        line-height: 28px;
        font-size: 20px;
        letter-spacing: 2.6px;
      }
    }
    &-time {
      position: absolute;
      right: 10px;
      top: 2px;
      width: auto;
      height: auto;
      p {
        height: 33px;
        line-height: 33px;
        font-size: 20px;
        letter-spacing: 3.6px;
        text-align: right;
        color: #7ff4ff;
      }
      p.time {
        height: 28px;
        line-height: 28px;
        letter-spacing: 12px;
      }
    }
  }
  &-wrap {
    margin-top: 35px;
    &-left {
      float: left;
      width: 472px;
      .left-top {
        width: 100%;
        background-image: linear-gradient(to top, #08223d, rgba(9, 35, 61, 0));
        .chart-wrap {
          width: 100%;
          height: 348px;
        }
      }
      .left-bottom {
        margin-top: 27px;
        background-image: linear-gradient(to top, #08223d, rgba(9, 35, 61, 0));
        .chart-wrap {
          width: 100%;
          height: 431px;
          padding: 17px 27px 13px 27px;
          box-sizing: border-box;
        }
      }
    }
    &-middle {
      float: left;
      width: 782px;
      margin: 0 36px;
      &-bottom {
        width: 100%;
        background-image: linear-gradient(to top, #07223d, rgba(9, 35, 61, 0));
        .bottom-wrap {
          height: 560px;
        }
      }
    }
    &-right {
      float: right;
      width: 472px;
      &-top {
        background-image: linear-gradient(to top, #07223d, rgba(9, 35, 61, 0));
        .chart-wrap {
          width: 100%;
          height: 348px;
          padding: 14px 39px 25px;
          box-sizing: border-box;
        }
      }
      &-bottom {
        margin-top: 27px;
        background-image: linear-gradient(to top, #07223d, rgba(9, 35, 61, 0));
        .chart-wrap {
          width: 100%;
          height: 431px;
          padding: 14px 39px 25px;
          box-sizing: border-box;
        }
      }
    }
  }
}
// }
</style>
