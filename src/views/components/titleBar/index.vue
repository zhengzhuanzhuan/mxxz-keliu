<template>
<!-- label为titleBar里面的文字 -->
  <p class="title-bar">{{label}}</p>
</template>
<style lang="less" scoped>
.title-bar {
  width: 100%;
  height: 53px;
  line-height: 53px;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 3px;
  text-align: left;
  color: #ffffff;
  padding-left: 24px;
  box-sizing: border-box;
  background-color: #005576;
}
</style>
<script>
export default {
  props: ["label"]
};
</script>