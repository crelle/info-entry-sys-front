<template>
  <div>
    <div style="width: 100%; height: 100%" ref="echarts"></div>
  </div>
    

</template>
    
    <script>
import * as echarts from "echarts";
export default {
  data() {
    return {
    };
  },
  props: ["dataArr"],
  watch: {
    dataArr: {
    handler(newVal, oldVal) {
      console.log(newVal, oldVal,'weeeeee');
      this.start();
    },
    deep: true
  }
},
  mounted() {
    this.start();
  },
  methods: {
    start() {
        console.log("33333333333333333333");
      var myChart = echarts.init(this.$refs.echarts);
      var option;
      var img =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI8AAACOCAYAAAAIP1s2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVFNjVEQTkwRTFBMjExRUQ4RDcxQ0I0QUNBRDVBRjYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVFNjVEQTkxRTFBMjExRUQ4RDcxQ0I0QUNBRDVBRjYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUU2NURBOEVFMUEyMTFFRDhENzFDQjRBQ0FENUFGNjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUU2NURBOEZFMUEyMTFFRDhENzFDQjRBQ0FENUFGNjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ScDjoAAAgrElEQVR42uxd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";

      var trafficWay = this.dataArr

      var data = [];
      var color = ["#06bb7b", "#2aaec0", "#b9a671"];
      let bgColor = ["#0afa9e", "#20e0f5", "#f3c95e"];
      for (var i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
              normal: {
                shadowBlur: 1,
                borderWidth: 2,
                borderColor: bgColor[i],
                shadowColor: bgColor[i],
                color: color[i],
              },
            },
          },
          {
            value: this.dataArr[0].value/15,//数值控制间隔大小
            name: "",
            itemStyle: {
              normal: {
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
            },
          }
        );
      }
      var seriesOption = [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [65, 75],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "outside",
                color: "#ddd",
                textStyle: {
                    color: 'white', // 文字颜色
                    fontSize: 14 // 文字大小
                },
                formatter: function (params) {
                  if (params.name) {
                    return `{a|${params.value}}\n {b|${params.name}}`
                  }
                },
                rich:{
                    a:{color:'#FFD700',
                    fontSize:22
                },
                    b:{color:'white',
                    fontSize:14}
                }
              },
                labelLine: {
                  show: true,
                  length:40,
                  length2:20,
                },
                
            },
          },
          data: data,
        },
      ];
      option = {
        color: color,

        graphic: {
          elements: [
            {
              type: "image",
              z: 3,
              style: {
                image: img,
                width: 108,
                height: 108,
              },
              left: "center",
              top: "center",
              position: [100, 100],
            },
          ],
        },
        tooltip: {
          show: false,
        },

        toolbox: {
          show: false,
        },
        series: seriesOption,
      };

      option && myChart.setOption(option);
    },
  },
};
</script>
    
    <style>
</style>
    