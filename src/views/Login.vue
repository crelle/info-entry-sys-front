<template>
  <div id="login_content">
    <span class="sys_info"
      >© {{ new Date().getFullYear() }} -
      <el-link type="primary" href="https://www.archermind.com/" target="_blank"
        >诚迈科技(南京)股份有限公司</el-link
      >
      &
      <el-link
        type="primary"
        href="https://www.archermind.com/about-us#contact"
        target="_blank"
        >联系我们</el-link
      ></span
    >
    <div class="login_form_main" v-show="ifLogin">
      <span>诚迈员工管理系统</span>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="20px"
        size="mini"
      >
        <el-form-item
          style="display: flex; justify-content: flex-end"
          class="noregister"
        >
          <!-- <el-button type="primary" @click="goRegister"
            >还没有账号？注册一个</el-button
          > -->
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"
            ><i class="el-icon-user" slot="prepend"></i
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="密码"
            show-password
            ><i class="el-icon-lock" slot="prepend"></i
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4"
            placeholder="验证码"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <i class="el-iconfont-yanzhengma" slot="prepend"></i>
            <el-image
              @click="changecode"
              slot="append"
              style="width: 80px; height: 26px; display: block"
              :src="codeurl"
              fit="fill"
            ></el-image>
          </el-input>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: flex-end">
          <el-button @click="resetForm('ruleForm')" size="mini" type="primary"
            >重置</el-button
          >
          <el-button type="primary" size="mini" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <!-- <el-button
            @click="submitForm('ruleForm')"
            size="mini"
            type="text"
            class="loginpassword"
            >忘记密码？</el-button
          > -->
        </el-form-item>
      </el-form>
    </div>
    <div class="register_form_main" v-show="!ifLogin">
      <span>账号注册</span>
      <el-row class="account" style="height: 100%">
        <el-col :span="12">
          <div class="grid-content-left">
            <el-upload
              class="avatar-uploader"
              :action="`${baseURL}/user/uploadAvatar`"
              :data="fileType"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
                draggable="false"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span style="font-size: small; color: red"
              >* 请上传头像或选择默认头像</span
            >
            <el-scrollbar style="height: 90px; width: 200px">
              <div
                class="demo-image__lazy"
                :style="`width: ${defaultImgs.length * 88}px`"
              >
                <div
                  v-for="(url, index) in defaultImgs"
                  :key="index"
                  @click="choosedefaultImg(index, url)"
                  style="display: inline-block"
                >
                  <el-image
                    :src="url"
                    :class="nowIndex === index ? 'default_img_chioce' : ''"
                    draggable="false"
                  ></el-image>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content-right">
            <el-form
              :model="registerRuleForm"
              :rules="registeRules"
              ref="registerRuleForm"
              label-width="20px"
              size="mini"
            >
              <el-form-item label="" prop="username">
                <el-input
                  v-model="registerRuleForm.username"
                  placeholder="用户名"
                  ><i class="el-icon-user" slot="prepend"></i
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="userNickName">
                <el-input
                  type="text"
                  v-model="registerRuleForm.userNickName"
                  placeholder="昵称"
                  ><i class="el-icon-magic-stick" slot="prepend"></i
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="userPhone">
                <el-input
                  type="tel"
                  v-model="registerRuleForm.userPhone"
                  placeholder="手机号"
                  ><i class="el-icon-mobile-phone" slot="prepend"></i
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="userEmail">
                <el-input
                  type="email"
                  v-model="registerRuleForm.userEmail"
                  placeholder="邮箱"
                  ><i class="el-icon-message" slot="prepend"></i
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input
                  type="password"
                  v-model="registerRuleForm.password"
                  placeholder="密码"
                  show-password
                  ><i class="el-icon-lock" slot="prepend"></i
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="confirmPwd">
                <el-input
                  type="password"
                  show-password
                  v-model="registerRuleForm.confirmPwd"
                  placeholder="确认密码"
                  ><i class="el-iconfont-querenmima" slot="prepend"></i
                ></el-input>
              </el-form-item>
              <el-form-item style="display: flex; justify-content: flex-end">
                <el-button
                  @click="resetForm('registerRuleForm')"
                  size="mini"
                  type="primary"
                  >重置</el-button
                >
                <el-button type="primary" size="mini" @click="register"
                  >确认</el-button
                >
                <el-button @click="backLogin" size="mini" type="primary"
                  >已有账号</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { login, getVerifyCode, register } from "@/api/login/index";
