<template>
  <div class="login">
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" :loading="loading" long @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
    </Form>
  </div>  
</template>
<script>
import { saveUserInfo } from "../libs/storage";
export default {
  data() {
    return {
      loading: false,
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.error("表单提交失败");
          return;
        }
        this.loading = true;
        this.$service
          .post("/TMSApp/AuthUser/Login", {
            loginName: this.formInline.user,
            pwd: this.formInline.password
          })
          .then(res => {
            this.loading = false;
            // console.log(res);
            if (!res.Status) {
              this.$Message.error("登录失败");
              return;
            }
            this.$Message.success("登录成功");
            saveUserInfo({ token: res.Data.Token, corpID: res.Data.CorpID });
            this.$router.push("/transport");
          })
          .catch(res => {
            this.loading = false;
            this.$Message.error("登录失败");
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 200px;
  transform: translate(-50%, -50%);
}
</style>
