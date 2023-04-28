<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        :model="formOptions"
        class="demo-form-inline"
        size="mini"
        ref="userQueryRef"
        label-position="left"
      >
        <el-row>
          <el-col :span="7">
            <el-form-item label="项目名称" prop="name">
              <el-input
                v-model="formOptions.name"
                placeholder="项目名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="7">
            <el-form-item label="客户" prop="customer">
              <el-select
                v-model="formOptions.customer"
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
          </el-col> -->
          <el-col :span="7">
            <el-form-item label="客户" prop="customer">
              <el-select
                v-model="formOptions.customer"
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

          <el-col :span="6">
            <el-form-item label="地域" prop="regionId">
              <el-select
                v-model="formOptions.regionId"
                placeholder="请选择地域"
                clearable
                filterable
              >
                <el-option
                  v-for="item in MockUser"
                  :key="item.index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4" class="btn">
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
        <el-row class="searchinpt">
          <el-col :span="7">
            <el-form-item label="项目状态" prop="status">
              <el-select
                v-model="formOptions.status"
                clearable
                placeholder="请选择"
              >
                <el-option label="前期投入" value="1"></el-option>
                <el-option label="开发中" value="2"></el-option>
                <el-option label="交付阶段" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="接口人" prop="interfaceId">
              <el-select
                v-model="formOptions.interfaceId"
                placeholder="请选择接口人姓名"
                clearable
                filterable
              >
                <el-option
                  v-for="item in Interface"
                  :key="item.index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属部门" prop="departmentId">
              <el-select
                v-model="formOptions.departmentId"
                placeholder="所属部门"
                clearable
                filterable
              >
                <el-option
                  v-for="item in department"
                  :key="item.index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
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
          prop="name"
          label="项目名称"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="interfaceName"
          label="接口人"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <!-- <el-table-column
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
        </el-table-column> -->
        <el-table-column
          prop="status"
          label="项目状态"
          show-overflow-tooltip
          min-width="80"
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
          prop="departmentName"
          label="所属部门"
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
      :Interface="Interface"
      :MockUser="MockUser"
      :department="department"
      :tableCustomer="tableCustomer"
      ref="userEditDialogRef"
    ></user-edit-dialog>
    <user-dait-dialog
      :toChild="list"
      :tableDatastaff="tableDatastaff"
      :MockUser="MockUser"
      ref="userDaitDialogRef"
    ></user-dait-dialog>
  </div>
</template>

