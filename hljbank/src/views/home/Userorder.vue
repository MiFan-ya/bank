<template>
  <el-container>
    <el-header
      ><div>
        <p class="header-p">订单管理</p>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="项目名称：">
            <el-input
              v-model="formInline.project"
              placeholder="项目名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业名称：">
            <el-input
              v-model="formInline.enterprise"
              placeholder="企业名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
          </el-form-item>
        </el-form>
      </div></el-header
    >
    <el-main
      ><el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="date" label="项目名称" width="300">
        </el-table-column>
        <el-table-column prop="name" label="企业名称" width="300">
        </el-table-column>
        <el-table-column prop="name" label="企业所属地" width="300">
        </el-table-column
        ><el-table-column prop="name" label="所属网点" width="300">
        </el-table-column>
        <el-table-column prop="name" label="中标金额" width="200">
        </el-table-column>
        <el-table-column prop="opera" label="操作" width="170">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-folder-opened"
              @click="handleEdit(scope.row)"
              >签发告知函</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button
        style="margin-right: 20px"
        plain
        icon="el-icon-plus"
        type="primary"
        @click="dialogFormVisible = true"
        >111</el-button
      >
      <el-dialog
        title="项目详情-广州市妇女儿童医疗中心与广州市新医保系统对接及医院信息系统改造项目"
        :visible.sync="dialogFormVisible"
      >
        <div class="dialog-col1">
          <div class="dialog-col1-div">
            <p>订单信息</p>
          </div>
          <div class="dialog-col1-div2">
            <ul class="dialog-col1-ul">
              <li>
                <span>申贷编号</span>
                <input type="text" />
              </li>
              <li>
                <span>申请日期</span>
                <input type="text" />
              </li>
              <li>
                <span>开户银行</span>
                <input type="text" />
              </li>
              <li>
                <span>回款账号</span>
                <input type="text" />
              </li>
              <li>
                <span>审批额度</span>
                <input type="text" />
              </li>
            </ul>
          </div>
        </div>
        <div class="dialog-col2">
          <div class="dialog-col2-div"><p>企业信息</p></div>
          <div>
            <ul class="dialog-col2-ul">
              <li>
                <span style="width: 92px;float:left;">统一社会信用代码</span>
                <input type="text" />
              </li>
              <li>
                <span>企业名称</span>
                <input type="text" />
              </li>
            </ul>
          </div>
        </div>
        <div class="dialog-col3">
          <div class="dialog-col3-div"><p>中标信息</p></div>
          <div>
            <ul class="dialog-col3-ul">
              <li>
                <span>项目名称</span>
                <input style="width: 700px;" type="text" />
              </li>
              <li>
                <span>中标日期</span>
                <input type="text" />
              </li>
              <li>
                <span>中标金额</span>
                <input type="text" />
              </li>
              <li>
                <span>中标编号</span>
                <input type="text" />
              </li>
              <li>
                <span style="padding-right:30px;">采购人</span>
                <input type="text" />
              </li>
            </ul>
          </div>
        </div>
      </el-dialog>
      <div>
        <!-- 分页 -->
        <el-pagination class="page" layout="prev, pager, next" :total="20">
        </el-pagination>
      </div>
    </el-main>
    <el-footer><div class="footer"></div></el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false, //弹出框
      formInline: {
        project: "",
        enterprise: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //   resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   }
  },
};
</script>

<style lang="css" scoped>
li {
  list-style: none;
}

::v-deep .el-main,
::v-deep .el-header {
  padding: 0 24px;
}
::v-deep .el-footer {
  padding: 0px;
}
::v-deep .el-main {
  height: 720px;
}
.footer {
  width: 1663px;
  height: 140px;
  background-color: #f0f2f5;
}
.page {
  float: right;
}
.header-p {
  font-family: MicrosoftYaHei-Bold;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #333333;
}
::v-deep .el-dialog__header {
  background-color: #4877e8;
  height: 40px;
  padding: 8px 20px;
}
::v-deep .el-dialog__title {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
::v-deep .el-dialog__headerbtn i {
  color: #ffffff;
}
::v-deep .el-dialog {
  width: 900px;
  height: 660px;
  border-radius: 2px;
}
.dialog-col1 {
  width: 850px;
  height: 210px;
  border-radius: 2px;
  border: solid 1px #f1f2f5;
  margin-bottom: 20px;
}
.dialog-col1-div,
.dialog-col2-div,
.dialog-col3-div {
  width: 850px;
  height: 40px;
  background-color: #fafafa;
  border-radius: 2px 2px 0px 0px;
  border: solid 1px #f1f2f5;
}
.dialog-col1-div p,
.dialog-col2-div p,
.dialog-col3-div p {
  width: 57px;
  height: 15px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #999999;
  margin-top: 12px;
  margin-left: 20px;
}
.dialog-col2 {
  width: 850px;
  height: 120px;
  border-radius: 2px;
  border: solid 1px #f1f2f5;
  margin-bottom: 20px;
}
.dialog-col3 {
  width: 850px;
  height: 210px;
  border-radius: 2px;
  border: solid 1px #f1f2f5;
}
.dialog-col1-ul,
.dialog-col2-ul,
.dialog-col3-ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 24px;
}
input {
  width: 290px;
  height: 32px;
  background-color: #f1f2f5;
  border-radius: 2px;
  border: none;
  margin-bottom: 10px;
}
.dialog-col1-ul li:nth-child(2n),.dialog-col2-ul li:nth-child(2n){
  margin-left: 26px;
}
.dialog-col3-ul li:nth-child(2n+3) {
  margin-left: 26px;
}
li span {
  padding-right: 15px;
  padding-left: 21px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #666666;
}
</style>