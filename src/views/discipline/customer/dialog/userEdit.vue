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
                <el-form-item label="客户名称" prop="customer">
                  <el-input
                    v-model="userEditForm.customer"
                    placeholder="客户名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="地域" prop="region">
                  <el-select
                    v-model="userEditForm.region"
                    placeholder="请选择地域"
                    filterable
                  >
                    <el-option
                      v-for="(item, index) in regionData"
                      :key="item.index"
                      :label="item.region"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="办公地点" prop="address">
                  <el-input
                    type="email"
                    placeholder="请输入办公地点"
                    v-model="userEditForm.address"
                  ></el-input>
                </el-form-item>
                <el-form-item label="负责人" prop="responsibility">
                  <el-select
                    v-model="userEditForm.responsibility"
                    placeholder="请选择负责人"
                    filterable
                    @change="queryson"
                  >
                    <el-option
                      v-for="(item, index) in UserList"
                      :key="item.index"
                      :label="item.username"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号" prop="cell_phone">
                  <el-input
                    type="tel"
                    v-model="userEditForm.cell_phone"
                    placeholder="请输入手机号"
                    readonly
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="Email">
                  <el-input
                    type="email"
                    v-model="userEditForm.Email"
                    placeholder="请输入邮箱"
                    readonly
                  ></el-input>
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
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
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
    </el-dialog>
  </div>
</template>

<script>
import { updateUser, addUser } from "@/api/user";

export default {
  props: {
    toChild: String,
    UserList: "",
    regionData: "",
  },
  data() {
    return {
      textarea: "",
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      // baseURL: BaseURL,
      userEditForm: {
        password: "123456",
        customer: "",
        region: "",
        regionwoek: "",
        responsibility: "",
        cell_phone: "",
        Email: "",
      },
      initFormData: {},
      userEditFormRules: {
        responsibility: [
          {
            required: false,
            message: "请输选择负责人",
            trigger: ["blur", "change"],
          },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
          // {
          //   min: 1,
          //   max: 16,
          //   message: "用户名长度在1-16 个字符",
          //   trigger: "blur",
          // },
        ],

        Email: [
          {
            required: false,
            message: "请填写邮箱",
            trigger: ["blur", "change"],
          },
        ],
        customer: [
          {
            required: true,
            message: "请填写客户名",
            trigger: ["blur", "change"],
          },
        ],
        cell_phone: [
          {
            required: false,
            message: "请填写手机号码",
            trigger: ["blur", "change"],
          },
        ],
        address: [
          {
            required: false,
            message: "请填写地域",
            trigger: ["blur", "change"],
          },
        ],
        address: [
          {
            required: false,
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
      this.userEditForm.cell_phone = this.UserList[e].userPhone;
      this.userEditForm.Email = this.UserList[e].userEmail;
      // console.log(this.userEditForm,"this.tableData[e]----this.userEditForm");
    },
    // 弹窗
    openDialog(row) {
      console.log(this.userEditForm, "001001");
      this.dialogFormVisible = true; // 让弹窗显示
      console.log(this.UserList, "父亲传来的用户表----------");
      if (row) {
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
        });
      } else {
        console.log("我是新增");
        // this.initForm("");
      }
    },
    initForm(data) {
      Object.keys(this.userEditForm).forEach((item) => {
        this.userEditForm[item] = data[item] ? data[item] : null;
        // if (item === "userAvatar") {
        //   // 最终保存的时候 此字段（头像地址）才是最终会
        //   // 赋值给this.userEditForm.userAvatar的值，
        //   // 所以要初始化的时候也要赋值一次
        //   this.imageUrl = data[item];
        // }
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
  padding: 10px 50px;
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
  width: 95px;
  text-align: left;
}
::v-deep .el-input__inner {
  width: 250px;
}
::v-deep .el-textarea__inner {
  min-height: 120px !important;
  width: 250px;
  color: #606266;
  font-size: inherit !important;
}
::v-deep .el-dialog {
  width: 30%;
}
.cancel {
  background-color: #999 !important;
  border: 1px solid #999 !important;
}
::v-deep .el-dialog__body{
  padding: 0px 20px;
}
</style>