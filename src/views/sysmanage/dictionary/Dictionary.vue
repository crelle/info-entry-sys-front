<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="dictionary" class="demo-form-inline">
        <el-form-item label="父级名称">
          <el-input
            v-model="dictionary.parentName"
            placeholder="父级名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="子级名称">
          <el-input
            v-model="dictionary.childrenName"
            placeholder="子级名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dictionary: {
        parentName: "",
        childrenName: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style>
</style>