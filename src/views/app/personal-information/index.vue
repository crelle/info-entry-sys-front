<template>
  <div>
    <div class="grid-content-right">
      <!-- :model="userEditForm" ref="userEditRef"  -->
      <el-form size="mini">
        <div class="userbox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
          </el-breadcrumb>
          <div>
            <div class="but">
              <!-- 重置 -->

              <el-button type="primary" v-if="reset" @click="onEditRoleMima">
                修改密码
              </el-button>
              <el-button type="primary" v-if="displays" @click="onSubmit"
                >保 存</el-button
              >
              <el-button
                type="primary"
                v-if="displays"
                @click="cancel('userEditRef')"
                >取 消</el-button
              >
              <el-button type="primary" v-if="editbtn" @click="edit"
                >编辑</el-button
              >
            </div>
            <el-form
              :rules="userEditFormRules"
              ref="userEditRef"
              :model="userdetail"
              :disabled="isInput"
              label-width="100px"
            >
              <div class="box">
                <div class="boxlis">
                  <el-form-item label="姓名 :" prop="userNickName">
                    <el-input
                      clearable
                      v-model="userdetail.userNickName"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="box">
                <div class="boxlis">
                  <el-form-item label="邮箱 :" prop="userEmail">
                    <el-input
                      clearable
                      v-model="userdetail.userEmail"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="boxlis">
                  <el-form-item label="电话 :" prop="userPhone">
                    <el-input
                      clearable
                      v-model="userdetail.userPhone"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="box">
                <div class="boxlis">
                  <el-form-item label="角色 :" prop="userPhone">
                    <el-input
                      disabled
                      v-model="userdetail.roles[0].nameZh"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="boxlis">
                  <el-form-item label="工号 :">
                    <el-input
                      disabled
                      clearable
                      v-model="userdetail.jobNo"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </el-form>
    </div>
    <role-data-dialog
      :toChild="list"
      ref="roleDataDialogRef"
    ></role-data-dialog>
  </div>
</template>

<script>
import { Encrypt } from "@/util/crypto/secret";
import { updateUser } from "@/api/user";
import { Decrypt } from "@/util/crypto/secret";
import RoleDataDialog from "@/views/app/personal-information/dialog/dialogDetails.vue";
export default {
  components: {
    RoleDataDialog,
  },
  props: {
    toChild: String,
  },
  data() {
    return {
      list: "",
      // 当前用户
      tableData: [],
      userdetail: {},
      nowMenu: "",
      //
      reset: true,
      editbtn: true,
      displays: false,
      isInput: true,
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
        password: "",
        userAvatar: "",
        userEmail: "",
        userNickName: "",
        userPhone: "",
        username: "",
        roles: "",
      },
      initFormData: {},
      userEditFormRules: {
        userNickName: [
          {
            required: false,
            message: "请输入姓名",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^([\u4E00-\u9FA5])*$/,
            message: "请输入中文名称",
            trigger: "blur",
          },
          // {
          //   pattern: /^(?!\s+).*(?<!\s)$/,
          //   message: "首尾不能为空格",
          //   trigger: "blur",
          // },
          // {
          //   pattern: /^(?![0-9]).*$/,
          //   message: "不能以数字开头",
          //   trigger: "blur",
          // },
        ],
      },
    };
  },
  computed: {
    pathNow() {
      return this.$route.path;
    },
  },
  watch: {
    // 侦听路由 路由改变则联动菜单
    pathNow(n) {
      this.nowMenu = n;
    },
  },
  created() {
    this.userdetail = window.localStorage.getItem("userdetail")
      ? JSON.parse(Decrypt(window.localStorage.getItem("userdetail")))
      : {};
    // console.log(window.localStorage.getItem("userdetail"));
    console.log(this.userdetail, "我是 当前----用户");
  },
  methods: {
    // 编辑
    edit() {
      this.isInput = false;
      this.displays = true;
      this.editbtn = false;
      this.reset = false;
    },
    // 取消
    cancel(formName) {
      // 表单禁用
      this.isInput = true;
      this.displays = false;
      this.editbtn = true;
      this.reset = true;
      this.resetForm(formName);
      // 获取数据
      // this.getSave();
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log("----------重置-");
    },
    // --------
    /* 保存  */
    onSubmit() {
      // ------
      console.log("submit!", this.form);
      this.isInput = true;
      this.displays = false;
      this.editbtn = true;
      this.reset = true;
      // ------
      if (this.userdetail.id) {
        console.log(this.userdetail.id, "--xxxxx--this.initFormData.id-");
        this.userEditForm.id = this.userdetail.id;
        this.userEditForm = this.userdetail;
        console.log(this.userEditForm, "userEditFormuserEditForm123");
        console.log(
          this.userEditForm.id,
          this.userEditForm,
          "当前用户的id和数据"
        );
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            // console.log(this.userdetail.password, "密码不能空");
            console.log(this.userEditForm, "--传入的东西0");
            delete this.userEditForm.authorities;
            updateUser(this.userEditForm, this.userEditForm.id).then((res) => {
              console.log(res, "----修改了当前用户后----");
              if (res && res.code && res.code === "00000") {
                this.$message.success("修改成功！");
                // 加密用户信息 用户信息包含菜单
                let multifyDetail = Encrypt(JSON.stringify(this.userdetail));
                // 保存已加密的用户信息到 localstorage
                window.localStorage.setItem("userdetail", multifyDetail);
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    // --------
    // 编辑密码
    onEditRoleMima() {
      this.$refs.roleDataDialogRef.openDialog(this.userdetail);
      this.list = "修改密码";
    },
  },
};
</script>

<style lang="less" scoped>
* {
  list-style: none;
}
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
    color: #409eff;
    background-color: #383f49;
    text-shadow: 0 1px -3px #409eff;
  }
}
::v-deep .cell {
  text-align: center;
}
::v-deep .el-dialog {
  width: 50%;
}
.lis {
  padding: 0;
}
.but {
  display: flex;
  justify-content: right;
  align-items: center;
}
::v-deep .el-input__inner {
  color: rgb(0, 0, 0) !important;
  border: 1px solid #dcdfe6;
  background-color: #fafafa !important;
}
::v-deep .is-disabled {
  .el-input__inner {
    border: 0;
  }
}
.box {
  display: flex;
  justify-content: left;
  line-height: 30px;
  margin-left: 80px;

  .boxlis {
    width: 300px;
    line-height: 50px;
    margin-right: 20px;
    box-sizing: border-box;
    display: flex;
    span {
      margin-right: 50px;
      line-height: 45px;
      display: block;
    }
  }
}
::v-deep .el-form-item__label {
  text-align: left;
  width: 80px;
  // background-color: aqua;
}
.zhuzhi {
  width: 51.2%;
  margin-left: 60px;
}
::v-deep .el-form-item__content {
  margin-left: 80px;
  border: none;
}
</style>