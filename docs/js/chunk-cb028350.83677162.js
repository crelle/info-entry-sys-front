(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cb028350"],{"0f33":function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"firstscreen_content"},[t("el-header",{staticClass:"topname"},[a._v(" "+a._s(a.item.name)+" ")]),t("el-header",{staticClass:"toptime"},[a._v(" "+a._s(a.item.time)+" ")]),t("el-row",{attrs:{gutter:20}},[t("el-col",{attrs:{span:6}},[t("el-card",{staticClass:"echarts_map colorone"},[t("div",{staticClass:"circle"},[t("span",[a._v(a._s(a.proportion.lis1))])]),t("div",{staticClass:"dataname"},[t("span",[a._v(a._s(a.quantity.lis1))]),t("span",{attrs:{title:"本公司总项目数量"}},[a._v("人员总数量")])])])],1),t("el-col",{attrs:{span:9}},[t("el-card",{staticClass:"echarts_map colortwo"},[t("e-charts",{staticClass:"chart",attrs:{option:a.optionbt}})],1)],1),t("el-col",{attrs:{span:9}},[t("el-card",{staticClass:"echarts_map colorthree"},[t("e-charts",{staticClass:"chart",attrs:{option:a.optiontb}})],1)],1)],1),t("el-col",{staticClass:"topname"},[a._v(" 各区域人员总况 ")]),t("el-col",{staticClass:"regions",attrs:{span:24}},a._l(a.getRandomDatabt(),(function(e,n){return t("el-card",{key:n,staticClass:"block"},[t("el-col",[t("span",{staticStyle:{"font-size":"18px","font-weight":"bold"}},[a._v("地域 : ")]),a._v(a._s(e.name)+" ")]),t("el-col",[t("span",{staticStyle:{"font-size":"18px","font-weight":"bold"}},[a._v("人员 : ")]),a._v(a._s(e.value)+" /人")])],1)})),1),t("el-col",{staticClass:"topname"},[a._v(" 各区域项目总况 ")]),t("el-col",{staticClass:"regions",attrs:{span:24}},a._l(a.getRandomData(),(function(e,n){return t("el-card",{key:n,staticClass:"itemsblock"},[t("el-col",[a._v(a._s(e.time))]),t("el-col",[a._v(a._s(e.value))])],1)})),1)],1)},r=[],o=(t("b64b"),t("d81d"),t("d3b7"),t("25f0"),t("b1f7")),s={components:{},data:function(){return{datasbt:this.getRandomDatabt(),datas:this.getRandomData(),userdetail:{},item:{name:"人员总览",time:"09/29"},itemlis:{time:"09/29"},quantity:{lis1:"9534",lis2:"8485",lis3:"5485",lis4:"3254"},proportion:{lis1:"100%",lis2:"50%",lis3:"60%",lis4:"30%"},projectArea:[{name:"北京区域项目",list:[{date:"2016-05-02",name:"北京项目1",personnel:"213",address:"北京项目的详情内容111南京南京南京111南京南京北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内北京项目的详情内"},{date:"2016-05-04",name:"北京项目2",personnel:"234",address:"北京项目的详情内容2222北京北京北京"},{date:"2016-05-01",name:"北京项目3",personnel:"342",address:"北京项目的详情内容3333上海上海上海"},{date:"2016-05-03",name:"北京项目4",personnel:"434",address:"北京项目的详情内容4444深圳深圳深圳"},{date:"2016-05-01",name:"北京项目5",personnel:"232",address:"北京项目的详情内容55555上海上海上海"},{date:"2016-05-03",name:"北京项目6",personnel:"324",address:"北京项目北京项目北京项目北京项目6666"}]},{name:"上海区域项目",list:[{date:"2016-05-02",name:"上海区域项目1",personnel:"675",address:"上海区域项目上海区域项目上海区域项目上海区域项目1111"},{date:"2016-05-04",name:"上海区域项目2",personnel:"987",address:"上海区域项目上海区域项目上海区域项目上海区域项目22222"},{date:"2016-05-01",name:"上海区域项目3",personnel:"464",address:"上海区域项目33333"}]},{name:"深圳区域项目",list:[{date:"2016-05-02",name:"深圳区域项目1",personnel:"464",address:"深圳区域项目深圳区域项目深圳区域项目1111"},{date:"2016-05-04",name:"深圳区域项目2",personnel:"545",address:"深圳区域项目22222222"},{date:"2016-05-01",name:"深圳区域项目3",personnel:"754",address:"深圳区域项目深圳区域项目深圳区域项目33333"},{date:"2016-05-03",name:"深圳区域项目4",personnel:"577",address:"深圳区域项目44444444"}]}],projectSum:[{name:"北京区域",projectNumber:"2131"},{name:"上海区域",projectNumber:"3212"},{name:"深圳区域区域",projectNumber:"2323"}]}},created:function(){var a=this;if(this.userdetail=window.localStorage.getItem("userdetail")?JSON.parse(Object(o["a"])(window.localStorage.getItem("userdetail"))):{},0===Object.keys(this.userdetail).length)return this.$message.warning("用户信息失效，请重新登录！"),this.$router.push("/login");setInterval((function(){a.datasbt=a.getRandomDatabt(),a.datas=a.getRandomData()}),3e3)},methods:{handleOpen:function(a,e){console.log(a,e)},handleClose:function(a,e){console.log(a,e)},getRandomDatabt:function(){return[{name:"南京地区",value:Math.round(1e3*Math.random())},{name:"北京地区",value:Math.round(1e3*Math.random())},{name:"上海地区",value:Math.round(1e3*Math.random())},{name:"四川地区",value:Math.round(1e3*Math.random())},{name:"厦门地区",value:Math.round(1e3*Math.random())},{name:"成都地区",value:Math.round(1e3*Math.random())},{name:"湖北地区",value:Math.round(1e3*Math.random())},{name:"武汉地区",value:Math.round(1e3*Math.random())},{name:"天津地区",value:Math.round(1e3*Math.random())},{name:"宁波地区",value:Math.round(1e3*Math.random())},{name:"河北地区",value:Math.round(1e3*Math.random())},{name:"天津地区",value:Math.round(1e3*Math.random())},{name:"湖南地区",value:Math.round(1e3*Math.random())},{name:"宁波地区",value:Math.round(1e3*Math.random())},{name:"天津地区",value:Math.round(1e3*Math.random())},{name:"湖南地区",value:Math.round(1e3*Math.random())},{name:"河北地区",value:Math.round(1e3*Math.random())},{name:"宁波地区",value:Math.round(1e3*Math.random())},{name:"河北地区",value:Math.round(1e3*Math.random())},{name:"吉林地区",value:Math.round(1e3*Math.random())},{name:"内蒙地区",value:Math.round(1e3*Math.random())},{name:"宁波地区",value:Math.round(1e3*Math.random())},{name:"河北地区",value:Math.round(1e3*Math.random())},{name:"山东地区",value:Math.round(1e3*Math.random())},{name:"宁波地区",value:Math.round(1e3*Math.random())},{name:"河北地区",value:Math.round(1e3*Math.random())},{name:"湖南地区",value:Math.round(1e3*Math.random())},{name:"吉林地区",value:Math.round(1e3*Math.random())}]},getRandomData:function(){return[{time:"南京项目",value:Math.round(1e3*Math.random())},{time:"北京项目",value:Math.round(1e3*Math.random())},{time:"宁波项目",value:Math.round(1e3*Math.random())},{time:"湖北项目",value:Math.round(1e3*Math.random())},{time:"武汉项目",value:Math.round(1e3*Math.random())},{time:"天津项目",value:Math.round(1e3*Math.random())},{time:"宁波项目",value:Math.round(1e3*Math.random())},{time:"河北项目",value:Math.round(1e3*Math.random())},{time:"天津项目",value:Math.round(1e3*Math.random())},{time:"湖南项目",value:Math.round(1e3*Math.random())},{time:"宁波项目",value:Math.round(1e3*Math.random())},{time:"天津项目",value:Math.round(1e3*Math.random())},{time:"湖南项目",value:Math.round(1e3*Math.random())},{time:"河北项目",value:Math.round(1e3*Math.random())},{time:"宁波项目",value:Math.round(1e3*Math.random())},{time:"河北项目",value:Math.round(1e3*Math.random())},{time:"吉林项目",value:Math.round(1e3*Math.random())},{time:"内蒙项目",value:Math.round(1e3*Math.random())},{time:"宁波项目",value:Math.round(1e3*Math.random())},{time:"河北项目",value:Math.round(1e3*Math.random())},{time:"山东项目",value:Math.round(1e3*Math.random())},{time:"宁波项目",value:Math.round(1e3*Math.random())},{time:"河北项目",value:Math.round(1e3*Math.random())},{time:"湖南项目",value:Math.round(1e3*Math.random())}]}},computed:{optionbt:function(){return{title:{text:"各区域维度人员数量",subtext:"数量情况",left:"center"},tooltip:{trigger:"item"},legend:{orient:"vertical",left:"left"},series:[{name:"区域人数",type:"pie",top:0,left:80,radius:["30%","70%"],data:this.datasbt,emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]}},optiontb:function(){return{title:{text:"各地区项目总数展示",subtext:"地域/数据"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:["2022年"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"value",boundaryGap:[0,.01],splitLine:{show:!0}},yAxis:{type:"category",data:this.datas.map((function(a){return a.time})),axisLabel:{show:!0,interval:0,textStyle:{align:"right"}}},series:[{name:"2022年",type:"bar",data:this.datas.map((function(a){return a.value})),label:{show:!0,position:"right",textStyle:{fontSize:15}},itemStyle:{normal:{color:function(){var a="#"+parseInt(16777215*Math.random()).toString(16);return a}}}}]}}}},d=s,l=(t("e5ee"),t("2877")),i=Object(l["a"])(d,n,r,!1,null,"ee061fda",null);e["default"]=i.exports},3739:function(a,e,t){},b727:function(a,e,t){var n=t("0366"),r=t("44ad"),o=t("7b0b"),s=t("50c4"),d=t("65f0"),l=[].push,i=function(a){var e=1==a,t=2==a,i=3==a,u=4==a,m=6==a,h=7==a,c=5==a||m;return function(M,v,p,f){for(var b,g,_=o(M),w=r(_),y=n(v,p,3),C=s(w.length),x=0,S=f||d,j=e?S(M,C):t||h?S(M,0):void 0;C>x;x++)if((c||x in w)&&(b=w[x],g=y(b,x,_),a))if(e)j[x]=g;else if(g)switch(a){case 3:return!0;case 5:return b;case 6:return x;case 2:l.call(j,b)}else switch(a){case 4:return!1;case 7:l.call(j,b)}return m?-1:i||u?u:j}};a.exports={forEach:i(0),map:i(1),filter:i(2),some:i(3),every:i(4),find:i(5),findIndex:i(6),filterOut:i(7)}},d81d:function(a,e,t){"use strict";var n=t("23e7"),r=t("b727").map,o=t("1dde"),s=o("map");n({target:"Array",proto:!0,forced:!s},{map:function(a){return r(this,a,arguments.length>1?arguments[1]:void 0)}})},e5ee:function(a,e,t){"use strict";t("3739")}}]);