(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-82a2af22"],{"0f33":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"firstscreen_content"},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"echarts_map "},[a("e-charts",{staticClass:"chart",attrs:{option:t.department}})],1)]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"echarts_map "},[a("e-charts",{staticClass:"chart",attrs:{option:t.area}})],1)]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"echarts_map "},[a("e-charts",{staticClass:"chart",attrs:{option:t.skill}})],1)])],1),a("div",{staticClass:"bottom"},[a("div",{staticClass:"project"},[a("e-charts",{attrs:{option:t.project}})],1),a("div",{staticClass:"notch"},[a("div",{staticClass:"label"},[t._v(" 项目缺口 ")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","show-summary":"",height:313,"summary-method":t.getSummaries,stripe:"","header-cell-style":{background:"#5a9bd5",color:"white"}}},[a("el-table-column",{attrs:{prop:"id",label:"",width:"130"}}),a("el-table-column",{attrs:{prop:"amount1",label:"产品"}}),a("el-table-column",{attrs:{prop:"amount2",label:"测试"}}),a("el-table-column",{attrs:{prop:"amount3",label:"前端"}}),a("el-table-column",{attrs:{prop:"amount4",label:"C"}}),a("el-table-column",{attrs:{prop:"amount5",label:"JAVA"}}),a("el-table-column",{attrs:{prop:"total",label:"合计"}})],1),a("div",{staticClass:"tit"},[t._v(" 注：0/4,0为当前技能人员数，4为当前项目所需技能人员数 ")])],1)])],1)},r=[],i=(a("b64b"),a("159b"),a("d81d"),a("1276"),a("ac1f"),a("13d5"),a("a9e3"),a("b0c0"),a("b1f7")),o={components:{},data:function(){return{departmentData:this.getRandomDatabt(),skillData:this.getRandomData(),areaData:[],projectData:[],tableData:[],userdetail:{}}},mounted:function(){var t=this;if(this.userdetail=window.localStorage.getItem("userdetail")?JSON.parse(Object(i["a"])(window.localStorage.getItem("userdetail"))):{},0===Object.keys(this.userdetail).length)return this.$message.warning("用户信息失效，请重新登录！"),this.$router.push("/login");this.setArea(),this.setNotch(),this.setProject(),setInterval((function(){t.departmentData=t.getRandomDatabt(),t.skillData=t.getRandomData()}),3e3)},methods:{setArea:function(){this.areaData=[{name:"南京",value:120},{name:"上海",value:200},{name:"北京",value:150},{name:"杭州",value:80},{name:"大连",value:70},{name:"深圳",value:110}]},setProject:function(){this.projectData=[{name:"合同管理",value:12},{name:"企业管理",value:20},{name:"水电app",value:15},{name:"小程序",value:8},{name:"融媒体",value:7},{name:"电力项目",value:11},{name:"网页数据分析",value:13},{name:"畅联",value:6}]},getSummaries:function(t){var e=t.columns,a=t.data,n=[];return e.forEach((function(t,e){if(0!==e){var r=a.map((function(e){return e[t.property].split("/")}));n[e]=r.reduce((function(t,e){return t+Number(e[0])}),0)+"/"+r.reduce((function(t,e){return t+Number(e[1])}),0)}else n[e]="合计"})),n},setNotch:function(){this.tableData=[{id:"华为项目A",amount1:"3/4",amount2:"3/4",amount3:"3/4",amount4:"3/4",amount5:"3/4",total:"15/20"},{id:"华为项目B",amount1:"3/4",amount2:"3/4",amount3:"3/4",amount4:"3/4",amount5:"3/4",total:"15/20"},{id:"华为项目C",amount1:"3/4",amount2:"3/4",amount3:"3/4",amount4:"3/4",amount5:"3/4",total:"15/20"},{id:"华为项目D",amount1:"3/4",amount2:"3/4",amount3:"3/4",amount4:"3/4",amount5:"3/4",total:"15/20"},{id:"华为项目E",amount1:"3/4",amount2:"3/4",amount3:"3/4",amount4:"3/4",amount5:"3/4",total:"15/20"}]},getRandomDatabt:function(){return[{name:"部门1",value:Math.round(1e3*Math.random())},{name:"部门2",value:Math.round(1e3*Math.random())},{name:"部门3",value:Math.round(1e3*Math.random())},{name:"部门4",value:Math.round(1e3*Math.random())},{name:"部门5",value:Math.round(1e3*Math.random())},{name:"部门6",value:Math.round(1e3*Math.random())}]},getRandomData:function(){return[{time:"测试",value:Math.round(1e3*Math.random())},{time:"JAVA",value:Math.round(1e3*Math.random())},{time:"C",value:Math.round(1e3*Math.random())},{time:"前端",value:Math.round(1e3*Math.random())},{time:"产品",value:Math.round(1e3*Math.random())}]}},computed:{department:function(){return{title:{text:"部门人数分析",left:"center"},tooltip:{trigger:"item"},legend:{show:!1},series:[{name:"部门",type:"pie",label:{show:!0,position:"outside",normal:{formatter:"{b}\n{c}",fontSize:"14",fontWeight:"bold"}},labelLine:{show:!0},radius:["40%","55%"],data:this.departmentData,emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]}},skill:function(){return{title:{text:"技能人数分析",left:"center"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"value",boundaryGap:[0,.01],splitLine:{show:!1}},yAxis:{type:"category",data:this.skillData.map((function(t){return t.time})),axisLabel:{show:!0,interval:0,textStyle:{align:"right"}}},series:[{name:"技能",type:"bar",data:this.skillData.map((function(t){return t.value})),barWidth:30,label:{show:!0,position:"right",textStyle:{fontSize:15}},itemStyle:{normal:{color:"#5a9bd5"}}}]}},project:function(){return{title:{text:"项目人数分析",left:"center"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"category",data:this.projectData.map((function(t){return t.name})),axisLabel:{interval:0,rotate:50}},yAxis:{type:"value"},series:[{name:"项目",data:this.projectData.map((function(t){return t.value})),type:"bar",barWidth:30,itemStyle:{normal:{color:"#5a9bd5"}}}]}},area:function(){return{title:{text:"地域人数分析",left:"center"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"category",data:this.areaData.map((function(t){return t.name}))},yAxis:{type:"value"},series:[{name:"地域",data:this.areaData.map((function(t){return t.value})),type:"bar",barWidth:20,itemStyle:{normal:{color:"#5a9bd5",label:{show:!0,position:"top",textStyle:{color:"#696969",fontSize:16}}}}}]}}}},l=o,u=(a("e61c"),a("2877")),c=Object(u["a"])(l,n,r,!1,null,"234e50c2",null);e["default"]=c.exports},1276:function(t,e,a){"use strict";var n=a("d784"),r=a("44e7"),i=a("825a"),o=a("1d80"),l=a("4840"),u=a("8aa5"),c=a("50c4"),s=a("14c3"),f=a("9263"),d=a("d039"),p=[].push,h=Math.min,m=4294967295,v=!d((function(){return!RegExp(m,"y")}));n("split",2,(function(t,e,a){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,a){var n=String(o(this)),i=void 0===a?m:a>>>0;if(0===i)return[];if(void 0===t)return[n];if(!r(t))return e.call(n,t,i);var l,u,c,s=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,v=new RegExp(t.source,d+"g");while(l=f.call(v,n)){if(u=v.lastIndex,u>h&&(s.push(n.slice(h,l.index)),l.length>1&&l.index<n.length&&p.apply(s,l.slice(1)),c=l[0].length,h=u,s.length>=i))break;v.lastIndex===l.index&&v.lastIndex++}return h===n.length?!c&&v.test("")||s.push(""):s.push(n.slice(h)),s.length>i?s.slice(0,i):s}:"0".split(void 0,0).length?function(t,a){return void 0===t&&0===a?[]:e.call(this,t,a)}:e,[function(e,a){var r=o(this),i=void 0==e?void 0:e[t];return void 0!==i?i.call(e,r,a):n.call(String(r),e,a)},function(t,r){var o=a(n,t,this,r,n!==e);if(o.done)return o.value;var f=i(t),d=String(this),p=l(f,RegExp),g=f.unicode,b=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(v?"y":"g"),x=new p(v?f:"^(?:"+f.source+")",b),y=void 0===r?m:r>>>0;if(0===y)return[];if(0===d.length)return null===s(x,d)?[d]:[];var E=0,w=0,I=[];while(w<d.length){x.lastIndex=v?w:0;var S,R=s(x,v?d:d.slice(w));if(null===R||(S=h(c(x.lastIndex+(v?0:w)),d.length))===E)w=u(d,w,g);else{if(I.push(d.slice(E,w)),I.length===y)return I;for(var A=1;A<=R.length-1;A++)if(I.push(R[A]),I.length===y)return I;w=E=S}}return I.push(d.slice(E)),I}]}),!v)},"13d5":function(t,e,a){"use strict";var n=a("23e7"),r=a("d58f").left,i=a("a640"),o=a("2d00"),l=a("605d"),u=i("reduce"),c=!l&&o>79&&o<83;n({target:"Array",proto:!0,forced:!u||c},{reduce:function(t){return r(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"14c3":function(t,e,a){var n=a("c6b6"),r=a("9263");t.exports=function(t,e){var a=t.exec;if("function"===typeof a){var i=a.call(t,e);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"159b":function(t,e,a){var n=a("da84"),r=a("fdbc"),i=a("17c2"),o=a("9112");for(var l in r){var u=n[l],c=u&&u.prototype;if(c&&c.forEach!==i)try{o(c,"forEach",i)}catch(s){c.forEach=i}}},"17c2":function(t,e,a){"use strict";var n=a("b727").forEach,r=a("a640"),i=r("forEach");t.exports=i?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"44e7":function(t,e,a){var n=a("861d"),r=a("c6b6"),i=a("b622"),o=i("match");t.exports=function(t){var e;return n(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==r(t))}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var n=a("1d80"),r=a("5899"),i="["+r+"]",o=RegExp("^"+i+i+"*"),l=RegExp(i+i+"*$"),u=function(t){return function(e){var a=String(n(e));return 1&t&&(a=a.replace(o,"")),2&t&&(a=a.replace(l,"")),a}};t.exports={start:u(1),end:u(2),trim:u(3)}},7156:function(t,e,a){var n=a("861d"),r=a("d2bb");t.exports=function(t,e,a){var i,o;return r&&"function"==typeof(i=e.constructor)&&i!==a&&n(o=i.prototype)&&o!==a.prototype&&r(t,o),t}},"8aa5":function(t,e,a){"use strict";var n=a("6547").charAt;t.exports=function(t,e,a){return e+(a?n(t,e).length:1)}},"8e1d":function(t,e,a){},9263:function(t,e,a){"use strict";var n=a("ad6d"),r=a("9f7f"),i=RegExp.prototype.exec,o=String.prototype.replace,l=i,u=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),c=r.UNSUPPORTED_Y||r.BROKEN_CARET,s=void 0!==/()??/.exec("")[1],f=u||s||c;f&&(l=function(t){var e,a,r,l,f=this,d=c&&f.sticky,p=n.call(f),h=f.source,m=0,v=t;return d&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),v=String(t).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==t[f.lastIndex-1])&&(h="(?: "+h+")",v=" "+v,m++),a=new RegExp("^(?:"+h+")",p)),s&&(a=new RegExp("^"+h+"$(?!\\s)",p)),u&&(e=f.lastIndex),r=i.call(d?a:f,v),d?r?(r.input=r.input.slice(m),r[0]=r[0].slice(m),r.index=f.lastIndex,f.lastIndex+=r[0].length):f.lastIndex=0:u&&r&&(f.lastIndex=f.global?r.index+r[0].length:e),s&&r&&r.length>1&&o.call(r[0],a,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(r[l]=void 0)})),r}),t.exports=l},"9f7f":function(t,e,a){"use strict";var n=a("d039");function r(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=n((function(){var t=r("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=n((function(){var t=r("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a640:function(t,e,a){"use strict";var n=a("d039");t.exports=function(t,e){var a=[][t];return!!a&&n((function(){a.call(null,e||function(){throw 1},1)}))}},a9e3:function(t,e,a){"use strict";var n=a("83ab"),r=a("da84"),i=a("94ca"),o=a("6eeb"),l=a("5135"),u=a("c6b6"),c=a("7156"),s=a("c04e"),f=a("d039"),d=a("7c73"),p=a("241c").f,h=a("06cf").f,m=a("9bf2").f,v=a("58a8").trim,g="Number",b=r[g],x=b.prototype,y=u(d(x))==g,E=function(t){var e,a,n,r,i,o,l,u,c=s(t,!1);if("string"==typeof c&&c.length>2)if(c=v(c),e=c.charCodeAt(0),43===e||45===e){if(a=c.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+c}for(i=c.slice(2),o=i.length,l=0;l<o;l++)if(u=i.charCodeAt(l),u<48||u>r)return NaN;return parseInt(i,n)}return+c};if(i(g,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var w,I=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof I&&(y?f((function(){x.valueOf.call(a)})):u(a)!=g)?c(new b(E(e)),a,I):E(e)},S=n?p(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),R=0;S.length>R;R++)l(b,w=S[R])&&!l(I,w)&&m(I,w,h(b,w));I.prototype=x,x.constructor=I,o(r,g,I)}},ac1f:function(t,e,a){"use strict";var n=a("23e7"),r=a("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==r},{exec:r})},b0c0:function(t,e,a){var n=a("83ab"),r=a("9bf2").f,i=Function.prototype,o=i.toString,l=/^\s*function ([^ (]*)/,u="name";n&&!(u in i)&&r(i,u,{configurable:!0,get:function(){try{return o.call(this).match(l)[1]}catch(t){return""}}})},b727:function(t,e,a){var n=a("0366"),r=a("44ad"),i=a("7b0b"),o=a("50c4"),l=a("65f0"),u=[].push,c=function(t){var e=1==t,a=2==t,c=3==t,s=4==t,f=6==t,d=7==t,p=5==t||f;return function(h,m,v,g){for(var b,x,y=i(h),E=r(y),w=n(m,v,3),I=o(E.length),S=0,R=g||l,A=e?R(h,I):a||d?R(h,0):void 0;I>S;S++)if((p||S in E)&&(b=E[S],x=w(b,S,y),t))if(e)A[S]=x;else if(x)switch(t){case 3:return!0;case 5:return b;case 6:return S;case 2:u.call(A,b)}else switch(t){case 4:return!1;case 7:u.call(A,b)}return f?-1:c||s?s:A}};t.exports={forEach:c(0),map:c(1),filter:c(2),some:c(3),every:c(4),find:c(5),findIndex:c(6),filterOut:c(7)}},d58f:function(t,e,a){var n=a("1c0b"),r=a("7b0b"),i=a("44ad"),o=a("50c4"),l=function(t){return function(e,a,l,u){n(a);var c=r(e),s=i(c),f=o(c.length),d=t?f-1:0,p=t?-1:1;if(l<2)while(1){if(d in s){u=s[d],d+=p;break}if(d+=p,t?d<0:f<=d)throw TypeError("Reduce of empty array with no initial value")}for(;t?d>=0:f>d;d+=p)d in s&&(u=a(u,s[d],d,c));return u}};t.exports={left:l(!1),right:l(!0)}},d784:function(t,e,a){"use strict";a("ac1f");var n=a("6eeb"),r=a("d039"),i=a("b622"),o=a("9263"),l=a("9112"),u=i("species"),c=!r((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),s=function(){return"$0"==="a".replace(/./,"$0")}(),f=i("replace"),d=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),p=!r((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var a="ab".split(t);return 2!==a.length||"a"!==a[0]||"b"!==a[1]}));t.exports=function(t,e,a,f){var h=i(t),m=!r((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),v=m&&!r((function(){var e=!1,a=/a/;return"split"===t&&(a={},a.constructor={},a.constructor[u]=function(){return a},a.flags="",a[h]=/./[h]),a.exec=function(){return e=!0,null},a[h](""),!e}));if(!m||!v||"replace"===t&&(!c||!s||d)||"split"===t&&!p){var g=/./[h],b=a(h,""[t],(function(t,e,a,n,r){return e.exec===o?m&&!r?{done:!0,value:g.call(e,a,n)}:{done:!0,value:t.call(a,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:s,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),x=b[0],y=b[1];n(String.prototype,t,x),n(RegExp.prototype,h,2==e?function(t,e){return y.call(t,this,e)}:function(t){return y.call(t,this)})}f&&l(RegExp.prototype[h],"sham",!0)}},d81d:function(t,e,a){"use strict";var n=a("23e7"),r=a("b727").map,i=a("1dde"),o=i("map");n({target:"Array",proto:!0,forced:!o},{map:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},e61c:function(t,e,a){"use strict";a("8e1d")}}]);