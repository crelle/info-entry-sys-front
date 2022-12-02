<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      lock-scroll
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="旧密码" prop="oldpass">
              <el-input
                type="password"
                v-model.number="ruleForm.oldpass"
                placeholder="请输入旧密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                placeholder="请输入新密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                placeholder="请再次输入新密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >确认</el-button
              >
              <el-button type="primary" @click="cancel()">取 消</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
          </el-form>
        </el-row>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogClose" size="mini"
          >确 定</el-button
        >
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
// 当前用户
import { Decrypt } from "@/util/crypto/secret";

import { changePassword } from "@/api/user";
export default {
  props: {
    toChild: String,
  },
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("旧密码不能为空"));
      }

      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //
      ruleForm: {
        pass: "",
        checkPass: "",
        oldpass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldpass: [{ validator: validatePass1, trigger: "blur" }],
      },

      //
      dialogFormVisible: false,
    };
  },
  created() {
    this.userdetail = window.localStorage.getItem("userdetail")
      ? JSON.parse(Decrypt(window.localStorage.getItem("userdetail")))
      : {};
    // console.log(window.localStorage.getItem("userdetail"));
    console.log(this.userdetail, "我是 当前----用户");
  },
  methods: {
    // 表单验证 确定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.oldpass == 123) {
            // this.ruleForm.age == 123;
            console.log(valid);
            alert("修改成功!");
            this.del();
            this.dialogFormVisible = false; // 让弹窗显示
          } else {
            alert("修改失败!密码不正确,请重新输入!");
            this.del();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    //
    openDialog(row) {
      console.log(row, "当前账户信息");
      this.dialogFormVisible = true; // 让弹窗显示
    },
    // 清空内容
    del() {
      this.ruleForm.oldpass = "";
      this.ruleForm.pass = "";
      this.ruleForm.checkPass = "";
    },
    // 取消
    cancel() {
      this.del(); //清空内容
      this.dialogFormVisible = false; // 让弹窗显示
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
}
::v-deep .el-button {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

::v-deep .el-form-item__label {
  width: 70px !important;
}
::v-deep .el-form-item__content {
  margin-left: 80px !important;
  text-align: right;
}
::v-deep .el-dialog__body {
  padding: 30px 50px 0;
}
::v-deep .el-dialog {
  width: 25% !important;
  font-size: 12px;
}
</style>