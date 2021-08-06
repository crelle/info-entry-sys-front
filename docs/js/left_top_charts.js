
    var mybar = echarts.init(document.getElementById('top_content_bottom_tubiao2'));
    var data_mybar = [100, 505, 202,103];
    let option = {
        color: [ '#14f1ea','#1854eb','#9b36f9','#46a3f3'],
        //画布背景色设置
        tooltip: {
            trigger: "axis"
        },
        calculable: true,
        grid: {
            left: '0',
            top: '0',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [
            {
                type: "category",
                data:['输电','变电','配电','新业务'],
                axisLabel: {
                    textStyle: {
                      //文字样式
                      color: "#0089fe",
                      fontSize: "12"
                    }
                }
            }
        ],
        yAxis: [
            {
                type: "value",
                show:false,
                axisLine: {
                    //y轴
                    show: false
                },
                axisTick: {
                    //刻度线
                    show: false
                },
                splitLine: {
                    //网格线
                    show: false
                }
            }
        ],
        series: [
            {
                name: "",
                type: "bar",
                //设置柱状图宽度
                barWidth: "16",
                barMinHeight: 10,
                data: data_mybar,
                itemStyle: {
                    normal: {
                        //柱形图圆角，顺时针左上，右上，右下，左下）
                        barBorderRadius: [18, 18, 18, 18],
                        //设置柱状图颜色渐变
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 1,
                            color: '#297bcd'
                        }, {
                            offset: 0,
                            color: '#06f1a5'
                        }]),
                        shadowColor: '#9b36f9',
                        shadowBlur: 10,
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#14f1ea',
                                fontSize: 14
                            }
                        }
                    }
                }
            }
        ]
    };




mybar.setOption(option); 
function leftbottom_ajax(type,comon_ip,url){
    $.ajax({
        type: type, //方式
        url: comon_ip+url,  //路径
        dataType: "json",
        success: function (data) {
            data_mybar = [];
            data_mybar.push(data.list1[0]["iot_data_zc_sd_count"]) 
            data_mybar.push(data.list1[0]["iot_data_zc_bd_count"]) 
            data_mybar.push(data.list1[0]["iot_data_zc_pd_count"]) 
            data_mybar.push(data.list1[0]["iot_data_zc_yd_count"]) 
            mabar_option.series[0].data=  data_mybar;
            mybar.setOption(mabar_option); 
           $('#leftwenzione1').html()
        }
    }) //成功后执行的函数
}