<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card-container">
      <el-card :body-style="{paddingTop: '60px',paddingBottom: '0px'}">
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
              <el-form-item
                label="项目名称"
                prop="name"
              >
                <el-input
                  v-model="formOptions.name"
                  placeholder="项目名称"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item
                label="项目状态"
                prop="status"
              >
                <el-select
                  v-model="formOptions.status"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, i) in $dictionaryList('项目状态')"
                    :key="i"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                  <!-- <el-option label="前期投入" value="1"></el-option>
                <el-option label="开发中" value="2"></el-option>
                <el-option label="交付阶段" value="3"></el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="地域"
                prop="regionId"
              >
                <el-select
                  v-model="formOptions.regionId"
                  placeholder="请选择地域"
                  clearable
                  filterable
                  @focus="queryRegionList"
                >
                  <el-option
                    v-for="(item, i) in region"
                    :key="i"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col
              :span="4"
              class="btn"
            >
              <el-form-item>
                <el-button
                  class="header-btn"
                  type="primary"
                  @click="resetForm('userQueryRef')"
                >重置</el-button>
                <el-button
                  class="header-btn"
                  type="primary"
                  @click="queryUserListclick"
                >查询</el-button>
                <el-button
                  class="header-btn"
                  type="primary"
                  @click="addClick"
                >新增</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="searchinpt">
            <el-col :span="7">
              <el-form-item
                label="接口人"
                prop="interfaceId"
              >
                <el-select
                  v-model="interfaceId"
                  placeholder="请选择接口人姓名"
                  clearable
                  filterable
                  @focus="queryInterfaceList"
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
              <el-form-item
                label="所属部门"
                prop="departmentId"
              >
                <el-select
                  v-model="formOptions.departmentId"
                  placeholder="所属部门"
                  clearable
                  filterable
                  @focus="queryDepartmentList"
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

      <el-card :body-style="{paddingBottom: '60px'}">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
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
            label="项目名称"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="接口人"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span
                v-for="item in row.contactPeoples"
                :key="item.id"
              >{{
              item.name + " "
            }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="项目状态"
            show-overflow-tooltip
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="所属部门"
            min-width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="210"
          >
            <template slot-scope="{ row, $index }">
              <span
                class="operate-btn"
                @click="detailsClick(row)"
                type="primary"
                size="mini"
              >查看</span>
              <span
                class="operate-btn"
                @click="handleClick(row)"
                type="primary"
                size="mini"
              >编辑</span>
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
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationOptions.total"
            size="mini"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <project-edit-dialog
      :toChild="list"
      :tableData="tableData"
      :Interface="Interface"
      :department="department"
      :region="region"
      ref="userEditDialogRef"
    ></project-edit-dialog>
    <project-dait-dialog
      :toChild="list"
      :tableDatastaff="tableDatastaff"
      ref="userDaitDialogRef"
    ></project-dait-dialog>
  </div>
</template>

<script>
// 地域
import { queryRegion } from "@/api/region";
// 接口人
import { queryInterface } from "@/api/interface";
// 部门
import { queryDepartments } from "@/api/department";
// 项目
import { queryProject, deletesProject } from "@/api/project";
import ProjectEditDialog from "@/views/app/project/dialog/projectEdit.vue";
import ProjectDaitDialog from "@/views/app/project/dialog/projectDetails.vue";
export default {
  components: {
    ProjectEditDialog,
    ProjectDaitDialog,
  },
  data () {
    return {
      xmzt: "",
      list: "",
      tableHeight: window.innerHeight >= 908 ? 550 : window.innerHeight - 418,
      interfaceId: '',
      formOptions: {
        // interfaceId: "",
        contactPeoples: [],
        cellPhone: "",
        email: "",
        // customerName: "",
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
      region: [],
      Interface: [],
      department: [],
      multipleSelection: [],
      // 全部员工
      tableDatastaff: [],
    };
  },
  mounted () {
    this.queryUserList();
  },
  methods: {
    // 手动  数据拿取查询方法
    queryUserListclick () {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          this.paginationOptions.pageNo = 1;
          if (this.interfaceId) {
            this.formOptions.contactPeoples = []
            this.formOptions.contactPeoples.push({ id: this.interfaceId })
          } else {
            this.formOptions.contactPeoples = []
          }
          this.queryUserList();
        } else {
          return false;
        }
      });
    },
    //  数据拿取查询方法
    queryUserList () {
      this.$refs["userQueryRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          // 项目表格数据
          queryProject(data).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.tableData = res.data.records; // 项目表格数据赋值
              this.paginationOptions.total = res.data.total; // 分页器赋值
            }
          });
        } else {
          return false;
        }
      });
    },
    // 查询全部地域
    queryRegionList () {
      let data = { records: [{ code: '', name: '' }] };
      data.current = 1;
      data.size = 999;
      queryRegion(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          console.log(res.data, "===");
          this.region = res.data.records // 地域下拉框赋值
        }
      })
    },
    // 查询全部部门
    queryDepartmentList () {
      let data = { records: [{ ...this.formOptions }] };
      data.current = 1;
      data.size = 999;
      queryDepartments(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          this.department = res.data.records; // 部门赋值
        }
      });
    },
    // 查询全部接口人
    queryInterfaceList () { 
      let data = { records: [{ code: '', name: '' }] };
      data.current = 1;
      data.size = 999;
      queryInterface(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          console.log(res.data, "===");
          this.Interface = res.data.records // 地域下拉框赋值
        }
      })
    },

    deleteMenu (row, index) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "删除项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
        modal: false,
      })
        .then(() => {
          // this.tableData.splice(index, 1);
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
      // .catch(() => {
      //   // 点击取消，取消该操作
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除",
      //   });
      // });
    },
    // 添加
    addClick () {
      this.$refs.userEditDialogRef.openDialog();
      this.list = "添加项目";
      this.queryRegionList()
      this.queryDepartmentList()
      this.queryInterfaceList()
      console.log("我要添加");
    },
    // 编辑
    handleClick (row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑项目信息";
      this.queryRegionList()
      this.queryDepartmentList()
      this.queryInterfaceList()
      console.log("编辑-------", row);
    },
    // 详情
    detailsClick (row) {
      console.log(row, "------查看");
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看项目详情";
      // console.log("详情", row);
    },
    // 重置表单
    resetForm (formName) {
      console.log("重置-------", formName);
      this.interfaceId = ""
      this.$refs[formName].resetFields();
      // this.queryUserList();
    },
    // 表格复选动作
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 分页器 页容量变更行为
    handleSizeChange (val) {
      this.paginationOptions.pageSize = val;
      this.queryUserList();
    },
    // 分页器 页码变更行为
    handleCurrentChange (val) {
      this.paginationOptions.pageNo = val;
      this.queryUserList();
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
