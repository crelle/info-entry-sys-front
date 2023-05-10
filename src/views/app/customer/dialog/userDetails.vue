<template>
  <div>
    <el-dialog
    :modal="false"
      :title="toChild"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
      lock-scroll
    >
      <div class="register_form_main">
        <el-row style="height: 100%">
          <el-col :span="24">
            <div class="grid-content-right">
              <el-form :model="clientEditForm" ref="userEditRef" size="mini">
                <div class="userbox">
                  <ul class="lis">
                    <li>
                      <span>客户名:</span
                      ><span :title="clientEditForm.name">{{
                        clientEditForm.name
                      }}</span>
                    </li>
                    <li>
                      <span>地域:</span
                      ><span>{{ clientEditForm.regionName }}</span>
                    </li>
                    <li>
                      <span>办公地点:</span
                      ><span :title="clientEditForm.address">{{
                        clientEditForm.address
                      }}</span>
                    </li>
                    <li>
                      <span>负责人:</span><span>{{ clientEditForm.userName }}</span>
                    </li>
                    <li>
                      <span>手机号:</span
                      ><span :title="clientEditForm.cellPhone">{{
                        clientEditForm.cellPhone
                      }}</span>
                    </li>
                    <li>
                      <span>邮箱:</span
                      ><span :title="clientEditForm.email">{{
                        clientEditForm.email
                      }}</span>
                    </li>
                    <li class="new">
                      <span>介绍:</span
                      ><span :title="clientEditForm.introduce">{{
                        clientEditForm.introduce
                      }}</span>
                    </li>
                  </ul>
                  <div>
                    <el-tabs v-model="activeName" >
                      <el-tab-pane label="客户项目" name="first">
                        <el-table
                          :data="customerProjectData"
                          height="311"
                          style="width: 100%"
                        >
                          <el-table-column
                            label="序号"
                            type="index"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="项目"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="departmentName"
                            label="所属部门"
                          >
                          </el-table-column>
                          <el-table-column prop="interfaceName" label="接口人">
                          </el-table-column>
                          <el-table-column prop="status" label="项目状态">
                          </el-table-column>
                          <el-table-column prop="psonstatus" label="项目人数">
                          </el-table-column>
                          <el-table-column prop="gap" label="项目缺口">
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
// 项目
import { queryProject } from "@/api/project";
export default {
  props: {
    toChild: String,
  },
  data() {
    return {
      // 假数据
      customerProjectData: [],

      // 假数据
      activeName: "first",
      dialogFormVisible: false,
      clientEditForm: {
        address: "",
        cellPhone: "",
        customerId: "",
        name: "",
        email: "",
        introduce: "",
        regionId: "",
        userName: "",
        regionName: "",
      },
      initFormData: {},
    };
  },
  methods: {
    openDialog(row) {
      console.log(row, "001001");
      this.dialogFormVisible = true; // 让弹窗显示
      // customerProjectData
      this.customerProjectData = [];
      if (row) {
        console.log(row.id,'----------------------id====');
        this.initFormData = row;
        this.projectList()
        this.$nextTick(() => {
          // 这个要加上
          this.initForm(this.initFormData); // 为表单赋值
        });
      }
      
    },
    initForm(data) {
      Object.keys(this.clientEditForm).forEach((item) => {
        this.clientEditForm[item] = data[item] ? data[item] : null;
      });
    },
    projectList(){
      queryProject({
        current: 1,
        size: 999999,
        records:[{}]
      }).then((res) => {
        if (res && res.code && res.code === "00000") {
          res.data.records.forEach((item) => {
          if (this.initFormData.id == item.customerId) {
            this.customerProjectData.push(item);
            console.log(this.customerProjectData,'11111111');
          }
        });
        }
      });
    },
    // 确定
    dialogClose() {
      this.dialogFormVisible = false;
      console.log(this.clientEditForm, "确定231确定3131");
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initForm(this.clientEditForm);
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
::v-deep .el-dialog__body {
  padding: 0 20px;
}
.lis {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 50%;
    margin: 10px 0;
    display: flex;
    span {
      display: block;
    }
    span:nth-child(1) {
      min-width: 70px;
    }
    span:nth-child(2) {
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; /* 超出几行省略 */
    }
  }
  .new {
    width: 100%;
    span:nth-child(1) {
      display: block;
      width: 70px;
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
}
::v-deep .el-dialog {
  margin-top: 10vh !important;
}
.textarea {
  ::v-deep .el-textarea__inner {
    height: 100px;
    line-height: 30px;
  }
}
::v-deep .el-dialog__footer {
  padding: 20px 0;
}
::v-deep .el-textarea__inner {
  font-size: 14px;
  font-family: "微软雅黑";
}
::v-deep .el-form-item__label {
  min-width: 44px;
}
::v-deep .el-dialog {
  min-width: 450px;
}
</style>