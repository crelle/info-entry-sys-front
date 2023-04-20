<template>
  <div>
    <!-- 内容主体部分 -->
    <div class="subjectContent upperHalf">
      <!-- 左侧内容 -->
      <el-row :gutter="10" style="margin-left: 0px; margin-right: 0px">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <!-- 左侧上 -->
          <div class="grid-content bg-purple">
            <span>性别分布</span>
          </div>
          <!-- 左侧中 -->
          <div class="grid-content bg-purple">
            <span>年龄分布</span>
          </div>
          <!-- 左侧下 -->
          <div class="grid-content bg-purple">
            <span>年龄分布</span>
          </div>
        </el-col>
        <!-- 中间地图 -->
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple-light">
            <china></china>
          </div>
          <div class="grid-content bg-purple-chart">
            <span>图表</span>
          </div>
        </el-col>
        <!-- 右侧内容 -->
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <!-- 右侧上 -->
          <div class="grid-content bg-purple">
            <span>工龄分布</span>
          </div>
          <!-- 右侧中 -->
          <div class="grid-content bg-purple">
            <span>客户分布</span>
          </div>
          <!-- 右侧下 -->
          <div class="grid-content bg-purple">
            <span>交付经理人数分析</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import China from "./china-map.vue";
export default {
  name: "index",
  components: {
    China,
  },
  data() {
    return {}
  },
  //菜单生成部分
  computed: {

  },
  watch: {
    // 侦听路由 路由改变则联动菜单
  },
  mounted() {},
  created() {
  },
  methods: {}
};
</script>
<style lang='less'>

</style>
<style lang='less' scoped>
body,
html {
  height: 100%;
}
// 主体内容
.subjectContent {
  margin-top: 15px;
  margin: 20px 20px 0;
  position:absolute .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
    // position: relative;
    // top: -30px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
}
// 主体内容 上半内容
.upperHalf {
  // 两侧
  .bg-purple {
    width: 100%;
    height: 28vh;
    background-color: rgba(224, 236, 211, 0.2);
    margin: 5px 0;
  }
  .bg-purple-light {
    width: 100%;
    height: 60vh;
    background-color: rgba(224, 236, 211, 0.2);
  }
  .bg-purple-chart {
    margin-top: 6px;
    width: 100%;
    height: 25vh;
    background-color: rgba(224, 236, 211, 0.2);
  }
}

</style>