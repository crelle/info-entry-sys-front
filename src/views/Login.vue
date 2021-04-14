<template>
  <div id="login_content">
    <div class="login_form_main">
      <span style="
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: 500;
        ">家庭百科系统登录</span>
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
        <el-form-item>
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
    border-radius: 10px;
    background-color: aliceblue;
    box-shadow: 6px 6px 6px rgba(red, green, blue, 0.5);
    .el-form {
      padding: 30px 20px 10px 0;
    }
  }
}
</style>