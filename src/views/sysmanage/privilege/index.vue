<template>
  <div class="content">
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="mini"
        label-position="right"
        label-width="120px"
        ref="queryRoleRef"
        :model="formOptions"
      >
        <el-row>
          <el-col>
            <el-form-item label="地域名称">
              <el-input
                v-model="formOptions.name"
                placeholder="请输入地域名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色名称">
              <el-input
                v-model="formOptions.nameZh"
                placeholder="请输入角色名称"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryRoles">查询</el-button>
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
        height="540"
      >
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          width="55"
          fixed
        ></el-table-column>
        <el-table-column
          label="角色标识"
          prop="id"
          min-width="120"
          fixed
        ></el-table-column>
        <el-table-column
          label="角色编码"
          prop="name"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="角色名称"
          prop="nameZh"
          min-width="120"
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginationOptions.pageNo"
        :page-sizes="paginationOptions.pageSizes"
        :page-size="paginationOptions.pageSize"
        :layout="paginationOptions.loyout"
        background
        :total="paginationOptions.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { queryRole } from "@/api/privilege";
export default {
  data() {
    return {
      formOptions: {
        name: "",
        nameZh: "",
      },
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
        
      },
    };
  },
  mounted() {
    this.queryRoles();
  },
  methods: {
    queryRoles() {
      this.$refs["queryRoleRef"].validate((valid) => {
        if (valid) {
          let data = { condition: { ...this.formOptions } };
          data.pageNo = this.paginationOptions.pageNo;
          data.currentize = this.paginationOptions.pageSize;
          queryRole(data).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.resetForm("queryRoleRef"); // 重置表单
              this.tableData = res.data.content; // 表格数据赋值
              this.paginationOptions.total = res.data.total; // 分页器赋值
            }
          });
        } else {
          return false;
        }
      });
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
      this.queryRoles();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryRoles();
    },
    indexMethod(index){
      return (this.paginationOptions.pageNo-1)*this.paginationOptions.pageSize+index+1
    }
  },
};
</script>

<style>
</style>