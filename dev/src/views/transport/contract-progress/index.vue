<template>
  <div class="consigner">
    <div class="middle-bottom">
      <div class="legend">
        <div class="item-line">
          <span class="line" style="background-color: #ff1111;"></span>&nbsp;&nbsp;预估
        </div>
        <div class="item">
          <span class="circle" style="background-color: #3398DB;"></span>&nbsp;&nbsp;协同
        </div>
        <div class="item">
          <span class="circle" style="background-color: #E39F18;"></span>&nbsp;&nbsp;长协
        </div>
        <div class="item">
          <span class="circle" style="background-color: #1C8F2E;"></span>&nbsp;&nbsp;市场
        </div>
      </div>
    </div>
    <div class="content">
      <IEcharts ref="bar" :option="barData"></IEcharts>
    </div>
  </div>
</template>

<script>
import vm from "./index";
export default vm;
</script>
<style scoped lang="less">
@import "./index.less";
</style>