import { Encrypt } from "@/util/crypto/secret";
import { BaseURL } from "@/api/config";
export default {
  data() {
    return {
      ifLogin: true,
      fileType: {
        fileType: 0,
      },
      ruleForm: {
        username: "",
        password: "",
        code: "",
      },
      registerRuleForm: {
        username: "",
        password: "",
        confirmPwd: "",
        userEmail: "",
        userNickName: "",
        userPhone: "",
        userAvatar: "",
      },
      imageUrl: "",
      nowIndex: -1,
      defaultImgs: [
        "http://1.116.79.69:80/fes/picture/2021-4-27-e9a33f87-ab85-464a-a4b4-5fcd196eea51.png",
      ],
      baseURL: BaseURL,
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
          // {
          //   min: 2,
          //   max: 10,
          //   message: "用户名长度在 2 到 10 个字符",
          //   trigger: "blur",
          // },
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: ["blur", "change"],
          },
          // {
          //   min: 5,
          //   max: 16,
          //   message: "密码长度在 6 到 16 位之间",
          //   trigger: "blur",
          // },
        ],
        code: [
          {
            required: true,
            message: "请填写验证码",
            trigger: ["blur", "change"],
          },
        ],
      },
      registeRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
          // {
          //   min: 3,
          //   max: 10,
          //   message: "用户名长度在 3 到 10 个字符",
          //   trigger: "blur",
          // },
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: ["blur", "change"],
          },
          // {
          //   min: 5,
          //   max: 16,
          //   message: "密码长度在 6 到 16 位之间",
          //   trigger: "blur",
          // },
        ],
        confirmPwd: [
          {
            required: true,
            message: "请确认密码",
            trigger: ["blur", "change"],
          },
          // {
          //   min: 5,
          //   max: 16,
          //   message: "密码长度在 6 到 16 位之间",
          //   trigger: "blur",
          // },
        ],
        userEmail: [
          {
            required: true,
            message: "请填写邮箱",
            trigger: ["blur", "change"],
          },
          {
            pattern:
              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: "邮箱格式不正确",
            trigger: "blur",
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
      codeurl: "",
    };
  },
  created() {
    this.changecode();
  },
  mounted() {
    // console.log(
    //   "%c XuTianqi-email:1300811776@qq.com",
    //   "color: rgba(248, 133, 200, 0)"
    // );
    // this.getBackImg();
  },
  methods: {
    // 表单提交 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formlogin = { ...this.ruleForm };
          login(formlogin).then((res) => {
            // console.log(
            //   res,
            //   "-------------------------------------登录存到localStorage----"
            // );
            if (res && res.code && res.code === "00000") {
              // 登录成功 转跳首屏
              // 加密用户信息 用户信息包含菜单
              let multifyDetail = Encrypt(JSON.stringify(res.data));
              // 保存已加密的用户信息到 localstorage
              window.localStorage.setItem("userdetail", multifyDetail);
              this.$router.push("/sys/firstscreen");
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
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 更改验证码
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
    // 点击注册 更换为注册表单
    goRegister() {
      this.ifLogin = false;
    },
    register() {
      this.$refs["registerRuleForm"].validate((valid) => {
        if (valid) {
          if (
            this.registerRuleForm.password !== this.registerRuleForm.confirmPwd
          ) {
            return this.$message.error("两次输入的密码不一致");
          }
          if (!this.imageUrl) {
            return this.$message.error("请上传头像或选择默认头像");
          }
          this.registerRuleForm.userAvatar = this.imageUrl;
          register(this.registerRuleForm).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.resetForm("registerRuleForm"); // 重置表单
              this.imageUrl = ""; // 清空头像
              this.nowIndex = -1; // 重置选中
              this.$message.success("恭喜您，注册成功！");
              this.ifLogin = true;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 返回登录页面
    backLogin() {
      this.ifLogin = true;
      this.imageUrl = ""; // 清空头像
      this.nowIndex = -1; // 重置选中
      this.resetForm("registerRuleForm");
    },
    // 头像上传相关
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.nowIndex = -1; // 取消默认头像选中样式
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      // 判断上传文件的类型
      if (/^image\/+?/.test(file.type)) {
        this.fileType.fileType = 0;
      } else if (/^video\/+?/.test(file.type)) {
        this.fileType.fileType = 1;
      } else if (/^audio\/+?/.test(file.type)) {
        this.fileType.fileType = 2;
      } else if (/^application\/vnd.ms-+?/.test(file.type)) {
        this.fileType.fileType = 3;
      } else {
        this.$message.error("此文件类型不支持!");
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 100;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 100MB!");
      }
      // return isJPG && isLt2M;
      return isLt2M;
    },
    // 选择默认头像
    choosedefaultImg(index, url) {
      if (index !== this.nowIndex) {
        console.log(this.nowIndex);
        this.nowIndex = index;
        this.imageUrl = url;
      } else {
        console.log(this.nowIndex, -0.2);
        this.nowIndex = -1;
        this.imageUrl = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
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
  background-image: url(https://www.archermind.com/wp-content/uploads/2020/04/Partner.jpg);
  background-size: 100%;
  .sys_info {
    position: absolute;
    width: 100%;
    // height: 40px;
    bottom: 0;
    left: 0;
    color: #555;
    text-align: center;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255),
      rgba(255, 255, 255, 0.2)
    );
  }
  .login_form_main {
    min-height: 24%;
    min-width: 25%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background-color: rgba(0, 40, 99, 0.63);
    box-shadow: 2px -2px 4px rgb(0, 0, 0), -2px 2px 4px rgb(0, 0, 0);
    > span {
      display: block;
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      padding: 20px 0;
      color: #fff;
      background-color: #00214c;
      text-shadow: 0 1px -3px #000e2b;
    }
  }
  .register_form_main {
    position: relative;
    min-width: 40%;
    border-radius: 10px;
    overflow: hidden;
    background-color: rgba(255, 255, 255);
    box-shadow: 2px -2px 4px rgb(0, 0, 0), -2px 2px 4px rgb(0, 0, 0);
    > span {
      display: block;
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      padding: 20px 0;
      color: #fff;
      background-color: #00214c;
      text-shadow: 0 1px -3px #409eff;
    }
    .grid-content-left {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      @{deep} .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      @{deep} .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      @{deep} .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      @{deep} .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
      @{deep} .el-scrollbar__wrap {
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
            background-color: rgba(139, 197, 252, 0.2);
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
    @{deep} .el-input-group__append {
      padding: 0 2px;
    }
  }
}
.loginpassword {
  color: #fff;
}
.el-button--primary {
  background-color: #00235d;
}
@{deep} .el-button--mini {
  font-size: 14px;
}
@{deep} .el-input__inner {
  background-color: #012e69;
  color: #fff;
}
@{deep} .el-input-group__prepend {
  background-color: #012e69;
  color: #fff;
}
.account {
  background-color: rgba(0, 40, 99, 0.63);
}
</style>