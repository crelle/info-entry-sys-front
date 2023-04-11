<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>接口人管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        :model="formOptions"
        class="demo-form-inline"
        size="mini"
        ref="userQueryRef"
        label-position="right"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="接口人" prop="interfaceName">
              <el-input
                v-model="formOptions.interfaceName"
                placeholder="接口人姓名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="客户" prop="customerId">
              <el-select
                v-model="formOptions.customerId"
                placeholder="请选择客户名称"
                clearable
                filterable
              >
                <el-option
                  v-for="item in tableCustomer"
                  :key="item.index"
                  :label="item.customerName"
                  :value="item.customerId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="14"
            :class="
              Object.keys(formOptions).length % 3 === 0
                ? 'nextline_action_button_content'
                : Object.keys(formOptions).length % 3 === 1
                ? 'inline2_action_button_content'
                : 'inline1_action_button_content'
            "
          >
            <el-form-item>
              <el-button type="primary" @click="resetForm('userQueryRef')"
                >重置</el-button
              >
              <el-button type="primary" @click="queryUserListclick"
                >查询</el-button
              >
              <el-button type="primary" @click="addClick">新增</el-button>
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
        @selection-change="handleSelectionChange"
        border
        stripe
        size="mini"
        height="550"
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
          prop="interfaceName"
          label="接口人"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          min-width="50"
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
          prop="email"
          label="邮箱"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="客户名"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="210">
          <template slot-scope="{ row, $index }">
            <el-button @click="detailsClick(row)" type="primary" size="mini"
              >查看</el-button
            >
            <el-button @click="handleClick(row)" type="primary" size="mini"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="deleteMenu(row, $index)"
            >
              删除
            </el-button>
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
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationOptions.total"
          size="mini"
        >
        </el-pagination>
      </div>
    </el-card>
    <user-edit-dialog
      :toChild="list"
      :tableData="tableData"
      :tableCustomer="tableCustomer"
      ref="userEditDialogRef"
    ></user-edit-dialog>
    <user-dait-dialog
      :toChild="list"
      :tableDataProject="tableDataProject"
      ref="userDaitDialogRef"
    ></user-dait-dialog>
  </div>
</template>

