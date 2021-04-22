<template>
  <div class="content">
    <el-form
      :inline="true"
      :model="userSearch"
      class="demo-form-inline"
    >
      <el-form-item label="角色名称">
        <el-input
          v-model="userSearch.username"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSearch"
        >查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            userSearch: {
                username: ''
            }
        }
    },
    methods: {
        onSearch() {
            
        }
    }
};
</script>

<style>
</style>