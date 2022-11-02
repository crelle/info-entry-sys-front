<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      lock-scroll
      @close="closeDialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="20">
            <div class="grid-content-right">
              <el-form
                :model="userEditForm"
                :rules="userEditFormRules"
                ref="userEditRef"
                size="mini"
              >
                <el-form-item label="角色编码">
                  <el-input v-model="userEditForm.name" placeholder="角色编码"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="nameZh">
                  <el-input
                    type="text"
                    v-model="userEditForm.nameZh"
                    placeholder="角色名称"
                    ><i class="el-icon-magic-stick" slot="prepend"></i
                  ></el-input>
                </el-form-item>
                <span>角色权限配置</span>
                <div class="configuration">
                  <div class="sbox">
                    <span>数据权限</span>
                    <el-tree
                      :data="data1"
                      show-checkbox
                      node-key="id"
                      :default-expanded-keys="[1]"
                      :default-checked-keys="[0]"
                      :props="defaultProps"
                    >
                    </el-tree>
                  </div>
                  <div class="sbox">
                    <span>菜单权限</span>
                    <div class="menubox">
                      <el-tree
                        :data="data2"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[1]"
                        :default-checked-keys="[0]"
                        :props="defaultProps"
                      >
                      </el-tree>
                      <el-tree
                        :data="data3"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[1]"
                        :default-checked-keys="[0]"
                        :props="defaultProps"
                      >
                      </el-tree>
                      <el-tree
                        :data="data4"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[1]"
                        :default-checked-keys="[0]"
                        :props="defaultProps"
                      >
                      </el-tree>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogClose" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" size="mini" @click="onCertain"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateRole, addRole } from "@/api/role";

