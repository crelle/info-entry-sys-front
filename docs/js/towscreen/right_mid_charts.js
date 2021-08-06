
    var mybar = echarts.init(document.getElementById('right_mid_charts1'));
    var data_mybar = [1600, 1050, 1220,845,1410,258,572,1092,382,637,368,638,369];
    var mabar_option = { 	
        calculable: true,	
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',			
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
			data: ['煤', '天然气', '柴油', '热力', '电力'],
			top: 50,
			right: 'auto',
			textStyle: {
				color: '#ddd', // 文字的颜色。
			},
			itemWidth: 8,
			itemHeight: 6,
		},
        xAxis: [
			{
				// 使用类目，必须有data属性
				type: 'category',
				// 使用 data 中的数据设为刻度文字
				// data: ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市'],
				data: [
					'南京市',
					'无锡市',
					'徐州市',
					'常州市',
					'苏州市',
					'南通市',
					'连云港市',
					'淮安市',
					'盐城市',
					'扬州市',
					'镇江市',
					'泰州市',
					'宿迁市',
				],
				// 刻度设置
				axisTick: {
					// true意思：图形在刻度中间
					// false意思：图形在刻度之间
					alignWithLabel: false,
					show: false,
				},
				//文字
				axisLabel: {
					color: '#ddd',
					fontSize: 10,
					interval: 0,
					rotate: 45, //角度顺时针计算的
				},

				axisLine: {
					lineStyle: {
						color: '#494F60', //x轴下边框颜色
					},
				},
			},
		],
        yAxis: [
            {
                type: 'value',
                splitLine:{
                    lineStyle:{
                        color: ['#ddd'],
                        width: 0.2,
                       type: 'solid'
                   }
                },
               axisLabel: {
                    textStyle: {
                      //文字样式
                      color: "#fff",
                      fontSize: "12"
                    }
                }
            }
            
        ],
        series: [
			{
				name: '煤',
				type: 'bar',
				stack: '地市碳排放量',
				barWidth: 10, //柱图宽度
				data: [
					620.21,
					23.78,
					701.42,
					190.68,
					4045.79,
					183.76,
					0.43,
					488.78,
					1836.17,
					0.00,
					663.06,
					39.07,
					487.45
				],
				itemStyle: {
					normal: { color: '#3379FF' },
				},
			},
			{
				name: '天然气',
				type: 'bar',
				stack: '地市碳排放量',
				barWidth: 10, //柱图宽度
				data:[
					13.17,
					11.93,
					9.57,
					16.42,
					2834.53,
					7.85,
					25.66,
					1.98,
					61.24,
					0.00,
					238.91,
					38.11,
					1.00
				],
				itemStyle: {
					normal: { color: '#FFFF00' },
				},
			},
			{
				name: '柴油',
				type: 'bar',
				stack: '地市碳排放量',
				barWidth: 10, //柱图宽度
				data: [
					0.00,
					0.00,
					0.00,
					9.88,
					0.00,
					0.00,
					0.00,
					0.00,
					0.00,
					0.00,
					0.02,
					0.00,
					0.00
				],
				itemStyle: {
					normal: { color: '#00B679' },
				},
			},
			{
				name: '热力',
				type: 'bar',
				stack: '地市碳排放量',
				barWidth: 10, //柱图宽度
				data: [
					53.97,
					11.40,
					89.91,
					108.33,
					91.63,
					140.30,
					39.30,
					20.97,
					44.45,
					0.00,
					3.40,
					131.74,
					13.04
				],
				itemStyle: {
					normal: { color: '#00BCFB' },
				},
			},
			{
				name: '电力',
				type: 'bar',
				stack: '地市碳排放量',
				barWidth: 10, //柱图宽度
				data: [
					151.56,
					642.30,
					334.80,
					286.97,
					1795.42,
					129.57,
					41.46,
					104.45,
					194.31,
					0.00,
					359.63,
					512.86,
					109.73
				],
				itemStyle: {
					normal: { color: '#00FFFF' },
				},
			},
		],
    };
 
    mybar.setOption(mabar_option); 
  


function leftbottom_ajax(type,comon_ip,url){
    $.ajax({
        type: type, //方式
        url: comon_ip+url,  //路径
        dataType: "json",
        success: function (data) {
            data_mybar = [];
            data_mylandscape_bar =[];
            data_mybar.push(data.list1[0]["iot_data_zc_sd_count"]) 
            data_mybar.push(data.list1[0]["iot_data_zc_bd_count"]) 
            data_mybar.push(data.list1[0]["iot_data_zc_pd_count"]) 
            data_mybar.push(data.list1[0]["iot_data_zc_yd_count"]) 
            
            data_mylandscape_bar.push(data.list2[0]["iot_data_sb_sd_count"]) 
            data_mylandscape_bar.push(data.list2[0]["iot_data_sb_bd_count"]) 
            data_mylandscape_bar.push(data.list2[0]["iot_data_sb_pd_count"]) 
            data_mylandscape_bar.push(data.list2[0]["iot_data_sb_yd_count"]) 
            mabar_option.series[0].data=  data_mybar;
            mabar_option.series[1].data=  data_mybar;
            mabar_option.series[2].data=  data_mybar;
            mylandscape_bar_option.series[0].data=  data_mylandscape_bar;
            mybar.setOption(mabar_option); 
            mylandscape_bar.setOption(mylandscape_bar_option);
           
        }
    }) //成功后执行的函数
}