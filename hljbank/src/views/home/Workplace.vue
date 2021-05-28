<template >
  <el-container>
    <el-header class="header">
      <el-row>
        <el-col :span="3"
          ><a href="">
            <div class="header_logo">
              <img
                src="../../assets/img/logo.png"
                width="240px"
                height="100px"
              />
            </div> </a
        ></el-col>
        <el-col :span="21">
          <div class="header_right_top">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                12345567789<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="width: 160px">
                <el-dropdown-item
                  ><i class="el-icon-setting"></i> 用户设置</el-dropdown-item
                >
                <el-dropdown-item divided
                  ><i class="el-icon-setting"></i>登出</el-dropdown-item
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
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              router
              default-active="defaultActive"
              class="el-menu-vertical-demo"
            >
              <el-submenu index="/userorder">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>订单管理</span>
                </template>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>用户管理</span>
                </template>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row></el-aside
      >
      <el-main
        ><div class="content">
          <router-view /></div
      ></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
       
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="css" scoped >
::v-deep .el-header {
  height: 100px !important ;
  padding: 0 0;
}
::v-deep .el-main {
 height: 980px;
  padding: 0px;
}
::v-deep .el-aside {
 height: 980px;
}
.header_logo {
  height: 100px;
  width: 240px;
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

</style>