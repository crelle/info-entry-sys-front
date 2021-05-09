<template>
  <div class="firstscreen_content">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="first_screen_echarts"></el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="echarts_maptwo"></el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="echarts_mapthree"></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Decrypt } from "@/util/crypto/secret";
export default {
  components: {},
  data() {
    return {
      userdetail: {},
    };
  },
  created() {
    this.userdetail = window.localStorage.getItem("userdetail")
      ? JSON.parse(Decrypt(window.localStorage.getItem("userdetail")))
      : {};
    if (Object.keys(this.userdetail).length === 0) {
      this.$message.warning("用户信息失效，请重新登录！");
      return this.$router.push("/login");
    }
    window.addEventListener("resize", (e) => {
      this.initEcharts();
    });
    this.$nextTick(() => {
      this.initEcharts();
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    initEcharts() {
      let echartsDom = document.querySelector(".first_screen_echarts");
      let main_echarts = this.$echarts.init(echartsDom);
      main_echarts.resize();
      main_echarts.setOption({
        title: {
          text: "目前注册人群画像",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  background-color: rgb(48, 57, 73,.1)
}
.first_screen_echarts {
  height: 500px;
}
</style>