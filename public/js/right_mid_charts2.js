// 初始化图表标签
    var myChart_wu2 = echarts.init(document.getElementById('right_top_charts2'));
    var BorderWidth_wu2 = '4';
    //反方向剩下部分的样式
    var placeHolderStyle_wu2 = {
        normal: {
            label: {
                show: false,
                position: "center"
            },
            labelLine: {
                show: false
            },
            color: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0
        },
        emphasis: {
            color: "#dedede",
            borderColor: "#dedede",
            borderWidth: 0
        }
    };
    var options_wu2 = {
        backgroundColor: '#020c2a',
        color: ['#53f1f2', '#4ebefd', '#30ed9d', '#faa234', "#fff"],
        legend: {
            show: true,
            orient:'vertical',
            left:'left',
            top:'middle',
            data: ['正常', '次要', '警告','重要','严重'],
            textStyle:{
                color:'#fff',
                fontSize:16
            }
        },
        series: [{
            name: '正常',
            type: 'pie',
            clockWise: true, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [60, 61],
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'outside'
                    },
                    labelLine: {
                        show: false,
                        length: 60,
                        smooth: 0.5
                    },
                    borderWidth: BorderWidth_wu2,
                    shadowBlur: 40,
                    borderColor: "#53f1f2",
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [{
                value: 7,
                name: '70%'
            },
             {
                value: 3,
                name: '',
                itemStyle: placeHolderStyle_wu2
            }
            ]
        }, {
            name: '次要',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: [50, 51],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
                        length: 60,
                        smooth: 0.5
                    },
                    borderWidth: BorderWidth_wu2,
                    shadowBlur: 40,
                    borderColor: "#4ebefd",
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [{
                value: 6,
                name: '60%'
            }, 
            {
                value: 4,
                name: '',
                itemStyle: placeHolderStyle_wu2
            }
            ]
        },  {
            name: '警告',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: [60, 61],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
                        length: 60,
                        smooth: 0.5
                    },
                    borderWidth: BorderWidth_wu2,
                    shadowBlur: 40,
                    borderColor: "#30ed9d",
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [{
                value: 5,
                name: '40%'
            }, 
            {
                value: 5,
                name: '',
                itemStyle: placeHolderStyle_wu2
            }
            ]
        },  {
            name: '重要',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: [40, 41],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
                        length: 60,
                        smooth: 0.5
                    },
                    borderWidth: BorderWidth_wu2,
                    shadowBlur: 40,
                    borderColor: "#faa234",
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [{
                value: 5,
                name: '30%'
            }, 
            {
                value: 5,
                name: '',
                itemStyle: placeHolderStyle_wu2
            }
            ]
        }, {
            name: '严重',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: [20, 21],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false,
                        length: 60,
                        smooth: 0.5
                    },
                    borderWidth: BorderWidth_wu2,
                    shadowBlur: 40,
                    borderColor: "#fff",
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [{
                value: 4,
                name: '30%'
            }, 
            {
                value: 6,
                name: '',
                itemStyle: placeHolderStyle_wu2
            }
            ]
        }]
    };
    myChart_wu2.setOption(options_wu2);


