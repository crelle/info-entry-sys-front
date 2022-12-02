<template>
  <div>
    <div class="grid-content-right">
      <el-form :model="userEditForm" ref="userEditRef" size="mini">
        <div class="userbox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
          </el-breadcrumb>
          <div>
            <div class="but">
              <el-button type="primary" v-if="reset" @click="onEditRoleMima">
                修改密码
              </el-button>
              <el-button type="primary" v-if="displays" @click="onSubmit"
                >保 存</el-button
              >
              <el-button type="primary" v-if="displays" @click="cancel"
                >取 消</el-button
              >
              <el-button type="primary" v-if="editbtn" @click="edit"
                >编辑</el-button
              >
            </div>
            <el-form
              ref="form"
              :model="userdetail"
              :disabled="isInput"
              label-width="100px"
            >
              <div class="box">
                <div class="boxlis">
                  <el-form-item label="用户名 :">
                    <el-input v-model="userdetail.username"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="box">
                <div class="boxlis">
                  <el-form-item label="工号 :">
                    <el-input v-model="userdetail.jobNo"></el-input>
                  </el-form-item>
                </div>
                <div class="boxlis">
                  <el-form-item label="角色 :">
                    <el-input disabled v-model="userdetail.roles[0].nameZh"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="box">
                <div class="boxlis">
                  <el-form-item label="邮箱 :">
                    <el-input v-model="userdetail.userEmail"></el-input>
                  </el-form-item>
                </div>
                <div class="boxlis">
                  <el-form-item label="电话 :">
                    <el-input v-model="userdetail.userPhone"></el-input>
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
import { Decrypt } from "@/util/crypto/secret";
import RoleDataDialog from "@/views/plans/dialog/dialogDetails.vue";
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
        password: "123456",
        userAvatar: "",
        userEmail: "",
        userNickName: "",
        userPhone: "",
        username: "",
        roles: "",
      },
      initFormData: {},
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
    cancel() {
      // 表单禁用
      this.isInput = true;
      this.displays = false;
      this.editbtn = true;
      this.reset = true;
      // 获取数据
      // this.getSave();
    },
    // 保存
    onSubmit() {
      console.log("submit!", this.form);
      this.isInput = true;
      this.displays = false;
      this.editbtn = true;
      this.reset = true;
    },
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
    // padding: 20px 0;
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
  margin: 20px 0;
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
.btn {
  height: 30px;
  margin-left: 10px;
  background-color: #66b1ff;
  border: none;
  border-radius: 8px;
  color: #fff;
}
</style>