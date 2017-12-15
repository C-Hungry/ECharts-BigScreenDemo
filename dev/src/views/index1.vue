<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <br><br><br><br><br><br>
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      <Button type="text" @click="detail()">Detail</Button>
      <Button type="text" @click="list()">List</Button>
    </FormItem>
  </Form>
</template>
<script>
import { saveUserInfo } from "../libs/storage";
export default {
  data() {
    return {
      formInline: {
        user: "wanganmao",
        password: "123qwe"
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$service
            .post("/login", { loginModel: this.formInline })
            .then(res => {
              console.log(res);
              this.$Message.success("Success!");
              saveUserInfo({ token: res.result.token });
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    detail() {
      this.$service.get("/auth/account/info").then(res => {
        console.log(res);
        this.$Message.success("Success!");
      });
    },
    list() {
      this.$service
        .get("/auth/system/account-list", { skip: 0, limit: 10 })
        .then(res => {
          console.log(res);
          this.$Message.success("Success!");
        });
    }
  }
};
</script>