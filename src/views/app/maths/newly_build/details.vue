<template>
  <div>
    <el-header>
      <div class="title">员工</div>
    </el-header>
    <!-- <div>{{ row.id }}</div> -->
    <el-col :span="24" class="jc">基础信息</el-col>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">员工姓名</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">员工电话</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">员工所在项目</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">员工所在区域</div></el-col
        >
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  props: {
    toChild: String,
  },
  data() {
    return {
      row: "",
    };
  },
  mounted() {
    this.openDialog();
  },
  methods: {
    openDialog() {
      this.row = JSON.parse(window.sessionStorage.getItem("id"));
      console.log(this.row);
    },
  },
};
</script>

<style lang="less" scoped>
.title{
  font-size: 18px;
}
.jc{
  font-size: 24px;
}
</style>