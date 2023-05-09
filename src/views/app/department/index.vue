<template>
  <div class="department_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card-container">
      <el-card :body-style="{paddingTop: '60px',paddingBottom: '0px'}">
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
              <el-form-item
                label="部门名称"
                prop="name"
              >
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
                <!-- <img
                    src="../../../assets/img/globalTable/icon2-reset.png"
                    alt=""
                  > -->
                  重置</el-button>
                <el-button
                  class="header-btn"
                  type="primary"
                  @click="queryDepartmentListclick"
                >
                <!-- <img
                    src="../../../assets/img/globalTable/icon1-search.png"
                    alt=""
                  > -->
                  查询
                </el-button>
                <el-button
                  class="header-btn"
                  type="primary"
                  @click="addClick"
                >
                <!-- <img
                    src="../../../assets/img/globalTable/icon3-add.png"
                    alt=""
                  > -->
                  新增</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card :body-style="{paddingBottom: '60px'}">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
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
          <el-table-column
            fixed="right"
            label="操作"
            min-width="210"
          >
            <template slot-scope="{ row, $index }">
              <span class="operate-btn"
                @click="detailsClick(row)"
                type="primary"
                size="mini"
              >查看</span>
              <span class="operate-btn"
                @click="handleClick(row)"
                type="primary"
                size="mini"
              >编辑</span>
              <span class="operate-btn"
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
      :tableDataLook="tableDataLook"
      :tableDataProject="tableDataProject"
      ref="userDaitDialogRef"
    ></user-dait-dialog>
  </div>
</template>

