<template>
  <div class="users_content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
      <el-breadcrumb-item>接口人管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card-container">
      <el-card :body-style="{paddingTop: '60px',paddingBottom: '0px'}">
        <el-form
          :inline="true"
          :model="formOptions"
          :rules="queryRules"
          class="demo-form-inline"
          size="mini"
          ref="userQueryRef"
          label-position="right"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item
                label="接口人"
                prop="name"
              >
                <el-input
                  v-model="formOptions.name"
                  placeholder="接口人姓名"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="客户"
                prop="customerId"
              >
                <el-select
                  v-model="formOptions.customerId"
                  placeholder="请选择客户名称"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in tableCustomer"
                    :key="item.index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="14"
            >
              <el-form-item>
                <el-button class="header-btn"
                  type="primary"
                  @click="resetForm('userQueryRef')"
                >重置</el-button>
                <el-button class="header-btn"
                  type="primary"
                  @click="queryUserListclick"
                >查询</el-button>
                <el-button class="header-btn"
                  type="primary"
                  @click="addClick"
                >新增</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card >
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
    <interface-edit
      :toChild="list"
      :tableData="tableData"
      :tableCustomer="tableCustomer"
      ref="userEditDialogRef"
    ></interface-edit>
    <interface-details
      :toChild="list"
      :tableDataProject="tableDataProject"
      ref="userDaitDialogRef"
    ></interface-details>
  </div>
</template>

<script>
// 客户查询
import { queryCustomer } from "@/api/customer";
// 接口人表/删除
import { queryInterface, deletesInterface } from "@/api/interface";
import interfaceEdit from "@/views/app/interface/dialog/interfaceEdit.vue";
import interfaceDetails from "@/views/app/interface/dialog/interfaceDetails.vue";
export default {
  components: {
    interfaceEdit,
    interfaceDetails,
  },
  data () {
    return {
      tableHeight: window.innerHeight>=908?550:window.innerHeight-418,
      list: "",
      formOptions: {
        customerId: "",
        name: "",
      },
      queryRules:{
        name:[
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
            message: "包含空格或者非法字符",
            trigger: ["blur", "change"],
          }
        ]
      },
      paginationOptions: {
        pageNo: 1,
        pageSizes: [10, 20, 30, 50, 100],
        pageSize: 10,
        toatl: 0
      },
      tableData: [],
      tableCustomer: [],
      multipleSelection: [],
      // 全部项目
      tableDataProject: [],
    };
  },
  mounted () {
    this.queryUserList();
    this.queryCustomer()
  },
  methods: {

    //手动 查询接口人
    queryUserListclick () {
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
    queryUserList () {
      queryInterface({
        current: this.paginationOptions.pageNo,
        size: this.paginationOptions.pageSize,
        records: [this.formOptions]
      }).then((res) => {
        if (res && res.code && res.code === "00000") {
          this.tableData = res.data.records;
          this.paginationOptions.total = res.data.total
        }
      });

    },
    queryCustomer () {
      queryCustomer({
        current: 1,
        size: 1000000,
        records: [{}]
      }).then((res) => {
        if (res && res.code && res.code === "00000") {
          this.tableCustomer = res.data.records;
        }
      });
    },
    // 删除弹框
    deleteMenu (row, index) {
      this.$confirm("此操作将永久删除该接口人, 是否继续?", "删除接口人", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning",
        modal: false,
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 点击确认，发起后台请求，删除该接口人
          deletesInterface(row.id).then((res) => {
            console.log(res, "点击确认，发起后台请求，删除该接口人");
            if (res.code == "00000") {
              return this.$message({
                type: "success",
                message: "删除成功!",
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
    // 添加
    addClick () {
      this.$refs.userEditDialogRef.openDialog();
      this.list = "添加接口人";
      console.log("我要添加");
    },
    // 编辑
    handleClick (row) {
      this.$refs.userEditDialogRef.openDialog(row);
      this.list = "编辑接口人信息";
      console.log("编辑", row);
    },
    // 详情
    detailsClick (row) {
      this.$refs.userDaitDialogRef.openDialog(row);
      this.list = "查看接口人详情";
      console.log("详情", row);
    },
    // 重置表单
    resetForm (formName) {
      console.log("重置-------", formName);
      this.$refs[formName].resetFields();
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
// .el-form--inline .el-form-item {
//   margin-right: 0;
// }
// ::v-deep .el-card__body {
//   .el-form-item--mini.el-form-item {
//     margin-bottom: 0;
//   }
// }
.el-breadcrumb {
  margin-bottom: 25px;
}
// ::v-deep .el-pagination {
//   margin: 10px 0;
// }
// ::v-deep .el-form-item__label {
//   margin-right: 5px;
// }
// .el-form-item {
//   width: 253px;
// }

</style>