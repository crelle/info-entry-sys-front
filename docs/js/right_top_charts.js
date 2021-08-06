
// 基于准备好的dom，初始化echarts实例
var hotWord = echarts.init(document.getElementById('right_top_tubiao'));

var hotWord_option = {
    tooltip: {
        trigger: 'item',
       formatter: "{b} : {c} ({d}%)"
    },
    title: {
      text: '支撑系统配比',
      show:false,
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#44f9f1ad',
        fontWeight: 'bolder',
        // textBorderColor:'#FFF',
        textBorderWidth:15,
        textShadowOffsetX:2,
        textShadowOffsetY: 6,
      }
    },
    legend: {
        orient: 'horizontal',
        bottom:'3%',
        show:false,
        data: ['输电','变电','配电','新业务'],
        icon: 'circle',
        textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize:10
        }
    },
    calculable: true,
    series: [{
        name: '',
        color: [ '#14f1ea','#1854eb','#9b36f9','#46a3f3'],	
        type: 'pie',
        //起始角度，支持范围[0, 360]
        startAngle: 180,
        //饼图的半径，数组的第一项是内半径，第二项是外半径
        radius: [20, 60],
        //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
        center: ['50%', '45%'],

        //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
        // 'radius' 面积展现数据的百分比，半径展现数据的大小。
        //  'area' 所有扇区面积相同，仅通过半径展现数据大小
        roseType: 'area',
        //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: true,
                formatter:"{b}({d}%)"
            },
            emphasis: {
                show: true
            }
        },
        labelLine: {
            normal: {
                show: true,
                length2: 0.5,
            },
            emphasis: {
                show: false
            }
        },
        data: [    
            {value: 324, name: "输电",label: {show: false},labelLine: {show: false}},
            {value: 533, name: "变电",label: {show: false},labelLine: {show: false}},
            {value: 545, name: "配电",label: {show: false},labelLine: {show: false}},
            {value: 123, name: "新业务",label: {show: false},labelLine: {show: false}}
        ]
    }]
};
// 使用刚指定的配置项和数据显示图表。
hotWord.setOption(hotWord_option);


function right_topAjax(type,comon_ip,url){
	$.ajax({
        type: type, //方式
		url: comon_ip+url,  //路径
        dataType: "json",
        success: function (data) {
           let list =[]
            list.push({value: data.list[0]["iot_sys_sd_count"], name: "输电",label: {show: false},labelLine: {show: false}},)
            list.push({value: data.list[0]["iot_sys_bd_count"], name: "变电",label: {show: false},labelLine: {show: false}},)
            list.push({value: data.list[0]["iot_sys_pd_count"], name: "配电",label: {show: false},labelLine: {show: false}},)
            list.push({value: data.list[0]["iot_sys_yd_count"], name: "新业务",label: {show: false},labelLine: {show: false}},)
            option.series[0].data=list;
            hotWord.setOption(option);
            $('.iot_sys_sd_count').html(data.list[0]["iot_sys_sd_count"])
            $('.iot_sys_bd_count').html(data.list[0]["iot_sys_bd_count"])
            $('.iot_sys_pd_count').html(data.list[0]["iot_sys_pd_count"])
            $('.iot_sys_yd_count').html(data.list[0]["iot_sys_yd_count"])
            var counts = data.list[0]["iot_sys_sd_count"] +data.list[0]["iot_sys_bd_count"]+data.list[0]["iot_sys_pd_count"]+data.list[0]["iot_sys_yd_count"];
            $("#zhichengxitong,#zhichengxitong2").html(counts);
        }
    }) //成功后
}

