<template>
  <div class="home-box">
    <el-container>
      <el-header height="100px">
        <div class="header">
          <div class="header_logo">
            <a href="/userorder">
              <img src="../../assets/img/logo.png" width="240px" height="100px"
            /></a>
          </div>
          <div class="header_right">
            <div class="header_right_top">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width: 160px">
                  <el-dropdown-item
                    ><i class="el-icon-setting"></i> 用户设置</el-dropdown-item
                  >
                  <el-dropdown-item divided @click.native="Loginout"
                    ><img
                      src="../../assets/img/out.png"
                      style="margin-right: 2px"
                      width="17px"
                      height="15px"
                    />
                    登出</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
              <img
                class="header_right_topimg"
                src="../../assets/img/pic_account.png"
                width="30px"
                height="30px"
              />
            </div>
            <div class="header_right_bottom"></div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="240px">
          <el-menu :router="true" class="el-menu-vertical-demo">
            <el-menu-item index="/userorder">
              <i class="el-icon-menu"></i>
              <span slot="title">订单管理</span>
              <i class="arrow el-icon-arrow-right"></i>
            </el-menu-item>
            <el-menu-item index="/usermanagement">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
              <i class="arrow el-icon-arrow-right"></i>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main
            ><div class="content">
              <router-view /></div
          ></el-main>
          <el-footer height="140px"></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName:'12345567789',
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    Loginout() {
      this.$confirm("确定要退出登录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.setItem("token", "false");
          this.$router.push({
            path: "/login",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登出！",
          });
        });
    },
  },
};
</script>

<style lang="css" scoped>
.home-box {
  height: 100%;
}
::v-deep .el-header {
  padding: 0 0;
}
::v-deep .el-main {
  padding: 0px;
}
::v-deep .el-menu {
  height: 100%;
  
}
::v-deep .el-footer {
  background-color: #f0f2f5;
}
.content {
  padding: 10px;
}
.header {
  width: 100%;
  min-width: 600px;
  display: flex;
}
.header_logo {
  height: 100px;
  width: 240px;
}
.header_right {
  width: 100%;
  min-width: 600px;
  height: 100px;
}
.header_right_top {
  height: 60px;
  background-color: #ffffff;
}
.header_right_bottom {
  height: 40px;
  background-color: #f1f2f5;
}
.header_right_topimg {
  float: right;
  margin-top: 15px;
  margin-right: 14px;
}
::v-deep .el-dropdown {
  float: right;
  margin-top: 25px;
  margin-right: 15px;
}
.arrow {
  text-align: center;
  position: absolute;
  right: 20px;
  top: 25px;
}
::v-deep .el-menu-item span {
  color: #333333;
}
::v-deep .el-menu-item.is-active span,.el-menu-item:focus span {
  font-weight: bold;
}
::v-deep .el-menu-item:hover {
  background-color: #f1f2f5;
  font-weight: bold;
}
::v-deep .el-menu-item:focus {
  background-color: #f1f2f5;
}
::v-deep .el-menu-item.is-active {
  background-color: #f1f2f5 !important;
}
::v-deep .el-menu-item:hover i,.el-menu-item:focus i {
    color: #409EFF;
}
::v-deep .el-dropdown-link {
  cursor: pointer;
}
</style>