<script>
// 地域
import { queryRegion } from "@/api/region";
// 部门
import { queryDepartments, deletesDepartments } from "@/api/department";
// 接口人
import { queryInterface } from "@/api/interface";
// 客户
import { queryCustomer } from "@/api/customer";
// 项目
import { queryProject } from "@/api/project";
// 员工
import { queryEmployee } from "@/api/employee";
// 岗位
import { queryPost } from "@/api/post";
// 用户
import { queryUser } from "@/api/user";
import UserEditDialog from "@/views/app/department/dialog/userEdit.vue";
import UserDaitDialog from "@/views/app/department/dialog/userDetails.vue";
export default {
  components: {
    UserEditDialog,
    UserDaitDialog,
  },
  data () {
    return {
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
      //查看的员工表
      tableDataLook: "",
      // 查看项目表
      tableProjectLook: "",
      // 项目的
      tableDataProject: [],
    };
  },
  mounted() {
    this.queryDepartmentList();
    this.queryUser();
    this.queryTableList();
    this.queryProjectList();
    this.queryDepartmentListUp();
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
    // 全部部门
    // 查询部门列表
    queryDepartmentListUp() {
      this.$refs["departmentQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = 1;
          data.size = 99999;
          queryDepartments(data).then((res) => {
            if (res && res.code && res.code === "00000") {
              console.log(res.data.records, "--------------上级查询部门");
              this.tableDataUp = res.data.records;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 查询用户列表
    queryUser() {
      this.$refs["departmentQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = 1;
          data.size = 99999;
          queryUser(data).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.UserData = res.data.records; // 表格数据赋值
              console.log(this.UserData, " // 真的查询用户列表");
            }
          });
        } else {
          return false;
        }
      });
    },
    // 全部项目
    // 数据拿取查询方法
    queryProjectList() {
      this.$refs["departmentQueryRef"].validate((valid) => {
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
                    // console.log(this.UsersProject, "部门表格数据");
                    // console.log(this.InterfaceProject, "接口人表格数据");
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
    // 全部人员
    //table数据
    queryTableList () {
      let data = { records: [{ ...this.formOptions }] };
      data.current = 1;
      data.size = 999;
      queryEmployee(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          queryProject(data).then((res1) => {
            queryDepartments(data).then((res2) => {
              queryInterface(data).then((res3) => {
                queryRegion(data).then((res4) => {
                  queryCustomer(data).then((res5) => {
                    //  数据岗位查询方法
                    queryPost(data).then((res6) => {
                      this.tableyPostLook = res6.data.records; // 岗位表格数据赋值
                      // console.log(this.tableyPost, "----------岗位数据");
                      this.tableDataLook = res.data.records; // 表格数据赋值
                      console.log(this.tableDataLook, "员工表格数据赋值");
                      this.tableProjectLook = res1.data.records; // 项目表格数据赋值
                      this.UsersLook = res2.data.records; // 部门数据表格数据赋值
                      this.InterfaceLook = res3.data.records; // 接口人表格数据赋值
                      this.MockUserLook = res4.data.records; // 地域数据表格数据赋值
                      this.tableCustomerLook = res5.data.records; // 客户表格数据赋值
                      this.tableDataLook.forEach((item) => {
                        this.tableProjectLook.forEach((items) => {
                          if (item.projectId == items.projectId) {
                            // console.log(items, "------------111");
                            item.project = items.project; //根据项目id给项目名称赋值
                            this.UsersLook.forEach((itemli) => {
                              if (items.departmentId == itemli.departmentId) {
                                item.department = itemli.department; //根据项目id查找部门id给部门名称赋值
                                item.departmentId = itemli.departmentId; //根据项目id查找部门id给部门id赋值
                              }
                            });
                            this.InterfaceLook.forEach((itemis) => {
                              if (items.interfaceId == itemis.interfaceId) {
                                item.interfaceName = itemis.interfaceName; //根据项目id查找接口人id给接口人名称赋值
                                this.tableCustomerLook.forEach((itemiss) => {
                                  if (itemis.customerId == itemiss.customerId) {
                                    item.customerName = itemiss.customerName; //根据接口人id 查找客户id给客户名称赋值
                                  }
                                });
                              }
                            });
                            this.MockUserLook.forEach((itemlis) => {
                              if (items.regionId == itemlis.regionId) {
                                item.regionName = itemlis.regionName; //根据项目id查找区域id给区域名称赋值
                              }
                            });
                          }
                        });
                        this.tableyPostLook.forEach((itemls) => {
                          if (item.postId == itemls.postId) {
                            item.postName = itemls.postName; //根据项目id查找岗位id给岗位名称赋值
                            item.postId = itemls.postId; //根据项目id查找岗位id给岗位名称赋值
                          }
                        });
                      });
                    });
                  });
                });
              });
            });
            // this.paginationOptions.total = res.data.total; // 分页器赋值
          });
        }
      });
    },
    // 删除弹框
    deleteMenu (row, index) {
      console.log(row, "------------------------*********");
      this.$confirm("此操作将永久删除该部门, 是否继续?", "删除部门", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
        modal: false,
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 点击确认，发起后台请求，删除该用户
          deletesDepartments(row.id).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除该部门");
            if (res.code == "00000") {
              this.queryDepartmentList();
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
    addClick () {
      this.$refs.userEditDialogRef.openDialog();
      this.list = "添加部门";
      console.log("我要添加");
      this.queryDepartmentListUp();
    },
    // 编辑
    handleClick (row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑部门信息";
      console.log("编辑", row, row.departmentId);
      this.queryDepartmentListUp();
    },
    // 详情
    detailsClick (row) {
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看部门详情";
      console.log("详情", row, row.id);
    },
    // 重置表单
    resetForm (formName) {
      console.log("重置-------", formName);
      this.$refs[formName].resetFields();
    },
    // 分页器 页容量变更行为
    handleSizeChange (val) {
      this.paginationOptions.pageSize = val;
      this.queryDepartmentList();
    },
    // 分页器 页码变更行为
    handleCurrentChange (val) {
      this.paginationOptions.pageNo = val;
      this.queryDepartmentList();
    },
    indexMethod (index) {
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
// .btn-custom-cancel {
//   float: right;
//   margin-left: 10px;
// }
</style>
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
.demo-form-inline {
  // min-width: 500px;
}
@media screen and (min-width: 800px) {
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
</style>

