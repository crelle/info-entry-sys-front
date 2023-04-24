<template>
  <div class="contain">
    <div id="myChart" style="width: 100%; height: 23vh"></div>
  </div>
</template>
  
<script>
import * as echarts from "echarts";
//客户分布
import { guestDepartment } from "@/api/largeScreen";
export default {
  name: "T",

  components: {},
  created() {
    this.option.series[0].data[0].value = this.datas;
  },
  mounted() {
    var myChartDdom = document.getElementById("myChart");
    var myChart = echarts.init(myChartDdom);
    this.option && myChart.setOption(this.option);
    this.guestDepartmentfun();
  },
  data() {
    return {
      // 客户分布总数据
      guestDepartmentData: [],
      ii: -1,
      datas: [], // [{name:"a",value:12320},{name:"b",value:12320},{name:"c",value:12320},]
      option: {
        color: ["#d05d26"], // 围起来的边框颜色
        title: {
          //   text: "雷达图名称",
        },
        // 标题
        // legend: {
        //   data: ['A']
        // },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "紫金智信", max: 2, color: "#ffffff" },
            { name: "华为", max: 4, color: "#ffffff" },
            // { name: "飞创", max: 9, color: "#ffffff" },
            // { name: "闪联", max: 3, color: "#ffffff" },
            // { name: "金发", max: 52, color: "#ffffff" },
            // { name: "某某", max: 25, color: "#ffffff" },
          ],

          axisLine: {
            lineStyle: {
              color: "#b06f13", // 分割线颜色
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: "rgba(0,0,0,0)", // 整个雷达图图表背景的颜色
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#83591d", // 设置网格的颜色
            },
          },
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [],
                name: "A",
                label: {
                  normal: {
                    show: true,
                    formatter: function (params) {
                      return params.value;
                    },
                  },
                },
                areaStyle: {
                  // 区域颜色
                  color: "#d19336",
                },
              },
            ],
          },
        ],
      },
    };
  },

  methods: {
    // 客户分布
    guestDepartmentfun() {
      let clientdata = {};
      this.datas = [];
      guestDepartment(clientdata).then((res) => {
        this.guestDepartmentData = res.data;
        console.log(this.guestDepartmentData, "-----客户分布");
        this.option.series[0].data[0].value = [];
        this.option.radar.indicator = [];
        console.log(this.option.radar.indicator, "-------22222222");
        this.guestDepartmentData.forEach((item) => {
          this.option.radar.indicator.push({
            name: item.customerName,
            max: 2,
            color: "#ffffff",
          });
          this.option.series[0].data[0].value.push(item.employeeNum);
        });

        var myChartDdom = document.getElementById("myChart");
        var myChart = echarts.init(myChartDdom);
        this.option && myChart.setOption(this.option);
      });
    },
  },
  watch: {},
  beforeDestroy() {},
};
</script>
  
<style lang="less" scoped>

</style>
  