<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
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
            <el-form-item label="客户" prop="customerName">
              <el-input
                v-model="formOptions.customerName"
                placeholder="请填写客户名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="地域" prop="regionId">
              <el-select
                v-model="formOptions.regionId"
                placeholder="请选择地域名称"
                clearable
                filterable
              >
                <el-option
                  v-for="item in regionData"
                  :key="item.index"
                  :label="item.regionName"
                  :value="item.regionId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="负责人" prop="userId">
              <el-select
                v-model="formOptions.userId"
                placeholder="请选择负责人名称"
                clearable
                filterable
              >
                <el-option
                  v-for="item in UserList"
                  :key="item.index"
                  :label="item.username"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="9"
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
          prop="customerName"
          label="客户"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="regionName"
          label="地域"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="办公地点"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="userId"
          label="负责人"
          min-width="80"
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
      :UserList="UserList"
      :regionData="regionData"
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
//
// 客户查询
import { queryCustomer, deletesCustomer } from "@/api/customer";
// 地域
import { queryRegion } from "@/api/region";
// 接口人
import { queryInterface } from "@/api/interface";
// 部门
import { queryDepartments } from "@/api/department";
// 项目
import { queryProject } from "@/api/project";
// 用户
import { queryUser } from "@/api/user";
import UserEditDialog from "@/views/discipline/customer/dialog/userEdit.vue";
import UserDaitDialog from "@/views/discipline/customer/dialog/userDetails.vue";
export default {
  components: {
    UserEditDialog,
    UserDaitDialog,
  },
  data() {
    return {
      list: "",
      formOptions: {
        accountNonExpired: true,
        accountNonLocked: true,
        enabled: true,
        userPhone: "",
        username: "",
      },
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
      },
      tableData: [],
      // 地域
      regionData: [],
      // 用户
      UserList: [],
      multipleSelection: [],
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
      },
      // 全部项目
      tableDataProject: [],
      // 验证
      rules: {},
    };
  },
  mounted() {
    this.queryUserList();
    this.queryProject();
  },
  methods: {
    // 手动 查询客户列表
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
    // 客户列表
    queryUserList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          queryCustomer(data).then((res) => {
            data.current = 1;
            data.size = 999;
            // 地域数据
            queryRegion(data).then((res2) => {
              // 用户列表
              queryUser(data).then((res3) => {
                this.tableData = res.data.records; // 客户表格数据赋值
                this.regionData = res2.data.records; // 地域表格数据赋值
                console.log(this.regionData, "*--地域表--");
                this.UserList = res3.data.records; // 用户表格数据赋值
                console.log(this.UserList, "=========用户表格数据赋值");
                // --- 过滤掉管理员admin
                // this.UserList.forEach((item, index) => {
                //   if (item.id == "e943a05d2204c5dfc244ef2ba21d9170") {
                //     this.UserList.splice(index, 1);
                //   }
                // });
                this.tableData.forEach((item) => {
                  this.regionData.forEach((items) => {
                    if (item.regionId == items.regionId) {
                      item.regionName = items.regionName;
                      // this.$set(item, item.regionName, items.regionName);
                    }
                  });
                });
                console.log(this.tableData, "客户数据");
                this.paginationOptions.total = res.data.total; // 分页器赋值
              });
            });
          });
        } else {
          return false;
        }
      });
    },
    //  全部项目数据
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
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该客户, 是否继续?", "删除客户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 点击确认，发起后台请求，删除该用户
          deletesCustomer(row.customerId).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除");
            if (res.code == "00000") {
              this.queryUserList();
              return this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            //  else {
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
      this.list = "添加客户";
      console.log("我要添加");
    },
    // 编辑
    handleClick(row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑客户信息";
      console.log("编辑", row);
    },
    // 详情
    detailsClick(row) {
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看客户详情";
      console.log("详情", row);
    },
    // 重置表单
    resetForm(formName) {
      console.log("重置-------", formName);
      this.$refs[formName].resetFields();
      // this.queryUserList();
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
::v-deep .el-col-9 {
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
  width: 254px;
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

