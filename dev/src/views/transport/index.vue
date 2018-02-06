<template>
  <div class="transport">
    <blocMap style="z-index: 1;"></blocMap>
    <div class="title" style="z-index: 2;">
      <img src="../../images/title-1.png">
      <span>{{title}}智能燃料调运平台</span>
    </div>
    <div class="content">
      <div class="other">
        <div class="left-top" style="z-index: 3;">
          <div class="title">
            调运动态
          </div>
          <div class="content">
            <transportDynamic></transportDynamic>
          </div>
        </div>
        <div class="left-bottom" style="z-index: 2;">
          <div class="title">
            合同进度（单位：吨）
          </div>
          <div class="content">
            <contractProgress></contractProgress>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-top" style="z-index: 2;">
          <consignerTodayTotal v-on:loaded="consignerTodayTotalLoaded"></consignerTodayTotal>
        </div>
        <div class="middle-middle">
        </div>
        <div class="middle-bottom">
          <div class="legend">
            <div class="item" style="z-index: 2;">
              <span class="circle" style="background-color: #E91313;"></span>&nbsp;&nbsp;分公司
            </div>
            <div class="item" style="z-index: 2;">
              <span class="circle" style="background-color: #00FFFF;"></span>&nbsp;&nbsp;电厂
            </div>
            <div class="item" style="z-index: 2;">
              <span class="circle" style="background-color: #FFC322;"></span>&nbsp;&nbsp;煤矿
            </div>
          </div>
        </div>
      </div>
      <div class="other">
        <div class="right-top" style="z-index: 2;">
          <div class="title">
            煤质统计
          </div>
          <div class="content">
            <coalQualityStatistics></coalQualityStatistics>
          </div>
        </div>
        <div class="right-bottom" style="z-index: 2;">
          <div class="title">
            运输异常
          </div>
          <div class="content">
            <transportExceptionTable></transportExceptionTable>
          </div>
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