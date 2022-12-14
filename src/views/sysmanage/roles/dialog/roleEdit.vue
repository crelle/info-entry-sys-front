<template>
  <div>
    <el-dialog
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      lock-scroll
      @close="closeDialog"
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
                <el-form-item label="角色名称" prop="nameZh">
                  <el-input
                    type="text"
                    v-model="userEditForm.nameZh"
                    placeholder="角色名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="name">
                  <el-input
                    type="text"
                    v-model="userEditForm.name"
                    placeholder="英文名称"
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
                    <!-- <div class="sbox">
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
                    </div> -->
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
      datas: [],

      defaultProps: {
        children: "childrenMenus",
        label: "name",
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
        id: "",
        nameZh: "",
        name: "",
        menus: [],
      },
      initFormData: {},
      userEditFormRules: {
        nameZh: [
          {
            required: true,
            message: "请填写角色名称",
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
            pattern: /^(?!_+).*(?<!_)$/,
            message: "首尾不能为下划线",
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
            pattern: /^(?!\s+).*(?<!\s)$/,
            message: "首尾不能为空格",
            trigger: "blur",
          },
          {
            pattern: /^(?!_+).*(?<!_)$/,
            message: "首尾不能为下划线",
            trigger: "blur",
          },
          {
            pattern: /^(?![0-9]).*$/,
            message: "不能以数字开头",
            trigger: "blur",
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
      // this.$refs.tree_t.setCheckedKeys([]);
    },
    openDialog(row) {
      console.log(this.userEditForm, "001001");
      //  this.dialogFormVisible = true; // 让弹窗显示
      if (row) {
        this.initFormData = row;
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(row); // 为表单赋值
          console.log("我是编辑");
        });
        //查询菜单名字
        queryMenuAll().then((res) => {
          console.log(res, "res++++++++++");
          if (res && res.code && res.code === "00000") {
            this.tableData = res.data; // 表格数据赋值
            console.log(this.tableData, "----所有菜单---");
            let data = { records: [{ ...this.userEditForm }] };
            data.id = this.userEditForm.id;
            console.log(data, "---查询角色菜单data---------");
            // 查询 菜单当前是否选中
            queryRoleMenu(data).then((res) => {
              if (res && res.code && res.code === "00000") {
                console.log(res.data, "----查询角色菜单数据成功了");
                this.datas = res.data.menus;
                // 为选中的菜单赋值
                this.dialogFormVisible = true; // 让弹窗显示
                this.$nextTick(() => {
                  // 这个要加上
                  this.$refs.tree_n.setCheckedNodes(this.datas); //赋值
                });
              }
            });
          }
        });
      } else {
        console.log("我是新增");

        delete this.userEditForm.id;
        // -------
        // 查询菜单名字
        queryMenuAll().then((res) => {
          console.log(res, "res++++++++++");
          if (res && res.code && res.code === "00000") {
            this.dialogFormVisible = true; // 让弹窗显示
            this.$nextTick(() => {
              // 这个要加上
              this.tableData = res.data; // 表格数据赋值
            });
            console.log(this.tableData, "----所有菜单---");
          }
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
    // 取消
    dialogClose() {
      this.dialogFormVisible = false;
      this.userEditForm.id = "";
      this.$refs.tree_n.setCheckedKeys([]);
      console.log(this.userEditForm, "关闭弹窗");
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
        console.log(this.initFormData, "----保存de 内容");
        // 修改
        this.$refs["userEditRef"].validate((valid) => {
          console.log(valid, "修改的valid");
          if (valid) {
            console.log(this.userEditForm, "---修改传递的内容111111111----");
            updateRole(this.userEditForm, this.userEditForm.id).then((res) => {
              console.log(res, "-----------角色菜单名称修改");
              if (res && res.code && res.code === "00000") {
                this.dialogClose();
                this.$parent.queryRoles();
              }
            });
            (this.userEditForm.menus = this.$refs.tree_n.getCheckedNodes()),
              // (this.userEditForm.menus = Array.from(this.userEditForm.menus));
              console.log(
                this.userEditForm,
                this.userEditForm.menus,
                "---修改传递的内容22222222----"
              );
            updateRoleMenu(this.userEditForm).then((res) => {
              console.log(res, "-----------角色菜单权限修改");
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
        this.$refs["userEditRef"].validate((valid) => {
          if (valid) {
            (this.userEditForm.menus = this.$refs.tree_n.getCheckedNodes()),
              // (this.userEditForm.menus = Array.from(this.userEditForm.menus));
              console.log(
                this.userEditForm,
                this.userEditForm.menus,
                "---增加传递的内容22222222----"
              );
            addRole(this.userEditForm, this.userEditForm.id).then((res) => {
              console.log(res, "增加了...res11111");
              if (res && res.code && res.code === "00000") {
                console.log("成功增加--用户！");
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
    width: 120px;
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
  text-align: center;
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
</style>