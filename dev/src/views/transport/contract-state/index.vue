<template>
  <div class="consigner">
    <IEcharts ref="bar" :option="barData"></IEcharts>
  </div>
</template>

<script>
import vm from "./index";
export default vm;
</script>
<style scoped lang="less">
@import "./index.less";
</style>