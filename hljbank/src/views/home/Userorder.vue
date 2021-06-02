<template>
  <div>
    <div>
      <p class="header-p">订单管理</p>
      <div style="min-width: 800px; margin-left: 14px; margin-top: 21px">
        <span>项目名称：</span>
        <input class="header-input" v-model="projectName" type="text" />
        <span style="padding-left: 48px">企业名称：</span>
        <input class="header-input" v-model="enterpriseName" type="text" />
        <button class="header-btn" @click="onSubmit">查询</button>
        <button class="header-btn2" @click="reset">重置</button>
      </div>
    </div>
    <div class="main-table">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        border
        :header-cell-style="{ background: '#fafafa' }"
        style="width: 1621px"
        class="table-t"
        v-loading="tableloading"
      >
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="date" label="项目名称" width="300">
          <template slot-scope="scope">
            <a class="table-a" @click="handleName(scope.row)">{{
              scope.row.date
            }}</a>
          </template>
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
              @click="handleNotification(scope.row)"
              >签发告知函</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

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
              <input disabled type="text" />
            </li>
            <li>
              <span>申请日期</span>
              <input disabled type="text" />
            </li>
            <li>
              <span>开户银行</span>
              <input disabled type="text" />
            </li>
            <li>
              <span>回款账号</span>
              <input disabled type="text" />
            </li>
            <li>
              <span>审批额度</span>
              <input disabled type="text" />
            </li>
          </ul>
        </div>
      </div>
      <div class="dialog-col2">
        <div class="dialog-col2-div"><p>企业信息</p></div>
        <div>
          <ul class="dialog-col2-ul">
            <li>
              <span style="width: 92px; float: left">统一社会信用代码</span>
              <input disabled type="text" />
            </li>
            <li>
              <span>企业名称</span>
              <input disabled type="text" />
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
              <input disabled style="width: 700px" type="text" />
            </li>
            <li>
              <span>中标日期</span>
              <input disabled type="text" />
            </li>
            <li>
              <span>中标金额</span>
              <input disabled type="text" />
            </li>
            <li>
              <span>中标编号</span>
              <input disabled type="text" />
            </li>
            <li>
              <span style="padding-right: 30px">采购人</span>
              <input disabled type="text" />
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="签发告知函-广州市妇女儿童医疗中心与广州市新医保系统对接及医院信息系统改造项目"
      :visible.sync="dialogFormVisibletwo"
    >
      <div>
        <quill-editor
          ref="myTextEditor"
          class="ql-editor"
          v-model="content"
          :options="editorOption"
        ></quill-editor>
      </div>
      <div class="notification-btn">
        <button class="notification-btn1">发送</button>
        <button class="notification-btn2">保存</button>
      </div>
    </el-dialog>
    <div class="pagepagination">
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        class="page"
        layout="prev, pager, next"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      tableloading: true,
      dialogFormVisible: false, //项目详情弹出框
      dialogFormVisibletwo: false, //签发告知函弹出框
      content: "", // 编辑器的内容
      currentPage: 1, //初始页
      pagesize: 10, //初始显示条数
      projectName: "", //项目名称input
      enterpriseName: "", //企业名称input
      editorOption: {
        // 编辑器的配置
        // something config
        modules: {
          //富文本编辑器头部内容
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            [{ header: 1 }, { header: 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ size: ["small", false, "large", "huge"] }],
            ["blockquote", "code-block"],
          ],
        },
      },
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
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  components: {
    // 富文本
    quillEditor,
  },
  created() {
    //富文本框的初始内容
    this.content = `
                                                                                                                                                                                              编号：__________


                                                                                              政府采购合同融资告知函
     `;
  },
  mounted() {
    this.tableload();
  },
  methods: {
    // 表格加载动画
    tableload() {
      this.tableloading = true;
      setTimeout(() => {
        this.tableloading = false;
      }, 500);
    },
    // 获取表格data
    gettabledata() {},
    //查询表单提交
    onSubmit() {
      if (this.projectName == "" && this.enterpriseName == "") {
        this.$message({
          type: "warning",
          message: "查询条件不能为空！",
        });
      } else {
        this.tableload();
        this.$message({
        type: "warning",
        message: "查询中！",
      });
      }
      
    },
    //重置表单 清空表单数据
    reset() {
      this.projectName = "";
      this.enterpriseName = "";
    },
    //   resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   }

    //项目详情
    handleName(row) {
      this.dialogFormVisible = true;
    },
    //签发告知函
    handleNotification(row) {
      this.dialogFormVisibletwo = true;
    },
    //分页
    handleSizeChange: function (size) {
      this.pagesize = size;
      //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.tableload();
      //点击第几页
    },
  },
};
</script>

<style lang="css" scoped>
@import url("../../assets/css/userorder.css");
li {
  list-style: none;
}
input {
  width: 290px;
  height: 32px;
  background-color: #f1f2f5;
  border-radius: 2px;
  border: none;
  margin-bottom: 10px;
}
::v-deep .el-main,
::v-deep .el-header {
  padding: 0 24px;
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
.header-input {
  width: 290px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 1px #f1f2f5;
}
.header-input:hover,
.header-input:focus {
  outline: #367ae0;
  box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
}
.header-p {
  margin-top: 20px;
  margin-left: 14px;
  font-weight: bold;
  font-size: 18px;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #333333;
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
::v-deep .el-dialog__headerbtn {
  top: 12px;
}
::v-deep .el-pager li {
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 1px #f1f2f5;
  margin-top: -5px;
}
::v-deep .el-pager li:nth-child(n + 1) {
  margin-left: 8px;
}
::v-deep .el-pager li.active {
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 1px #4877e8;
  margin-left: 8px;
}
::v-deep .el-pager li.active + li {
  border-left: solid 1px #f1f2f5;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #e6f3ff !important;
}
</style>
