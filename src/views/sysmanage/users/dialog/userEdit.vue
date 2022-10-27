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
         <el-col :span="12">
            <div class="grid-content-right">
              <el-form
                :model="userEditForm"
                :rules="userEditFormRules"
                ref="userEditRef"
                size="mini"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="userEditForm.username" placeholder="用户名"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="userNickName">
                  <el-input
                    type="text"
                    v-model="userEditForm.userNickName"
                    placeholder="昵称"
                    ><i class="el-icon-magic-stick" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="userPhone">
                  <el-input
                    type="tel"
                    v-model="userEditForm.userPhone"
                    placeholder="手机号"
                    ><i class="el-icon-mobile-phone" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                  <el-input
                    type="email"
                    v-model="userEditForm.userEmail"
                    placeholder="邮箱"
                    ><i class="el-icon-message" slot="prepend"></i
                  ></el-input>
                </el-form-item>
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
                <el-form-item label="角色权限">
                  <el-select
                    v-model="userEditForm.roles[0].nameZh"
                    placeholder="请选择"
                  >
                    <el-option label="管理员" value="管理员"></el-option>
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="访客" value="访客"></el-option>
                    <el-option label="部门经理" value="部门经理"></el-option>
                    <el-option label="项目助理" value="项目助理"></el-option>
                    <el-option label="项目经理" value="项目经理"></el-option>
                    <el-option label="HR" value="HR"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="是否可用"
                  label-width="100px"
                  prop="enabled"
                >
                  <el-switch
                    v-model="userEditForm.enabled"
                    active-text="可用"
                    inactive-text="不可用"
                  >
                  </el-switch>
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
  },
  data() {
    return {
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
        roles: [
          {
            nameZh: "",
          },
        ],
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
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
        ],

        userEmail: [
          {
            required: true,
            message: "请填写邮箱",
            trigger: ["blur", "change"],
          },
        ],
        userNickName: [
          {
            required: true,
            message: "请填写昵称",
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
      },
    };
  },
  methods: {
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
            console.log(this.userEditForm, "--传入的东西0");
            updateUser(this.userEditForm, this.userEditForm.id).then((res) => {
              console.log(res, "----res11111");
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
                this.$parent.queryUserList();
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
  min-width: 40%;
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
</style>