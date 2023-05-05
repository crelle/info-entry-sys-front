<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="30%"
      lock-scroll
      @close="closeDialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%; padding: 0px 28px">
          <el-col :span="24">
            <el-form
              :model="userEditForm"
              :rules="userEditFormRules"
              ref="userEditRef"
              size="small"
              label-position="left"
              label-width="80px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="userEditForm.username"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="userNickName">
                <el-input
                  v-model="userEditForm.userNickName"
                  placeholder="请输入姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="工号" prop="jobNo">
                <el-input
                  type="text"
                  v-model="userEditForm.jobNo"
                  placeholder="请输入用户工号"
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="userPhone">
                <el-input
                  type="tel"
                  v-model="userEditForm.userPhone"
                  placeholder="请输入用户手机号"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="userEmail">
                <el-input
                  type="email"
                  v-model="userEditForm.userEmail"
                  placeholder="请输入用户邮箱"
                ></el-input>
              </el-form-item>

              <el-form-item label="角色权限" prop="roles">
                <el-select
                  v-model="userEditForm.roles[0].nameZh"
                  placeholder="请选择角色权限"
                  filterable
                >
                  <el-option
                    v-for="item in queryRoleData"
                    :key="item.index"
                    :label="item.nameZh"
                    :value="item.nameZh"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="ifnoyes" label="是否可用" prop="enabled">
                <el-switch
                  v-model="userEditForm.enabled"
                  active-text="启用"
                  inactive-text="禁用"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input
                  class="passwordat"
                  type="email"
                  v-model="userEditForm.password"
                  placeholder="密码"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="onCertain"
          >保 存</el-button
        >
        <el-button type="info" size="mini" @click="dialogClose"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateUser, addUser } from "@/api/user";
export default {
  props: {
    toChild: String,
    // queryRoleData: "",
    queryRoleData: "",
  },
  data() {
    return {
      dialogFormVisible: false,
      userEditForm: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
        userAvatar: "",
        userEmail: "",
        password: "123456",
        jobNo: "",
        userPhone: "",
        username: "",
        userNickName: "",
        roles: [
          {
            id: "",
            nameZh: "",
            name: "",
          },
        ],
      },
      initFormData: [],
      userEditFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
          {
            pattern: /^(?![0-9]).*$/,
            message: "不能以数字开头",
            trigger: "blur",
          },
          {
            pattern: /^([a-z]|[0-9])*$/,
            message: "格式不正确&请输入小写英文名称",
            trigger: "blur",
          },
        ],
        userNickName: [
          {
            required: true,
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
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
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
        jobNo: [
          {
            required: true,
            message: "请填写工号",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
          {
            pattern: /^[0-9a-zA-Z]{1,}$/,
            message: "工号格式不正确",
            trigger: "blur",
          },
        ],
        userPhone: [
          {
            required: true,
            message: "请填写手机号码",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],

        roles: [
          {
            required: true,
            message: "请选择权限",
            trigger: ["blur", "change"],
          },
        ],
        enabled: [
          {
            required: false,
            message: "请选择权限",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    // 弹窗
    openDialog(row) {
      console.log(row, "---ROW---", this.queryRoleData);
      this.dialogFormVisible = true; // 让弹窗显示
      this.userEditForm.id = "";
      this.initFormData = {};
      if (row) {
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
        });
      } else {
        console.log("我是新增");
        this.userEditForm.roles[0].nameZh = "";
      }
    },
    initForm(data) {
      Object.keys(this.userEditForm).forEach((item) => {
        this.userEditForm[item] = data[item] ? data[item] : null;
      });
    },
    closeDialog() {
      this.resetFormData(); // 初始化弹窗数据 重置
      this.dialogClose(); // 取消触发
      this.resetForm("userEditRef"); // 重置表单
    },
    // 取消
    dialogClose() {
      this.dialogFormVisible = false;
      console.log(this.userEditForm, "取消");
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.initForm(this.initFormData);
      this.initForm(this.userEditForm);
      this.resetFormData();
    },

    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
    },

    /* 保存  */
    onCertain() {
      this.queryRoleData.forEach((item) => {
        if (this.userEditForm.roles[0].nameZh == item.nameZh) {
          this.userEditForm.roles[0] = item;
        }
      });
      console.log(this.initFormData.id, "------修改 有 创建无------");
      if (this.initFormData.id) {
        this.userEditForm.id = this.initFormData.id;
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            console.log(this.userEditForm, "--传入的东西0");
            updateUser(this.userEditForm, this.userEditForm.id).then((res) => {
              // console.log(res, "----res11111");
              if (res && res.code && res.code === "00000") {
                this.$message.success("修改成功！");
                this.dialogClose();
                this.$nextTick(() => {
                  // 这个要加上
                  this.$parent.queryUserList();
                  this.dialogFormVisible = false; // 让弹窗隐
                });
              }
            });
          } else {
            return false;
          }
        });
      } else {
        console.log("增加了...");
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "增加了的valid");
          console.log(
            this.userEditForm,
            this.userEditForm.roles,
            "增加了的内容"
          );
          if (valid) {
            addUser(this.userEditForm).then((res) => {
              console.log(res, "增加了...res11111");
              if (res && res.code && res.code === "00000") {
                this.$message.success("创建成功！");
                this.dialogClose();
                this.$nextTick(() => {
                  // 这个要加上
                  this.$parent.queryUserList();
                  this.dialogFormVisible = false; 
                });
              }
            });
          } else {
            return false;
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.passwordat {
  display: none;
}
::v-deep .el-form-item__label {
  padding-right: 0 !important;
}
::v-deep .el-dialog {
  min-width: 300px;
}
</style>