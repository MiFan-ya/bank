<template>
  <div class="logo">
    <div class="login-all">
      <div class="login-img"></div>
      <div>
        <div class="login-right-top">
          <img
            src="../../assets/img/pic_jsyh.png"
            width="218px"
            height="40px"
          />
          <p class="login-right-top-p">合同融资服务平台</p>
        </div>
        <div class="login-right-bottom">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="userid">
              <el-col :span="24">
                <el-input
                  prefix-icon="el-icon-user"
                  placeholder="请输入用户名"
                  v-model="ruleForm.userid"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                :type="pwdType"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                autocomplete="new-password"
              >
                <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox class="login-icon" v-model="keep"
                >自动登录</el-checkbox
              >
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-btn"
                type="primary"
                @click="submitForm('ruleForm')"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    var validateuserid = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
    };
    return {
      pwdType: "password",
      keep: false,
      ruleForm: {
        password: "",
        userid: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        userid: [{ validator: validateuserid, trigger: "blur" }],
      },
    };
  },
  methods: {
    showPwd() {
      this.pwdType === "password"
        ? (this.pwdType = "")
        : (this.pwdType = "password");
      let e = document.getElementsByClassName("el-icon-view")[0];
      this.pwdType == ""
        ? e.setAttribute("style", "color: #c0c4cc")
        : e.setAttribute("style", "color: #409EFF");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
.logo {
  background: url("../../assets/img/bg.png");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
.login-all {
  width: 800px;
  height: 560px;
  background-color: #ffffff;
  box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  margin: 0 auto;
  margin-top: 220px;
}
.login-img {
  background: url("../../assets/img/bg_blue.png");
  background-size: 100% 100%;
  height: 560px;
  position: fixed;
  width: 420px;
}
.login-right-top {
  margin-left: 510px;
  padding-top: 50px;
}
.login-right-top-p {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #999999;
  margin-left: 44px;
  margin-top: 24px;
}
.login-right-bottom {
  width: 400px;
  margin-left: 360px;
  margin-top: 83px;
}
.login-btn {
  width: 300px;
  height: 36px;
  background-color: #4877e8;
  border-radius: 2px;
  color: #ffffff;
  margin-top: 20px;
}
::v-deep .el-input__inner {
  width: 300px;
  height: 36px;
  border-radius: 2px;
  border: solid 1px #e1e1e1;
}
</style>