<template>
  <div id="approot">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    //窗口尺寸改变
    // window.addEventListener("resize", () => this.Refresh());
  },
  methods: {
	// Refresh() {
  //     this.$router.go(0);
  //   },
  },
  destroyed() {
    // 销毁
    // window.removeEventListener("resize", this.Refresh());
  },
}
</script>
<style lang="less">
body {
  padding: 0;
  margin: 0;
  font-size: 14px;
  .el-main {
    background-color: rgb(250, 250, 250);
  }
  .el-card {
    margin-bottom: 10px;
    padding: 10px;
  }
}
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell{
  background-color: transparent !important;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent !important;
}

</style>
