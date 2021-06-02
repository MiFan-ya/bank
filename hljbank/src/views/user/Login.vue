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
                v-loading="fullscreenLoading"
                element-loading-background="transparent"
                >确 &ensp; 定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from "vuex";
// import Cookies from "js-cookie";
export default {
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   }
    // };
    // var validateuserid = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入用户名"));
    //   }
    // };
    return {
      fullscreenLoading: false,
      pwdType: "password",
      keep: false,
      ruleForm: {
        password: "",
        userid: "",
      },
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userid: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getCookie();
  },

  methods: {
    //把登录账号密码保存时间存入cookie
    setCookie(name, pwd, exdays) {
      var exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
        "userid" + "=" + name + ";path=/;expires=" + exdate.toGMTString();
      // Cookies.set("userid", name, { expires: 7, path: "/" });
      // Cookies.set("userPwd", pwd, { expires: 7, path: "/" });
      window.document.cookie =
        "userPwd" + "=" + pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    // 读取cookie 将用户名和密码回显到input框中
    getCookie() {
      if (document.cookie.length > 0) {
        this.keep =true; //自动登录
        var arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === "userid") {
            this.ruleForm.userid = arr2[1]; // 保存到保存数据的地方
          } else if (arr2[0] === "userPwd") {
            this.ruleForm.password = arr2[1];
          }
        }
      }
    },
    //密码显示
    showPwd() {
      this.pwdType === "password"
        ? (this.pwdType = "")
        : (this.pwdType = "password");
      let e = document.getElementsByClassName("el-icon-view")[0];
      this.pwdType == ""
        ? e.setAttribute("style", "color:#409EFF ;cursor: pointer;")
        : e.setAttribute("style", "color:#c0c4cc;cursor: pointer;");
    },
    //确定 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log("bd");
        if (valid) {
          if (this.keep) {
            // 传入账号名，密码，和保存天数3个参数
            this.setCookie(this.ruleForm.userid, this.ruleForm.password, 7);
          } else {
            // 如果没有选中自动登录，那就清除cookie
            this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
          }
          //登录拦截
          sessionStorage.setItem("token", "true");
          //确定按钮加载动画
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
            //登录成功提示语
            var date = new Date();
            var hours =
              date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            if (parseInt(hours) <= 12 && parseInt(hours) >= 0) {
              this.$notify({
                title: "欢迎",
                message: "早上好，欢迎回来",
                type: "success",
              });
            } else if (parseInt(hours) <= 18 && parseInt(hours) >= 12) {
              this.$notify({
                title: "欢迎",
                message: "下午好，欢迎回来",
                type: "success",
              });
            } else {
              this.$notify({
                title: "欢迎",
                message: "晚上好，欢迎回来",
                type: "success",
              });
            }
            //跳转页面
            let username = this.ruleForm.userid;
            this.$router.push({
              path: "/workplace",
              query: { username },
            });
          }, 500);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 路由守卫 清空Vuex数据
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     vm.$store.dispatch("setUser", null)
    //     vm.$store.dispatch("setUsername", null)
    //     localStorage.removeItem("Flag")
    //     localStorage.removeItem("Userinfo")
    //     vm.$store.commit('clearMenu')
    //   })
    // },
    // beforeRouteLeave(to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   if (this.$store.getters.getCurrentUserList.identity == 'admin' || this.$store.getters.getCurrentUserList.identity == '管理员') {
    //     next();
    //   }
    //   // console.log(to);
    //   if (this.$store.getters.getCurrentUserList.identity == 'coach' || this.$store.getters.getCurrentUserList.identity == '教练') {
    //     if (to.path.indexOf('Manage') != -1) {
    //       next("/");
    //     }
    //   }
    //   if (this.$store.getters.getCurrentUserList.identity == 'normal' || this.$store.getters.getCurrentUserList.identity == '普通用户') {
    //     let flag = false
    //     if (to.path.indexOf('Manage') != -1) {
    //       flag = true
    //     } else if (to.path.indexOf('Coach') != -1) {
    //       flag = true
    //     }
    //     if (flag == true) {
    //       next("/");
    //     }
    //   }
    //   next()
    // }
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
::v-deep .el-input__inner:focus {
  border-color: #40a9ff;
  border-right-width: 1px !important;
  /* box-shadow: 0 0 0 2px rgb(24 144 255 / 20%); */
}
::v-deep .el-loading-spinner .path {
  stroke: #ffffff;
}
</style>