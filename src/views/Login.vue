<template>
  <div id="login_content">
    <div class="login_form_main">
        <span style="display: block;text-align: center;font-size: 20px;font-weight: 500;">家庭百科系统登录</span>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        size="mini"
      >
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="ruleForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upassword">
          <el-input v-model="ruleForm.upassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>
          <el-button type="primary" size="mini" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="submitForm('ruleForm')" size="mini" type="text"
            >忘记密码？</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        uname: "",
        upassword: "",
      },
      rules: {
        uname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        upassword: [
          { required: true, message: "请填写密码", trigger: "change" },
          {
            min: 6,
            max: 16,
            message: "密码长度在 6 到 16 位之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   请求鉴权 返回 code
          if (true) {
            this.$router.push("/");
          } else {
            this.$message.warning("用户名或密码不正确");
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    background: linear-gradient(-40deg,rgba(0,255,0,.2),rgba(255,100,50,.4));
    .login_form_main {
        min-height: 24%;
        min-width: 30%;
        border-radius: 10px;
        background-color: aliceblue;
        box-shadow: 6px 6px 6px rgba(red, green, blue, .5);
        .el-form {
            padding: 30px 20px 10px 0;
        }
    }
}
</style>