export default {
  props: {
    toChild: String,
  },
  data() {
    return {
      // 多选权限
      data1: [
        {
          id: 1,
          label: "ALL",
        },
        {
          id: 2,
          label: "业务部",
          children: [
            {
              id: 4,
              label: "孵化使能部",
              children: [
                {
                  id: 5,
                  label: "合同管理",
                },
                {
                  id: 6,
                  label: "平台管理",
                },
              ],
            },
          ],
        },
        {
          id: 3,
          label: "零售部",
        },
      ],
      data2: [
        {
          id: 1,
          label: "系统管理",
          children: [
            {
              id: 2,
              label: "用户管理",
              children: [
                {
                  id: 5,
                  label: "新增",
                },
                {
                  id: 6,
                  label: "编辑",
                },
                {
                  id: 7,
                  label: "查看",
                },
                {
                  id: 8,
                  label: "角色配置",
                },
                {
                  id: 9,
                  label: "停用启用",
                },
              ],
            },
            {
              id: 3,
              label: "角色管理",
              children: [
                {
                  id: 10,
                  label: "新增",
                },
                {
                  id: 11,
                  label: "编辑",
                },
                {
                  id: 12,
                  label: "查看",
                },
                {
                  id: 13,
                  label: "删除",
                },
              ],
            },
            {
              id: 4,
              label: "地域管理",
              children: [
                {
                  id: 14,
                  label: "新增",
                },
                {
                  id: 15,
                  label: "编辑",
                },
                {
                  id: 16,
                  label: "查看",
                },
                {
                  id: 17,
                  label: "删除",
                },
              ],
            },
          ],
        },
      ],
      data3: [
        {
          id: 1,
          label: "需求管理",
          children: [
            {
              id: 2,
              label: "客户管理",
              children: [
                {
                  id: 5,
                  label: "新增",
                },
                {
                  id: 6,
                  label: "编辑",
                },
                {
                  id: 7,
                  label: "查看",
                },
                {
                  id: 8,
                  label: "删除",
                },
              ],
            },
            {
              id: 3,
              label: "接口人管理",
              children: [
                {
                  id: 9,
                  label: "新增",
                },
                {
                  id: 10,
                  label: "编辑",
                },
                {
                  id: 11,
                  label: "查看",
                },
                {
                  id: 12,
                  label: "删除",
                },
              ],
            },
            {
              id: 4,
              label: "项目管理",
              children: [
                {
                  id: 13,
                  label: "新增",
                },
                {
                  id: 14,
                  label: "编辑",
                },
                {
                  id: 15,
                  label: "查看",
                },
                {
                  id: 16,
                  label: "删除",
                },
              ],
            },
            {
              id: 5,
              label: "岗位管理",
              children: [
                {
                  id: 17,
                  label: "新增",
                },
                {
                  id: 18,
                  label: "编辑",
                },
                {
                  id: 19,
                  label: "查看",
                },
                {
                  id: 20,
                  label: "删除",
                },
              ],
            },
          ],
        },
      ],
      data4: [
        {
          id: 1,
          label: "员工管理",
          children: [
            {
              id: 2,
              label: "员工信息",
              children: [
                {
                  id: 5,
                  label: "新增",
                },
                {
                  id: 6,
                  label: "编辑",
                },
                {
                  id: 7,
                  label: "查看",
                },
                {
                  id: 8,
                  label: "角色配置",
                },
                {
                  id: 9,
                  label: "停用启用",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // ----
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      nowIndex: -1,
      // baseURL: BaseURL,
      userEditForm: {
        name: "",
        nameZh: "",
      },
      initFormData: {},
      userEditFormRules: {
        // name: [
        //   {
        //     required: true,
        //     message: "请输入角色编码",
        //     trigger: ["blur", "change"],
        //   },
        //   {
        //     min: 1,
        //     max: 100,
        //     message: "用户名长度在 3 到 10 个字符",
        //     trigger: "blur",
        //   },
        // ],
        nameZh: [
          {
            required: true,
            message: "请填写角色名称",
            trigger: ["blur", "change"],
          },
          {
            min: 1,
            max: 100,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
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
      } else {
        console.log("我是新增");
        // this.initForm("");
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
    // 取消
    dialogClose() {
      this.dialogFormVisible = false;
      console.log(this.userEditForm, "取消231取消3131");
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initForm(this.userEditForm);
    },

    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
    },

    /* 保存  */
    onCertain() {
      if (this.initFormData.id) {
        this.userEditForm.id = this.initFormData.id;
        this.initFormData = this.userEditForm;
        console.log(this.userEditForm, "userEditFormuserEditForm123");
        console.log(
          this.userEditForm.id,
          this.userEditForm,
          "this.initFormData.id"
        );
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "修改的valid");
          if (valid) {
            updateRole(this.userEditForm, this.userEditForm.id).then((res) => {
              console.log(res, "res11111");
              if (res && res.code && res.code === "00000") {
                this.$message.success("修改成功！");
                this.dialogClose();
                console.log("修改成功！");
                this.$parent.queryRoles();
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
          if (valid) {
            addRole(this.userEditForm, this.userEditForm.id).then((res) => {
              console.log(res, "增加了...res11111");
              if (res && res.code && res.code === "00000") {
                this.dialogClose();
                console.log("增加成功！");
                this.$parent.queryRoles();
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
@deep: ~">>>";
@{deep} .register_form_main {
  position: relative;
  min-width: 50%;
  overflow: hidden;
  > span {
    display: block;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    padding: 20px 0;
    color: #409eff;
    background-color: #383f49;
    text-shadow: 0 1px -3px #409eff;
  }
  .grid-content-left {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    .avatar-uploader .el-upload {
      border: 1px dashed #8c939d;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-scrollbar__wrap {
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
          background-color: rgba(139, 197, 252, 0.5);
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
  .el-input-group__append {
    padding: 0 2px;
  }
}
.configuration {
  // display: flex;
  // justify-content: space-around;
  padding: 15px 20px 0;
  margin-top: 15px;
  border: 1px solid #eee;
  .sbox {
    padding-bottom: 30px;
    span {
      display: block;
      margin: 10px 0;
    }
    // .menubox {
    //   // display: flex;
    //   // justify-content: space-around;
    // }
  }
}
::v-deep .el-dialog__body {
  padding: 10px;
}
::v-deep .el-row {
  padding-left: 130px;
}
::v-deep .el-dialog {
  margin-top: 4vh !important;
}
</style>