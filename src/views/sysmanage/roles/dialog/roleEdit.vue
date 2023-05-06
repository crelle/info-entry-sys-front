<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      lock-scroll
      width="40%"
      @close="closeDialog"
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form
                :model="roleEditForm"
                :rules="roleEditFormRules"
                ref="roleEditRef"
                size="mini"
              >
                <el-form-item style="display: none" label="id" prop="id">
                  <el-input
                    type="text"
                    v-model="roleEditForm.id"
                    placeholder="ID"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="nameZh">
                  <el-input
                    type="text"
                    v-model="roleEditForm.nameZh"
                    placeholder="角色名称"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="name">
                  <el-input
                    type="text"
                    v-model="roleEditForm.name"
                    placeholder="请以  ROLE_  开头"
                    clearable
                  ></el-input>
                </el-form-item>
                <span>角色权限配置</span>
                <div class="aaa">
                  <div class="configuration">
                    <div class="sbox">
                      <span>菜单权限</span>
                      <div class="menubox">
                        <!-- default-expand-all展开所有 -->
                        <el-tree
                          :data="tableData"
                          :check-strictly="checkStrictly"
                          show-checkbox
                          node-key="id"
                          :default-expanded-keys="[0]"
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
                          :default-expanded-keys="[0]"
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
                    type="info"
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
// 查询菜单
import { queryMenuAll } from "@/api/menu";
// 查询角色菜单
import { queryRoleMenu } from "@/api/rolemenu";

import { updateRole, updateRoleMenu, addRole } from "@/api/role";

