<template>
  <div class="department_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card-container">
      <el-card :body-style="{ paddingTop: '60px', paddingBottom: '0px' }">
        <el-form
          :inline="true"
          :model="formOptions"
          class="demo-form-inline"
          size="mini"
          ref="departmentQueryRef"
          label-position="right"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="部门名称" prop="name">
                <el-input
                  v-model="formOptions.name"
                  placeholder="请输入部门名称"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="19"
              :class="
                Object.keys(formOptions).length % 3 === 0
                  ? 'nextline_action_button_content'
                  : Object.keys(formOptions).length % 3 === 1
                  ? 'inline2_action_button_content'
                  : 'inline1_action_button_content'
              "
            >
              <el-form-item>
                <el-button
                  class="header-btn"
                  type="primary"
                  @click="resetForm('departmentQueryRef')"
                >
                  <img
                    src="../../../assets/img/globalTable/icon2-reset.png"
                    alt=""
                  />
                  重置</el-button
                >
                <el-button
                  class="header-btn"
                  type="primary"
                  @click="queryDepartmentListclick"
                >
                  <img
                    src="../../../assets/img/globalTable/icon1-search.png"
                    alt=""
                  />
                  查询
                </el-button>
                <el-button class="header-btn" type="primary" @click="addClick">
                  <img
                    src="../../../assets/img/globalTable/icon3-add.png"
                    alt=""
                  />
                  新增</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          stripe
          size="mini"
          :height="tableHeight"
        >
          <el-table-column
            label="序号"
            type="index"
            :index="indexMethod"
            width="55"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="部门名"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="负责人"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="jobNo"
            label="工号"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cellPhone"
            label="手机号"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="address"
            label="部门总部地址"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="parentName"
            label="上级部门"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="retained"
            label="留存率"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="210">
            <template slot-scope="{ row, $index }">
              <span
                class="operate-btn"
                @click="detailsClick(row)"
                type="primary"
                size="mini"
                >查看</span
              >
              <span
                v-loading.fullscreen.lock="fullscreenLoading"
                class="operate-btn"
                @click="handleClick(row)"
                type="primary"
                size="mini"
                >编辑</span
              >
              <span
                class="operate-btn"
                type="primary"
                size="mini"
                @click="deleteMenu(row, $index)"
              >
                删除
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationOptions.pageNo"
            :page-sizes="paginationOptions.pageSizes"
            :page-size="paginationOptions.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="paginationOptions.total"
            size="mini"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <user-edit-dialog
      :toChild="list"
      :UserData="UserData"
      :tableDataUp="tableDataUp"
      ref="userEditDialogRef"
    ></user-edit-dialog>
    <user-dait-dialog
      :toChild="list"
      ref="userDaitDialogRef"
    ></user-dait-dialog>
  </div>
</template>
<script>
// 部门
import { queryDepartments, deletesDepartments } from "@/api/department";
// 用户
import { queryUser } from "@/api/user";
import UserEditDialog from "@/views/app/department/dialog/departmentEdit.vue";
import UserDaitDialog from "@/views/app/department/dialog/departmentDetails.vue";
export default {
  components: {
    UserEditDialog,
    UserDaitDialog,
  },
  data() {
    return {
      // 懒加载
      fullscreenLoading: false,
      tableHeight: window.innerHeight >= 908 ? 550 : window.innerHeight - 418,
      list: "",
      formOptions: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
        username: "",
        department: "",
      },
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
      },
      tableData: [],
      tableDataUp: [],
      UserData: [],
    };
  },
  mounted() {
    this.queryDepartmentList();
  },
  methods: {
    //手动 查询部门列表
    queryDepartmentListclick() {
      this.$refs["departmentQueryRef"].validate((valid) => {
        if (valid) {
          this.paginationOptions.pageNo = 1;
          this.queryDepartmentList();
        } else {
          return false;
        }
      });
    },
    // 查询部门列表
    queryDepartmentList() {
      this.$refs["departmentQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          queryDepartments(data).then((res) => {
            if (res && res.code && res.code === "00000") {
              console.log(res.data.records, "--------------初始查询部门");
              this.tableData = res.data.records;
              this.paginationOptions.total = res.data.total; // 分页器赋值
            }
          });
        } else {
          return false;
        }
      });
    },
    //
    // 查询全部部门列表
    async queryDepartmentListUp() {
      // this.$refs["departmentQueryRef"].validate(async(valid) => {
      //   if (valid) {
      let data = { records: [{ ...this.formOptions }] };
      data.current = 1;
      data.size = 99999;
      console.log("qqqqqqqqqqqqq");
      let res = await queryDepartments(data);
      console.log(res.data.records, "--------------上级查询部门");
      if (res && res.code && res.code === "00000") {
        this.tableDataUp = res.data.records;
      }
      //   } else {
      //     return false;
      //   }
      // });
    },
    // 查询全部用户列表
    async queryUser() {
      let data = { records: [{ ...this.formOptions }] };
      data.current = 1;
      data.size = 99999;
      let res = await queryUser(data);
      if (res && res.code && res.code === "00000") {
        this.UserData = res.data.records; // 表格数据赋值
        console.log(this.UserData, " // 真的查询用户列表");
      }
    },
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该部门, 是否继续?", "删除部门", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
        modal: false,
      }).then(() => {
        this.tableData.splice(index, 1);
        // 点击确认，发起后台请求，删除该用户
        deletesDepartments(row.id).then((res) => {
          console.log(res, "点击确认，发起后台请求，删除该部门");
          if (res && res.code && res.code === "00000") {
            this.queryDepartmentList();
            return this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "success",
              message: "删除失败!",
            });
          }
        });
      });
    },
    // 添加
    addClick() {
      this.queryUser();
      this.queryDepartmentListUp();
      this.$refs.userEditDialogRef.openDialog();
      this.list = "添加部门";
      console.log("我要添加");
    },
    // 编辑
    async handleClick(row) {
      const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      await this.queryUser();
      await this.queryDepartmentListUp();
      console.log("编辑1111", row, row.departmentId);
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑部门信息";
      loading.close();
    },
    // 详情
    detailsClick(row) {
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看部门详情";
      console.log("详情", row, row.id);
    },
    // 重置表单
    resetForm(formName) {
      console.log("重置-------", formName);
      this.$refs[formName].resetFields();
      this.queryDepartmentListclick();
    },
    // 分页器 页容量变更行为
    handleSizeChange(val) {
      this.paginationOptions.pageSize = val;
      this.queryDepartmentList();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryDepartmentList();
    },
    indexMethod(index) {
      return (
        (this.paginationOptions.pageNo - 1) * this.paginationOptions.pageSize +
        index +
        1
      );
    },
    // 懒加载
  },
};
</script>
<style lang="less" scoped>
::v-deep .cell {
  text-align: center;
  line-height: 36.9px;
}
::v-deep .el-col-19 {
  text-align: right;
}
.el-form--inline .el-form-item {
  margin-right: 0;
}
::v-deep .el-card__body {
  .el-form-item--mini.el-form-item {
    margin-bottom: 0;
  }
}
.el-breadcrumb {
  margin-bottom: 25px;
}
::v-deep .el-pagination {
  margin: 10px 0;
}
::v-deep .el-form-item__label {
  margin-right: 5px;
}
.el-form-item {
  width: 280px;
}
@media screen and (min-width: 800px) {
  ::v-deep .el-card__body::-webkit-scrollbar {
    display: none;
  }
}
::v-deep .el-card__body {
  .el-form-item--mini.el-form-item {
    margin-bottom: 0;
  }
}
</style>

