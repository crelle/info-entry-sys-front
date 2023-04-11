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
            <el-form-item label="岗位名称" prop="postName">
              <el-input
                v-model="formOptions.postName"
                placeholder="岗位名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="项目名" prop="project">
              <el-select
                v-model="formOptions.project"
                placeholder="请选择项目名"
                filterable
                clearable
              >
                <el-option
                  v-for="item in projectData"
                  :key="item.index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="办公地点" prop="address">
              <el-select
                v-model="formOptions.address"
                placeholder="请选择办公地点"
                filterable
                clearable
              >
                <el-option
                  v-for="item in regionData"
                  :key="item.index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="5">
            <el-form-item label="岗位技能" prop="skill">
              <el-select
                v-model="formOptions.skill"
                placeholder="请选择岗位技能"
                filterable
                clearable
              >
                <el-option
                  v-for="item in skill"
                  :key="item.index"
                  :label="item.ski"
                  :value="item.ski"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->

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
              <el-button type="primary" @click="resetForm('queryRoleRef')"
                >重置</el-button
              >
              <el-button type="primary" @click="queryPostclick">查询</el-button>
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
        ></el-table-column>
        <el-table-column
          label="岗位名称"
          prop="postName"
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
          label="办公地点"
          prop="address"
          min-width="120"
          fixed
        ></el-table-column>
        <el-table-column
          label="客户"
          prop="customerName"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column
          label="需求人数/人"
          prop="number"
          min-width="87"
          fixed
        ></el-table-column>
        <el-table-column
          label="计划满足日期"
          prop="date"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column
          label="截止今日岗位缺口/人"
          prop="number"
          min-width="144"
          fixed
        ></el-table-column>
        <el-table-column label="操作" min-width="218" fixed="right">
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
      :customerData="customerData"
      :InterfaceData="InterfaceData"
      ref="roleEditDialogRef"
    ></role-edit-dialog>
    <role-data-dialog
      :toChild="list"
      ref="roleDataDialogRef"
    ></role-data-dialog>
  </div>
</template>

<script>
// 岗位表/删除
import { queryPost, deletesPost } from "@/api/post";
// 分页查询项目表
import { queryProject } from "@/api/project";
// 地域
import { queryRegion } from "@/api/region";
//客户
import { queryCustomer } from "@/api/customer";
// 接口人
import { queryInterface } from "@/api/interface";
import RoleEditDialog from "@/views/app/post/dialog/dialogEdit.vue";
import RoleDataDialog from "@/views/app/post/dialog/dialogDetails.vue";
export default {
  components: {
    RoleEditDialog,
    RoleDataDialog,
  },
  data() {
    return {
      // 全部岗位
      queryPostAll: [],
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
        address: "",
        date: "",
        detailAddress: "",
        latestArrivalTime: "",
        number: "",
        position: "",
        postId: "",
        postName: "",
        project: "",
        requirements: "",
        skill: "",
        customer: "",
        customerId: "",
        customerName: "",
      },
      tableData: [],
      // 项目数据
      projectData: [],
      // 地域数据
      regionData: [],
      // 客户
      customerData: [],
      // 接口人
      InterfaceData: [],
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
      },
      // 验证
      rules: {},
    };
  },
  mounted() {
    this.queryPost();
    this.searchHeader();
  },
  methods: {
    // 头部搜索
    // 头部搜索
    searchHeader() {
      let data = { records: [{ ...this.formOptions }] };
      data.current = 1;
      data.size = 9999;
      // 清空头部预存数据重新赋值
      this.queryPostAll = [];
      // // 项目数据
      this.projectData = [];
      // // 办公地点
      this.regionData = [];
      console.log(this.regionData, "99991111");
      queryPost(data).then((res) => {
        if (res && res.code && res.code === "00000") {
          this.queryPostAll = res.data.records; // 表格数据赋值
          // console.log(res.data.records,'**********---------');
          this.queryPostAll.forEach((item) => {
            console.log(item, "-------头部搜索数据----");
            // console.log(item.department, "-------头部搜索数据----");
            // 项目
            if (item.project != null && item.project != "") {
              this.projectData.push(item.project);
            }
            // 办公地点
            if (item.address != null && item.address != "") {
              this.regionData.push(item.address);
            }
          });
          this.projectData = [...new Set(this.projectData)];
          this.regionData = [...new Set(this.regionData)];

          console.log(this.regionData, "*----------*---查查");
        }
      });
    },
    // 手动 查询 岗位表
    queryPostclick() {
      this.$refs["queryRoleRef"].validate((valid) => {
        if (valid) {
          this.paginationOptions.pageNo = 1;
          this.queryPost();
        } else {
          return false;
        }
      });
    },
    // 查询 岗位表
    queryPost() {
      this.$refs["queryRoleRef"].validate((valid) => {
        if (valid) {
          let data = { records: [{ ...this.formOptions }] };
          data.current = this.paginationOptions.pageNo;
          data.size = this.paginationOptions.pageSize;
          queryPost(data).then((res) => {
            console.log("手动岗位--------------", res.data.records);
            this.tableData = res.data.records; // 表格数据赋值
            console.log(this.tableData, "++++++++++岗位数据----");
            this.paginationOptions.total = res.data.total; // 分页器赋值
          });
        } else {
          return false;
        }
      });
    },
    // 删除弹框
    deleteMenu(row, index) {
      this.$confirm("此操作将永久删除该岗位, 是否继续?", "删除岗位", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 点击确认，发起后台请求，删除该用户
          deletesPost(row.postId).then((res) => {
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
      console.log("编辑", row, row.postId);
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // // 表格复选动作
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    // 分页器 页容量变更行为
    handleSizeChange(val) {
      this.paginationOptions.pageSize = val;
      this.queryPost();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryPost();
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

@media screen and (min-width: 1800px) {
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
  min-width: 270px;
}
::v-deep .el-col-5 {
  overflow: hidden;
}
.demo-form-inline {
  min-width: 1300px;
}
</style>
