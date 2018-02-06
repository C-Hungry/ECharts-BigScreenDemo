<style scoped>
@import "styles/common.css";
</style>
<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
import { getUserInfo } from "./libs/storage";
export default {
  data() {
    return {};
  }
};
</script>
