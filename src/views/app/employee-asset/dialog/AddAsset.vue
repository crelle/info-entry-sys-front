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
          <el-input v-model="asset.status"></el-input>
        </el-form-item>
        <el-form-item label="资产价值" prop="value">
          <el-input v-model="asset.value"></el-input>
        </el-form-item>
        <el-form-item label="资产类型" prop="type">
          <el-input v-model="asset.type"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="asset.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="asset.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
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
        enabled: "1",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
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