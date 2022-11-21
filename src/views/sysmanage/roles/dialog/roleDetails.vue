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
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form :model="userEditForm" ref="userEditRef" size="mini">
                <div class="regionbox">
                  <ul>
                    <li>
                      <span>角色名称 : </span>
                      <span>{{ userEditForm.nameZh }}</span>
                    </li>
                  </ul>
                  <span>角色权限配置</span>
                  <div class="aaa">
                    <div class="configuration">
                      <div class="sbox">
                        <span>菜单权限</span>
                        <div class="menubox">
                          <el-tree
                            :data="data2"
                            :props="defaultProps"
                            default-expand-all
                            @node-click="handleNodeClick"
                          ></el-tree>
                        </div>
                      </div>
                      <div class="sbox">
                        <span>数据权限</span>
                        <div class="menubox">
                          <el-tree
                            :data="data1"
                            :props="defaultProps"
                            default-expand-all
                            @node-click="handleNodeClick"
                          ></el-tree>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <el-form-item class="dialog-footer">
                  <el-button type="primary" @click="dialogClose" size="mini"
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
      defaultProps: {
        children: "children",
        label: "label",
      },
      //
      dialogFormVisible: false,
      fileType: {
        fileType: 0,
      },
      imageUrl: "",
      nowIndex: -1,
      // baseURL: BaseURL,
      userEditForm: {
        nameZh: "",
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
    handleNodeClick(data) {
      console.log(data);
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
        font-size: 14px;
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
::v-deep .el-dialog__body{
  padding: 0;
}
</style>