<template>
  <div class="middle-amount">
    <p class="middle-amount-title">今日来宾数</p>
    <div class="middle-amount-group u-clearfix">
      <p class="u-left" v-for="(item, index) in amount" :key="index">{{ item }}</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .middle-amount {
    width: 100%;
    &-title {
      height: 36px;
      line-height: 36px;
      font-size: 36px;
      font-weight: 600;
      letter-spacing: 4px;
      text-align: center;
      color: #ffffff;
    }
    &-group {
      height: 254px;
      margin: 7px 110px 0 110px;
      p {
        position:relative;
        width: 72px;
        height: 168px;
        line-height: 168px;
        font-size: 120px;
        font-weight: 500;
        text-align: center;
        color: #fe5b4e;
        text-shadow: 0 2px 14px rgba(218, 28, 114, 0.6);
        -webkit-box-reflect: below -79px -webkit-linear-gradient(bottom, #fe5b4e 0%, rgba(254,91,78, 0.3) 40%, rgba(0,0,0, 0) 70%);
        & + p {
          margin-left: 50px;
        }
      }
    }
  }
</style>
<script>
  export default {
    props: ['amount']
  }
</script>