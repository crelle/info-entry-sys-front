<template>
  <div>
    <el-dialog
      title="新增资产"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="asset"
        :rules="rules"
        ref="assetForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="使用人" prop="empIdloyeeId">
          <el-select v-model="asset.empIdloyeeId" placeholder="请选择使用人">
            <el-option label="张三" value="张三ID"></el-option>
            <el-option label="王五" value="王五ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用部门" prop="departmantId">
          <el-select v-model="asset.departmantId" placeholder="请选择部门">
            <el-option label="研发一部" value="部门ID"></el-option>
            <el-option label="研发二部" value="部门ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产编号" prop="assetNo">
          <el-input v-model="asset.assetNo"></el-input>
        </el-form-item>
        <el-form-item label="资产序列号" prop="assetSerialNumber">
          <el-input v-model="asset.assetSerialNumber"></el-input>
        </el-form-item>
        <el-form-item label="资产名称" prop="assetName">
          <el-input v-model="asset.assetName"></el-input>
        </el-form-item>
        <el-form-item label="资产状态" prop="status">
          <el-input v-model="asset.assetStatus"></el-input>
        </el-form-item>
        <el-form-item label="资产价值" prop="value">
          <el-input v-model="asset.assetValue"></el-input>
        </el-form-item>
        <el-form-item label="资产类型" prop="type">
          <el-input v-model="asset.assetType"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" required>
          <el-date-picker
            v-model="asset.createTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('assetForm')"
            >创建</el-button
          >
          <el-button @click="resetForm('assetForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createEmployeeAsset } from "@/api/employee-asset/index.js";

export default {
  name: "AddAsset",
  data() {
    return {
      dialogVisible: false,
      asset: {
        employeeName: "",
        assetNo: "",
        assetSerialNumber: "",
        assetName: "",
        assetStatus: "1",
        assetValue: "",
        assetType: "",
        createTime: "",
        createBy: "",
        enabled: "true",
      },
      rules: {},
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.asset, "------xtq");
          createEmployeeAsset(this.asset).then((res) => {
            if (res.code === "00000") {
              this.$message.success("新增成功!");
              this.dialogVisible = false;
            } else {
              his.$message.success("新增失败!");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    openDialog() {
      this.dialogVisible = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>