export default {
  props: {
    toChild: String,
  },
  data() {
    return {
      tableData: [],
      checkStrictly: true,
      datas: [],
      data1: [],
      defaultProps: {
        children: "childrenMenus",
        label: "name",
      },
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      nowIndex: -1,
      roleEditForm: {
        id: "",
        nameZh: "",
        name: "",
        menus: [],
      },
      initFormData: {},
      roleEditFormRules: {
        nameZh: [
          {
            required: true,
            message: "请填写角色名称",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^([\u4E00-\u9FA5]).*$/,
            message: "请以中文名称开头",
            trigger: "blur",
          },
          {
            pattern: /^[^\s]*$/,
            message: "不支持空格格式",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请填写角色英文",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^[ROLE_][0-9a-zA-Z_]{1,}$/,
            message: "请 ROLE_ 开头 + 英文&&数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 树形控件清空
    resetChecked() {
      this.$refs.tree_n.setCheckedKeys([]);
    },
    openDialog(row) {
      this.dialogFormVisible = true; // 让弹窗显示
      this.roleEditForm.id = "";
      this.initFormData = {};
      if (row) {
        this.initFormData = row;
        this.checkStrictly = true;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
          //查询菜单名字
          queryMenuAll().then((res) => {
            if (res && res.code && res.code === "00000") {
              this.tableData = res.data; // 表格数据赋值
              console.log(this.tableData, "----所有菜单---");
              let data = { records: [{ ...this.roleEditForm }] };
              data.id = this.roleEditForm.id;
              console.log(data, "---查询角色菜单data---------");
              // 查询 菜单当前是否选中
              queryRoleMenu(data).then((res) => {
                if (res && res.code && res.code === "00000") {
                  var checkedKeys = res.data.map((item) => {
                    return item.id;
                  });
                  this.$refs.tree_n.setCheckedKeys(checkedKeys);
                  this.checkStrictly = false;
                  console.log(checkedKeys);
                }
              });
            }
          });
        });
      } else {
        this.initFormData = "";
        // 查询菜单名字
        queryMenuAll().then((res) => {
          if (res && res.code && res.code === "00000") {
            this.$nextTick(() => {
              // 这个要加上
              this.tableData = res.data; // 表格数据赋值
            });
          }
        });
      }
    },
    initForm(data) {
      Object.keys(this.roleEditForm).forEach((item) => {
        this.roleEditForm[item] = data[item] ? data[item] : null;
      });
    },
    // 弹窗执行了
    closeDialog() {
      this.resetFormData(); // 初始化弹窗数据 重置 包含头像信息等
      this.resetForm("roleEditRef"); // 重置表单
      this.resetChecked();
    },
    // 取消
    dialogClose() {
      this.dialogFormVisible = false;
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initForm(this.roleEditForm);
      this.resetFormData();
    },
    // 初始化页面数据 重置
    resetFormData() {
      this.ifLogin = true;
    },
    /* 保存  */
    onCertain() {
      console.log(
        this.$refs.tree_n.getHalfCheckedNodes(),
        "------------父级-菜单----"
      );

      // console.log(
      //   this.$refs.tree_n.getCheckedNodes(),
      //   this.$refs.tree_n.data,
      //   "---菜----单----"
      // );
      console.log(this.initFormData.id, "---新增无 ---修改有---");
      if (this.initFormData.id) {
        this.roleEditForm.id = this.initFormData.id;
        this.initFormData = this.roleEditForm;
        // console.log(this.initFormData, "----保存de 内容");
        // 修改
        this.$refs["roleEditRef"].validate((valid) => {
          // console.log(valid, "修改的valid");
          if (valid) {
            // console.log(this.roleEditForm, "---修改传递的内容111111111----");
            updateRole(this.roleEditForm, this.roleEditForm.id).then((res) => {
              // console.log(res, "-----------角色菜单名称修改");
              if (res && res.code && res.code === "00000") {
                this.dialogClose();
                this.$parent.queryRoles();
              }
            });

            (this.roleEditForm.menus = this.$refs.tree_n.getCheckedNodes()),
              // 赋值父级菜单
              this.$refs.tree_n.getHalfCheckedNodes().forEach((item) => {
                this.roleEditForm.menus.push(item);
              });

            // (this.roleEditForm.menus = Array.from(this.roleEditForm.menus));
            console.log(
              this.roleEditForm,
              this.roleEditForm.menus,
              "---修改传递的内容22222222----"
            );
            updateRoleMenu(this.roleEditForm).then((res) => {
              // console.log(res, "-----------角色菜单权限修改");
              if (res && res.code && res.code === "00000") {
                this.$message.success("修改成功！");
                this.dialogClose();
                this.$parent.queryRoles();
              }
            });
          } else {
            return false;
          }
        });
      } else {
        console.log("增加了...");
        this.$refs["roleEditRef"].validate((valid) => {
          if (valid) {
            // console.log(this.$refs.tree_n.getHalfCheckedNodes(),"--------------xz");
            //   this.roleEditForm.menus.push(this.$refs.tree_n.getHalfCheckedNodes()),
            (this.roleEditForm.menus = this.$refs.tree_n.getCheckedNodes()),
              // 赋值父级菜单
              this.$refs.tree_n.getHalfCheckedNodes().forEach((item) => {
                this.roleEditForm.menus.push(item);
              });
            // (this.roleEditForm.menus = Array.from(this.roleEditForm.menus));
            console.log(
              this.roleEditForm,
              "---增加传递的内容-----菜单----",
              this.roleEditForm.menus
            );
            addRole(this.roleEditForm).then((res) => {
              // console.log(res, "增加了...res11111");
              if (res && res.code && res.code === "00000") {
                console.log("成功增加--用户！");
                this.$message.success("创建成功！");
                this.dialogClose();
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
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
@deep: ~">>>";
@{deep} .register_form_main {
  margin: 10px 40px;
  position: relative;
  min-width: 40%;
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
}
.regionbox {
  ul {
    li {
      display: flex;
      margin: 10px 0;
      span {
        display: block;
        margin-right: 15px;
        font-size: 16px;
      }
    }
  }
}
.configuration {
  display: flex;
  justify-content: space-around;
  padding: 5px 20px 0;

  .sbox {
    width: 140px;
    span {
      display: block;
      margin: 10px 0;
    }
  }
}

::v-deep .el-form-item {
  text-align: right;
  margin: 20px 0;
}
.dialog-footer {
  text-align: right;
}
.aaa {
  margin-top: 20px;
  height: 265px;
  overflow-x: hidden;
  overflow-y: scroll;
  line-height: 30px;
  border: 1px solid #eee;
}
.aaa::-webkit-scrollbar {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0;
}
::v-deep .is-required {
  display: flex;
}
::v-deep .el-dialog {
  min-width: 380px;
}
</style>