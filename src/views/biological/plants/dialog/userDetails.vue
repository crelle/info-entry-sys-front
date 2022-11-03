<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      lock-scroll
      @close="closeDialog"
      class="showAll_dialog"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <div class="register_form_main">
            <el-row style="height: 100%">
              <el-col :span="24">
                <div class="grid-content-right">
                  <el-form :model="userEditForm" ref="userEditRef" size="mini">
                    <div class="userbox">
                      <div>
                        <div class="but">
                          <el-button
                            type="primary"
                            v-if="displays"
                            @click="cancel"
                            >取消</el-button
                          >
                          <el-button type="primary" @click="edit"
                            >编辑</el-button
                          >
                        </div>
                        <el-form
                          ref="form"
                          :model="form"
                          :disabled="isInput"
                          label-width="100px"
                        >
                          <el-form-item label="姓名:">
                            <el-input v-model="form.name"></el-input>
                          </el-form-item>
                          <el-form-item label="性别:">
                            <el-input v-model="form.gender"></el-input>
                          </el-form-item>
                          <el-form-item label="年龄:">
                            <el-input v-model="form.age"></el-input>
                          </el-form-item>
                          <el-form-item label="出生年月:">
                            <el-col :span="11">
                              <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.birthday"
                                style="width: 100%"
                              ></el-date-picker>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="联系电话:">
                            <el-input v-model="form.telephone"></el-input>
                          </el-form-item>
                          <el-form-item label="政治面貌:">
                            <el-input v-model="form.politics"></el-input>
                          </el-form-item>
                          <el-form-item label="最高学历:">
                            <el-input v-model="form.education"></el-input>
                          </el-form-item>

                          <el-form-item label="毕业院校:">
                            <el-input v-model="form.school"></el-input>
                          </el-form-item>
                          <el-form-item label="毕业时间:">
                            <el-col :span="11">
                              <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.graduation_time"
                                style="width: 100%"
                              ></el-date-picker>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="工作年限:">
                            <el-input v-model="form.work_time"></el-input>
                          </el-form-item>
                          <el-form-item label="入职时间:">
                            <el-col :span="11">
                              <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.induction_time"
                                style="width: 100%"
                              ></el-date-picker>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="工号:">
                            <el-input v-model="form.job_no"></el-input>
                          </el-form-item>
                          <el-form-item label="户籍地:">
                            <el-input
                              v-model="form.registered_residence"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="现居住地:">
                            <el-input v-model="form.address"></el-input>
                          </el-form-item>
                          <el-form-item label="婚姻状况:">
                            <el-input v-model="form.marital_status"></el-input>
                          </el-form-item>
                          <el-form-item label="有无小孩:">
                            <el-input v-model="form.children"></el-input>
                          </el-form-item>
                          <el-form-item label="有无小孩">
                            <el-select
                              v-model="form.children"
                              placeholder="请选择"
                            >
                              <el-option label="有" value="有"></el-option>
                              <el-option label="无" value="无"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="紧急联系人:">
                            <el-input
                              v-model="form.emergency_contact"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="紧急联系人电话:">
                            <el-input
                              v-model="form.emergency_contact_number"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="证书:">
                            <el-input v-model="form.certificate"></el-input>
                          </el-form-item>
                          <el-form-item label="爱好:">
                            <el-input v-model="form.hobby"></el-input>
                          </el-form-item>
                          <el-form-item label="工作技能:">
                            <el-checkbox-group v-model="form.skill">
                              <el-checkbox
                                label="Web"
                                name="skill"
                              ></el-checkbox>
                              <el-checkbox
                                label="UI"
                                name="skill"
                              ></el-checkbox>
                              <el-checkbox
                                label="Java"
                                name="skill"
                              ></el-checkbox>
                              <el-checkbox
                                label="测试"
                                name="skill"
                              ></el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                          <el-form-item label="地域:">
                            <el-select
                              v-model="form.region"
                              placeholder="请选择"
                            >
                              <el-option label="南京" value="南京"></el-option>
                              <el-option label="上海" value="上海"></el-option>
                              <el-option label="湖北" value="湖北"></el-option>
                              <el-option label="武汉" value="武汉"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="部门:">
                            <el-select
                              v-model="form.department"
                              placeholder="请选择"
                            >
                              <el-option
                                label="研发1"
                                value="研发1"
                              ></el-option>
                              <el-option
                                label="研发2"
                                value="研发2"
                              ></el-option>
                              <el-option
                                label="研发3"
                                value="研发3"
                              ></el-option>
                              <el-option
                                label="研发4"
                                value="研发4"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="项目:">
                            <el-select
                              v-model="form.project"
                              placeholder="请选择"
                            >
                              <el-option
                                label="项目1"
                                value="项目1"
                              ></el-option>
                              <el-option
                                label="项目2"
                                value="项目2"
                              ></el-option>
                              <el-option
                                label="项目3"
                                value="项目3"
                              ></el-option>
                              <el-option
                                label="项目4"
                                value="项目4"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="岗位:">
                            <el-select v-model="form.post" placeholder="请选择">
                              <el-option label="测试" value="测试"></el-option>
                              <el-option label="web" value="web"></el-option>
                              <el-option label="ui" value="ui"></el-option>
                              <el-option label="hr" value="hr"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="接口人:">
                            <el-input v-model="form.contact_person"></el-input>
                          </el-form-item>
                          <el-form-item label="启用/停用">
                            <el-switch
                              v-model="form.enable_feactivate"
                            ></el-switch>
                          </el-form-item>

                          <el-form-item label="员工状态:">
                            <el-radio-group v-model="form.employee_status">
                              <el-radio label="工作中"></el-radio>
                              <el-radio label="休假中"></el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="员工动态记录:">
                            <el-input
                              type="textarea"
                              v-model="form.record"
                            ></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button
                              type="primary"
                              v-if="displays"
                              @click="onSubmit"
                              >保存修改</el-button
                            >
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                  </el-form>
                </div>
              </el-col>
            </el-row>
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
              <el-timeline-item :timestamp="monthValue" placement="top">
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
              </el-timeline-item>
            </el-timeline>
          </div>
          <div class="preservation">
            <el-button type="primary" @click="empty">清空</el-button>
            <el-button type="primary" @click="onCertain">保存</el-button>
            <el-button type="primary" @click="close">取消</el-button>
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
      form: {
        name: "张三",
        gender: "男",
        age: "25岁",
        birthday: "1997/11/03",
        telephone: "1391100011",
        politics: "群众",
        education: "本科",
        school: "哈弗大学",
        graduation_time: "2010/6/15",
        work_time: "6年",
        induction_time: "2020/4/1",
        job_no: "n0260001",
        registered_residence: "江苏xxx",
        address: "南京新街口",
        marital_status: "已婚",
        children: "",
        emergency_contact: "",
        emergency_contact_number: "",
        certificate: "",
        hobby: "",
        skill: ["Web"],
        region: "南京",
        department: "研发1",
        project: "项目1",
        post: "测试",
        contact_person: "",
        enable_feactivate: true,
        employee_status: "工作中",
        record: "",
      },
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      // baseURL: BaseURL,
      userEditForm: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
        password: "123456",
        userAvatar: "",
        userEmail: "",
        userNickName: "",
        userPhone: "",
        username: "",
        roles: "",
      },
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
      console.log(this.userEditForm, "001001详情详情详情详情详情");
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
      color: #ffffff;
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
</style>