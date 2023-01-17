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
              <el-form :model="userEditForm" ref="userEditRef" size="mini">
                <div class="userbox">
                  <ul class="lis">
                    <li>
                      <span>项目名称:</span
                      ><span>{{ initFormData.project }}</span>
                    </li>
                    <li>
                      <span>项目人数:</span
                      ><span>{{ initFormData.number }} 人</span>
                    </li>
                    <li>
                      <span>所属部门:</span
                      ><span>{{ initFormData.department }}</span>
                    </li>
                    <li>
                      <span>客户:</span
                      ><span>{{ initFormData.customerName }}</span>
                    </li>
                    <li>
                      <span>接口人:</span
                      ><span>{{ initFormData.interfaceName }}</span>
                    </li>
                    <li>
                      <span>地域:</span
                      ><span>{{ initFormData.regionName }}</span>
                    </li>
                    <li>
                      <span>电话:</span
                      ><span>{{ initFormData.cellPhone }}</span>
                    </li>
                    <li>
                      <span>邮箱:</span><span>{{ initFormData.email }}</span>
                    </li>

                    <li>
                      <span>立项时间:</span
                      ><span>{{ initFormData.updateTime }}</span>
                    </li>
                    <li>
                      <span>合作模式:</span
                      ><span>{{ initFormData.cooperation }}</span>
                    </li>
                    <li>
                      <span>当前状态:</span
                      ><span>{{ initFormData.status }}</span>
                    </li>
                    <li class="new">
                      <span>介绍:</span
                      ><span :title="initFormData.introduce">{{ initFormData.introduce }}</span>
                    </li>
                  </ul>
                  <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="项目人员" name="first">
                        <el-table
                          :data="tableData1"
                          border
                          height="311"
                          style="width: 100%"
                        >
                          <el-table-column
                            label="序号"
                            type="index"
                            :index="indexMethod"
                            width="50"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="jobNo"
                            label="工号"
                            width="110"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="人员姓名"
                            width="80"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="cellPhone"
                            label="联系方式"
                            width="120"
                          >
                          </el-table-column>
                          <el-table-column prop="regionName" label="地域">
                          </el-table-column>
                          <el-table-column prop="postName" label="岗位">
                          </el-table-column>
                          <el-table-column prop="" label="状态">
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
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    toChild: String,
    tableDatastaff: "",
    //地域
    MockUser: "",
  },
  data() {
    return {
      // 项目对应的员工数据
      tableData1: [],
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
        id: "",
        name: "",
        gender: "",
        cell_phone: "",
        Email: "",
        customer: "",
        status: "",
        department: "",
        project: "",
        address: "",
        createTime: "",
        cooperation: "",
        number: "",
        introduce: "",
      },
      initFormData: {
        number: "",
      },
    };
  },
  methods: {
    // 表格
    handleClick(tab, event) {
      console.log(tab, event);
    },

    openDialog(row) {
      // 修改时间格式
      row.updateTime = row.updateTime.split("T")[0];
      // console.log(this.userEditForm, "001001");
      this.tableData1 = [];
      this.dialogFormVisible = true; // 让弹窗显示

      if (row) {
        this.initFormData = row;
        // console.log(this.tableDatastaff, "-----------员工全部");
        // 根据项目 id  查找 员工 赋值给 tableData1
        this.tableDatastaff.forEach((item) => {
          // console.log(item.projectId, item.project, "----员工----");
          if (this.initFormData.projectId == item.projectId) {
            // console.log(item.projectId, item.project, "同项目的id---");
            this.tableData1.push(item);
          }
        });
        // 根据传来的地域  id  查找 地域 赋值给
        this.MockUser.forEach((item) => {
          console.log(item, "----地域----");
          if (this.initFormData.regionId == item.regionId) {
            // console.log(item.regionId, item.regionId, "同地域的id---");
            this.initFormData.regionName = item.regionName;
          }
        });

        console.log(this.tableData1, "--对应的--员工表--");
        this.initFormData.number = this.tableData1.length;
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
      console.log(this.userEditForm, "确定 ");
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
    indexMethod(index) {
      return index + 1;
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
::v-deep .el-dialog__body {
  margin: 0 40px;
  padding: 0 40px;
}
.lis {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 395px;
    margin: 10px 0;
    display: flex;
    span {
      display: block;
    }
    span:nth-child(1) {
      width: 115px;
    }
  }
  .new {
    width: 100%;
    span:nth-child(1) {
      display: block;
      width: 110px;
    }
    span:nth-child(2) {
      width: 660px;
      line-height: 20px;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* 超出几行省略 */
    }
  }
}
::v-deep .el-table {
  font-size: 12px;
}
.dialog-footer {
  text-align: center;
  margin-top: 20px;
}
::v-deep .el-dialog {
  margin-top: 10vh !important;
}
::v-deep .el-textarea__inner {
  margin: 15px 0;
  color: #606266;
  font-size: 14px;
  font-family: "微软雅黑";
}
</style>