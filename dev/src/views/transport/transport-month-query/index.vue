<template>
  <div class="month-query">
    <Spin v-if="loading" fix></Spin>
    <DatePicker type="month" v-model="start" placeholder="选择月" style="width: 200px"></DatePicker>
    至
    <DatePicker type="month" v-model="end" placeholder="选择月" style="width: 200px"></DatePicker>
    <Button type="info" v-on:click="query()">搜索</Button>
    <br><br>
    <Table border :columns="columns" :data="rows"></Table>
    <br>
    <Page :total="totalCnt" :page-size="pageSize" :current="pageIndex" @on-change="onPageChanged" size="small"></Page>
  </div>
</template>

<script>
import vm from "./index";
export default vm;
</script>
<style lang="less">
@import "./index.less";
</style>