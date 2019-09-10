
<template>
  <div class="login">
    <el-form class="login_form" ref="form" :model="account" :rules="formRules" label-width="80px">
      <!-- 标题 -->
      <el-form-item class="form_title" label-width="0px">
        <span style="font-weight: bold;">Mm&nbsp;&nbsp;</span>
        <span>juror system</span>
      </el-form-item>

      <!-- 输入框 -->
      <el-form-item label="账 号" prop="id">
        <el-input v-model.number="account.id" type="tel"></el-input>
      </el-form-item>
      <el-form-item label="昵 称" prop="name" v-if="account.isSignUp">
        <el-input v-model.trim="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="pw">
        <el-input v-model="account.pw" show-password clearable></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="pw2" v-if="account.isSignUp">
        <el-input v-model="account.pw2" show-password clearable></el-input>
      </el-form-item>

      <!-- 功能按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          @click.stop="onLoginCreate"
          :loading="inRequest"
        >{{account.isSignUp ? "注册" : "登录"}}</el-button>
        <el-switch
          style="float: right; margin-top: 20px;"
          v-model="account.isSignUp"
          @change="onSignUpChange"
          active-color="#13ce66"
          active-text="注册"
        ></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { apiTest } from "@/http/api/user";

export default {
  name: "login",
  data() {
    const validateUId = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("请输入11位手机号码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.account.pw) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      inRequest: false,
      account: {
        id: 15610001000,
        name: "",
        pw: "123456",
        pw2: "123456",
        isSignUp: false
      },
      formRules: {
        id: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: validateUId, trigger: "blur" }
        ],
        pw: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        pw2: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    window.login = this;
    this.apiTest = apiTest;
  },
  methods: {
    onSignUpChange() {
      this.$refs.form.clearValidate();
      this.inRequest = false;
    },
    onLoginCreate() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return;
        }

        this.inRequest = true;
        this.loginByAccount(this.account)
          .then(info => {
            this.inRequest = false;
            if (info) {
              if (this.account.isSignUp) {
                this.$message("注册成功");
                this.account.isSignUp = false;
              }
            }

            if (info) {
              this.getUserMenu();
            }
          })
          .finally(() => {
            if (!this.account.isSignUp) {
              let redirect = this.$route.query.redirect;
              if (redirect) {
                redirect = encodeURI(redirect);
              } else {
                redirect = "/home";
              }
              this.$router.push({ path: redirect });
            }
          });
      });
    },
    ...mapActions(["loginByAccount", "getUserMenu"])
  }
};
</script>

<style lang="scss" scoped>
.login {
  padding-top: 100px;

  #{&}_form {
    width: 500px;
    margin: 0 auto;

    .form_title {
      text-align: center;
      font-size: 20px;
    }
  }
}
</style>

