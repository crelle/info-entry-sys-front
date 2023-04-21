<template>
    <div class="contain">
      <div style="width: 100%; height: 100%" id="dd"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  export default {
    data() {
      return {
        
      };
    },
    mounted() {
      this.test();
    },
    methods: {
      test() {
        var chartDom = document.getElementById("dd");
        var myChart = echarts.init(chartDom);
        var option;
  
        option = {
            grid: {
        top: '1%',
        bottom: '1%',
        // left: '10%',  // 可以设置左边距
        // right: '10%', // 可以设置右边距
    },
          xAxis: {
            type: "value",
            show: false,
          },
          yAxis: {
            type: "category",
            data: ["00后", "90后", "80后", "70后", "60后", "50后"],
           
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
            },
            axisLabel: {
              textStyle: {
                show: true,
                fontFamily: "微软雅黑",
                color: "#fff",
                fontSize: "12",
              },
            },
  
            splitArea: { show: false },
          },
          series: [
            {
              data: [18, 16, 8, 10, 5, 24],
              type: "bar",
              showBackground: false,
              barWidth: "12px", //柱体宽度
              
              label: {
                show: true,
                position: 'right',
                formatter: '{c}%'
              },
              itemStyle: {
                color: function (params) {
                  var colorList = [
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                        color: "#172436",
                      },
                      {
                        offset: 1, //指100%处的颜色
                        color: "#57e299",
                      },
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                        color: "#172436",
                      },
                      {
                        offset: 1, //指100%处的颜色
                        color: "#f87819",
                      },
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                        color: "#172436",
                      },
                      {
                        offset: 1, //指100%处的颜色
                        color: "#1a80e9",
                      },
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                        color: "#172436",
                      },
                      {
                        offset: 1, //指100%处的颜色
                        color: "#57e299",
                      },
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                        color: "#172436",
                      },
                      {
                        offset: 1, //指100%处的颜色
                        color: "#f87819",
                      },
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                        color: "#172436",
                      },
                      {
                        offset: 1, //指100%处的颜色
                        color: "#1a80e9",
                      },
                    ]),
                  ];
                  return colorList[params.dataIndex];
                },
                borderRadius: [0, 7, 7, 0]
              },
            },
          ],
        };
  
        option && myChart.setOption(option);
      },
    },
  };
  </script>
  
  <style>
  
  </style>
  