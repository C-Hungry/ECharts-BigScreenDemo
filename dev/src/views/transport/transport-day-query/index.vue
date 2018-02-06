<template>
  <div class="day-query">
    <Spin v-if="loading" fix></Spin>
    <p>今日概况（单位：吨）</p><br><br>
    <div class="circle">
      {{topData.PlanWeight}}<br>
      计划
    </div>
    <div class="circle">
      {{topData.HasSendWeight}}<br>
      已发
    </div>
    <div class="circle">
      {{topData.TransportWeight}}<br>
      途中
    </div>
    <div class="circle">
      {{topData.ArriverWeight}}<br>
      待收
    </div>
    <div class="circle">
      {{topData.CompleteWeight}}<br>
      已收
    </div>
    <br><br><br>
    <div class="today-detail">
      <div><img src="../../../images/calorific-orange.png" style="height: 0.8vw; color: #FF911A;">&nbsp;&nbsp;
        计划：{{topData.PlanCalorific}}kcal&nbsp;&nbsp;&nbsp;&nbsp;
        实收：{{topData.CompleteCalorific}}kcal
      </div>
      <div><img src="../../../images/sulfur-blue.png" style="height: 0.8vw;">&nbsp;&nbsp;
        计划：{{topData.PlanSulphur?topData.PlanSulphur.toFixed(1):'0.0'}}%&nbsp;&nbsp;&nbsp;&nbsp;
        实收：{{topData.CompleteSulphur?topData.CompleteSulphur.toFixed(1):'0.0'}}%
      </div>
    </div>
    <br>
    <p>按日统计（单位：吨）</p><br>
    <div class="day-statistics">
      <IEcharts ref="bar" :option="barData"></IEcharts>
    </div>
    <div style="position: relative;">
      <Spin v-if="tableLoading" fix></Spin>
      <DatePicker type="daterange" v-model="timeSpan" :options="options" placement="bottom-start" placeholder="请选择时间" style="width: 200px; z-index: 9999;"></DatePicker>
      <Button type="info" v-on:click="query()">搜索</Button>
      <br><br>
      <Table border :columns="columns" :data="rows"></Table>
      <br>
      <Page :total="totalCnt" :page-size="pageSize" :current="pageIndex" @on-change="onPageChanged" size="small"></Page>
    </div>
  </div>
</template>

<script>
import vm from "./index";
export default vm;
</script>
<style lang="less">
@import "./index.less";
</style>