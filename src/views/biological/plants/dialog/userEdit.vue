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
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form
                :model="userEditForm"
                :rules="userEditFormRules"
                ref="userEditRef"
                size="mini"
              >
                <div class="box_n">
                  <div class="box_li">
                    <el-form-item label="员工姓名" prop="name">
                      <el-input
                        placeholder="员工姓名"
                        v-model="userEditForm.name"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="出生年月" prop="birthday">
                      <el-col :span="11">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="userEditForm.birthday"
                          style="width: 100%"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="cell_phone">
                      <el-input
                        placeholder="联系电话"
                        v-model="userEditForm.cell_phone"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="最高学历" prop="education">
                      <!--  必填属性 required -->
                      <el-select
                        v-model="userEditForm.education"
                        placeholder="最高学历"
                      >
                        <el-option label="博士研究生" :value="true"></el-option>
                        <el-option
                          label="硕士研究生"
                          :value="false"
                        ></el-option>
                        <el-option label="本科" :value="false"></el-option>
                        <el-option label="专科" :value="false"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="毕业时间" prop="school_time">
                      <el-col :span="11">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="userEditForm.school_time"
                          style="width: 100%"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="工号" prop="job_no">
                      <el-input
                        placeholder="工号"
                        v-model="userEditForm.job_no"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="岗位" prop="post">
                      <el-select
                        v-model="userEditForm.post"
                        placeholder="请选择岗位"
                      >
                        <el-option label="Web" value="Web"></el-option>
                        <el-option label="UI" value="UI"></el-option>
                        <el-option label="Java" value="Java"></el-option>
                        <el-option label="测试" value="测试"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="员工状态" prop="employee_status">
                      <el-select
                        v-model="userEditForm.employee_status"
                        placeholder="请选择状态"
                      >
                        <el-option label="在岸" value="在岸"></el-option>
                        <el-option label="外派" value="外派"></el-option>
                        <el-option label="休假" value="休假"></el-option>
                        <el-option label="离职" value="离职"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="部门" prop="department">
                      <el-input
                        v-model="userEditForm.department"
                        placeholder="部门"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="客户" prop="customer">
                      <el-input
                        v-model="userEditForm.customer"
                        placeholder="客户"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="户籍地" prop="Native">
                      <el-input
                        placeholder="户籍地"
                        v-model="userEditForm.Native"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="婚姻状况" prop="marriage">
                      <el-select
                        v-model="userEditForm.marriage"
                        placeholder="请选择婚姻状况"
                      >
                        <el-option label="已婚" value="已婚"></el-option>
                        <el-option label="未婚" value="未婚"></el-option>
                        <el-option label="未知" value="未知"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="紧急联系人" prop="emergency">
                      <el-input
                        placeholder="紧急联系人"
                        v-model="userEditForm.emergency"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="证书" prop="certificate">
                      <el-input
                        placeholder="证书"
                        v-model="userEditForm.certificate"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="box_li">
                    <el-form-item label="性别" prop="gender">
                      <el-select
                        v-model="userEditForm.gender"
                        placeholder="请选择性别"
                      >
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                      <el-input v-model="userEditForm.age"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="Email">
                      <el-input
                        placeholder="电子邮箱"
                        v-model="userEditForm.Email"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="毕业院校" prop="school">
                      <el-input
                        placeholder="毕业院校"
                        v-model="userEditForm.school"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="工作年限" prop="working_hours">
                      <el-input
                        placeholder="工作年限"
                        v-model="userEditForm.working_hours"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="入职时间" prop="Induction">
                      <el-col :span="11">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="userEditForm.Induction"
                          style="width: 100%"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="工作技能" prop="skill">
                      <el-select
                        v-model="userEditForm.skill"
                        placeholder="请选择工作技能"
                      >
                        <el-option label="Web" value="Web"></el-option>
                        <el-option label="UI" value="UI"></el-option>
                        <el-option label="Java" value="Java"></el-option>
                        <el-option label="测试" value="测试"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="项目" prop="project">
                      <el-select
                        v-model="userEditForm.project"
                        placeholder="请选择接项目"
                        filterable
                        @change="queryson"
                      >
                        <el-option
                          v-for="(item, index) in tableProject"
                          :key="item.index"
                          :label="item.project"
                          :value="index"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="地域" prop="region">
                      <el-select
                        v-model="userEditForm.region"
                        placeholder="请选择地域"
                      >
                        <el-option label="W地域eb" value="We地域b"></el-option>
                        <el-option label="U地域I" value="U地域I"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="接口人" prop="Interface">
                      <el-input
                        v-model="userEditForm.Interface"
                        placeholder="接口人"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="现居住地" prop="residence">
                      <el-input
                        placeholder="现居住地"
                        v-model="userEditForm.residence"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="有无小孩" prop="child">
                      <el-select
                        v-model="userEditForm.child"
                        placeholder="请选择小孩状况"
                      >
                        <el-option label="有" value="有"></el-option>
                        <el-option label="无" value="无"></el-option>
                        <el-option label="未知" value="未知"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="紧急联系人电话"
                      prop="emergency_telephone"
                    >
                      <el-input
                        placeholder="请输入紧急联系人电话"
                        v-model="userEditForm.emergency_telephone"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="兴趣爱好" prop="hobby">
                      <el-input
                        placeholder="兴趣爱好"
                        v-model="userEditForm.hobby"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>

                <!-- <el-form-item label="" prop="password">
                  <el-input
                    class="passwordat"
                    type="email"
                    v-model="userEditForm.password"
                    placeholder="密码"
                    :disabled="true"
                    ><i class="el-icon-message" slot="prepend"></i
                  ></el-input>
                </el-form-item> -->
              </el-form>
            </div>
            <div class="btn">
              <el-button type="primary" size="mini" @click="onCertain"
                >保 存</el-button
              >
              <el-button
                class="cancel"
                type="primary"
                @click="dialogClose"
                size="mini"
                >取 消</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateUser, addUser } from "@/api/user";
