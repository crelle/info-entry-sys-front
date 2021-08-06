//自调用函数
(function () {
    // 1、页面一加载就要知道页面宽度计算
    var setFont = function () {
        // 因为要定义变量可能和别的变量相互冲突，污染，所有用自调用函数
        var html = document.documentElement;// 获取html
        // 获取宽度
        var width = html.clientWidth;

        // 判断
        if (width < 1024) width = 1024
        if (width > 1920) width = 1920
        // 设置html的基准值
        var fontSize = width / 80 + 'px';
        // 设置给html
        html.style.fontSize = fontSize;
    }
    setFont();
    // 2、页面改变的时候也需要设置
    // 尺寸改变事件
    window.onresize = function () {
        setFont();
    }
})();

//项目数统计
(function () {
    var myechart = echarts.init($('.pie')[0]);
    option = {
        // 控制提示
        tooltip: {
            // 非轴图形，使用item的意思是放到数据对应图形上触发提示
            trigger: 'item',
            // 格式化提示内容：
            // a 代表图表名称 b 代表数据名称 c 代表数据  d代表  当前数据/总数据的比例
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 控制图表
        series: [
            {
                // 图表名称
                name: '地区',
                // 图表类型
                type: 'pie',
                // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
                // 百分比基于  图表DOM容器的半径
                radius: ['10%', '70%'],
                // 图表中心位置 left 50%  top 50% 距离图表DOM容器
                center: ['50%', '50%'],
                // 半径模式，另外一种是 area 面积模式
                roseType: 'radius',
                // 数据集 value 数据的值 name 数据的名称
                data: [
                    { value: 20, name: '云南' },
                    { value: 5, name: '北京' },
                    { value: 15, name: '山东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 35, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 40, name: '湖北' }
                ],
                //文字调整
                label: {
                    fontSize: 10
                },
                //引导线
                labelLine: {
                    length: 8,
                    length2: 10
                }
            }
        ],
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff']
    };
    myechart.setOption(option);
})();



// 地市碳排放量
(function () {
    // 中间省略的数据  准备三项
    var item = {
        name: '',
        value: 1200,
        // 柱子颜色
        itemStyle: {
            color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        // 工具提示隐藏
        tooltip: {
            extraCssText: 'opacity:0'
        }
    };
    option = {
        // 工具提示
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: 'item',
            // 轴触发提示才有效
            axisPointer: {
                // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
                type: 'shadow'
            }
        },
        // 图表边界控制
        grid: {
            // 距离 上右下左 的距离
            left: '0',
            right: '3%',
            bottom: '3%',
            top: '5%',
            // 大小是否包含文本【类似于boxsizing】
            containLabel: true,
            //显示边框
            show: true,
            //边框颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        // 控制x轴
        xAxis: [
            {
                // 使用类目，必须有data属性
                type: 'category',
                // 使用 data 中的数据设为刻度文字
                data: ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市',],
                // 刻度设置
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                },
                //文字
                axisLabel: {
                    color: '#4c9bfd'
                }
            }
        ],
        // 控制y轴
        yAxis: [
            {
                // 使用数据的值设为刻度文字
                type: 'value',
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                },
                //文字
                axisLabel: {
                    color: '#4c9bfd'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
            }
        ],
        // 控制x轴
        series: [

            {
                // series配置
                // 颜色
                itemStyle: {
                    // 提供的工具函数生成渐变颜色
                    color: new echarts.graphic.LinearGradient(
                        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#00fffb' }, // 0 起始颜色
                            { offset: 1, color: '#0061ce' }  // 1 结束颜色
                        ]
                    )
                },
                // 图表数据名称
                name: '用户统计',
                // 图表类型
                type: 'bar',
                // 柱子宽度
                barWidth: '60%',
                // 数据
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
            }
        ]
    };
    var myechart = echarts.init($('.users .bar')[0]);
    myechart.setOption(option);
})();
//企业排名
(function () {
    var serveTBar = echarts.init($('.companyChart')[0]);

    serveTBar.setOption(getEcharts3DBar(['彼欧西气体', '卡利肯新光讯', '申辉科技材料', '申源集团'], [5, 36, 10, 20, 15], '01'));
})();
function getEcharts3DBar(xAxisData, data, colorType) {
    var colorArr = [];
    if (colorType == '01') {
        colorArr = ["#2886c6", "#50bfda", "#89e3ec"];
    } else {
        colorArr = ["#28c1c6", "#50dac0", "#87e8c7"];
    }
    var color = {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
            {
                offset: 0,
                color: colorArr[0],
            },
            {
                offset: 0.5,
                color: colorArr[0],
            },
            {
                offset: 0.5,
                color: colorArr[1],
            },
            {
                offset: 1,
                color: colorArr[1],
            },
        ],
    };
    var barWidth = 30;
    var constData = [];
    var showData = [];
    data.filter(function (item) {
        if (item) {
            constData.push(1);
            showData.push(item);
        } else {
            constData.push(0);
            showData.push(
                {
                    value: 1,
                    itemStyle: {
                        normal: {
                            borderColor: "rgba(0,0,0,0)",
                            borderWidth: 2,
                            color: "rgba(0,0,0,0)",
                        },
                    },
                }
            );
        }
    });
    return {
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                var str = params[0].axisValue + "：";
                params.filter(function (item) {
                    if (item.componentSubType == "bar") {
                        str += "<br/>" + item.seriesName + "：" + item.value;
                    }
                });
                return str;
            },
        },
        grid: {
            left: "3%", //图表距边框的距离
            right: "3%",
            top: "15%",
            bottom: "5%",
            containLabel: true,
        },
        xAxis: {
            data: xAxisData,
            axisTick: {
                show: false,
            },
        },
        yAxis: {
            axisTick: {
                show: true,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
            },
            splitLine: {
                lineStyle: {
                    color: ['#ddd'],
                    width: 0.3,
                    type: 'solid'
                }
            },
        },
        series: [
            {
                z: 1,
                name: '数据',
                type: "bar",
                barWidth: barWidth,
                barGap: "0%",
                data: data,
                itemStyle: {
                    normal: {
                        color: color,
                    },
                },
            },
            {
                z: 2,
                name: '数据',
                type: "pictorialBar",
                data: constData,
                symbol: "diamond",
                symbolOffset: ["0%", "50%"],
                symbolSize: [barWidth, 10],
                itemStyle: {
                    normal: {
                        color: color,
                    },
                },
                tooltip: {
                    show: false,
                },
            },
            {
                z: 3,
                name: '数据',
                type: "pictorialBar",
                symbolPosition: "end",
                data: showData,
                symbol: "diamond",
                symbolOffset: ["0%", "-50%"],
                symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
                itemStyle: {
                    normal: {
                        borderColor: colorArr[2],
                        borderWidth: 2,
                        color: colorArr[2],
                    },
                },
                tooltip: {
                    show: false,
                },
            },
        ],
    };
}
//销售
(function () {
    var option = {
        //鼠标提示工具
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            // 类目类型                                  
            type: 'category',
            // x轴刻度文字                                  
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false//去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd'//文本颜色
            },
            axisLine: {
                show: false//去除轴线  
            },
            boundaryGap: false//去除轴内间距
        },
        yAxis: {
            // 数据作为刻度文字                                  
            type: 'value',
            axisTick: {
                show: false//去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd'//文本颜色
            },
            axisLine: {
                show: false//去除轴线  
            },
            boundaryGap: false//去除轴内间距
        },
        //图例组件
        legend: {
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色

            },
            right: '10%'//距离右边10%
        },
        // 设置网格样式
        grid: {
            show: true,// 显示边框
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
        },
        series: [{
            name: '预期销售额',
            // 数据                                  
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            // 图表类型                                  
            type: 'line',
            // 圆滑连接                                  
            smooth: true,
            itemStyle: {
                color: '#00f2f1'  // 线颜色
            }
        },
        {
            name: '实际销售额',
            // 数据                                  
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            // 图表类型                                  
            type: 'line',
            // 圆滑连接                                  
            smooth: true,
            itemStyle: {
                color: '#ed3f35'  // 线颜色
            }
        }]
    };
    var myechart = echarts.init($('.line')[0]);
    myechart.setOption(option);

    //点击效果
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    $('.sales ').on('click', '.caption a', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        //option series   data
        //获取自定义属性值
        var key = $(this).attr('data-type');
        //取出对应的值
        key = data[key];
        //将值设置到 图表中
        option.series[0].data = key[0];
        option.series[1].data = key[1];
        //再次调用才能在页面显示
        myechart.setOption(option);
    });
    //定时器
    var index = 0;
    var timer = setInterval(function () {
        index++;
        if (index > 4) {
            index = 0;
        };
        $('.sales .caption a').eq(index).click();
    }, 2000);
})();
// 企业排名
(function () {
    var serveTBar = echarts.init($('.companyChart')[0]);


    serveTBar.setOption(getEcharts3DBar(['电力、热', '服务2', '服务3', '服务4', '服务5'], [5, 36, 10, 20, 15], '01'));
})();
function getEcharts3DBar(xAxisData, data, colorType) {
    var colorArr = [];
    if (colorType == '01') {
        colorArr = ["#2886c6", "#50bfda", "#89e3ec"];
    } else {
        colorArr = ["#28c1c6", "#50dac0", "#87e8c7"];
    }
    var color = {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
            {
                offset: 0,
                color: colorArr[0],
            },
            {
                offset: 0.5,
                color: colorArr[0],
            },
            {
                offset: 0.5,
                color: colorArr[1],
            },
            {
                offset: 1,
                color: colorArr[1],
            },
        ],
    };
    var barWidth = 30;
    var constData = [];
    var showData = [];
    data.filter(function (item) {
        if (item) {
            constData.push(1);
            showData.push(item);
        } else {
            constData.push(0);
            showData.push(
                {
                    value: 1,
                    itemStyle: {
                        normal: {
                            borderColor: "rgba(0,0,0,0)",
                            borderWidth: 2,
                            color: "rgba(0,0,0,0)",
                        },
                    },
                }
            );
        }
    });
    return {
        title: {
            subtext: '单位：万吨'
        },
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                var str = params[0].axisValue + "：";
                params.filter(function (item) {
                    if (item.componentSubType == "bar") {
                        str += "<br/>" + item.seriesName + "：" + item.value;
                    }
                });
                return str;
            },
        },
        grid: {
            left: "3%", //图表距边框的距离
            right: "3%",
            top: "15%",
            bottom: "8%",
            containLabel: true,
        },
        xAxis: {
            data: xAxisData,
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            },
        },
        yAxis: {
            axisTick: {
                show: true,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#999'
                }
            },
            splitLine: {
                lineStyle: {
                    color: ['#ddd'],
                    width: 0.3,
                    type: 'solid'
                }
            },
        },
        series: [
            {
                z: 1,
                name: '数据',
                type: "bar",
                barWidth: barWidth,
                barGap: "0%",
                data: data,
                itemStyle: {
                    normal: {
                        color: color,
                    },
                },
            },
            {
                z: 2,
                name: '数据',
                type: "pictorialBar",
                data: constData,
                symbol: "diamond",
                symbolOffset: ["0%", "50%"],
                symbolSize: [barWidth, 10],
                itemStyle: {
                    normal: {
                        color: color,
                    },
                },
                tooltip: {
                    show: false,
                },
            },
            {
                z: 3,
                name: '数据',
                type: "pictorialBar",
                symbolPosition: "end",
                data: showData,
                symbol: "diamond",
                symbolOffset: ["0%", "-50%"],
                symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
                itemStyle: {
                    normal: {
                        borderColor: colorArr[2],
                        borderWidth: 2,
                        color: colorArr[2],
                    },
                },
                tooltip: {
                    show: false,
                },
            },
        ],
    };
}

