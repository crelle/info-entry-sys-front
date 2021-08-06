
    var mybar = echarts.init(document.getElementById('left_bottom_charts1'));
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
        xAxis: [
            {
            // x轴可以不显示，但是数据得有
            data: ["南京", "无锡", "徐州","常州","苏州","盐城","淮安","南通","宿迁","扬州","镇江","泰州","连云港"],
            axisTick: {
                alignWithLabel: true
            },  
					

			
				

            width:1,
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    //x轴的文字改为竖版显示
                    var str = value.split("");
                    return str.join("\n");
                },
                textStyle: {
                  //文字样式
                  color: "#fff",
                  fontSize: "12"
                }
            }, 
        }
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
        series: [{
            name: '南京',
            type: 'bar',
            barWidth: "60%",
			showBackground: true,
            backgroundStyle: {
                color: 'hsl(215deg 84% 12%)',
            },
             
            itemStyle: {
                normal: {
                    // 柱状图顶部颜色
                    // color: '#297bcd',
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 1,
                        color: '#297bcd'
                    }, {
                        offset: 0,
                        color: 'hsl(193deg 100% 50%)'
                    }]),                    
                    backgroundStyle: {
                        color: 'hsl(215deg 84% 12%)'
                    }
                   
                }
            },
            // 第一个data,数值三项相同
            data: data_mybar
            
        }, {
            name: '无锡',
            type: 'bar',
            itemStyle: {
				
                // 柱状图底部颜色
                normal: {
                    // 柱状图顶部颜色
                    // color: '#297bcd',
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 1,
                        color: '#297bcd'
                    }, {
                        offset: 0,
                        color: 'hsl(193deg 100% 50%)'
                    }]),
                    backgroundStyle: {
                        color: 'hsl(215deg 84% 12%)'
                    }
                }
            },
            // 第二个data,数值三项相同
            data: data_mybar
         }/*, {
            type: 'bar',
            itemStyle: {
                // 柱体颜色
                normal: {
                    color: '#44e8f9'
                }
            },
            barWidth: 20,
            // 第三个data,数值三项相同
            data: data_mybar
        }*/]
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