
var right_mid_tubiao1 = echarts.init(document.getElementById('right_mid_tubiao1'));
var right_mid_tubiao2 = echarts.init(document.getElementById('right_mid_tubiao2'));

var colorArray = [
	{
	   top: '#14f1ea', //绿
	   bottom: 'rgba(11,42,84, 0.3)'
   },
   {
	   top: '#1854eb', //蓝
	   bottom: 'rgba(11,42,84,.3)'
   }, {
	   top: '#9b36f9', //深蓝
	   bottom: 'rgba(11,42,84,.3)'
   },
   {
	   top: '#46a3f3', //粉
	   bottom: 'rgba(11,42,84,.3)'
   }
];
var right_mid_tubiao1option = {
	tooltip: {
		 show: true,
		 formatter: "{b}:{c}"
	   },
    grid: {
		 left: '10%',
		 top: '5%',
		 right: '10%',
		 bottom: '8%',
		 containLabel: true
	   },
 
   xAxis: {
	   type: 'value',
	   show:false,
	   position: 'top',
	   axisTick: {
		   show: false
	   },
	   axisLine: {
		   show: false,
		   lineStyle: {
			   color: '#fff',
		   }
	   },
	   splitLine: {
		   show: false
	   },
   },
   yAxis: [{
		   type: 'category',
		   axisTick: {
			   show: false,
			   alignWithLabel: false,
			   length: 5,

		   },
		   "splitLine": { //网格线
			   "show": false
		   },
		   inverse: 'true', //排序
		   axisLine: {
			   show: false,
			   lineStyle: {
				   color: '#14f1ea',
			   }
		   },
		   data: ['输电', '变电', '配电', '用电']
	   }

   ],
   series: [{
		   name: '物模型',
		   type: 'bar',
			   label: {
			   normal: {
				 show: true,
				 position: 'right',
				 formatter: [
                    ' {d|●}',
                    '{a|{c}%}'
                ].join(','),
                rich: {
                    d: {
                        color: '#3CDDCF',
                    },
                    a: {
                        color: '#fff',
                    }
                }
			   }
			 },
		   itemStyle: {
			   normal: {
				   show: true,
				   color: function(params) {
					   let num = colorArray.length;
					   return {
						   type: 'linear',
						   colorStops: [{
							   offset: 0,
							   color: colorArray[params.dataIndex % num].bottom
						   }, {
							   offset: 1,
							   color: colorArray[params.dataIndex % num].top
						   }, {
							   offset: 0,
							   color: colorArray[params.dataIndex % num].bottom
						   }, {
							   offset: 1,
							   color: colorArray[params.dataIndex % num].top
						   }, {
							   offset: 0,
							   color: colorArray[params.dataIndex % num].bottom
						   }, {
							   offset: 1,
							   color: colorArray[params.dataIndex % num].top
						   }, {
							   offset: 0,
							   color: colorArray[params.dataIndex % num].bottom
						   }, {
							   offset: 1,
							   color: colorArray[params.dataIndex % num].top
						   }, {
							   offset: 0,
							   color: colorArray[params.dataIndex % num].bottom
						   }, {
							   offset: 1,
							   color: colorArray[params.dataIndex % num].top
						   }],
						   //globalCoord: false
					   }
				   },
				   barBorderRadius: 70,
				   borderWidth: 0,
				   borderColor: '#333',
			   }
		   },
		   barGap: '0%',
		   barCategoryGap: '50%',
		   data: [60, 132, 89, 134]
	   }

   ]
};
right_mid_tubiao1.setOption(right_mid_tubiao1option);



