<template>
  <div class="card-container">
    <el-card :body-style="{paddingTop: '60px',paddingBottom: '0px'}">
      <el-form :inline="true" :model="asset" class="demo-form-inline">
        <el-form-item label="使用人">
          <el-input v-model="asset.employeeId" placeholder="使用人"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="asset.assetNo" placeholder="资产编号"></el-input>
        </el-form-item>
        <el-form-item label="资产序列号">
          <el-input
            v-model="asset.assetSerialNumber"
            placeholder="资产序列号"
          ></el-input>
        </el-form-item>
        <el-form-item label="资产名称">
          <el-input v-model="asset.assetName" placeholder="资产名称"></el-input>
        </el-form-item>
        <el-form-item label="登记时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="asset.createTime"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="asset.enabled" placeholder="是否启用">
            <el-option label="启用" value="1"></el-option>
            <el-option label="未启用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="header-btn" type="primary" @click="onCreate">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="header-btn" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="header-btn" type="primary" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card :body-style="{paddingBottom: '60px'}">
      <el-table :data="assets" stripe style="width: 100%">
        <el-table-column prop="employeeName" label="使用人" width="180">
        </el-table-column>
        <el-table-column prop="assetNo" label="资产编号" width="180">
        </el-table-column>
        <el-table-column
          prop="assetSerialNumber"
          label="资产序列号"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
        </el-table-column>
        <el-table-column prop="createBy" label="创建人" width="180">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="180">
        </el-table-column>
        <el-table-column prop="updateBy" label="更新人" width="180">
        </el-table-column>
        <el-table-column prop="enabled" label="是否启用" width="180">
        </el-table-column>
      </el-table>
    </el-card>
    <add-asset-dialog ref="AddAssetDialogRef"> </add-asset-dialog>
  </div>
</template>

<script>
import AddAssetDialog from "@/views/app/employee-asset/dialog/AddAsset.vue";
export default {
  components: {
    AddAssetDialog,
  },
  data() {
    return {
      asset: {
        employeeId: "",
        assetNo: "",
        assetSerialNumber: "",
        assetName: "",
        createTime: new Date(),
        enabled: "1",
      },
      assets: [],
    };
  },
  methods: {
    onCreate() {
      this.$refs.AddAssetDialogRef.openDialog();
    },
    onDelete() {},
    onUpdate() {},
    onSubmit() {
      console.log("submit!");
    },
    onReset() {
      this.asset = {
        employeeId: "",
        assetNo: "",
        assetSerialNumber: "",
        assetName: "",
        createTime: "",
        enabled: "",
      };
    },
  },
};
</script>

<style>
</style>