<script>
// 客户查询
import { queryCustomer } from "@/api/customer";
// 地域
import { queryRegion } from "@/api/region";
// 接口人
import { queryInterface } from "@/api/interface";
// 部门
import { queryDepartments } from "@/api/department";
// 项目
import { queryProject, deletesProject } from "@/api/project";
// 员工
import { queryEmployeeManual } from "@/api/employee";
// 岗位
import { queryPost } from "@/api/post";
import UserEditDialog from "@/views/app/project/dialog/userEdit.vue";
import UserDaitDialog from "@/views/app/project/dialog/userDetails.vue";
export default {
  components: {
    UserEditDialog,
    UserDaitDialog,
  },
  data() {
    return {
      xmzt: "",
      list: "",
      formOptions: {
        interfaceId: "",
        cellPhone: "",
        email: "",
        customerName: "",
        cooperation: "",
        departmentId: "",
        interfaceId: "",
        introduce: "",
        name: "",
        regionId: "",
        status: "",
      },
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
      },
      tableData: [],
      Interface: [],
      MockUser: [],
      department: [],
      multipleSelection: [],
      tableCustomer: [],
      // 全部员工
      tableDatastaff: [],
    };
  },
  mounted() {
    this.queryUserList();
    // this.queryTableList();
    // this.queryMockUser();
    // this.queryUsers();
  },
  methods: {
    // 手动  数据拿取查询方法
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
    //  数据拿取查询方法
    queryUserList() {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          // 项目表格数据
          queryProject(data).then((res) => {
            // console.log(res.data,'----------手动----------');
            // data.current = 1;
            // data.size = 999;
            // // //  数据接口人查询方法
            queryInterface(data).then((res1) => {
              //   // 部门表格数据
              queryDepartments(data).then((res2) => {
                //     // 地域表格数据
                //     queryRegion(data).then((res3) => {
                //       // 客户表格数据
                //       queryCustomer(data).then((res4) => {
                this.tableData = res.data.records; // 项目表格数据赋值
                this.Interface = res1.data.records; // 接口人表格数据赋值
                this.department = res2.data.records; // 部门表格数据赋值
                // this.MockUser = res3.data.records; // 地域表格数据赋值
                // this.tableCustomer = res4.data.records; // 客户表格数据赋值
                console.log(this.department, "----部门表格数据");
                // console.log(this.Interface, "接口人表格数据");
                console.log(this.tableData, "------项目表格数据");
                this.tableData.forEach((item) => {
                  if (item.status == 1) {
                    item.status = "前期投入";
                  }
                  if (item.status == 2) {
                    item.status = "开发中";
                  }
                  if (item.status == 3) {
                    item.status = "交付阶段";
                  }
                  // // 接口人表格
                  // this.Interface.forEach((sitem) => {
                  //   if (item.interfaceId == sitem.interfaceId) {
                  //     item.interfaceName = sitem.name;
                  //     item.cellPhone = sitem.cellPhone;
                  //     item.email = sitem.email;
                  //     // 客户
                  //     this.tableCustomer.forEach((items) => {
                  //       if (sitem.customerId == items.customerId) {
                  //         item.customerName = items.customerName;
                  //         item.customerId = items.customerId;
                  //       }
                  //     });
                  //   }
                  //   // 部门表格
                  //   this.Users.forEach((itemis) => {
                  //     if (item.departmentId == itemis.departmentId) {
                  //       item.departmentName = itemis.name;
                  //     }
                  //     if (sitem.customerId == itemis.customerId) {
                  //       item.customerName = itemis.customerName;
                  //     }
                  //   });
                  // });
                });
                this.paginationOptions.total = res.data.total; // 分页器赋值
                // });
                //     });
              });
            });
          });
        } else {
          return false;
        }
      });
    },
    // 全部员工
    //table数据
    // queryTableList() {
    //   let data = { records: [{ ...this.formOptions }] };
    //   data.current = 1;
    //   data.size = 99999;
    //   queryEmployeeManual(data).then((res) => {
    //     if (res && res.code && res.code === "00000") {
    //       queryProject(data).then((res1) => {
    //         queryDepartments(data).then((res2) => {
    //           queryInterface(data).then((res3) => {
    //             queryRegion(data).then((res4) => {
    //               queryCustomer(data).then((res5) => {
    //                 //  数据岗位查询方法
    //                 queryPost(data).then((res6) => {
    //                   this.tableDatastaff = res.data.records; // 表格数据赋值
    //                   console.log(this.tableDatastaff, "员工表格数据赋值");
    //                   this.tableProjectstaff = res1.data.records; // 项目表格数据赋值
    //                   this.Usersstaff = res2.data.records; // 部门数据表格数据赋值
    //                   this.Interfacestaff = res3.data.records; // 接口人表格数据赋值
    //                   this.MockUserstaff = res4.data.records; // 地域数据表格数据赋值
    //                   this.tableCustomerstaff = res5.data.records; // 客户表格数据赋值
    //                   this.tableyPoststaff = res6.data.records; // 岗位表格数据赋值
    //                   this.tableDatastaff.forEach((item) => {
    //                     this.tableProjectstaff.forEach((items) => {
    //                       if (item.id == items.id) {
    //                         // console.log(items, "------------111");
    //                         item.name = items.name; //根据项目id给项目名称赋值
    //                         this.Usersstaff.forEach((itemli) => {
    //                           if (items.departmentId == itemli.departmentId) {
    //                             item.department = itemli.name; //根据项目id查找部门id给部门名称赋值
    //                           }
    //                         });
    //                         this.Interfacestaff.forEach((itemis) => {
    //                           if (items.interfaceId == itemis.interfaceId) {
    //                             item.interfaceName = itemis.name; //根据项目id查找接口人id给接口人名称赋值
    //                             this.tableCustomerstaff.forEach((itemiss) => {
    //                               if (itemis.customerId == itemiss.customerId) {
    //                                 item.customerName = itemiss.customerName; //根据接口人id 查找客户id给客户名称赋值
    //                               }
    //                             });
    //                           }
    //                         });
    //                         this.MockUserstaff.forEach((itemlis) => {
    //                           if (items.regionId == itemlis.regionId) {
    //                             item.regionName = itemlis.regionName; //根据项目id查找区域id给区域名称赋值
    //                           }
    //                         });
    //                       }
    //                     });
    //                     this.tableyPoststaff.forEach((itemls) => {
    //                       if (item.postId == itemls.postId) {
    //                         item.postName = itemls.postName; //根据项目id查找岗位id给岗位名称赋值
    //                         item.postId = itemls.postId; //根据项目id查找岗位id给岗位名称赋值
    //                       }
    //                     });
    //                   });
    //                 });
    //               });
    //             });
    //           });
    //         });
    //         // this.paginationOptions.total = res.data.total; // 分页器赋值
    //       });
    //     }
    //   });
    // },
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "删除项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          console.log(row, "删除--------");
          // 点击确认，发起后台请求，删除该用户
          deletesProject(row.id).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除");
            if (res.code == "00000") {
              this.queryUserList();
              return this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            // else {
            //   this.queryUserList();
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
      this.list = "添加项目";
      console.log("我要添加");
    },
    // 编辑
    handleClick(row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑项目信息";
      console.log("编辑-------", row);
    },
    // 详情
    detailsClick(row) {
      console.log(row, "------查看");
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看项目详情";
      // console.log("详情", row);
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

<style lang="less" scoped>
.btn {
  ::v-deep .el-form-item__content {
    margin-left: 40px !important;
    min-width: 131px;
  }
}
.el-breadcrumb {
  margin-bottom: 25px;
}
::v-deep .cell {
  text-align: center;
  line-height: 36.9px;
}
::v-deep .el-pagination {
  margin: 10px 0;
}
::v-deep .el-form-item {
  margin-bottom: 0;
}
.searchinpt {
  margin-top: 15px;
}
.el-form-item {
  width: 265px;
}
::v-deep .btn {
  text-align: right;
  .el-form-item {
    min-width: 230px;
  }
}
::v-deep .el-col-6 {
  overflow: hidden;
}
::v-deep .el-form-item__label {
  width: 68px;
}
.demo-form-inline {
  // min-width: 1380px;
}
@media screen and (min-width: 1800px) {
  ::v-deep .el-card__body::-webkit-scrollbar {
    display: none;
  }
}
::v-deep .el-card__body {
  // overflow-x: scroll;

  .el-form-item--mini.el-form-item {
    margin-bottom: 0;
  }
}
::v-deep .el-card {
  padding: 0 10px;
}
</style>
