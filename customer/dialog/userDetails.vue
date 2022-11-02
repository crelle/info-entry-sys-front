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
                <div class="userbox">
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>需求管理</el-breadcrumb-item>
                    <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                    <el-breadcrumb-item>详情</el-breadcrumb-item>
                  </el-breadcrumb>
                  <ul class="lis">
                    <li>
                      <span>客户名:</span
                      ><span>{{ userEditForm.username }}</span>
                    </li>
                    <li><span>地域:</span><span>zzqqqzz</span></li>
                    <li><span>办公地点:</span><span>xxyyx</span></li>
                    <li>
                      <span>接口人:</span
                      ><span>{{ userEditForm.userNickName }}</span>
                    </li>
                    <li>
                      <span>手机号:</span
                      ><span>{{ userEditForm.userPhone }}</span>
                    </li>
                    <li>
                      <span>邮箱:</span
                      ><span>{{ userEditForm.userEmail }}</span>
                    </li>

                    <li>
                      <span>介绍:</span>
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea"
                      >
                      </el-input>
                    </li>
                  </ul>
                  <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="客户项目" name="first">
                        <el-table :data="tableData1" border style="width: 100%">
                          <el-table-column
                            prop="number"
                            label="编号"
                            width="50"
                          >
                          </el-table-column>
                          <el-table-column prop="date" label="项目" width="180">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="项目人数"
                            width="180"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="contact"
                            label="所属部门"
                            width="180"
                          >
                          </el-table-column>
                          <el-table-column prop="person" label="接口人">
                          </el-table-column>
                           <el-table-column prop="project" label="项目状态">
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogClose" size="mini"
          >确 定</el-button
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
      // 假数据
      tableData1: [
        {
          number: "1",
          date: "n20160502项目",
          name: "32",
          contact: "研发1部",
          project: "开发中",
          person: "aaa",
        },
        {
          number: "2",
          date: "n20160504项目",
          name: "24",
          contact: "研发2部",
          project: "维护中",
          person: "bbb",
        },
        {
          number: "3",
          date: "n20160501项目",
          name: "55",
          contact: "研发3部",
          project: "暂停中",
          person: "ccc",
        },
        {
          number: "4",
          date: "n20160503项目",
          name: "43",
          contact: "研发4部",
          project: "上线中",
          person: "ddd",
        },
      ],
   
      // 假数据
      activeName: "first",
      textarea:
        "诚迈科技（南京）股份有限公司（300598.SZ）成立于2006年，总部位于南京，专注于智能互联与操作系统技术的研发与创新，致力于成为全球领先的智能科技专家，以科技造福人类",
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
  methods: {
    // 表格
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
    padding: 20px 0;
    color: #409eff;
    background-color: #383f49;
    text-shadow: 0 1px -3px #409eff;
  }
}
::v-deep .cell {
  text-align: center;
}
.lis{
  padding: 0;
}
</style>