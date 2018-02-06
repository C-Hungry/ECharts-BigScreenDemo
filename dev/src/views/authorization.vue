<template>
  <div class="index">
    页面跳转中...
  </div>
</template>

<script>
import { saveUserInfo } from "../libs/storage";
export default {
  data() {
    return {};
  },
  mounted() {
    if (!this.$route.query.token || !this.$route.query.corpID) {
      this.$router.go(-1);
      return;
    }
    saveUserInfo({ 
      token: this.$route.query.token,
      corpID: this.$route.query.corpID
    });
    setTimeout(() => {
      this.$router.push(this.$route.query.target);
    });
  }
};
</script>

<style lang="less" scoped>

</style>