<script>
// 客户查询
import { queryCustomer } from "@/api/customer";
// 地域
import { queryRegion } from "@/api/region";
// 部门
import { queryDepartments } from "@/api/department";
// 项目
import { queryProject } from "@/api/project";
// 接口人表/删除
import { queryInterface, deletesInterface } from "@/api/interface";
import UserEditDialog from "@/views/app/interface/dialog/userEdit.vue";
import UserDaitDialog from "@/views/app/interface/dialog/userDetails.vue";
export default {
  components: {
    UserEditDialog,
    UserDaitDialog,
  },
  data() {
    return {
      list: "",
      formOptions: {
        address: "",
        cellPhone: "",
        customerId: "",
        email: "",
        gender: "",
        interfaceId: "",
        interfaceName: "",
        introduce: "",
      },
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
      },
      tableData: [],
      tableCustomer: [],
      multipleSelection: [],
      // 全部项目
      tableDataProject: [],
    };
  },
  mounted() {
    this.queryUserList();
    this.queryProject();
    // this.queryCustomerList();
  },
  methods: {
    //  查询全部项目
    queryProject() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = 1;
          data.size = 999;
          // 项目表格数据
          queryProject(data).then((res) => {
            // //  数据接口人查询方法
            queryInterface(data).then((res1) => {
              // 部门表格数据
              queryDepartments(data).then((res2) => {
                // 地域表格数据
                queryRegion(data).then((res3) => {
                  // 客户表格数据
                  queryCustomer(data).then((res4) => {
                    this.tableDataProject = res.data.records; // 项目表格数据赋值
                    this.InterfaceProject = res1.data.records; // 接口人表格数据赋值
                    this.UsersProject = res2.data.records; // 部门表格数据赋值
                    this.MockUserProject = res3.data.records; // 地域表格数据赋值
                    this.tableCustomerProject = res4.data.records; // 客户表格数据赋值
                    // console.log(this.Users, "部门表格数据");
                    // console.log(this.Interface, "接口人表格数据");
                    console.log(
                      this.tableDataProject,
                      "------全部项目表格数据"
                    );
                    this.tableDataProject.forEach((item) => {
                      if (item.status == 1) {
                        item.status = "开发中";
                      }
                      if (item.status == 2) {
                        item.status = "前期投入";
                      }
                      if (item.status == 3) {
                        item.status = "交付阶段";
                      }
                      // 接口人表格
                      this.InterfaceProject.forEach((sitem) => {
                        if (item.interfaceId == sitem.interfaceId) {
                          item.interfaceName = sitem.interfaceName;
                          item.cellPhone = sitem.cellPhone;
                          item.email = sitem.email;
                          // 客户
                          this.tableCustomerProject.forEach((items) => {
                            if (sitem.customerId == items.customerId) {
                              item.customerName = items.customerName;
                              item.customerId = items.customerId;
                            }
                          });
                        }
                        // 部门表格
                        this.UsersProject.forEach((itemis) => {
                          if (item.departmentId == itemis.departmentId) {
                            item.department = itemis.department;
                          }
                          if (sitem.customerId == itemis.customerId) {
                            item.customerName = itemis.customerName;
                          }
                        });
                      });
                    });
                    // this.paginationOptions.total = res.data.total; // 分页器赋值
                  });
                });
              });
            });
          });
        } else {
          return false;
        }
      });
    },
    //手动 查询接口人
    queryUserListclick() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          this.paginationOptions.pageNo = 1;
          this.queryUserList();
        } else {
          return false;
        }
      });
    },
    // 查询接口人列表
    queryUserList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          // 接口人表
          queryInterface(data).then((res) => {
            data.current = 1;
            data.size = 999;
            // 客户表
            queryCustomer(data).then((res1) => {
              this.tableData = res.data.records; // 接口人表格数据赋值
              this.tableCustomer = res1.data.records; //客户表格数据赋值
              this.tableData.forEach((item) => {
                this.tableCustomer.forEach((sitem) => {
                  if (item.customerId == sitem.customerId) {
                    item.customerName = sitem.customerName;
                  }
                });
              });
              this.paginationOptions.total = res.data.total; // 分页器赋值
            });
          });
        } else {
          return false;
        }
      });
    },
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该接口人, 是否继续?", "删除接口人", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 点击确认，发起后台请求，删除该接口人
          deletesInterface(row.interfaceId).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除该接口人");
            if (res.code == "00000") {
              return this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            // else {
            //   this.$message({
            //     type: "success",
            //     message: "删除失败!",
            //   });
            // }
          });
        })
        .catch(() => {
          // 点击取消，取消该操作
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加
    addClick() {
      this.$refs.userEditDialogRef.openDialog();
      this.list = "添加接口人";
      console.log("我要添加");
    },
    // 编辑
    handleClick(row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑接口人信息";
      console.log("编辑", row);
    },
    // 详情
    detailsClick(row) {
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看接口人详情";
      console.log("详情", row);
    },
    // 重置表单
    resetForm(formName) {
      console.log("重置-------", formName);
      this.$refs[formName].resetFields();
    },
    // 表格复选动作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页器 页容量变更行为
    handleSizeChange(val) {
      this.paginationOptions.pageSize = val;
      this.queryUserList();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryUserList();
    },
    indexMethod(index) {
      return (
        (this.paginationOptions.pageNo - 1) * this.paginationOptions.pageSize +
        index +
        1
      );
    },
  },
};
</script>
<style lang='less'>
.btn-custom-cancel {
  float: right;
  margin-left: 10px;
}
</style>
<style lang="less" scoped>
::v-deep .cell {
  text-align: center;
  line-height: 36.9px;
}
::v-deep .el-col-14 {
  text-align: right;
}
::v-deep .el-col-5 {
  min-width: 253px;
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
  width: 253px;
}
.demo-form-inline {
  min-width: 1300px;
}
@media screen and (min-width: 1600px) {
  ::v-deep .el-card__body::-webkit-scrollbar {
    display: none;
  }
}
::v-deep .el-card__body {
  overflow-x: scroll;

  .el-form-item--mini.el-form-item {
    margin-bottom: 0;
  }
}
</style>