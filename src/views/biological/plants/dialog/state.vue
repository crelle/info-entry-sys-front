<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      lock-scroll
      @close="closeDialog"
      class="showAll_dialog"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="" name="second">
          <div class="boxtop">
            <el-form
              :model="userEditForm"
              :rules="userEditFormRules"
              ref="userEditRef"
              size="mini"
            >
              <el-form-item label="员工状态" prop="employee_status">
                <el-select
                  v-model="userEditForm.employee_status"
                  placeholder="请选择状态"
                >
                  <el-option label="在岸" value="在岸"></el-option>
                  <el-option label="出差" value="出差"></el-option>
                  <el-option label="外派" value="外派"></el-option>
                  <el-option label="离职" value="离职"></el-option>
                </el-select>
              </el-form-item>
              <div class="lis" v-if="userEditForm.employee_status == '出差'">
                <el-form-item label="出差地" prop="cell_phone">
                  <el-input
                    placeholder="出差地"
                    v-model="userEditForm.businesstravel_place"
                  ></el-input>
                </el-form-item>
                <el-form-item label="出差时间" prop="cell_phone">
                  <el-input
                    placeholder="出差时间"
                    v-model="userEditForm.businesstravel_time"
                  ></el-input>
                </el-form-item>
                <el-form-item label="预计出差周期" prop="cell_phone">
                  <el-input
                    placeholder="预计出差周期"
                    v-model="userEditForm.businesstravel_cycle"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="lis" v-if="userEditForm.employee_status == '外派'">
                <el-form-item label="派遣地" prop="cell_phone">
                  <el-input
                    placeholder="派遣地"
                    v-model="cell_phone"
                  ></el-input>
                </el-form-item>
                <el-form-item label="派遣时间" prop="cell_phone">
                  <el-input
                    placeholder="派遣时间"
                    v-model="cell_phone"
                  ></el-input>
                </el-form-item>
                <el-form-item label="预计派遣周期" prop="cell_phone">
                  <el-input
                    placeholder="预计派遣周期"
                    v-model="cell_phone"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="lis" v-if="userEditForm.employee_status == '离职'">
                <el-form-item label="离职时间" prop="cell_phone">
                  <el-input
                    placeholder="离职时间"
                    v-model="cell_phone"
                  ></el-input>
                </el-form-item>
                <el-form-item label="离职原因" prop="cell_phone">
                  <el-input
                    placeholder="离职原因"
                    v-model="cell_phone"
                  ></el-input>
                </el-form-item>
                <el-form-item label="离职去向" prop="cell_phone">
                  <el-input
                    placeholder="离职去向"
                    v-model="cell_phone"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="preservation">

                <el-button type="primary" @click="deleteState">状 态</el-button>
                <el-button type="primary" @click="onCertain">保 存</el-button>
                <el-button class="cancel" type="primary" @click="close"
                  >取 消</el-button
                >
              </div>
            </el-form>
          </div>
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
                <div class="note_taker">记录人:{{ userEditForm.name }}</div>
                <el-card>
                  {{ item.text }} : {{ item.textarea1 }} ; {{ item.times }} :
                  {{ item.time }} ; {{ item.cycles }} : {{ item.cycle }}
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { deleteState } from "@/api/employee";
export default {
  props: {
    toChild: String,
  },
  data() {
    return {
     
      activeName: "second",
      // 当前日期
      monthValue: "",
      textarea: "",
      datanew: [],
      datashu: [
        {
          text: "出差地点",
          textarea1: "出差地点xxxzcxxczxx",
          times: "出差时间",
          time: "2018/1/12/12时11分",
          cycles: "预计出差周期",
          cycle: "18周",
        },
        {
          text: "外派地点",
          textarea1: "外派地点xxzczxxx",
          times: "外派时间",
          time: "2018/2/12/11时12分",
          cycles: "预计外派周期",
          cycle: "18周",
        },
        {
          text: "离职去向",
          textarea1: "离职去向地点xzxcxx",
          times: "离职时间",
          time: "2018/3/12/3时21分",
          cycles: "离职原因",
          cycle: "出国...",
        },
        {
          text: "离职去向11111111111",
          textarea1: "离职去向地点xzxc1111xx",
          times: "离职时间",
          time: "2018/3/12/3时21分",
          cycles: "离职原因",
          cycle: "出国...",
        },
      ],
      displays: true,
      isInput: false,
      userEditForm: {
         // 出差
      businesstravel_place: "",
      businesstravel_time: "",
      businesstravel_cycle: "",
      // 派遣
      dispatch_place: "",
      dispatch_time: "",
      dispatch_cycle: "",
      // 离职
      quit_time: "",
      quit_reason: "",
      quit_going: "",
      //
        id: "",
        job_no: "",
        name: "",
        gender: "",
        cell_phone: "",
        Email: "",
        customer: "",
        status: "",
        department: "",
        project: "",
        address: "",
        time: "",
        cooperation: "",
        Interface: "",
        // 详情
        age: "",
        birthday: "",
        politics: "",
        Native: "",
        residence: "",
        emergency: "",
        emergency_telephone: "",
        education: "",
        school: "",
        school_time: "",
        working_hours: "",
        marriage: "",
        child: "",
        certificate: "",
        hobby: "",
        skill: "",
        Induction: "",
        post: "",
        enable_feactivate: "",
        employee_status: "",
        // 出差
        businesstravel_place: "",
        businesstravel_time: "",
        businesstravel_cycle: "",
        // 派遣
        dispatch_place: "",
        dispatch_time: "",
        dispatch_cycle: "",
        // 离职
        quit_time: "",
        quit_reason: "",
        quit_going: "",
      },
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      // baseURL: BaseURL,
      initFormData: {},
      userEditFormRules: {
        employee_status: [
          {
            required: true,
            message: "请选择状态",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
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
    },
    openDialog(row) {
      this.empty(); //清空内容
      this.cancel();
      this.dialogFormVisible = true; // 让弹窗显示

      // 当前时间
      var data = new Date();
      var year = data.getFullYear();
      var month = data.getMonth();
      var day = data.getDate();
      var hours = data.getHours();
      var minutes = data.getMinutes();
      var toMonth =
        year +
        "/" +
        (month + 1) +
        "/" +
        day +
        "/" +
        hours +
        "时" +
        minutes +
        "分";
      this.monthValue = toMonth;
      if (row) {
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
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
      if (this.textarea != "") {
        this.datanew.textarea1 = this.textarea;
        this.datanew.time = this.monthValue;
        this.datanew.username = this.userEditForm.username;
        if (this.datanew.textarea1 != "") {
          console.log(this.datanew, "内容和日期-用户名");
          alert("保存成功");
          this.empty();
        } else {
          return false;
        }
      } else {
        alert("内容为空,请输入内容!");
      }
    },
    //
    empty() {
      console.log("清空!");
      this.textarea = "";
    },
    // 状态-------------
    deleteState() {
      if (this.userEditForm.departmentId) {
        this.initFormData = this.userEditForm;
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            console.log(this.userEditForm, "--传入修改的内容");
            // editDepartments(this.userEditForm).then((res) => {
            //   if (res.code === "00000") {
            //     this.$message.success("修改成功！");
            //     this.$parent.queryUserList();
            //     this.dialogFormVisible = false; // 让弹窗隐藏
            //   }
            // });
          }
        });
      } else {
        console.log("新增了");
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            console.log(this.userEditForm, "新增内容带字段------");
            // deleteState(this.userEditForm).then((res) => {
            //   if (res && res.code && res.code === "00000") {
            //     this.$message.success("创建成功！");
            //     this.dialogClose();
            //     this.$parent.queryUserList();
            //   }
            // });
          } else {
            return false;
          }
        });
      }
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
.but {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 20px;
}
::v-deep .el-input__inner {
  color: rgb(0, 0, 0) !important;
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
  width: 96px !important;
}
::v-deep .el-textarea__inner {
  min-height: 130px !important;
}
.note_taker {
  color: #909399;
}
.preservation {
  margin-top: 20px;
  ::v-deep .el-button {
    padding: 7px 15px;
  }
}
.userbox_n {
  display: flex;
  justify-content: space-around;
  ul {
    li {
      display: flex;
      line-height: 40px;
      margin: 10px 0;
      span {
        display: block;
      }
      span:nth-child(1) {
        width: 100px;
      }
      span:nth-child(2) {
        padding-left: 10px;
        width: 150px;
        background-color: #f0f0f0;
      }
    }
  }
}
.userbox_s {
  display: flex;
  justify-content: space-around;
  ul:nth-child(1) {
    margin-right: 80px;
  }
}
.userbox_f {
  display: flex;
  margin-top: -10px;
  ul:nth-child(1) {
    margin-right: 80px;
  }
}
.residence {
  width: 490px !important;
}
.state {
  margin-top: 60px !important;
}
.current {
  margin-top: -10px;
}

.btn {
  padding: 7px 15px;
  margin-top: 30px;
}
.footbtn {
  text-align: center;
}
.block {
  padding: 20px 40px 0;
}
.boxtop {
  margin: 10px 40px;
  padding: 20px 40px;
  border: 1px solid #f0f0f0;
}
.el-form-item {
  display: flex;
  align-items: center;
}
.lis {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  border-top: 2px solid #eee;
  padding-top: 15px;
}
::v-deep .preservation {
  margin-bottom: 0;
}
::v-deep .el-tabs__nav-scroll {
  height: 10px;
}
::v-deep .el-select-dropdown__item.selected {
  padding-left: 15px;
}
::v-deep .el-timeline {
  padding-left: 0;
}
</style>
