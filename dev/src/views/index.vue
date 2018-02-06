<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
import { getUserInfo } from "../libs/storage";
export default {
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      var userInfo = getUserInfo();
    if (!userInfo) {
      this.$router.replace("/login");
      return;
    }
    // alert(JSON.stringify(userInfo) + ";" + this.$route.path);
    document.documentElement.style.fontSize = 
    document.documentElement.clientWidth*(window.devicePixelRatio||1) / 200 + 'px';
    });
  },
};
</script>
