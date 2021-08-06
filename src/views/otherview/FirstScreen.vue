<template>
  <div class="firstscreen_content">
    <!-- <el-scrollbar style="height: 100%;"> -->
      <el-card class="first_screen_echarts">
        <el-row :gutter="5">
          <el-col :span="12">
            <div class="chartone"></div>
          </el-col>
          <el-col :span="12">
            <div class="charttwo"></div>
          </el-col>
          <el-col :span="12">
            <div class="chartthree"></div>
          </el-col>
        </el-row>
      </el-card>
    <!-- </el-scrollbar> -->
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
      let echartsDom = document.querySelector(".chartone");
      let main_echarts = this.$echarts.init(echartsDom);
      main_echarts.resize();
      main_echarts.setOption({
          title: {
          text: "日访问量",
          subtext: "人次/日",
          left: "center",
        },
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
            },
          ],
        }
      );
      let echartsDomCircle = document.querySelector(".charttwo");
      let charttwo = this.$echarts.init(echartsDomCircle);
      charttwo.resize();
      charttwo.setOption({
        title: {
          text: "站点用户访问来源",
          subtext: "渠道名",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      let echartsDomDate = document.querySelector(".chartthree");
      let chartthree = this.$echarts.init(echartsDomDate);
      chartthree.resize();
      let that = this
      function getVirtulData(year) {
        year = year || `${new Date().getFullYear()}`;
        var date = +that.$echarts.number.parseDate(year + "-01-01");
        var end = +that.$echarts.number.parseDate(+year + 1 + "-01-01");
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
          data.push([
            that.$echarts.format.formatTime("yyyy-MM-dd", time)
          ]);
        }
        return data;
      }

      function renderItem(params, api) {
        var cellPoint = api.coord(api.value(0));
        var cellHeight = params.coordSys.cellHeight;
        if (isNaN(cellPoint[0]) || isNaN(cellPoint[1])) {
          return;
        }
        // 填充单元格
        var group = {
          type: "group",
          children: [{
          type: "text",
          style: {
            x: cellPoint[0]-5,
            y: cellPoint[1]-5,
            text: that.$echarts.format.formatTime("dd", api.value(0)),
            fill: "#409EFF",
            backgroundColor: that.$echarts.format.formatTime("dd", api.value(0)) == (new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate()) ? "red" : "",
            textFont: api.font({ fontSize: 12 }),
          },
        }],
        };

        return group;
      }

      let option = {
        tooltip: {},
        calendar: [
          {
            left: "center",
            top: "40",
            cellSize: [40, 36],
            yearLabel: { show: false },
            orient: "vertical",
            dayLabel: {
              firstDay: 1,
              nameMap: "cn",
            },
            monthLabel: {
              show: false,
            },
            range:  Number(new Date().getMonth())+1 > 9 ? new Date().getFullYear() + '-' + Number(new Date().getMonth())+1 : new Date().getFullYear() + '-' + '0' + (Number(new Date().getMonth())+1),
          },
        ],
        series: [
          {
            type: "custom",
            coordinateSystem: "calendar",
            renderItem: renderItem,
            dimensions: [null, { type: "ordinal" }],
            data: getVirtulData(new Date().getFullYear()),
          },
        ],
      };
      chartthree.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
.el-card {
  background-color: rgb(35, 42, 53);
  padding: 0;
}
@{deep} .el-card__body {
  padding: 0;
}
.el-col {
  margin-top: 10px;
}
.firstscreen_content {
  height: 100%;
  .first_screen_echarts {
    height: 600px;
    .chartone,
    .charttwo,
    .chartthree {
      height: 300px;
      background-color: rgb(29, 35, 44);
      // border-right: 1px solid rgb(46, 55, 90);
    };
  }
}
</style>