<template>
  <div class="menus_content">
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="mini"
        label-position="right"
        label-width="120px"
        ref="queryMenuRef"
        :model="formOptions"
      >
        <el-row>
          <el-col>
            <el-form-item label="菜单名称">
              <el-input
                v-model="formOptions.name"
                placeholder="菜单名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否需要鉴权">
              <el-select v-model="formOptions.requireAuth" placeholder="请选择">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否可用">
              <el-select v-model="formOptions.enabled" placeholder="请选择">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryMenus">查询</el-button>
              <el-button
                class="filter-item"
                style="margin-left: 10px"
                type="primary"
                icon="el-icon-edit"
                @click="handleCreate"
              >
                添加
              </el-button>
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
        height="380"
      >
        <el-table-column type="selection" width="55" fixed></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="55"
          fixed
        ></el-table-column>
        <el-table-column
          label="菜单标识"
          prop="id"
          min-width="120"
          fixed
        ></el-table-column>
        <el-table-column
          label="菜单名称"
          prop="name"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="后台资源地址"
          prop="url"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="前台页面路径"
          prop="path"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="前台组件名称"
          prop="component"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="菜单图标"
          prop="iconCls"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="菜单类型"
          prop="menuType"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="菜单顺序"
          prop="sort"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="是否可用"
          prop="enabled"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="是否需要鉴权"
          prop="requireAuth"
          min-width="120"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" min-width="140">
          <template slot-scope="scope">
            <el-button type="text" size="small">详情</el-button>
            <el-button type="text" size="mini" @click="handleClick(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
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
    <user-edit-dialog ref="userEditDialogRef"></user-edit-dialog>
  </div>
</template>

<script>
import { queryMenu } from "@/api/menu";
export default {
  data() {
    return {
      dialogStatus: "",
      formOptions: {
        name: "",
        requireAuth: true,
        enabled: true,
      },
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
    this.queryMenus();
  },
  methods: {
    queryMenus() {
      this.$refs["queryMenuRef"].validate((valid) => {
        if (valid) {
          let data = { condition: { ...this.formOptions } };
          data.pageNo = this.paginationOptions.pageNo;
          data.pageSize = this.paginationOptions.pageSize;
          queryMenu(data).then((res) => {
            if (res && res.code && res.code === "00000") {
              this.resetForm("queryMenuRef"); // 重置表单
              this.tableData = res.data.content; // 表格数据赋值
              this.paginationOptions.total = res.data.totalElements; // 分页器赋值
            }
          });
        } else {
          return false;
        }
      });
    },
    // 编辑
    handleClick(row) {
      console.log("编辑");
      // this.$refs.userEditDialogRef.openDialog(row);
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
      this.queryMenus();
    },
    // 分页器 页码变更行为
    handleCurrentChange(val) {
      this.paginationOptions.pageNo = val;
      this.queryMenus();
    },
    // 添加
    handleCreate() {
      console.log("添加");
    },
  },
};
</script>

<style>
</style>