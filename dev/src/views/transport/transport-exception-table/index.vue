<template>
  <div class="excepiton">
    <table>
      <tr>
        <th rowspan="2">电厂</th>
        <th colspan="2">严重</th>
        <th colspan="2">比较严重</th>
        <th colspan="2">一般严重</th>
      </tr>
      <tr>
        <th>总数</th>
        <th>待处理</th>
        <th>总数</th>
        <th>待处理</th>
        <th>总数</th>
        <th>待处理</th>
      </tr>
      <tr v-for="item in currentPageList" :key="item.id" v-bind:class="item.isEmpty?'empty':''">
        <th v-if="item.ReceiverName">{{item.ReceiverName}}</th><th v-else>&nbsp;</th>
        <th>{{item.seriousCount}}</th>
        <th>{{item.seriousCount}}</th>
        <th>{{item.moreSeriousCount}}</th>
        <th>{{item.moreSeriousPending}}</th>
        <th>{{item.generallySeriousCount}}</th>
        <th>{{item.generallySeriousPending}}</th>
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