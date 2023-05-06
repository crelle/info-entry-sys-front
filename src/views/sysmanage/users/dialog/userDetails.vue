<template>
  <div>
    <el-dialog
    :modal="false"
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="30%"
      lock-scroll
      @close="closeDialog"
    >
      <div class="register_form_main">
        <div class="left">
          <div class="person">
            <img
              src="../../../../assets/img/dialog/person.png"
              alt=""
            >
          </div>
          <div class="status">{{ userEditForm.enabled ? "启用" : "禁用" }}</div>
        </div>
        <div class="right">
          <div class="header">
            <div class="name">{{userEditForm.userNickName}}</div>
            <div class="user-name">用户名：{{ userEditForm.username }}</div>
          </div>
          <div class="info">
            <p>
              <span>工号：{{ userEditForm.jobNo }}</span>
              <span>手机号：{{ userEditForm.userPhone }}</span>
            </p>
            <p>邮箱：<span :title="userEditForm.userEmail">{{ userEditForm.userEmail }}</span></p>
            <p>
              <span>角色：<span
                  v-for="item in userEditForm.roles"
                  :key="item.id"
                >{{ item.nameZh }}</span></span>
              <span>是否可用：<span class="is-can-use">{{ userEditForm.enabled ? "是" : "否" }}</span></span>
            </p>
          </div>
        </div>
        <!-- <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form :model="userEditForm" ref="userEditRef" size="mini">
                <div class="userbox">
                  <ul class="lis">
                    <li>
                      <span>姓名:</span><span>{{userEditForm.userNickName}}</span>
                    </li>
                    <li>
                      <span>手机号 :</span
                      ><span>{{ userEditForm.userPhone }}</span>
                    </li>
                    <li>
                      <span>工号 :</span><span>{{ userEditForm.jobNo }}</span>
                    </li>
                    <li>
                      <span>用户名:</span
                      ><span>{{ userEditForm.username }}</span>
                    </li>
                    <li>
                      <span>邮箱 :</span
                      ><span :title="userEditForm.userEmail">{{
                        userEditForm.userEmail
                      }}</span>
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
                    <li>
                      <span></span
                      ><span></span>
                    </li>
                    <li>
                      <span>是否可用 :</span
                      ><span>{{ userEditForm.enabled ? "是" : "否" }}</span>
                    </li>
                    <li>
                      <span>账户是否未被锁定:</span
                      ><span>{{ userEditForm.accountNonLocked ? "是" : "否" }}</span>
                    </li>
                    <li>
                      <span>账户是否未过期:</span
                      ><span>{{ userEditForm.accountNonExpired ? "是" : "否" }}</span>
                    </li>
                  </ul>
                  <ul class="yesno">
                    <li>
                      <span>是否可用 :</span
                      ><span>{{ userEditForm.enabled ? "是" : "否" }}</span>
                    </li>
                  </ul>
                </div>
              </el-form>
            </div>
          </el-col>
        </el-row> -->
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="dialogClose"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    toChild: String,
  },
  data () {
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
        jobNo: "",
      },
      initFormData: {},
    };
  },
  methods: {
    openDialog (row) {
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
    initForm (data) {
      Object.keys(this.userEditForm).forEach((item) => {
        this.userEditForm[item] = data[item] ? data[item] : null;
      });
    },
    closeDialog () {
      this.resetFormData(); // 初始化弹窗数据 重置 包含头像信息等
      this.resetForm("userEditRef"); // 重置表单
    },
    // 确定
    dialogClose () {
      this.dialogFormVisible = false;
      console.log(this.userEditForm, "确定231确定3131");
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.initForm(this.userEditForm);
      this.resetFormData();
    },

    // 初始化页面数据 重置
    resetFormData () {
      this.ifLogin = true;
    },
  },
};
</script>

<style lang="less" scoped>
// ul,
// li {
//   padding: 0;
//   margin: 0;
//   list-style: none;
// }
// .lis {
//   padding: 0 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-wrap: wrap;
//   li {
//     width: 245px;
//     margin: 5px 0;
//     line-height: 35px;
//     font-size: 14px;
//     display: flex;

//     span {
//       display: block;
//     }
//     span:nth-child(1) {
//       width: 75px;
//     }
//     span:nth-child(2) {
//       width: 200px;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//     }
//   }
// }
.dialog-footer {
  text-align: center;
}
::v-deep .el-dialog {
  min-width: 350px;
}
::v-deep .el-button--mini {
  padding: 3% 0;
  border: none;
  width: 24%;
}
.register_form_main{
  display: flex;
  justify-content: space-between;
  color: #ccdfff;
  font-style: italic;
  .left{
    .person{
      img{
        width: 110%;
        height: 110%;
      }
    }
    .status{
      width: 110%;
      margin-top: 10px;
      text-align: center;
      background: linear-gradient(to bottom, #2c48ae, #101d37);
      padding: 4px 0;
      color: #939dbd;
    }
  }
  .right{
    width: 70%;
    .header{
      display: flex;
      align-items: end;
      margin-bottom: 16px;
      .name{
        font-size: 16px;
        margin: 0 10px;
      }
      .user-name{
        font-size: 12px;
        color: #3c4f71;
      }
    }
    .info{
      background-color: rgba(24, 40, 71, 0.4);
      color: #939dbd;
      >p{
        margin: 0;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        font-size: 13px;
        padding: 10px 15px;
        &:nth-child(2){
          background-color: rgba(45, 68, 117, 0.4);
        }
        >span{
          flex: 1;
          display: flex;
          align-items: center;
        }
        .is-can-use{
          color: #87a9ef;
        }
      }
    }
  }
}
</style>