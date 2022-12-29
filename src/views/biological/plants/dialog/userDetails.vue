<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal='false'
      lock-scroll
      @close="closeDialog"
      class="showAll_dialog"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form :model="userEditForm" ref="userEditRef" size="mini">
                <div class="userbox_n">   
                  <ul>
                    <li>
                      <span>员工姓名:</span><span>{{ userEditForm.name }}</span>
                    </li>
                    <li>
                      <span>出生年月日:</span
                      ><span>{{ userEditForm.birthday }}</span>
                    </li>
                    <li>
                      <span>联系电话:</span
                      ><span>{{ userEditForm.cellPhone }}</span>
                    </li>
                    <li>
                      <span>最高学历:</span><span>{{ userEditForm.education }}</span>
                    </li>
                    <li>
                      <span>毕业时间:</span><span>{{ userEditForm.schoolTime }}</span>
                    </li>
                    <li>
                      <span>工号:</span
                      ><span>{{ userEditForm.jobNo }}</span>
                    </li>
                    <li>
                      <span>岗位:</span
                      ><span>{{ userEditForm.postId }}</span>
                    </li>
                    <li>
                      <span>员工状态:</span><span>{{ userEditForm.status }}</span>
                    </li>
                    <li>
                      <span>部门:</span><span>{{ userEditForm.department }}</span>
                    </li>
                    <li>
                      <span>客户:</span><span>{{ userEditForm.customer }}</span>
                    </li>
                    <li>
                      <span>户籍地:</span><span>{{ userEditForm.nativeAddress }}</span>
                    </li>
                    <li>
                      <span>婚姻状况:</span><span>{{ userEditForm.marriage }}</span>
                    </li>
                    <li>
                      <span>紧急联系人:</span><span>{{ userEditForm.emergency }}</span>
                    </li>
                    <li>
                      <span>证书:</span><span>{{ userEditForm.certificate }}</span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>性别:</span><span>{{ userEditForm.gender }}</span>
                    </li>
                    <li>
                      <span>年龄:</span
                      ><span>{{ userEditForm.age }}</span>
                    </li>
                    <li>
                      <span>电子邮箱:</span
                      ><span>{{ userEditForm.email }}</span>
                    </li>
                    <li>
                      <span>毕业院校:</span><span>{{ userEditForm.school }}</span>
                    </li>
                    <li>
                      <span>工作年限:</span><span>{{ userEditForm.workingHours }}</span>
                    </li>
                    <li>
                      <span>入职时间:</span
                      ><span>{{ userEditForm.time }}</span>
                    </li>
                    <li>
                      <span>工作技能:</span
                      ><span>{{ userEditForm.shill }}</span>
                    </li>
                    <li>
                      <span>项目:</span><span>{{ userEditForm.projectId }}</span>
                    </li>
                    <li>
                      <span>地域:</span><span>{{ userEditForm.nameZh }}</span>
                    </li>
                    <li>
                      <span>接口人:</span><span>{{ userEditForm.nameZh }}</span>
                    </li>
                    <li>
                      <span>现居住地:</span><span>{{ userEditForm.residence }}</span>
                    </li>
                    <li>
                      <span>有无小孩:</span><span>{{ userEditForm.child }}</span>
                    </li>
                    <li>
                      <span>紧急联系人电话:</span><span>{{ userEditForm.emergencyTelephone }}</span>
                    </li>
                    <li>
                      <span>兴趣爱好:</span><span>{{ userEditForm.hobby }}</span>
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
                <div class="note_taker">记录人:{{ userEditForm.username }}</div>
                <el-card>
                  {{ item.textarea1 }}
                </el-card>
              </el-timeline-item>
              <!-- <el-timeline-item :timestamp="monthValue" placement="top">
                <el-card>
                  <div class="note_taker">
                    记录人:{{ userEditForm.username }}
                  </div>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="textarea"
                  >
                  </el-input>
                </el-card>
              </el-timeline-item> -->
            </el-timeline>
            <div class="preservation">
              <el-button type="primary" @click="onCertain">保 存</el-button>
              <el-button class="cancel" type="primary" @click="close"
                >取 消</el-button
              >
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { updateUser } from "@/api/user";
export default {
  props: {
    toChild: String,
    tableData:Array
  },
  data() {
    return {
      aaa: "",
      activeName: "first",
      // 当前日期
      monthValue: "",
      textarea: "",
      datanew: [],
      datashu: [
        {
          textarea1:
            "日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111日志1111",
          time: "2018/1/12/12时11分",
          names: "zs",
        },
        {
          textarea1: "日志12221",
          time: "2018/2/12/11时12分",
          names: "zs",
        },
        {
          textarea1: "日志133331",
          time: "2018/3/12/3时21分",
          names: "zs",
        },
      ],
      displays: true,
      isInput: false,
      userEditForm: {
        id: "",
        job_no: "",
        name: "",
        gender: "",
        cell_phone: "",
        email: "",
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
      },
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      // baseURL: BaseURL,

      initFormData: {},
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
  width: 120px !important;
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
}

* {
  list-style: none;
  padding: 0;
  margin: 0;
}
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
</style>