<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
      lock-scroll
      @close="closeDialog"
      class="showAll_dialog"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form :model="initFormData" ref="userEditRef" size="mini">
                <div class="userbox_n">
                  <ul>
                    <li>
                      <span>员工姓名:</span><span>{{ initFormData.name }}</span>
                    </li>
                    <li>
                      <span>出生年月日:</span
                      ><span>{{ initFormData.birthday }}</span>
                    </li>
                    <li>
                      <span>联系电话:</span
                      ><span>{{ initFormData.cellPhone }}</span>
                    </li>
                    <li>
                      <span>最高学历:</span
                      ><span>{{ initFormData.education }}</span>
                    </li>
                    <li>
                      <span>毕业时间:</span
                      ><span>{{ initFormData.schoolTime }}</span>
                    </li>
                    <li>
                      <span>工号:</span><span>{{ initFormData.jobNo }}</span>
                    </li>
                    <li>
                      <span>岗位:</span><span>{{ initFormData.postName }}</span>
                    </li>
                    <li>
                      <span>员工状态:</span
                      ><span>{{ initFormData.status }}</span>
                    </li>
                    <li>
                      <span>部门:</span
                      ><span>{{ initFormData.department }}</span>
                    </li>
                    <li>
                      <span>客户:</span
                      ><span>{{ initFormData.customerName }}</span>
                    </li>
                    <li>
                      <span>户籍地:</span
                      ><span>{{ initFormData.nativeAddress }}</span>
                    </li>
                    <li>
                      <span>婚姻状况:</span
                      ><span>{{ initFormData.marriage }}</span>
                    </li>
                    <li>
                      <span>紧急联系人:</span
                      ><span>{{ initFormData.emergency }}</span>
                    </li>
                    <li>
                      <span>证书:</span
                      ><span>{{ initFormData.certificate }}</span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>性别:</span><span>{{ initFormData.gender }}</span>
                    </li>
                    <li>
                      <span>年龄:</span><span>{{ initFormData.age }}</span>
                    </li>
                    <li>
                      <span>电子邮箱:</span
                      ><span>{{ initFormData.email }}</span>
                    </li>
                    <li>
                      <span>毕业院校:</span
                      ><span>{{ initFormData.school }}</span>
                    </li>
                    <li>
                      <span>工作年限:</span
                      ><span>{{ initFormData.workingHours }}</span>
                    </li>
                    <li>
                      <span>入职时间:</span><span>{{ initFormData.time }}</span>
                    </li>
                    <li>
                      <span>工作技能:</span
                      ><span>{{ initFormData.skill }}</span>
                    </li>
                    <li>
                      <span>项目:</span><span>{{ initFormData.project }}</span>
                    </li>
                    <li>
                      <span>地域:</span
                      ><span>{{ initFormData.regionName }}</span>
                    </li>
                    <li>
                      <span>接口人:</span
                      ><span>{{ initFormData.interfaceName }}</span>
                    </li>
                    <li>
                      <span>现居住地:</span
                      ><span>{{ initFormData.residence }}</span>
                    </li>
                    <li>
                      <span>有无小孩:</span
                      ><span>{{ initFormData.child }}</span>
                    </li>
                    <li>
                      <span>紧急联系人电话:</span
                      ><span>{{ initFormData.emergencyTelephone }}</span>
                    </li>
                    <li>
                      <span>兴趣爱好:</span
                      ><span>{{ initFormData.hobby }}</span>
                    </li>
                  </ul>
                </div>
              </el-form>
            </div>
          </el-col>
          <div class="footbtn">
            <el-button class="btn" type="primary" @click="close" size="mini"
              >取 消</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="沟通信息" name="second">
          <!-- 员工动态记录 -->
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in datashu"
                :key="item.index"
                :label="item.textarea1"
                :value="index"
                placement="top"
                :timestamp="item.time"
              >
                <div class="note_taker">
                  记录人:{{ item.recorder }} {{ item.recorderNo }}
                </div>
                <el-card>
                  {{ item.text }}
                </el-card>
              </el-timeline-item>
              <el-timeline-item placement="top">
                <el-card>
                  <div class="note_taker">
                    记录人:{{ userdetail.fullname }} {{ userdetail.jobNo }}
                  </div>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="record.text"
                    @keyup.enter.native="onCertain('record')"
                  >
                  </el-input>
                </el-card>
              </el-timeline-item>
            </el-timeline>
            <div class="preservation">
              <el-button type="primary" size="mini" @click="onCertain"
                >保 存</el-button
              >
              <el-button class="cancel" type="info" size="mini" @click="close"
                >取 消</el-button
              >
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="员工资产" name="property">
          <!-- 员工动态记录 -->
          <div class="block">
            <el-table
              :data="tableDatas"
              tooltip-effect="dark"
              style="width: 100%"
              border
              stripe
              size="mini"
              :max-height="300"
            >
              <el-table-column label="序号" type="index" width="50">
              </el-table-column>
              <el-table-column
                prop="assetNo"
                label="资产编号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="assetSerialNumber"
                label="资产序列号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="assetName"
                label="资产名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <!-- fixed="right" -->
              <el-table-column label="操作" width="60">
                <template slot-scope="{ row, $index }">
                  <el-button
                    @click="deletePropertyis(row, $index)"
                    type="text"
                    size="mini"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 增加资产操作 -->
            <div>
              <div class="borders">
                <el-form
                  :model="numberValidateForm"
                  :rules="userEditFormRules"
                  ref="numberValidateForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="资产编号 :" prop="assetNo">
                    <el-input
                      v-model.number="numberValidateForm.assetNo"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="资产序列号 :" prop="assetSerialNumber">
                    <el-input
                      v-model.number="numberValidateForm.assetSerialNumber"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="资产名称 :" prop="assetName">
                    <el-input
                      v-model.number="numberValidateForm.assetName"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="submitForm('numberValidateForm')"
                      >添加</el-button
                    >
                    <el-button
                      @click="resetFormProperty('numberValidateForm')"
                      size="mini"
                      >重置</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import {
  communIcate,
  queryRecord,
  createProperty,
  deleteProperty,
  queryPropertyManual,
} from "@/api/employee";
import { Decrypt } from "@/util/crypto/secret";
import { updateUser } from "@/api/user";
export default {
  props: {
    toChild: String,
    tableData: Array,
  },
  data() {
    return {
      // 资产新增
      numberValidateForm: {
        employeeId: "",
        assetNo: "",
        assetSerialNumber: "",
        assetName: "",
        createBy: "",
      },
      // 资产假数据
      tableDatas: [],
      // 沟通记录
      record: {
        id: "",
        jobNo: "",
        recorder: "",
        recorderNo: "",
        text: "",
        time: "",
      },
      aaa: "",
      activeName: "first",
      // 当前日期
      monthValue: "",
      textarea: "",
      datanew: [],
      datashu: [],
      displays: true,
      isInput: false,
      userEditForm: {
        age: "",
        birthday: "",
        cellPhone: "",
        certificate: "",
        child: "",
        createBy: "",
        createTime: "",
        education: "",
        email: "",
        emergency: "",
        emergencyTelephone: "",
        enabled: "",
        gender: "",
        hobby: "",
        jobNo: "",
        marriage: "",
        name: "",
        nativeAddress: "",
        postId: "",
        projectId: "",
        registeredResidence: "",
        residence: "",
        school: "",
        schoolTime: "",
        skill: "",
        time: "",
        tpprojectId: "",
        updateBy: "",
        updateTime: "",
        workingHours: "",
      },
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      // baseURL: BaseURL,

      initFormData: {},
      // 正则验证
      userEditFormRules: {
        assetNo: [
          {
            required: true,
            message: "请输资产编号",
            trigger: ["blur", "change"],
          },
        ],
        assetSerialNumber: [
          {
            required: true,
            message: "请输资产序列号",
            trigger: ["blur", "change"],
          },
        ],
        assetName: [
          {
            required: true,
            message: "请输资产名称",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  created() {
    this.userdetail = window.localStorage.getItem("userdetail")
      ? JSON.parse(Decrypt(window.localStorage.getItem("userdetail")))
      : {};
    // console.log(window.localStorage.getItem("userdetail"));
    console.log(
      this.userdetail.fullname,
      this.userdetail.jobNo,
      "我是 当前----用户"
    );
  },
  mounted() {
    this.queryPropertylist();
  },
  methods: {
    // 资产 查询
    //table数据
    queryPropertylist() {
      let data = this.initFormData.jobNo;
      queryPropertyManual(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          this.tableDatas = res.data; // 表格数据赋值
          // console.log(this.tableData, "员工表格数据赋值");
          // this.paginationOptions.total = res.data.total; // 分页器赋值
        }
      });
    },
    // 资产 新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.numberValidateForm.employeeId = this.initFormData.jobNo;
          this.numberValidateForm.createBy = this.userdetail.jobNo;
          createProperty(this.numberValidateForm).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.$message.success("资产添加成功！");
              this.resetFormProperty(formName);
              this.queryPropertylist();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 清空资产
    resetFormProperty(formName) {
      this.$refs[formName].resetFields();
      this.numberValidateForm.employeeId = "";
      this.numberValidateForm.updateBy = "";
    },
    // 清空
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 资产 删除1
    deletePropertyis(row, index) {
      console.log(row, "---------资产 删除1-------------");
      this.$confirm("此操作将永久删除该资产, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableDatas.splice(index, 1);
          // 点击确认，发起后台请求，删除该用户
          deleteProperty(row.assetId).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除");
            if (res.code == "00000") {
              return this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "success",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          // 点击取消，取消该操作
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // // 资产 删除2
    // deleteRow(index, rows) {
    //   rows.splice(index, 1);
    // },
    // 编辑
    edit() {
      this.isInput = false;
      this.displays = true;
    },
    // 取消
    cancel() {
      // 表单禁用
      this.isInput = true;
      this.displays = false;
      // 获取数据
      // this.getSave();
    },
    // 保存
    onSubmit() {
      console.log("submit!");
      this.isInput = true;
      this.displays = false;
    },
    // 关闭
    close() {
      this.dialogFormVisible = false; // 让弹窗显示
      this.cancel();
    },
    // 表格
    handleClick(tab, event) {
      console.log(tab, event);
      this.queryRecordform();
      // 查询资产
      this.queryPropertylist();
    },
    openDialog(row) {
      // this.empty(); //清空内容
      this.cancel();
      this.dialogFormVisible = true; // 让弹窗显示

      // 当前时间
      var data = new Date();
      var year = data.getFullYear();
      var month = data.getMonth();
      var day = data.getDate();
      // var hours = data.getHours();
      // var minutes = data.getMinutes();
      var toMonth = year + "/" + (month + 1) + "/" + day;
      // "/" +
      // hours +
      // "时" +
      // minutes +
      // "分";
      this.monthValue = toMonth;
      if (row) {
        this.initFormData = row;
        console.log(row, "--------------row");
        // 处理时间格式
        this.initFormData.birthday = this.initFormData.birthday.split("T")[0];
        this.initFormData.projectId = this.initFormData.projectId.split("T")[0];
        this.initFormData.schoolTime =
          this.initFormData.schoolTime.split("T")[0];
        this.initFormData.time = this.initFormData.time.split("T")[0];
        this.initFormData.updateTime =
          this.initFormData.updateTime.split("T")[0];
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(this.initFormData); // 为表单赋值
          console.log(this.initFormData, "------传来的当前角色信息--------");
          this.record.jobNo = this.initFormData.jobNo;
        });
      }
    },
    initForm(data) {
      Object.keys(this.userEditForm).forEach((item) => {
        this.userEditForm[item] = data[item] ? data[item] : null;
      });
    },
    closeDialog() {
      this.resetFormData(); // 初始化弹窗数据 重置 包含头像信息等
      this.resetForm("userEditRef"); // 重置表单
      this.activeName = "first";
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initForm(this.userEditForm);
      this.resetFormData();
    },

    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
    },
    /* 保存  */
    onCertain() {
      if (this.record.text != "") {
        this.userdetail = window.localStorage.getItem("userdetail")
          ? JSON.parse(Decrypt(window.localStorage.getItem("userdetail")))
          : {};
        console.log(this.userdetail, "我是 当前----用户");
        this.record.recorder = this.userdetail.userNickName;
        this.record.recorderNo = this.userdetail.jobNo;
        this.record.text = this.record.text;
        console.log(this.record, "---------保存传入的内容---");
        communIcate(this.record).then((res) => {
          console.log(res, "------------成了----");
          if (res && res.code && res.code === "00000") {
            this.$message.success("创建成功！");
            this.record.text = "";
            this.queryRecordform();
          }
        });
        //   if (this.datanew.textarea1 != "") {
        //     console.log(this.datanew, "内容和日期-用户名");
        //     alert("保存成功");
        //     // this.empty();
        //   } else {
        //     return false;
        //   }
        // } else {
        //   alert("内容为空,请输入内容!");
      } else {
        this.$message.success("内容为空,请输入内容!");
      }
    },
    // //
    // empty() {
    //   console.log("清空!");
    //   this.textarea = "";
    // },
    // 分页查询沟通记录表
    queryRecordform() {
      console.log("----页查询沟通记录表------------");
      let data = { records: [{ ...this.record }] };
      data.current = 1;
      data.size = 9999;
      queryRecord(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          console.log(res.data.records, "-----查询-----成了");
          this.datashu = res.data.records;
          console.log(this.datashu, "res.data.records, -----查询-----成了");
          this.datashu.forEach((items) => {
            items.time = items.time.split("T")[0];
            // item.address = item.address.split("/")[0];
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
* {
  list-style: none;
}
@deep: ~">>>";
@{deep} .register_form_main {
  position: relative;
  min-width: 40%;
  overflow: hidden;
  > span {
    display: block;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    // padding: 20px 0;
    color: #409eff;
    background-color: #383f49;
    text-shadow: 0 1px -3px #409eff;
  }
}
::v-deep .cell {
  text-align: center;
}
::v-deep .el-dialog {
  width: 60%;
}
.lis {
  padding: 0;
}
.but {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 20px;
}
::v-deep .el-input__inner {
  color: #606266 !important;
}
// 修改对话框高度
.showAll_dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  ::v-deep .el-dialog {
    margin: 0 auto !important;
    height: 80%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
      // 下边设置字体，我的需求是黑底白字
      line-height: 30px;
      padding: 0 15px;
    }
  }
}
::v-deep .preservation {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 20px;
}
::v-deep .el-form-item__label {
  // width: 120px !important;
  text-align: left;
}
::v-deep .el-form-item__content {
  margin-left: 120px !important;
}
::v-deep .el-textarea__inner {
  min-height: 130px !important;
}
.note_taker {
  color: #909399;
  margin-bottom: 20px;
}

// * {
//   list-style: none;
//   padding: 0;
//   margin: 0;
// }
.preservation {
  margin-top: 40px;
  ::v-deep .el-button {
    padding: 7px 15px;
  }
}
.userbox_n {
  padding: 0 40px;
  display: flex;
  justify-content: space-around;
  ul {
    li {
      display: flex;
      margin: 10px 0;
      font-size: 12px;
      span {
        display: block;
      }
      span:nth-child(1) {
        width: 130px;
      }
      span:nth-child(2) {
        padding-left: 10px;
        width: 150px;
      }
    }
  }
}

.btn {
  padding: 7px 15px;
  margin: 20px;
}
.footbtn {
  text-align: center;
}
.block {
  padding: 20px 40px 0;
}
::v-deep .el-dialog {
  min-width: 700px;
}
.borders {
  padding: 20px 16px 0 35px;
  margin: 20px 0;
  border: 1px solid #ebeef5;
  ::v-deep .el-form-item__label {
    text-align: right;
  }
  ::v-deep .el-form-item__content {
    text-align: right;
  }
  .demo-ruleForm {
    margin-left: -25px;
  }
}
</style>