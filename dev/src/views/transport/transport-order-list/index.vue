<template>
  <div class="transport-order">
    <Spin v-if="loading" fix></Spin>
    <DatePicker type="daterange" v-model="timeSpan" :options="options" placement="bottom-start" placeholder="请选择时间" style="width: 200px;"></DatePicker>
    <Input v-model="orderName" placeholder="订单名称" style="width: 200px;"></Input>
    <Select v-model="ConsignerId" style="width:200px">
        <Option v-for="item in consignerList" :value="item.id" :key="item.id">{{ item.Text }}</Option>
    </Select>
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