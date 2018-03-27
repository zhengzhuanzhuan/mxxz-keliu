<template>
  <div class="month-gif">
    <p class="month-gif-title">实时来宾数</p>
    <p class="month-gif-number">{{ amount }}</p>
  </div>
</template>
<style lang="less" scoped>
  .month-gif {
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    &-title {
      height: 22px;
      line-height: 22px;
      font-size: 16px;
      text-align: left;
      color: #ffffff;
    }
    &-number {
      width: 175px;
      height: 175px;
      line-height: 175px;
      margin: 10px auto 0;
      font-size: 46px;
      font-weight: 500;
      text-align: center;
      color: #fe5b4e;
      background: url('../../../assets/img/monthgif.gif') no-repeat center;
      background-size: 100% 100%;
    }
  }
</style>
<script>
  export default {
    props: ['amount']
  }
</script>