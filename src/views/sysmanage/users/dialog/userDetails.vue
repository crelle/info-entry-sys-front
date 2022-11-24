<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal='false'
      lock-scroll
      @close="closeDialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form :model="userEditForm" ref="userEditRef" size="mini">
                <div class="userbox">
                  <ul class="lis">
                    <li>
                      <span>用户名:</span
                      ><span>{{ userEditForm.username }}</span>
                    </li>
                    <li>
                      <span>工号 :</span
                      ><span>{{  }}</span>
                    </li>
                    <li>
                      <span>手机号 :</span
                      ><span>{{ userEditForm.userPhone }}</span>
                    </li>
                    <li>
                      <span>邮箱 :</span
                      ><span>{{ userEditForm.userEmail }}</span>
                    </li>
                    <li>
                      <span>角色 :</span
                      ><span
                        v-for="item in userEditForm.roles"
                        :key="item.id"
                        >{{ item.nameZh }}</span
                      >
                    </li>
                    <li>
                      <span>是否可用 :</span
                      ><span>{{ userEditForm.enabled ? "是" : "否" }}</span>
                    </li>
                    <!-- <li>
                      <span>账户是否未被锁定:</span
                      ><span>{{ userEditForm.accountNonLocked ? "是" : "否" }}</span>
                    </li>
                    <li>
                      <span>账户是否未过期:</span
                      ><span>{{ userEditForm.accountNonExpired ? "是" : "否" }}</span>
                    </li> -->
                  </ul>
                </div>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogClose"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
        enabled: false,
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
      }
    },
    initForm(data) {
      Object.keys(this.userEditForm).forEach((item) => {
        this.userEditForm[item] = data[item] ? data[item] : null;
      });
    },
    closeDialog() {
      this.resetFormData(); // 初始化弹窗数据 重置 包含头像信息等
      this.resetForm("userEditRef"); // 重置表单
    },
    // 确定
    dialogClose() {
      this.dialogFormVisible = false;
      console.log(this.userEditForm, "确定231确定3131");
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initForm(this.userEditForm);
      this.resetFormData();
    },

    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
    },
  },
};
</script>

<style lang="less" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.lis {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  li {
    width: 200px;
    margin: 5px 0;
    line-height: 35px;
    font-size: 16px;
    display: flex;

    span {
      display: block;
    }
    span:nth-child(1) {
      width: 80px;
    }
    span:nth-child(2) {
      padding-left: 10px;
    }
  }
}
::v-deep .el-dialog {
  width: 30%;
}
.dialog-footer{
  text-align: center;
}
</style>