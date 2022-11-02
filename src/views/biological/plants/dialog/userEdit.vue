<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      lock-scroll
      @close="closeDialog"
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
                <el-form-item label="员工姓名" prop="userNickName">
                  <el-input
                    placeholder="项目名称"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-select
                    v-model="userEditForm.region"
                    placeholder="请选择性别"
                  >
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="年龄">
                  <el-input v-model="userEditForm.name"></el-input>
                </el-form-item>
                <el-form-item label="出生年月">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="userEditForm.date1"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="政治面貌">
                  <!--  必填属性 required -->
                  <el-select
                    v-model="userEditForm.roles[0]"
                    placeholder="政治面貌"
                  >
                    <el-option label="中共党员" :value="true"></el-option>
                    <el-option label="预备党员" :value="false"></el-option>
                    <el-option label="团员" :value="false"></el-option>
                    <el-option label="群众" :value="false"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="联系电话" prop="userNickName">
                  <el-input
                    placeholder="联系电话"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="userNickName">
                  <el-input
                    placeholder="电子邮箱"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="户籍地" prop="userNickName">
                  <el-input
                    placeholder="户籍地"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="现居住地" prop="userNickName">
                  <el-input
                    placeholder="现居住地"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="紧急联系人" prop="userNickName">
                  <el-input
                    placeholder="紧急联系人"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="最高学历">
                  <!--  必填属性 required -->
                  <el-select
                    v-model="userEditForm.roles[0]"
                    placeholder="政治面貌"
                  >
                    <el-option label="博士研究生" :value="true"></el-option>
                    <el-option label="硕士研究生" :value="false"></el-option>
                    <el-option label="本科" :value="false"></el-option>
                    <el-option label="专科" :value="false"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="毕业院校" prop="userNickName">
                  <el-input
                    placeholder="毕业院校"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="毕业时间">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="userEditForm.date1"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="工作年限" prop="userNickName">
                  <el-input
                    placeholder="工作年限"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="婚姻状况">
                  <el-select
                    v-model="userEditForm.region"
                    placeholder="请选择婚姻状况"
                  >
                    <el-option label="已婚" value="已婚"></el-option>
                    <el-option label="未婚" value="未婚"></el-option>
                    <el-option label="未知" value="未知"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="有无小孩">
                  <el-select
                    v-model="userEditForm.region"
                    placeholder="请选择小孩状况"
                  >
                    <el-option label="有" value="有"></el-option>
                    <el-option label="无" value="无"></el-option>
                    <el-option label="未知" value="未知"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="证书" prop="userNickName">
                  <el-input
                    placeholder="证书"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="兴趣爱好" prop="userNickName">
                  <el-input
                    placeholder="兴趣爱好"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="工作技能">
                  <el-checkbox-group v-model="userEditForm.type">
                    <el-checkbox label="Web" name="type"></el-checkbox>
                    <el-checkbox label="UI" name="type"></el-checkbox>
                    <el-checkbox label="Java" name="type"></el-checkbox>
                    <el-checkbox label="测试" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="工号" prop="userNickName">
                  <el-input
                    placeholder="工号"
                    v-model="userEditForm.userNickName"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="入职时间">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="userEditForm.date1"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="项目" prop="userNickName">
                  <el-select
                    v-model="userEditForm.userNickName"
                    placeholder="请选择接项目"
                    filterable
                    @change="queryson"
                  >
                    <el-option
                      v-for="(item, index) in tableData"
                      :key="item.index"
                      :label="item.userNickName"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="部门" prop="userPhone">
                  <el-input v-model="userEditForm.userPhone" placeholder="部门"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="接口人" prop="userEmail">
                  <el-input
                    v-model="userEditForm.userEmail"
                    placeholder="接口人"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="客户" prop="userNickName">
                  <el-input
                    v-model="userEditForm.userNickName"
                    placeholder="客户"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>

                <el-form-item label="岗位" prop="username">
                  <el-select
                    v-model="userEditForm.username"
                    placeholder="岗位"
                    filterable
                    @change="queryson"
                  >
                    <el-option
                      v-for="(item, index) in tableData"
                      :key="item.index"
                      :label="item.username"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="介绍" prop="">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea"
                  >
                  </el-input>
                </el-form-item>
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
                      <el-card>
                        {{ item.textarea1 }}
                      </el-card>
                    </el-timeline-item>
                    <el-timeline-item :timestamp="monthValue" placement="top">
                      <el-card>
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
                <el-form-item label="" prop="password">
                  <el-input
                    class="passwordat"
                    type="email"
                    v-model="userEditForm.password"
                    placeholder="密码"
                    :disabled="true"
                    ><i class="el-icon-message" slot="prepend"></i
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogClose" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" size="mini" @click="onCertain"
          >保存</el-button
        >
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
  },
  data() {
    return {
      // 当前日期
      monthValue:"",
      textarea: "",
      datashu: [
        {
          textarea1: "日志1111",
          time: "2018/1/12",
        },
        {
          textarea1: "日志12221",
          time: "2018/2/12",
        },
        {
          textarea1: "日志133331",
          time: "2018/3/12",
        },
      ],
      textarea1: "",
      timestamp: "",
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
        id: "",
        date1: "",
        roles: [],
        type: [],
      },
      initFormData: {},
      userEditFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        id: [
          {
            required: true,
            message: "请输项目名称",
            trigger: ["blur", "change"],
          },
          // {
          //   min: 1,
          //   max: 16,
          //   message: "用户名长度在1-16 个字符",
          //   trigger: "blur",
          // },
        ],

        userEmail: [
          {
            required: true,
            message: "请填写",
            trigger: ["blur", "change"],
          },
        ],
        userNickName: [
          {
            required: true,
            message: "请填写客户名称",
            trigger: ["blur", "change"],
          },
        ],
        userPhone: [
          {
            required: true,
            message: "请填写手机号码",
            trigger: ["blur", "change"],
          },
        ],
        address: [
          {
            required: true,
            message: "请填写地域",
            trigger: ["blur", "change"],
          },
        ],
        addplace: [
          {
            required: true,
            message: "请填写办公地点",
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
      this.userEditForm.userNickName = this.tableData[e].userNickName;
      this.userEditForm.userEmail = this.tableData[e].userEmail;
      this.userEditForm.userPhone = this.tableData[e].userPhone;
      // console.log(this.userEditForm,"this.tableData[e]----this.userEditForm");
    },
    //
    // 弹窗
    openDialog(row) {
      console.log(this.userEditForm, "001001");
      this.dialogFormVisible = true; // 让弹窗显示
      // 当前时间
      var data = new Date();
      var year = data.getFullYear();
      var month = data.getMonth();
      var day=data.getDate()
      var toMonth = year + "/" + (month + 1)+"/"+day;
      this.monthValue = toMonth;
      
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
      // // this.imageUrl = ""; // 清空头像
      // this.nowIndex = -1; // 重置选中
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
  padding: 10px 20px 10px 0;
  .el-input-group__append {
    padding: 0 2px;
  }
}
.passwordat {
  display: none;
}
::v-deep .el-form-item__content {
  width: 650px;
}
</style>