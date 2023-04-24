<template>
  <div class="contain">
    <div style="width: 100%; height: 24vh" id="manage"></div>
  </div>
</template>
  
  <script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.test();
  },
  methods: {
    test() {
      var chartDom = document.getElementById("manage");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        // title: {
        //   text: "Referer of a Website",
        //   subtext: "Fake Data",
        //   left: "center",
        // },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        // },
        series: [
          {
            // name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "项目经理A" },
              { value: 735, name: "项目经理B" },
              { value: 580, name: "项目经理C" },
              { value: 484, name: "项目经理D" },
              { value: 300, name: "项目经理E" },
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
      };
      option && myChart.setOption(option);
    },
  },
};
</script>
  
<style lang="less" scoped>

</style>