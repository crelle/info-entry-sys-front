<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      lock-scroll
      @close="closeDialog"
      class="showAll_dialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form
                :model="userEditForm"
                :rules="userEditFormRules"
                ref="userEditRef"
                size="mini"
              >
                <!-- <el-form-item label="角色编码">
                  <el-input v-model="userEditForm.name" placeholder="角色编码"
                    ><i class="el-icon-user" slot="prepend"></i
                  ></el-input>
                </el-form-item> -->
                <el-form-item label="角色名称" prop="nameZh">
                  <el-input
                    type="text"
                    v-model="userEditForm.nameZh"
                    placeholder="角色名称"
                  ></el-input>
                </el-form-item>
                <span>角色权限配置</span>
                <div>
                  <div class="configuration">
                    <div class="sbox">
                      <span>菜单权限</span>
                      <div class="menubox">
                        <!-- default-expand-all展开所有 -->
                        <el-tree
                          :data="data"
                          show-checkbox
                          node-key="id"
                          :default-expanded-keys="datas"
                          ref="tree_n"
                          highlight-current
                          :props="defaultProps"
                        >
                        </el-tree>
                      </div>
                    </div>
                    <div class="sbox">
                      <span>数据权限</span>
                      <div class="menubox">
                        <el-tree
                          :data="data1"
                          show-checkbox
                          node-key="id"
                          :default-expanded-keys="[3]"
                          ref="tree_t"
                          highlight-current
                          :props="defaultProps"
                        >
                        </el-tree>
                      </div>
                    </div>
                  </div>
                </div>
                <el-form-item class="dialog-footer">
                  <el-button type="primary" size="mini" @click="onCertain"
                    >保 存</el-button
                  >
                  <el-button
                    class="cancel"
                    type="primary"
                    @click="dialogClose"
                    size="mini"
                    >取 消</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
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
      datas: [],
      data: [
        {
          id: 1,
          label: "系统管理",
          children: [
            {
              id: 2,
              label: "用户管理",
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
                  label: "角色配置",
                },
                {
                  id: 13,
                  label: "停用启用",
                },
              ],
            },
            {
              id: 3,
              label: "角色管理",
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
              id: 4,
              label: "地域管理",
              children: [
                {
                  id: 7,
                  label: "新增",
                },
                {
                  id: 8,
                  label: "编辑",
                },
                {
                  id: 9,
                  label: "查看",
                },
                {
                  id: 10,
                  label: "删除",
                },
              ],
            },
            {
              id: 5,
              label: "部门管理",
              children: [
                {
                  id: 7,
                  label: "新增",
                },
                {
                  id: 8,
                  label: "编辑",
                },
                {
                  id: 9,
                  label: "查看",
                },
                {
                  id: 10,
                  label: "删除",
                },
              ],
            },
          ],
        },
      ],
      data1: [
        {
          id: 1,
          label: "业务部",
          children: [
            {
              id: 4,
              label: "孵化使能部",
              children: [
                {
                  id: 9,
                  label: "合同管理",
                },
                {
                  id: 10,
                  label: "平台管理",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "零售部",
        },
        {
          id: 3,
          label: "系统管理",
          children: [
            {
              id: 7,
              label: "用户管理",
              children: [
                {
                  id: 8,
                  label: "新增",
                },
                {
                  id: 9,
                  label: "编辑",
                },
                {
                  id: 10,
                  label: "查看",
                },
                {
                  id: 11,
                  label: "角色配置",
                },
                {
                  id: 12,
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
      // 多选权限
      // ----
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      nowIndex: -1,
      // baseURL: BaseURL,
      userEditForm: {
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
    // 树形控件赋值
    setCheckedNodes() {
      this.$refs.tree_n.setCheckedNodes([
        {
          id: 5,
          label: "二级 2-1",
        },
        {
          id: 9,
          label: "三级 1-1-1",
        },
      ]);
      this.$refs.tree_t.setCheckedNodes([
        {
          id: 5,
          label: "二级 2-1",
        },
        {
          id: 9,
          label: "三级 1-1-1",
        },
      ]);
    },
    // 树形控件清空
    resetChecked() {
      this.$refs.tree_n.setCheckedKeys([]);
      this.$refs.tree_t.setCheckedKeys([]);
    },
    openDialog(row) {
      console.log(this.userEditForm, "001001");
      this.dialogFormVisible = true; // 让弹窗显示
      this.$nextTick(() => {
        // 这个要加上
        this.datas = [1];
      });
      if (row) {
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
          this.setCheckedNodes();
          console.log("我是编辑");
        });
      } else {
        // 树形控件清空
        console.log("我是新增");
        this.resetChecked();
        // this.$refs.tree_n.setCheckedKeys([]);
        // this.$refs.tree_t.setCheckedKeys([]);
        // this.initForm("");
        //  this.check1="",
        //  this.check2="",
        //  this.check3="",
        //  this.check4="",
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

      console.log("初始化了");
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
  padding: 6px 40px;
  .el-input-group__append {
    padding: 0 2px;
  }
}
.configuration {
  min-height: 215px;
  display: flex;
  justify-content: space-around;
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

.el-form-item {
  display: flex;
  .el-form-item__label {
    width: 80px;
  }
}
// 修改对话框高度 滚动条
.showAll_dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  ::v-deep .el-dialog {
    margin: 0 auto !important;
    height: 50%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
      // 下边设置字体，我的需求是黑底白字
      color: #606266;
      line-height: 30px;
      padding: 0 15px;
    }
  }
}
.dialog-footer {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 30px;
}
::v-deep .el-form-item__label {
  margin-right: 25px;
}
.cancel {
  background-color: #999 !important;
  border: 1px solid #999 !important;
}
</style>