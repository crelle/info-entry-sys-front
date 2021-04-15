<template>
  <div id="login_content">
    <div class="login_form_main">
      <span>家庭百科系统登录</span>
      <div></div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        size="mini"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code"
        >
          <el-input
            v-model="ruleForm.code"
            maxlength="4"
          >
            <el-image
              @click="changecode"
              slot="append"
              style="width: 80px; height: 23px"
              :src="codeurl"
              fit="fill"
            ></el-image>
          </el-input>
        </el-form-item>
        <el-form-item style="display: flex;justify-content: flex-end">
          <el-button
            @click="resetForm('ruleForm')"
            size="mini"
          >重置</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="submitForm('ruleForm')"
          >登录</el-button>
          <el-button
            @click="submitForm('ruleForm')"
            size="mini"
            type="text"
          >忘记密码？</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, getVerifyCode } from "@/api/login/index";
import { Encrypt } from "@/util/crypto/secret";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
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
            message: "请填写密码",
            trigger: ["blur", "change"],
          },
          {
            min: 5,
            max: 16,
            message: "密码长度在 6 到 16 位之间",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请填写密码",
            trigger: ["blur", "change"],
          },
        ],
      },
      codeurl: "",
    };
  },
  created() {
    this.changecode();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formlogin = { ...this.ruleForm };
          login(formlogin).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.$router.push("/sys");
              let multifyDetail = Encrypt(JSON.stringify(res.data));
              window.localStorage.setItem("userdetail", multifyDetail);
            } else {
              this.$message.warning(
                res.message ? res.message : "请确保输入信息正确"
              );
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    changecode() {
      getVerifyCode().then((res) => {
        let blob = new Blob([res], { type: "image/jpeg" });
        let fileName = Date.parse(new Date()) + ".jpeg";
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName);
        } else {
          let codeurl = window.URL.createObjectURL(blob);
          this.codeurl = codeurl;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#login_content {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    -40deg,
    rgba(0, 255, 0, 0.2),
    rgba(255, 100, 50, 0.4)
  );
  .login_form_main {
    min-height: 24%;
    min-width: 30%;
    position: relative;
    border-top: 2px solid rgb(150, 250, 104);
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow:2px 2px 10px rgba(255, 255, 255, 0.5);
    >span {
      display: block;
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      padding-top: 20px;
      color: #409EFF;
      text-shadow: 0 1px -3px #409EFF;
    }
    .el-form {
      padding: 30px 20px 10px 0;
    }
    >div {
      display: block;
      position: absolute;
      background-color: #f83e3e;
      height: 50px;
      width: 50px;
      left: 30%;
      top: -95px;
      transform: rotate(45deg);
      &::before {
        content: '||| 田 |||- --------- [|]-[|]-[|]';
        overflow: hidden;
        display: block;
        position: absolute;
        text-align: right;
        background-color: rgb(238, 188, 24);
        color: rgb(167, 161, 161);
        border-top: 1px solid #333;
        top: 16px;
        left: 16px;
        height: 66px;
        width: 66px;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>