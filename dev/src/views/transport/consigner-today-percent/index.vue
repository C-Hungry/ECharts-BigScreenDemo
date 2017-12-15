<template>
  <div class="consigner">
    <div class="column">
      <IEcharts ref="pie" :option="pieData"></IEcharts>
    </div>
    <div class="column" style="padding: 20px; line-height: 1.5rem;">
      <div class="row" style=" font-size: 2rem; color: #93D346; justify-content: flex-start;">
        计划：150000
      </div>
      <div class="row">
        <div class="column">
          已发：<br>
          <span style="font-size: 2rem;">2121</span>
        </div>
        <div class="column">
          途中：<br>
          <span style="font-size: 2rem;">221</span>
        </div>
      </div>
      <div class="row">
        <div class="column">
          待收：<br>
          <span style="font-size: 2rem;">211</span>
        </div>
        <div class="column">
          已收：<br>
          <span style="font-size: 2rem;">221</span>
        </div>
      </div>
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