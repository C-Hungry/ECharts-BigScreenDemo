<template>
  <div class="quality">
    <table>
      <tr>
        <th rowspan="2">电厂</th>
        <th colspan="2">热值(kcal)</th>
        <th colspan="2">硫份</th>
      </tr>
      <tr>
        <th>已收</th>
        <th>计划</th>
        <th>已收</th>
        <th>计划</th>
      </tr>
      <tr v-for="item in currentPageList" :key="item.id" v-bind:class="item.isEmpty?'empty':''">
        <th v-if="!item.isEmpty">{{item.ReceiverName}}</th><th v-else>&nbsp;</th>
        <td v-if="!item.isEmpty">{{item.CompleteNumberCalorific.toFixed(2)}}</td><th v-else>&nbsp;</th>
        <td v-if="!item.isEmpty">{{item.PlanNumberCalorific.toFixed(2)}}</td><th v-else>&nbsp;</th>
        <td v-if="!item.isEmpty">{{item.CompleteNumberSulphur.toFixed(1)}}%</td><th v-else>&nbsp;</th>
        <td v-if="!item.isEmpty">{{item.PlanNumberSulphur.toFixed(1)}}%</td><th v-else>&nbsp;</th>
      </tr>
    </table>
  </div>
</template>

<script>
import vm from "./index";
export default vm;
</script>
<style scoped lang="less">
@import "./index.less";
</style>