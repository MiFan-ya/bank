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
        :data="tableData"
        border
        :header-cell-style="{ background: '#fafafa' }"
        style="width: 1621px"
        class="table-t"
        v-loading="tableloading"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="50"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="name" label="项目名称" width="300">
          <template slot-scope="scope">
            <a class="table-a" @click="handleName(scope.row)">{{
              scope.row.bidName
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="companyName"
          label="企业名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="creditorBank"
          label="债权银行"
          width="300"
        >
        </el-table-column
        ><el-table-column
          align="center"
          prop="bankBranch"
          label="所属网点"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="告知函状态"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.status == 0
                  ? 'info'
                  : scope.row.status == 1
                  ? 'warning'
                  : 'success'
              "
              disable-transitions
              >{{
                scope.row.status == 0
                  ? "未签发"
                  : scope.row.status == 1
                  ? "已发送"
                  : "通知成功"
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="opera" label="操作" width="170">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == '0'"
              type="text"
              icon="el-icon-folder-opened"
              @click="handleNotification(scope.row)"
              >签发告知函</el-button
            >
            <el-button
              v-if="scope.row.status >= '1'"
              type="text"
              icon="el-icon-view"
              @click="Notificationshow(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-two">
      <el-dialog :title="titleName" :visible.sync="dialogFormVisible">
        <div class="dialog-col1">
          <div class="dialog-col1-div">
            <p>订单信息</p>
          </div>
          <div class="dialog-col1-div2">
            <ul class="dialog-col1-ul">
              <li>
                <span>申贷编号</span>
                <input
                  :v-model="Creditnumber"
                  :value="Creditnumber"
                  disabled
                  type="text"
                />
              </li>
              <li>
                <span>申请日期</span>
                <input
                  :v-model="Applicationdate"
                  :value="Applicationdate"
                  disabled
                  type="text"
                />
              </li>
              <li>
                <span>开户银行</span>
                <input :v-model="khbank" :value="khbank" disabled type="text" />
              </li>
              <li>
                <span>回款账号</span>
                <input
                  :v-model="receivableaccount"
                  :value="receivableaccount"
                  disabled
                  type="text"
                />
              </li>
              <li>
                <span>审批额度</span>
                <input
                  :v-model="credits"
                  :value="credits"
                  disabled
                  type="text"
                />
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
                <input
                  :v-model="socialcredit"
                  :value="socialcredit"
                  disabled
                  type="text"
                />
              </li>
              <li>
                <span>企业名称</span>
                <input
                  :v-model="companyNam"
                  :value="companyNam"
                  disabled
                  type="text"
                />
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
                <input
                  :v-model="contractName"
                  :value="contractName"
                  disabled
                  style="width: 700px"
                  type="text"
                />
              </li>
              <li>
                <span>中标日期</span>
                <input
                  :v-model="biddingdate"
                  :value="biddingdate"
                  disabled
                  type="text"
                />
              </li>
              <li>
                <span>中标金额</span>
                <input
                  :v-model="biddingmoney"
                  :value="biddingmoney"
                  disabled
                  type="text"
                />
              </li>
              <li>
                <span>中标编号</span>
                <input :v-model="bidNum" :value="bidNum" disabled type="text" />
              </li>
              <li>
                <span style="padding-right: 30px">采购人</span>
                <input
                  :v-model="purchaseName"
                  :value="purchaseName"
                  disabled
                  type="text"
                />
              </li>
            </ul>
          </div>
        </div>
      </el-dialog>
      <el-dialog :title="Notificationname" :visible.sync="dialogFormVisibletwo">
        <div>
          <quill-editor
            ref="myTextEditor"
            class="ql-editor"
            v-model="content"
            :options="editorOption"
          ></quill-editor>
        </div>
        <div class="notification-btn">
          <button class="notification-btn1" @click="notificationSend">
            发送
          </button>
          <button class="notification-btn2" @click="notificationSave">
            预览
          </button>
        </div>
      </el-dialog>
    </div>
    <div class="dialog-yl">
      <el-dialog title=" " :visible.sync="dialogFormVisible4">
        <div
          class="ql-editor"
          style="overflow: auto; height: 750px; margin: 0 auto"
          v-html="content"
        ></div>
      </el-dialog>
      <el-dialog title=" " :visible.sync="dialogFormVisible3">
        <div
          class="ql-editor"
          style="overflow: auto; height: 750px; margin: 0 auto"
          v-html="NContent"
        ></div>
      </el-dialog>
    </div>

    <div class="pagepagination">
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        class="page"
        layout="prev, pager, next"
        :total="tableLength"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import {
  GTabledata,
  PSendhan,
  GSeachtdata,
  GSeachtdataboth,
  POrderPush,
} from "../../api/index.js";
export default {
  data() {
    return {
      tableloading: true,
      dialogFormVisible: false, //项目详情弹出框
      dialogFormVisibletwo: false, //签发告知函弹出框 0
      dialogFormVisible3: false, //签发告知函弹出框 1
      content: "", // 编辑器的内容
      NContent: "",
      currentPage: 1, //初始页
      pagesize: 10, //初始显示条数
      projectName: "", //项目名称input
      enterpriseName: "", //企业名称input
      dialogFormVisible4: false,
      titleName: "",
      Notificationname: "",
      editorOption: {
        // 编辑器的配置
        // something config
        modules: {
          //富文本编辑器头部内容
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ size: ["small", false, "large", "huge"] }],
            ["blockquote", "code-block"],
          ],
        },
      },
      formInline: {
        project: "",
        enterprise: "",
      },
      // 表格data
      tableData: [],
      Creditnumber: "",
      Applicationdate: "",
      khbank: "",
      receivableaccount: "",
      credits: "",
      socialcredit: "",
      companyNam: "",
      contractName: "",
      biddingdate: "",
      biddingmoney: "",
      bidNum: "",
      purchaseName: "",
      // 点击签发告知函，获取id
      Ntid: "",
      tableLength: 0,
    };
  },
  components: {
    // 富文本
    quillEditor,
  },
  created() {
    this.gettabledata();
  },
  // mounted() {
  //   this.tableload();
  // },
  methods: {
    // 表格加载动画
    tableload() {
      this.tableloading = true;
      setTimeout(() => {
        this.tableloading = false;
      }, 500);
    },

    // 获取表格data
    gettabledata() {
      var _this = this;
      this.tableload();
      let data = {
        pageNum: 1,
        pageSize: 10,
        userId: sessionStorage.getItem("id"),
      };
      GTabledata(data).then(function (res) {
        if (res.code == "01") {
          console.log(res);
          _this.tableData = res.result.data;
          _this.tableLength = res.result.total;
        } else if (res.code == "03") {
          _this.$message({
            message: "登录过期！请重新登录！",
            type: "error",
          });
        } else {
          _this.$message({
            message: "系统出错！",
            type: "error",
          });
        }
      });
    },
    //查询表单提交
    onSubmit() {
      if (this.projectName == "" && this.enterpriseName == "") {
        this.gettabledata();
      } else if (this.projectName != "" && this.enterpriseName != "") {
        this.tableload();
        let data = {
          pageNum: 1,
          pageSize: 10,
          bidName: this.projectName,
          companyName: this.enterpriseName,
          userId: sessionStorage.getItem("id"),
        };
        GSeachtdataboth(data).then((res) => {
          console.log(res);
          this.tableData = res.result.data;
          this.tableLength = res.result.total;
        });
      } else {
        this.tableload();
        let data = {
          pageNum: 1,
          pageSize: 10,
          bidName: this.projectName,
          companyName: this.enterpriseName,
          userId: sessionStorage.getItem("id"),
        };
        GSeachtdata(data).then((res) => {
          console.log(res);
          this.tableData = res.result.data;
          this.tableLength = res.result.total;
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
      this.Creditnumber = row.loanId;
      this.Applicationdate = row.startTime;
      this.khbank = row.creditorBank;
      this.receivableaccount = row.backAccount;
      this.credits = row.purchaseName;
      this.socialcredit = row.companyName;
      this.companyNam = row.companyName;
      this.contractName = row.contractName;
      this.biddingdate = row.createTime;
      this.biddingmoney = row.createTime;
      this.bidNum = row.bidNum;
      this.purchaseName = row.purchaseName;
      this.titleName = "项目详情-" + row.contractName;
    },
    //签发告知函  0
    handleNotification(row) {
      this.Ntid = "";
      this.dialogFormVisibletwo = true;
      //this.content = row.noteMessage;
      this.Ntid = row.id;
      this.Notificationname = "签发告知函-" + row.contractName;
      this.content = `
                                                                                                                                                    项目编号：${row.bidNum}
                                                                                      
      <h3>                                                                                政府采购合同融资告知函</h3>
      
            ${row.purchaseName}（采购人全称）


                     鉴于我公司与中国建设银行股份有限公司${row.bankBranch}（一下简称“债权银行”）就${row.creditorBank}政府采购合同
             
             （合同编号：${row.contractNum}、采购项目编号：${row.bidNum}）进行了政府采购合同融资并签署
             
              了《最高额应收账款质押合同》（编号为____________________），根据该合同，我公司将上述应收账款质押给债权银行，特向
             
              贵单位发出本通知。
                      
                      请贵单位将采购资金支付到政府采购合同中注明的债权银行。
               
               请贵单位按照政府采购合同约定，那采购款项直接付至下述账户，以保障债权银行贷款资金的安全回收：
                      
                      户名：${row.accountName}
                      
                      账号：${row.backAccount}
                      
                      开户行：中国建设银行股份有限公司${row.bankBranch}行
                      
                      如供应商（融资人）履约完成后，请贵单位及时开展履约验收工作，并及时支付采购资金。


                                                                                                                                                                             供应商（融资人）：        （公章）


                                                                                                                                                                             债权银行 ：                     （公章）


                                                                                                                                                                                                        年      月      日
       `;
    },
    //签发告知函  1
    Notificationshow(row) {
      this.dialogFormVisible3 = true;
      this.NContent = row.noteMessage;
    },
    //签发告知函发送
    notificationSend() {
      // console.log(this.content);
      // var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
      // var msg = this.content.replace(re1, ""); //执行替换成空字符
      // console.log(msg);
      if (this.content == "") {
        this.$message({
          message: "内容不能为空！",
          type: "error",
        });
      } else {
        this.gzhSave();
        let formData = new FormData();
        formData.append("id", this.Ntid);
        formData.append("userId", sessionStorage.getItem("id"));
        POrderPush(formData).then((res) => {
          if (res.code == "01") {
            this.$message({
              message: "发送成功！",
              type: "success",
            });
            this.dialogFormVisibletwo = false;
            this.handleCurrentChange(this.currentPage);
          } else {
            this.$message({
              message: "发送失败！请稍后再试！",
              type: "error",
            });
          }
        });
      }
    },
    //签发告知函预览
    gzhSave() {
      let formData = new FormData();
      formData.append("id", this.Ntid);
      formData.append("noteMessage", this.content);
      formData.append("userId", sessionStorage.getItem("id"));
      PSendhan(formData).then((res) => {
        if (res.code == "01") {
          console.log("1");
        } else {
          console.log("0");
        }
      });
    },
    notificationSave() {
      // this.$alert(this.content, {
      //     dangerouslyUseHTMLString: true,
      //     showConfirmButton: false
      //   });
      this.dialogFormVisible4 = true;
    },
    //分页
    handleSizeChange: function (size) {
      this.pagesize = size;
      //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      let _this = this;
      this.tableload();
      let data = {
        pageNum: this.currentPage,
        pageSize: 10,
        userId: sessionStorage.getItem("id"),
      };
      GTabledata(data).then(function (res) {
        console.log(res);
        _this.tableData = res.result.data;
      });
      //点击第几页
    },
    // 分页连续page
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pagesize;
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
  padding-left: 20px;
}
::v-deep .el-main,
::v-deep .el-header {
  padding: 0 24px;
}
::v-deep .dialog-two .el-dialog__header {
  background-color: #4877e8;
  height: 40px;
  padding: 8px 20px;
}
::v-deep .dialog-two .el-dialog__title {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
::v-deep .dialog-two .el-dialog__headerbtn i {
  color: #ffffff;
}
::v-deep .dialog-two .el-dialog {
  width: 900px;
  height: 660px;
  border-radius: 2px;
}
::v-deep .dialog-yl .el-dialog {
  width: 990px;
  height: 820px;
  border-radius: 2px;
}
::v-deep .dialog-yl .el-dialog__body {
  padding: 25px 5px;
}
.header-input {
  width: 290px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 1px #f1f2f5;
  padding-left: 0px;
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
::v-deep .dialog-two .el-dialog__headerbtn {
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
