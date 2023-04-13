<!--
    本组件是echarts地图下钻组件
    可以支持中国，省，市的三级下钻，起点可以是中国，省，终点可以是 中国，省，市
    可以自定义纹理图，或者颜色以及高亮背景图，高亮颜色
    可以设置地图边框阴影的颜色以及范围，不传就用默认
    可以自定义散点图标,或散点图颜色
    可以自定义散点图的数据
    可以使用本身的返回按钮，也可以隐藏返回按钮自己调用返回方法
    可以传自定义的tooltip框的id,也可以不传用默认的

    事件：
    鼠标移入地图区域事件  $emit('mapMouseover')
    鼠标移出地图区域事件 $emit('mapMouseout')
    鼠标点击地图区域事件 $emit('mapClick')
    鼠标移入散点事件 $emit('pointMouseover')
    鼠标移出散点事件 $emit('pointMouseout')
    鼠标点击散点事件 $emit('pointClick')
    下钻事件 $emit('goDown')
    回钻事件 $emit('goUpside')
-->
<template>
  <div class="users_content">
    <div class="topbox">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">
            管理大屏大数据分析系统
          </div></el-col
        >
      </el-breadcrumb>
      <!-- 左中右 -->
      <div class="box">
        <div class="left">表格</div>
        <!-- 地图 -->
        <div class="middle">
          <span>地图</span>
          <!-- <div class="mapWrapper">
            <div class="map" ref="map"></div>
            <div
              class="map-btn"
              @click="returnUpLevel"
              v-if="history.length && showReturn"
            >
              {{ history[history.length - 1] }}
            </div>
          </div> -->
        </div>
        <div class="right">数据</div>
      </div>
    </div>
  </div>
</template>

<script>

// import { queryUser, deleteMenu, resetPassword } from "@/api/user";
// import { queryRole } from "@/api/role";
// import userEditDialog from "@/views/sysmanage/users/dialog/userEdit.vue";
// import userDaitDialog from "@/views/sysmanage/users/dialog/userDetails.vue";
export default {
  components: {
    // userEditDialog,
    // userDaitDialog,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang='less'>
.topbox {
  background-color: aqua;
  height: 100vh;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  text-align: center;
  font-size: 20px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  line-height: 40px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
// 主内容css布局
.box {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: blanchedalmond;
  // 左边
  .left {
    width: 33%;
    background-color: cadetblue;
  }
  .middle {
    width: 33%;
    background-color: rgb(37, 231, 16);
  }
  .right {
    width: 33%;
    height: 800px;
    background-color: rgb(12, 132, 245);
  }
}
</style>
