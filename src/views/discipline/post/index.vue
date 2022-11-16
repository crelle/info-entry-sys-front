<template>
  <div class="roles_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>岗位管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="mini"
        label-position="right"
        ref="queryRoleRef"
        :model="formOptions"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="岗位名称">
              <el-input
                v-model="formOptions.pstname"
                placeholder="岗位名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="项目名">
              <el-select
                v-model="formOptions.project"
                placeholder="请选择项目名"
                filterable
              >
                <el-option
                  v-for="item in projectData"
                  :key="item.index"
                  :label="item.project"
                  :value="item.project"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="地域">
              <el-select
                v-model="formOptions.region"
                placeholder="请选择地域"
                filterable
              >
                <el-option
                  v-for="item in regionData"
                  :key="item.index"
                  :label="item.region"
                  :value="item.region"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="岗位技能">
              <el-select
                v-model="formOptions.skill"
                placeholder="请选择岗位技能"
                filterable
              >
                <el-option
                  v-for="item in skill"
                  :key="item.index"
                  :label="item.ski"
                  :value="item.ski"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :span="4"
            :class="
              Object.keys(formOptions).length % 3 === 0
                ? 'nextline_action_button_content'
                : Object.keys(formOptions).length % 3 === 1
                ? 'inline2_action_button_content'
                : 'inline1_action_button_content'
            "
          >
            <el-form-item>
              <el-button type="primary" @click="queryPost">查询</el-button>
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
          width="55"
          fixed
        ></el-table-column>
        <el-table-column
          label="岗位名称"
          prop="pstname"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column
          label="岗位技能"
          prop="skill"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column
          label="项目"
          prop="project"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column
          label="地域"
          prop="region"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column
          label="客户"
          prop="customer"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column
          label="需求人数"
          prop="number"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column
          label="计划满足日期"
          prop="date"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column label="操作" min-width="120" fixed>
          <template slot-scope="{ row, $index }">
            <el-button @click="lookClick(row)" type="primary" size="mini"
              >查看</el-button
            >
            <el-button @click="onEditRole(row)" type="primary" size="mini"
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
    <role-edit-dialog
      :toChild="list"
      :tableData="tableData"
      ref="roleEditDialogRef"
    ></role-edit-dialog>
    <role-data-dialog
      :toChild="list"
      ref="roleDataDialogRef"
    ></role-data-dialog>
  </div>
</template>

<script>
// 假的岗位表/项目表/地域表
import { reqPost, reqProject, reqMockUser } from "@/mockjs/reqMock";

import { queryRole, deleteRole } from "@/api/role";
import RoleEditDialog from "@/views/discipline/post/dialog/dialogEdit.vue";
import RoleDataDialog from "@/views/discipline/post/dialog/dialogDetails.vue";
export default {
  components: {
    RoleEditDialog,
    RoleDataDialog,
  },
  data() {
    return {
      // 技能
      skill: [
        {
          ski: "JAVA",
        },
        {
          ski: "WEB",
        },
        {
          ski: "UI",
        },
      ],
      list: "",
      formOptions: {
        id: "",
        pstname: "",
        skill: "",
        project: "",
        number: "",
        date: "",
        region: "",
        place: "",
        duty: "",
        requirement: "",
      },
      tableData: [],
      projectData: [],
      regionData: [],
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
      },
    };
  },
  mounted() {
    // this.queryRoles();
    this.queryPost();
    this.reqProject();
    this.reqMockUser();
  },
  methods: {
    // 查询 岗位表 假的
    queryPost() {
      this.$refs["queryRoleRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, "data---------");
          reqPost(data).then((res) => {
            console.log(res, "---------假的岗位数据");
            this.resetForm("queryRoleRef"); // 重置表单
            this.tableData = res.data; // 表格数据赋值
            this.paginationOptions.total = res.data.total; // 分页器赋值
          });
        } else {
          return false;
        }
      });
    },
    // 查询 项目表 假的
    reqProject() {
      this.$refs["queryRoleRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, "data---------");
          reqProject(data).then((res) => {
            console.log(res, "---------假的项目数据");
            this.projectData = res.data; // 表格数据赋值
          });
        } else {
          return false;
        }
      });
    },
    // 查询 地域表 假的
    reqMockUser() {
      this.$refs["queryRoleRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          console.log(data, "data---------");
          reqMockUser(data).then((res) => {
            console.log(res, "---------假的地域数据");
            this.regionData = res.data; // 表格数据赋值
          });
        } else {
          return false;
        }
      });
    },
    // // 查询 真的
    // queryRoles() {
    //   this.$refs["queryRoleRef"].validate((valid) => {
    //     if (valid) {
    //       let data = { records: [{ ...this.formOptions }] };
    //       data.current = this.paginationOptions.pageNo;
    //       data.size = this.paginationOptions.pageSize;
    //       console.log(data, "data---------");
    //       queryRole(data).then((res) => {
    //         console.log(res, "res++++++++++");
    //         if (res && res.code && res.code === "00000") {
    //           this.resetForm("queryRoleRef"); // 重置表单
    //           this.tableData = res.data.records; // 表格数据赋值
    //           this.paginationOptions.total = res.data.total; // 分页器赋值
    //         }
    //       });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "删除项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 点击确认，发起后台请求，删除该用户
          deleteRole(row.id).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除");
            if (res.code == "00000") {
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
        })
        .catch(() => {
          // 点击取消，取消该操作
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 查看
    lookClick(row) {
      this.$refs.roleDataDialogRef.openDialog(row);
      this.list = "查看岗位详情";
      console.log("我要查看", row);
    },
    // 添加
    addClick() {
      this.$refs.roleEditDialogRef.openDialog();
      this.list = "添加岗位";
      console.log("我要添加");
    },
    // 编辑
    onEditRole(row) {
      this.$refs.roleEditDialogRef.openDialog(row);
      this.list = "编辑岗位信息";
      console.log("编辑", row, row.id);
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 表格复选动作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页器 页容量变更行为
    handleSizeChange(val) {
      this.paginationOptions.pageSize = val;
      // this.queryRoles();
      this.queryPost();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      // this.queryRoles();
      this.queryPost();
    },
  },
};
</script>


<style lang="less" scoped>
// ::v-deep .cell {
//   text-align: center;
//   line-height: 36.9px;
// }
// ::v-deep .inline2_action_button_content {
//   text-align: right;
// }
// .el-form--inline .el-form-item {
//   margin-right: 0;
// }
// ::v-deep .el-card__body {
//   .el-form-item--mini.el-form-item {
//     margin-bottom: 0;
//   }
// }
// .el-breadcrumb {
//   margin-bottom: 25px;
// }
// ::v-deep .el-pagination {
//   margin: 10px 0;
// }
// ::v-deep .el-form-item__label {
//   margin-right: 5px;
// }
// ::v-deep .el-button{
//   color: #000;
// }
</style>
