<template>
  <div class="consigner">
    <div class="row">
      <div class="column">
        <div class="progress-bar">
          <div class="value" style="background-color: #0D71BD; width: 100%;"></div>
          <div class="background">
            <span class="title">今日计划量</span>
            <span class="text">4379</span>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="progress-bar">
          <div class="value" style="background-color: #0D71BD; width: 80%;"></div>
          <div class="background">
            <span class="title">今日完成量</span>
            <span class="text">4379</span>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="progress-bar">
          <div class="value" style="background-color: #1D8F2F; width: 50%;"></div>
          <div class="background">
            <span class="title">本月合同完成率</span>
            <span class="text">48%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <div class="transport-type">
          <img src="../../../images/truck.png">&nbsp;&nbsp;执行中汽车：664车
        </div>
      </div>
      <div class="column">
        <div class="transport-type">
          <img src="../../../images/rail.png">&nbsp;&nbsp;执行中铁运：66节
        </div>
      </div>
      <div class="column">
        <div class="transport-type">
          <img src="../../../images/ship.png">&nbsp;&nbsp;执行中轮船：6艘
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