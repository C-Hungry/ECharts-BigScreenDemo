<template>
  <div class="transport">

    <blocMap></blocMap>
    <div class="title">
      <img src="../../images/title-1.png">
      <span>XXX公司燃料运输指挥中心</span>
    </div>
    <div class="content">
      <div class="other">
        <div class="left-top">
          <div class="title">
            各电厂今日执行情况
          </div>
          <div class="content">
            <receiverTodayPercent></receiverTodayPercent>
          </div>
        </div>
        <div class="left-bottom">
          <div class="title">
            供应商今日计划占比（单位：吨）
          </div>
          <div class="content">
            <consignerTodayPercent></consignerTodayPercent>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-top">
          <consignerTodayTotal></consignerTodayTotal>
        </div>
        <div class="middle-middle">
        </div>
        <div class="middle-bottom">
          <div class="legend">
            <div class="item">
              <span class="circle" style="background-color: #E91313;"></span>&nbsp;&nbsp;集团/分公司
            </div>
            <div class="item">
              <span class="circle" style="background-color: #00FFFF;"></span>&nbsp;&nbsp;电厂
            </div>
            <div class="item">
              <span class="circle" style="background-color: #19C010;"></span>&nbsp;&nbsp;矿点
            </div>
          </div>
        </div>
      </div>
      <div class="other">
        <div class="right-top">
          <div class="title">
            合同完成情况（单位：万吨）
          </div>
          <div class="content">
            <contractState></contractState>
          </div>
        </div>
        <div class="right-middle">
          <div class="title">
            电厂卸货效率排名（单位：吨/小时）
          </div>
          <div class="content">
            <receiverUnloadEfficiency></receiverUnloadEfficiency>
          </div>
        </div>
        <div class="right-bottom">
          <div class="title">
            运输异常
          </div>
          <div class="content">
            <transportException></transportException>
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