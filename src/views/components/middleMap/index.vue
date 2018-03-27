<template>
  <div class="map-wrap">
      <div class="map-wrap-map" ref="heatmap">
        <div class="map-color-rate">
          <!--颜色只是控制后面字体的颜色，图片的颜色不可变，字体颜色和地图颜色定位一致-->
          <p class="rate-number" style="height: 17px;line-height: 17px;color: #dc1008"></p>
          <p class="rate-number" style="height: 20px;line-height: 20px;color: #f7fb19;margin-top: 8px"></p>
          <p class="rate-number" style="height: 20px;line-height: 20px;color: #00ff69;margin-top: 12px"></p>
          <!-- <p class="rate-number" style="height: 17px;line-height: 17px;color: #00ffea;margin-top: 12px">＞{{sale4}}</p> -->
        </div>
      </div>
      <div class="map-wrap-list">
        <p class="title">梦想小镇各片区来宾数</p>
        <div class="list">
          <p class="list-item u-clearfix" v-for="(item, index) in hotData.list" :key="index">
            <span class="u-left">{{ item.areaName }}</span><span class="u-right number">{{ item.uv }}</span></p>
          <!-- <p class="list-item u-clearfix"><span class="u-left">互联网村</span><span class="u-right number">21999</span></p>
          <p class="list-item u-clearfix"><span class="u-left">互联网村</span><span class="u-right number">21999</span></p>
          <p class="list-item u-clearfix"><span class="u-left">互联网村</span><span class="u-right number">21999</span></p> -->
        </div>
      </div>
  </div>
</template>
<style lang="less" scoped>
.map-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  &-map {
    position: absolute !important;
    right: 36px;
    top: 0;
    width: 635px;
    height: 559px;
    background: url("../../../assets/img/page.png") no-repeat center;
    background-size: 100% 100%;
    .map-color-rate {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 107px;
      background: url("../../../assets/img/color-rate.png") no-repeat left top;
      background-size: 16px 107px;
      .rate-number {
        padding-left: 16px;
        text-align: left;
        font-size: 14px;
      }
    }
  }
  &-list {
    position: absolute;
    left: 36px;
    bottom: 0;
    width: 317px;
    background-color: rgba(255, 255, 255, 0.1);
    .title {
      margin-top: 6px;
      height: 30px;
      line-height: 30px;
      font-size: 22px;
      font-weight: 500;
      letter-spacing: 2.4px;
      text-align: center;
      color: #ffffff;
    }
    .list {
      width: 100%;
      padding: 0 36px 15px;
      box-sizing: border-box;
      border-top: solid 1px #3d5166;
      .list-item {
        width: 100%;
        padding: 16px 0 2px 5px;
        border-bottom: solid 1px #3d5166;
        span {
          height: 22px;
          line-height: 22px;
          font-size: 16px;
          letter-spacing: 2px;
          text-align: left;
          color: #ffffff;
        }
        .number {
          text-align: right;
        }
      }
    }
  }
}
</style>
<script>
import Heatmap from "heatmap.js";
import { getDicMax } from "@/utils/index";
export default {
  data() {
    return {
      sale1: 1758,
      sale2: 1231,
      sale3: 879,
      heatmapInstance: null,
      location: [
        { x: 464, y: 106 },
        { x: 547, y: 100 },
        { x: 477, y: 43 },
        { x: 467, y: 171 },
        { x: 505, y: 26 },
        { x: 554, y: 80 },
        { x: 531, y: 173 },
        { x: 580, y: 49 },
        { x: 404, y: 119 },
        { x: 389, y: 147 },
        { x: 295, y: 140 },
        { x: 291, y: 163 },
        { x: 232, y: 151 },
        { x: 201, y: 171 },
        { x: 104, y: 144 },
        { x: 140, y: 190 },
        { x: 25, y: 162 },
        { x: 96, y: 265 },
        { x: 161, y: 237 },
        { x: 189, y: 285 },
        { x: 220, y: 273 },
        { x: 319, y: 264 },
        { x: 432, y: 463 },
        { x: 421, y: 521 },
        { x: 403, y: 386 },
        { x: 392, y: 464 },
        { x: 400, y: 549 }
      ]
    };
  },
  props: ["hotData"],
  watch: {
    hotData: {
      handler: function(val, oldval) {
        let _point = val.point;
        let _newPoint = [];
        for (let index = 0; index < _point.length; index++) {
          let _item = _point[index];
          if (_item.apId !== "") {
            _newPoint.push(_item);
          }
        }
        let max = getDicMax(_newPoint, "uv");
        let _data = [];
        for (let i = 0; i < _newPoint.length; i++) {
          let item = _newPoint[i];
          if (item.apId !== "" && +item.apId <= 27) {
            let index = +item.apId - 1;
            let _locatiion = this.location[index];
            _locatiion["value"] = item["uv"];
            _data.push(_locatiion);
          }
        }
        console.log(max);
        console.log(_data);
        let _hotPoint = {
          max: max * 0.9,
          data: _data
        };
        this.heatmapInstance.setData(_hotPoint);
        this.sale1 = Math.ceil(val.factor * max);
        this.sale2 = Math.ceil(0.5 * val.factor * max);
        this.sale3 = Math.ceil(0.3 * val.factor * max);
      },
      deep: true
    }
  },
  methods: {
    creatHeatMap() {
      // 创建一个heatmap实例对象
      let config = {
        container: this.$refs.heatmap,
        radius: 24,
        gradient: {
          // 0.2: "#00ffea",
          0.2: "white",
          0.8: "#00ff69", // 绿色
          0.81: "#f9d91c", // 黄色
          1: "#FF0000" // 红色
        }
      };
      this.heatmapInstance = Heatmap.create(config);
    }
  },
  mounted: function() {
    this.creatHeatMap();
  }
};
</script>
