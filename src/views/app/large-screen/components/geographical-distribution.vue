<template>
  <div class="contain">
    <div style="width: 100%; height: 24vh" id="region"></div>
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
      var chartDom = document.getElementById("region");
      var myChart = echarts.init(chartDom);
      var option;
      var yData = [300, 452, 200, 334, 390, 330, 220, 420, 200, 334, 390, 330, 220],
        option = {
        //   backgroundColor: "#000", //整个echarts背景色
          // 头部标题
        //   title: {
        //     text: "我是柱状图立体的哦",
        //     left: "center",
        //     textStyle: {
        //       // 标题美化
        //       color: "red", // 标题颜色--红
        //     },
        //     //4.副标题
        //     subtext: "副标题", //副标题文本样式
        //     subtextStyle: {
        //       // 副标题美化
        //       color: "green", // 标题颜色--红
        //     },
        //   },
          tooltip: {
            // trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: ["西安", "福州", "厦门", "南京", "大连", "广西", "北京", "武汉", "成都", "天津", "上海", "深圳", "南昌"],
              axisTick: {
                // 坐标轴刻度相关配置
                alignWithLabel: true, // 是否显示坐标轴刻度
              },
              axisLine: {
                // 坐标轴轴线相关配置
                lineStyle: {
                  // 坐标轴轴线样式
                  color: "#fff", // 坐标轴轴线颜色
                },
                axisLabel: {
                  // 坐标轴刻度标签相关配置
                  color: "#ffffff",
                  fontSize: 14,
                  margin: 20,
                },
              },
            },
          ],
          yAxis: [
            {
              type: "value", // value(数值轴,适用于连续数据)
              axisTick: {
                // 坐标轴刻度相关配置
                show: false, // 是否显示坐标轴刻度
              },
              axisLine: {
                // 坐标轴轴线相关配置
                show: false, // 是否显示坐标轴轴线
              },
              axisLabel: {
                // 坐标轴刻度标签相关配置
                color: "#ffffff",
                fontSize: 14,
              },
              splitLine: {
                // 坐标轴在 grid 区域中的分隔线
                lineStyle: {
                  // 分割线配置
                  color: "rgba(255,255,255,0.15)", // 分割线颜色
                },
              },
            },
          ],
          series: [
            // 底部的椭圆形(象形柱图):pictorialBar
            {
              type: "pictorialBar", // pictorialBar(象形柱图)
              label: {
                // 图形上的文本标签,可用于说明图像的一些数据信息,比如值,名称等
                show: true, //是否显示标签
                position: ["17", "-30"], // 标签的位置(可以是绝对的像素值或者百分比['50%','50%',也可以是top,left等])
                color: "#01E4FF",
                fontSize: 14,
              },
              symbolSize: [40, 20], // 图形的大小用数组分别比表示宽和高,也乐意设置成10相当于[10,10]
              symbolOffset: [0, 10], // 图形相对于原本位置的偏移
              z: 12, // 象形柱状图组件的所有图形的 z 值.控制图形的前后顺序.z 值小的图形会被 z 值大的图形覆盖.
              itemStyle: {
                // 图形样式
                // echarts.graphic.LinearGradient(echarts内置的渐变色生成器)
                // 4个参数用于配置渐变色的起止位置,这4个参数依次对应右 下 左 上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  // 这里 offset: 0 1 ,表示从下往上的渐变色
                  {
                    offset: 0, // 0%处的颜色
                    color: "rgba(31,155,255,0.5)",
                  },
                  {
                    offset: 1, // 100%处的颜色
                    color: "rgba(0,229,255,0.5)",
                  },
                ]),
              },
              data: yData,
            },
            // 中间的长方形柱状图(柱状图):bar
            {
              type: "bar", // 柱状图
              barWidth: 40, // 柱条的宽度,不设时自适应
              barGap: "0%", // 柱子与柱子之间的距离
              itemStyle: {
                // 图形样式
                // color支持(rgb(255,255,255)、rgba(255,255,255,1)、#fff,也支持渐变色和纹理填充)
                // 下面就是使用线性渐变
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      offset: 0, // 0%处的颜色
                      color: "rgba(0,229,255,0.5)",
                    },
                    {
                      offset: 1, // 100%处的颜色
                      color: "#1F9BFF",
                    },
                  ],
                },
              },
              data: yData,
            },
            // 顶部的椭圆形(象形柱图):pictorialBar
            {
              type: "pictorialBar",
              symbolSize: [40, 20],
              symbolOffset: [0, -10],
              z: 12,
              symbolPosition: "end",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(31,155,255,1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,229,255,1)",
                    },
                  ],
                  false
                ),
              },
              data: yData,
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
  
  
  
  