export default {
  props: {
    toChild: String,
    tableData: "",
    tableProject: "",
  },
  data() {
    return {
      post: [
        {
          post: "web",
        },
        {
          post: "ui",
        },
        {
          post: "java",
        },
      ],
      textarea: "",
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      // baseURL: BaseURL,
      userEditForm: {
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
        employee_status: "",
        region: "",
      },
      initFormData: {},
      userEditFormRules: {
        job_no: [
          {
            required: true,
            message: "请输入工号",
            trigger: ["blur", "change"],
          },
        ],
        name: [
          {
            required: true,
            message: "请输入员工姓名",
            trigger: ["blur", "change"],
          },
          // {
          //   min: 3,
          //   max: 10,
          //   message: "用户名长度在 3 到 10 个字符",
          //   trigger: "blur",
          // },
        ],
        gender: [
          {
            required: false,
            message: "请选择性别",
            trigger: ["blur", "change"],
          },
        ],
        cell_phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"],
          },
        ],
        Email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["blur", "change"],
          },
        ],
        customer: [
          {
            required: false,
            message: "请选择客户",
            trigger: ["blur", "change"],
          },
        ],
        status: [
          {
            required: false,
            message: "请选择状态",
            trigger: ["blur", "change"],
          },
        ],
        department: [
          {
            required: true,
            message: "请选择部门",
            trigger: ["blur", "change"],
          },
        ],
        project: [
          {
            required: true,
            message: "请选择项目",
            trigger: ["blur", "change"],
          },
        ],
        address: [
          {
            required: false,
            message: "请输入地域",
            trigger: ["blur", "change"],
          },
        ],
        time: [
          {
            required: false,
            message: "请输入毕业日期",
            trigger: ["blur", "change"],
          },
        ],
        Interface: [
          {
            required: false,
            message: "请选择接口人",
            trigger: ["blur", "change"],
          },
        ],
        age: [
          {
            required: false,
            message: "请输入年龄/岁",
            trigger: ["blur", "change"],
          },
        ],
        birthday: [
          {
            required: true,
            message: "请输入出生日期",
            trigger: ["blur", "change"],
          },
        ],
        politics: [
          {
            required: false,
            message: "请选择政治面貌",
            trigger: ["blur", "change"],
          },
        ],
        Native: [
          {
            required: false,
            message: "请输入籍贯",
            trigger: ["blur", "change"],
          },
        ],
        residence: [
          {
            required: true,
            message: "请输入住址",
            trigger: ["blur", "change"],
          },
        ],
        emergency: [
          {
            required: true,
            message: "请输入紧急联系人",
            trigger: ["blur", "change"],
          },
        ],
        emergency_telephone: [
          {
            required: true,
            message: "请输入紧急联系人电话",
            trigger: ["blur", "change"],
          },
        ],
        education: [
          {
            required: true,
            message: "请选择学历",
            trigger: ["blur", "change"],
          },
        ],
        school: [
          {
            required: true,
            message: "请输入学校",
            trigger: ["blur", "change"],
          },
        ],
        school_time: [
          {
            required: true,
            message: "请输入毕业时间",
            trigger: ["blur", "change"],
          },
        ],
        working_hours: [
          {
            required: true,
            message: "请输入工作年限/年",
            trigger: ["blur", "change"],
          },
        ],
        marriage: [
          {
            required: true,
            message: "请选择婚姻状况",
            trigger: ["blur", "change"],
          },
        ],
        child: [
          {
            required: true,
            message: "请选择小孩情况",
            trigger: ["blur", "change"],
          },
        ],
        certificate: [
          {
            required: false,
            message: "请输入证书",
            trigger: ["blur", "change"],
          },
        ],
        hobby: [
          {
            required: false,
            message: "请输入爱好",
            trigger: ["blur", "change"],
          },
        ],
        skill: [
          {
            required: false,
            message: "请输入技能",
            trigger: ["blur", "change"],
          },
        ],
        Induction: [
          {
            required: true,
            message: "请输入入职时间",
            trigger: ["blur", "change"],
          },
        ],
        post: [
          {
            required: true,
            message: "请选择岗位",
            trigger: ["blur", "change"],
          },
        ],
        employee_status: [
          {
            required: true,
            message: "请选择状态",
            trigger: ["blur", "change"],
          },
        ],
        region: [
          {
            required: true,
            message: "请选择地域",
            trigger: ["blur", "change"],
          },
        ],
        emergency_telephone: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    //自动选择
    queryson(e) {
      // console.log("选择的触发///////////");
      // console.log(e, "----------------");
      // console.log(this.tableData[e], "+++++++++++++++");
      // this.userEditForm = this.tableData[e];
      this.userEditForm.department = this.tableProject[e].department;
      this.userEditForm.Interface = this.tableProject[e].name;
      this.userEditForm.department = this.tableProject[e].department;
      this.userEditForm.customer = this.tableProject[e].customer;
      // console.log(this.userEditForm,"this.tableData[e]----this.userEditForm");
    },
    //
    // 弹窗
    openDialog(row) {
      console.log(this.userEditForm, "001001");
      this.dialogFormVisible = true; // 让弹窗显示
      if (row) {
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
        });
      } else {
        console.log("我是新增");
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
    // 取消
    dialogClose() {
      this.dialogFormVisible = false;
      console.log(this.userEditForm, "取消231取消3131");
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.initForm(this.initFormData);
      this.initForm(this.userEditForm);
      this.resetFormData();
    },

    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
      this.userEditForm.roles = [];
    },

    /* 保存  */
    onCertain() {
      if (this.initFormData.id) {
        console.log(this.initFormData.id, "--xxxxx--this.initFormData.id-");
        this.userEditForm.id = this.initFormData.id;
        this.initFormData = this.userEditForm;
        console.log(this.userEditForm, "userEditFormuserEditForm123");
        console.log(
          this.userEditForm.id,
          this.userEditForm,
          "this.initFormData.id"
        );
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "修改的valid");
          if (valid) {
            console.log(this.userEditForm.password, "密码未空");
            updateUser(this.userEditForm, this.userEditForm.id).then((res) => {
              console.log(res, "res11111");
              if (res && res.code && res.code === "00000") {
                this.$message.success("修改成功！");
                // this.dialogClose();
                this.$parent.resetForm();
                this.dialogFormVisible = false; // 让弹窗显
              }
            });
          } else {
            return false;
          }
        });
      } else {
        console.log("增加了...");
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "增加了的valid");
          if (valid) {
            addUser(this.userEditForm, this.userEditForm.id).then((res) => {
              console.log(res, "增加了...res11111");
              if (res && res.code && res.code === "00000") {
                // this.$parent.resetForm();
                // this.nowIndex = -1; // 重置选中
                this.$message.success("创建成功！");
                this.dialogClose();
                this.$parent.resetForm();
              }
            });
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
@deep: ~">>>";
@{deep} .register_form_main {
  position: relative;
  min-width: 30%;
  overflow: hidden;
  > span {
    display: block;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    padding: 20px 0;
    color: #409eff;
    background-color: #383f49;
    text-shadow: 0 1px -3px #409eff;
  }
  .grid-content-left {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    .avatar-uploader .el-upload {
      border: 1px dashed #8c939d;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
    .demo-image__lazy {
      height: 88px;
      .el-image {
        width: 80px;
        height: 80px;
        border: 1px solid #eee;
        margin: 2px;
      }
      .default_img_chioce {
        &::before {
          width: 80px;
          height: 80px;
          background-color: rgba(139, 197, 252, 0.5);
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          content: "已选";
          color: #409eff;
          font-size: 12px;
        }
      }
    }
  }
}
.el-form {
  padding: 0 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .el-input-group__append {
    padding: 0 2px;
  }
}
.passwordat {
  display: none;
}
.el-form-item {
  display: flex;
  margin-right: 50px;
}
::v-deep .el-form-item__label {
  width: 125px !important;
  text-align: left;
}
::v-deep .el-input__inner {
  width: 180px;
}
::v-deep .el-textarea__inner {
  min-height: 110px !important;
  width: 684px;
  color: #606266;
  font-size: inherit !important;
}
::v-deep .el-dialog {
  width: 50%;
}

::v-deep .el-dialog__body {
  padding: 0 20px;
}
.btn {
  text-align: right;
}
// 修改对话框高度 滚动条
.showAll_dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  ::v-deep .el-dialog {
    margin: 0 auto !important;
    height: 83%;
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
      color: #606266;
      line-height: 30px;
      padding: 0 15px;
    }
  }
}
.box_n {
  padding-top: 15px;
  display: flex;
  justify-content: space-around;
  .box_li {
    margin: 0 30px;
  }
}
</style>