var dataStyle = {
    normal: {
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        shadowBlur: 0,
        shadowColor: '#203665'
    }
};
var right_mid_tubiao2option = {
	
    series: [{
        name: '完整率',
        type: 'pie',
        clockWise: false,
        radius: [30, 40],
        itemStyle: dataStyle,
        hoverAnimation: false,
        center: ['24%', '65%'],
        data: [
			{
            value: 25,
            label: {
                normal: {
                    rich: {
                        a: {
                            color: '#3a7ad5',
                            align: 'center',
                            fontSize: 10,
                            fontWeight: "bold"
                        },
                        b: {
                            color: '#fff',
                            align: 'center',
                            fontSize: 10
                        }
                    },
                    formatter: function(params){
                        return "{b|完整率}\n\n"+"{a|"+params.value+"个}";
					},
					
					position: 'center',
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'normal',
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#2c6cc4',
                    shadowColor: '#2c6cc4',
                    shadowBlur: 0
                }
            }
		}, 
		{
            value: 75,
            name: 'invisible',
            itemStyle: {
                normal: {
                    color: '#24375c'
                },
                emphasis: {
                    color: '#24375c'
                }
            }
        }]
    }, {
        name: '一致率',
        type: 'pie',
        clockWise: false,
        radius: [30, 40],
        itemStyle: dataStyle,
        hoverAnimation: false,
        center: ['50%', '35%'],
        data: [{
            value: 50,
            label: {
                normal: {
                    rich: {
                        a: {
                            color: '#14f1ea',
                            align: 'center',
                            fontSize: 10,
                            fontWeight: "bold"
                        },
                        b: {
                            color: '#fff',
                            align: 'center',
                            fontSize: 10
                        }
                    },
                    formatter: function(params){
                        return "{b|一致率}\n\n"+"{a|"+params.value+"个}";
                    },
					position: 'center',
					top:'20%',
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'normal',
						color: '#fff',
						align: 'center',
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#ef45ac',
                    shadowColor: '#ef45ac',
                    shadowBlur: 0
                }
            }
        }, {
            value: 50,
            name: 'invisible',
            itemStyle: {
                normal: {
                    color: '#412a4e'
                },
                emphasis: {
                    color: '#412a4e'
                }
            }
        }]
    }, {
        name: '使用率',
        type: 'pie',
        clockWise: false,
        radius: [30, 40],
        itemStyle: dataStyle,
        hoverAnimation: false,
        center: ['76%', '65%'],
        data: [{
            value: 75,
            label: {
                normal: {
                    rich: {
                        a: {
                            color: '#603dd0',
                            align: 'center',
                            fontSize: 10,
                            fontWeight: "bold"
                        },
                        b: {
                            color: '#fff',
                            align: 'center',
                            fontSize: 10
                        }
                    },
                    formatter: function(params){
                        return "{b|使用率}\n\n"+"{a|"+params.value+"个}";
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'normal',
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#613fd1',
                    shadowColor: '#613fd1',
                    shadowBlur: 0
                }
            }
        }, {
            value: 25,
            name: 'invisible',
            itemStyle: {
                normal: {
                    color: '#453284'
                },
                emphasis: {
                    color: '#453284'
                }
            }
        }]
    }]
}
right_mid_tubiao2.setOption(right_mid_tubiao2option);









function right_mid_ajax(type,comon_ip,url){
	$.ajax({
		type: type, //方式
		url: comon_ip+url,  //路径
		dataType: "json",
		success: function (data) {
			hotWordData.sData =[];
			main2_data =[
				{value:335, name:'完整率'},
				{value:310, name:'使用率'},
				{value:234, name:'一致率'}
			]; 
			hotWordData.sData.push(data.list[0]["iot_tsl_sd_count"]) 
			hotWordData.sData.push(data.list[0]["iot_tsl_bd_count"]) 
			hotWordData.sData.push(data.list[0]["iot_tsl_pd_count"]) 
			hotWordData.sData.push(data.list[0]["iot_tsl_yd_count"]) 
			optionmain.series[0].data= hotWordData.sData;
			main.setOption(optionmain);
			main2.setOption(main2_option);
	
		}
	}) //成功后
}



