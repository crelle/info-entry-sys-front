<template>
  <div class="contain">
    <div class="login">
      <img src="../assets/img/login/tittle.png" class="top" />
      <div class="middle">人员管理系统入口</div>
      <div class="bottom">
        <div class="entry">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="20px"
          >
            <el-form-item label="" prop="username">
              <el-input v-model="ruleForm.username" placeholder="用户名"
                ><i class="el-icon-user" slot="prepend" style="color:#4b94d3;font-size: 20px;"></i
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                placeholder="密码"
                show-password
                ><i class="el-icon-lock" slot="prepend" style="color:#4b94d3;font-size: 20px;"></i
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="code">
              <el-input
                v-model="ruleForm.code"
                maxlength="4"
                placeholder="验证码"
                @keyup.enter.native="submitForm('ruleForm')"
              >
                <i class="el-iconfont-yanzhengma" slot="prepend" style="color:#4b94d3;font-size: 17px;"></i>
                <el-image
                  @click="changecode"
                  slot="append"
                  style="width: 80px; height: 26px; display: block"
                  :src="codeurl"
                  fit="fill"
                ></el-image>
              </el-input>
            </el-form-item>          
                      
          </el-form>
          <div style="text-align:end;" class="reset" @click="resetForm('ruleForm')">重置用户</div>
            <img src="../assets/img/login/button.png" alt="" style="width:100%;" class="load" @click="submitForm('ruleForm')">                      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getVerifyCode, register } from "@/api/login/index";
import { Encrypt } from "@/util/crypto/secret";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        code: "",
      },rules: {
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
      codeurl:''
    };
  },
  mounted(){
this.changecode()
  },
  methods:{
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formlogin = { ...this.ruleForm };
          login(formlogin).then((res) => {
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>

<style scoped lang="less">
.contain {


  position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    min-width: 1000px;
    z-index:-10;
    zoom: 1;
    background: url("../assets/img/login/bg1.png") no-repeat center center ;
    background-size:100% 100%;
    background-attachment:fixed;

}
.login {
  position: absolute;
  width: 504px;
  height: 751px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}

.middle {
  color: white;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 23px;
}
.bottom {
  flex: 1;
  background-image: url("../assets/img/login/bg2.png");
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  .entry {
    height: 280px;
    width: 80%;
  }
}
.load:hover{
    cursor: pointer;
    transform: translateY(5px);
}
.load{
    transition: all .5s;
}
.reset{
    margin-top: -5px;
    margin-bottom: 20px;
    color:#4b94d3
}
.reset:hover{
    cursor: pointer;
    color: rgb(53, 104, 197);
}
::v-deep .el-input-group__prepend,
::v-deep .el-input-group__append{
    background-color: #142739;
    border: 1px solid transparent;
    
}
::v-deep .el-input__inner{
    background-color: #142739;
    border: 1px solid transparent;
    color:#4b94d3;
    padding-left: 0px;
}
::v-deep .el-input__inner::placeholder{
    color:#4b94d3
}
::v-deep .el-image__error{
    background-color: #021037;
    color: white;
}
::v-deep .el-form-item__content{
  margin-right: 20px;
}
::v-deep input:-internal-autofill-previewed,
::v-deep input:-internal-autofill-selected {
    -webkit-text-fill-color: #4b94d3;
    transition: background-color 5000s ease-out 0.5s;
}
</style>