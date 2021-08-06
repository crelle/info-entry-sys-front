//左边
var myChart2 = echarts.init(document.getElementById('right_bottom_charts1'));
var option_wq = {
    title: {
        // text: '单位:kg',
        // padding: 34, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
        x: 'left', //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
      
        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#fff',
        },

    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
    },

    grid: {
  
  
        bottom: '0%',
      
        containLabel: true,
    },
    xAxis: {
        type: 'value',
        show: false, //直接设置show|的属性的话x轴的轴线和垂直于它的网格线以及x轴数据会一起显示隐藏，这里需要全部隐藏包括所以直接show，如果需要单独给它们设置显示隐藏详见以下设置
        // axisLine: {//y轴轴线
        //     show: false
        // },
        // axisTick: {
        //     //y轴刻度线
        //     show: false
        // },
        // splitLine: {//去除网格线
        //     show: false
        // },
        bottom: 2,
        boundaryGap: ['0%', '1%'], //留白大小，坐标轴1边留白,横向柱状图的右侧label**人不会超出宽度被隐藏
    },
    yAxis: {
        // boundaryGap: ['0%', '1%'], //留白大小，坐标轴1边留白
        axisLabel: {
            fontSize: 9,
            color: '#00caff',
            interval: 0,
            //margin: 95,
            // margin: 25,
            //textStyle: {
            //    align: 'left',
            //    baseline: 'left'
            //}
        },
        type: 'category',
        data: ['江苏巨力钢绳有限公司', '江苏恒顺醋业股份有限公司', '丹阳市助剂化工厂有限公司', '南通醋酸纤维有限公司', '宿迁南钢金鑫轧钢有限公司'],
        axisTick: {
            //y轴刻度线
            show: false,
        },
        axisLine: {
            //y轴轴线
            show: false,
        },
    },
    series: [
        {
            name: '占比',
            top: 10,
            color: '#00caff',
            type: 'bar',
            stack: '总量',
            barCategoryGap: 2,
            itemStyle: {
                //通常情况下：
                normal: {
                    barBorderRadius: 8,
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params) {
                        var colorList = [
                            ['#03B8DF', '#021E4C'],
                            ['#03B8DF', '#021E4C'],
                            ['#03B8DF', '#021E4C'],
                            ['#03B8DF', '#021E4C'],
                        ]
                        var index = params.dataIndex
                        if (params.dataIndex >= colorList.length) {
                            index = params.dataIndex - colorList.length
                        }
                        return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            {
                                offset: 0,
                                color: colorList[index][0],
                            },
                            {
                                offset: 1,
                                color: colorList[index][1],
                            },
                        ])
                    },
                },
            },
            label: {
                formatter: '{c}%',
                right: '3%',
                show: true,
                textStyle: {
                    fontWeight: 400,
                    fontSize: 8,
                    color: '#00e6fe',
                },
                position: 'right',
            },
            //设置柱的宽度
            barWidth: 7,
            //  height:'70%',
            data: [99.98, 99.97, 99.94, 99.87, 99.84],
            // data: countData
        },
    ],
};

myChart2.setOption(option_wq);
