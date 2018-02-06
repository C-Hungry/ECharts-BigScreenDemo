<template>
  <div class="elec-base-info">
      <Spin v-if="loading" fix></Spin>
    <Card> 
        <div slot="title" class="clearfix">
            <label>企业综评</label>
        </div>
        <div>
            <div class="rectangle">
                <span class="value">{{dataTop.TotalOrderWeight<=10000?dataTop.TotalOrderWeight:dataTop.TotalOrderWeight<=100000000?((dataTop.TotalOrderWeight/10000).toFixed(2)+'万'):((dataTop.TotalOrderWeight/100000000).toFixed(2)+'亿')}}吨</span> <br>
                <span class="title">订单总量</span>
            </div>
            <div class="rectangle">
                <span class="value">{{dataTop.TotalOrderNumber}}个</span> <br>
                <span class="title">订单个数</span>
            </div>
            <div class="rectangle">
                <span class="value">{{dataTop.ExceptionNumber}}个</span> <br>
                <span class="title">异常运单</span>
            </div>
            <br><br>
            <div class="today-detail">
                <div><img src="../../../images/exception.png" style="height: 0.8vw; color: #FF911A;">
                    &nbsp;&nbsp;异常率：{{dataTop.ExceptionRate?dataTop.ExceptionRate:"--"}}
                </div>
                <div><img src="../../../images/complete.png" style="height: 0.8vw;">
                    &nbsp;&nbsp;完成率：{{dataTop.CompleteRate}}
                </div>
            </div>
        </div>
    </Card>
    <Card> 
        <div slot="title" class="clearfix">
            <label>合作单位</label>
        </div>
        <div>
            <div class="circle">
                <span class="value">{{data.ConsignerNumber}}</span> <br>
                <span class="title">发货方(个)</span>
            </div>
            <div class="circle">
                <span class="value">{{data.ReceiverNumber}}</span> <br>
                <span class="title">收货方(个)</span>
            </div>
            <div class="circle">
                <span class="value">{{data.ShipperNumber}}</span> <br>
                <span class="title">承运方(个)</span>
            </div>
        </div>
    </Card>
    <Card> 
      <div slot="title" class="clearfix">
          <label>基本信息</label>
      </div>
      <div class="box-cart-item">
          <span class="item-title">公司全称：</span><span class="item-value">{{data.corp_name}}</span>
      </div>
      <div class="box-cart-item">
          <span class="item-title">公司简称：</span><span class="item-value">{{data.corp_short_name}}</span>
      </div>
      <div class="box-cart-item">
          <span class="item-title">公司地址：</span><span class="item-value">{{data.address}}</span>
      </div>
      <div class="box-cart-item">
          <span class="item-title">公司电话：</span><span class="item-value">{{data.mobile}}</span>
      </div>
      <div class="box-cart-item">
          <span class="item-title">联系人：</span><span class="item-value">{{data.linkman}}</span>
      </div>
      <div class="box-cart-item">
          <span class="item-title">上级单位：</span><span class="item-value">{{data.ParentCorpName}}</span>
      </div>
      <div class="box-cart-item">
          <span class="item-title">公司类型：</span><span class="item-value">{{data.TypeStr}}</span>
      </div>
      <div class="box-cart-item">
          <span class="item-title">公司纳税户：</span><span class="item-value">{{data.TaxNumber}}</span>
      </div>
      <div class="box-cart-item">
          <span class="item-title">所属大区：</span><span class="item-value">{{data.BelongDistrict}}</span>
      </div>
    </Card>
  </div>
</template>

<script>
import vm from "./index";
export default vm;
</script>
<style lang="less">
@import "./index.less";
</style>