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
      <el-tabs v-model="activeName">
        <el-tab-pane label="" name="second">
          <div class="boxtop">
            <el-form
              :model="stateForm"
              :rules="userEditFormRules"
              ref="userEditRef"
              size="mini"
            >
              <el-form-item label="员工状态" prop="status">
                <el-select
                  v-model="stateForm.status"
                  placeholder="请选择状态"
                  clearable
                  filterable
                >
                  <el-option label="在岸" value="在岸"></el-option>
                  <el-option label="出差" value="出差"></el-option>
                  <el-option label="外派" value="外派"></el-option>
                  <el-option label="离职" value="离职"></el-option>
                </el-select>
              </el-form-item>
              <div class="lis" v-if="stateForm.status == '出差'">
                <el-form-item label="出差地" prop="area">
                  <el-input
                    placeholder="出差地"
                    v-model="stateForm.area"
                  ></el-input>
                </el-form-item>
                <el-form-item label="出差时间" prop="time">
                  <el-date-picker
                    v-model="stateForm.time"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="预计出差周期" prop="cycle">
                  <el-input
                    placeholder="预计出差周期"
                    v-model="stateForm.cycle"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="lis" v-if="stateForm.status == '外派'">
                <el-form-item label="派遣地" prop="area">
                  <el-input
                    placeholder="派遣地"
                    v-model="stateForm.area"
                  ></el-input>
                </el-form-item>
                <el-form-item label="派遣时间" prop="time">
                  <el-date-picker
                    v-model="stateForm.time"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="预计派遣周期" prop="cycle">
                  <el-input
                    placeholder="预计派遣周期"
                    v-model="stateForm.cycle"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="lis" v-if="stateForm.status == '离职'">
                <el-form-item
                  style="min-width: 281px"
                  label="离职时间"
                  prop="time"
                >
                  <el-date-picker
                    v-model="stateForm.time"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="离职原因" prop="cycle">
                  <el-input
                    placeholder="离职原因"
                    v-model="stateForm.cycle"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  style="min-width: 191px"
                  label="离职去向"
                  prop="area"
                >
                  <el-input
                    placeholder="离职去向"
                    v-model="stateForm.area"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="preservation">
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
                :timestamp="item.createTime"
              >
                <div class="note_taker">
                  记录人:{{ item.recorder }} {{ item.jobNo }}
                </div>
                <el-card>
                  状态 : {{ item.status }} <br />
                  <span> {{ item.place }} {{ item.area }} </span>
                  <span> {{ item.startTime }} {{ item.time }} </span>
                  <span>{{ item.cycleReason }} {{ item.cycle }} </span>
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
import { deleteState, queryState } from "@/api/employee";
import { Decrypt } from "@/util/crypto/secret";
export default {
  props: {
    toChild: String,
  },
  data() {
    return {
      //  状态
      stateForm: {
        area: "",
        createTime: "",
        cycle: "",
        id: "",
        jobNo: "",
        recorder: "",
        recorderNo: "",
        status: "",
        time: "",
      },
      activeName: "second",
      // 当前日期
      monthValue: "",
      datanew: [],
      datashu: [
        // {
        //   text: "外派地点",
        //   textarea1: "外派地点xxzczxxx",
        //   times: "外派时间",
        //   time: "2018/2/12/11时12分",
        //   cycles: "预计外派周期",
        //   cycle: "18周",
        // },
        // {
        //   text: "离职去向",
        //   textarea1: "离职去向地点xzxcxx",
        //   times: "离职时间",
        //   time: "2018/3/12/3时21分",
        //   cycles: "离职原因",
        //   cycle: "出国...",
        // },
        // {
        //   text: "离职去向11111111111",
        //   textarea1: "离职去向地点xzxc1111xx",
        //   times: "离职时间",
        //   time: "2018/3/12/3时21分",
        //   cycles: "离职原因",
        //   cycle: "出国...",
        // },
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
  created() {},
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
    openDialog(row) {
      console.log(row, "----传来的row");
      if (row) {
        this.userdetail = window.localStorage.getItem("userdetail")
          ? JSON.parse(Decrypt(window.localStorage.getItem("userdetail")))
          : {};
        console.log(this.userdetail, "我是 当前----用户");
        this.stateForm.recorder = this.userdetail.userNickName;
        this.stateForm.recorderNo = this.userdetail.jobNo;
        this.stateForm.jobNo = row.jobNo;
        console.log(this.stateForm, "-----提前处理好的传入内容");
      }
      this.empty(); //清空内容
      this.cancel();
      this.queryStateform(); //查 状态表
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
    empty() {
      console.log("清空!");
      this.textarea = "";
    },
    //   /* 保存  */ 状态-------------
    onCertain() {
      console.log("状态新增了");
      this.$refs["userEditRef"].validate((valid) => {
        if (valid) {
          console.log(this.stateForm, "新增内容带字段------");
          if (this.stateForm.status != "") {
            deleteState(this.stateForm).then((res) => {
              if (res && res.code && res.code === "00000") {
                this.$message.success("创建成功！");
                // this.dialogClose();
                this.$parent.queryUserList();
                this.queryStateform();
                this.closeDialog();
              }
            });
          } else {
            this.$message.success("状态为空,请选择状态!");
          }
        } else {
          return false;
        }
      });
    },
    // 分页查询状态--记录表
    queryStateform() {
      console.log("----分页查询状态--记录表------------");
      let data = { records: [{ ...this.stateForm }] };
      data.current = 1;
      data.size = 9999;
      console.log(
        data,
        "---------------查询状态--记录---------11111-------------"
      );
      queryState(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          console.log(res.data, "-----查询-----成了");
          this.datashu = res.data.records;
          console.log(this.datashu, "res.data.records, -----查询-----成了");
          this.datashu.forEach((items) => {
            items.createTime = items.createTime.split("T")[0];
            if (items.time != null) {
              items.time = items.time.split("T")[0];
            }
            if (items.status == "在岸") {
              items.place = "";
              items.startTime = "";
            }
            if (items.status == "出差") {
              items.place = "出差地址 :";
              items.startTime = "出差时间 :";
              items.cycleReason = "出差周期 :";
            }
            if (items.status == "外派") {
              items.place = "外派地址 :";
              items.startTime = "外派时间 :";
              items.cycleReason = "外派周期 :";
            }
            if (items.status == "离职") {
              items.place = "离职去向 :";
              items.startTime = "离职时间 :";
              items.cycleReason = "离职原因 :";
            }
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
  text-align: right !important;
  padding: 0;
  min-width: 0;
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
  .el-form-item:nth-child(1) {
    ::v-deep .el-form-item__label {
      min-width: 44px;
      // background-color: aqua;
    }
  }
  .el-form-item:nth-child(2) {
    ::v-deep .el-form-item__label {
      min-width: 66px;
      padding-left: 10px;
      // background-color: rgb(129, 255, 11);
    }
  }
  .el-form-item:nth-child(3) {
    ::v-deep .el-form-item__label {
      padding-left: 10px;
      min-width: 94px;
      // background-color: rgb(183, 0, 255);
    }
  }
}
::v-deep .preservation {
  min-width: 658px;
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
.el-card__body {
  span {
    display: block;
    float: left;
    margin-right: 25px;
  }
}
// 头部缩放滚动条

@media screen and (min-width: 1446px) {
  ::v-deep .el-form::-webkit-scrollbar {
    display: none;
    .el-input__inner {
      margin: 0 10px;
    }
    .el-form-item--mini {
      min-width: 310px;
    }
  }
}
::v-deep .el-form {
  overflow-x: scroll;
}

::v-deep .el-input__inner {
  min-width: 105px;
}
</style>
