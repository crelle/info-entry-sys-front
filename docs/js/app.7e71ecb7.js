(function(e){function t(t){for(var a,r,u=t[0],i=t[1],s=t[2],l=0,d=[];l<u.length;l++)r=u[l],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&d.push(c[r][0]),c[r]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);h&&h(t);while(d.length)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var u=n[r];0!==c[u]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},c={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-0b0597f2":"1b961da0","chunk-1bcd2b73":"5caf5ab7","chunk-45cf0ee0":"38377b90","chunk-59790393":"1b276233","chunk-b55be6d4":"e1244992","chunk-260cf3f0":"3e1ed196","chunk-2a247e1e":"1f54d30d","chunk-2d2291e7":"c43d40e1","chunk-2e3c31c0":"269ae159","chunk-3b2cd680":"dd1ec8b6","chunk-48d2460c":"b494440b","chunk-5c66897c":"2c19e139","chunk-703cac4d":"37d0aec7","chunk-76e9448e":"53915dd8","chunk-82a2af22":"fc7fee7e","chunk-c17dc010":"b21963ac","chunk-e86dbd04":"b5ca6d7b","chunk-615753b0":"ee4a6d98"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-0b0597f2":1,"chunk-45cf0ee0":1,"chunk-59790393":1,"chunk-b55be6d4":1,"chunk-260cf3f0":1,"chunk-2a247e1e":1,"chunk-3b2cd680":1,"chunk-48d2460c":1,"chunk-5c66897c":1,"chunk-703cac4d":1,"chunk-76e9448e":1,"chunk-82a2af22":1,"chunk-c17dc010":1,"chunk-e86dbd04":1,"chunk-615753b0":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-0b0597f2":"84394dce","chunk-1bcd2b73":"31d6cfe0","chunk-45cf0ee0":"f47255f5","chunk-59790393":"0385a362","chunk-b55be6d4":"acf057af","chunk-260cf3f0":"043ccbd3","chunk-2a247e1e":"a0c1a22a","chunk-2d2291e7":"31d6cfe0","chunk-2e3c31c0":"31d6cfe0","chunk-3b2cd680":"a603fdca","chunk-48d2460c":"4e6eaac0","chunk-5c66897c":"e9083571","chunk-703cac4d":"429b76f5","chunk-76e9448e":"e11d0cbc","chunk-82a2af22":"a3c07ef9","chunk-c17dc010":"11139676","chunk-e86dbd04":"e5af88a8","chunk-615753b0":"3843f9ea"}[e]+".css",c=i.p+a,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var s=o[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===a||l===c))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){s=d[u],l=s.getAttribute("data-href");if(l===a||l===c)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var a=t&&t.target&&t.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete r[e],h.parentNode.removeChild(h),n(o)},h.href=c;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){r[e]=0})));var a=c[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise((function(t,n){a=c[e]=[t,n]}));t.push(a[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(h);var n=c[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,n[1](d)}c[e]=void 0}};var h=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var h=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},2395:function(e,t,n){},"43cf":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("d3b7"),n("3ca3"),n("ddb0");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"approot"}},[n("router-view")],1)},c=[],o={},u=o,i=(n("7c55"),n("2877")),s=Object(i["a"])(u,r,c,!1,null,null,null),l=s.exports,d=n("8c4f"),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("el-header",[n("div",{staticClass:"header_main"},[n("h1",[e._v("诚迈员工管理系统")]),n("div",{staticClass:"header_avatar"},[n("div",{on:{click:function(t){return e.personal()}}},[n("el-avatar",{attrs:{size:"small",src:e.userdetail.userAvatar}}),n("span",[e._v("欢迎 "+e._s(e.userdetail.username))])],1),n("el-popconfirm",{attrs:{"confirm-button-text":"确认","cancel-button-text":"取消",icon:"el-icon-info","icon-color":"red",title:"确认退出吗？"},on:{confirm:e.loginout}},[n("el-button",{attrs:{slot:"reference",type:"text",icon:"el-icon-switch-button"},slot:"reference"},[e._v("退 出")])],1)],1)])]),n("el-container",[n("el-aside",{attrs:{width:"200px"}},[n("el-scrollbar",{staticStyle:{height:"100%",width:"200px"}},[n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":e.nowMenu,"unique-opened":!0,router:""},on:{open:e.handleOpen,close:e.handleClose}},e._l(e.userdetail.roles[0].menus,(function(t){return n("div",{key:t.path},[t.childrenMenus.length>0?n("el-submenu",{attrs:{index:t.path}},[n("template",{slot:"title"},[n("i",{class:t.iconLs?t.iconLs:"el-icon-setting"}),n("span",[e._v(e._s(t.name))])]),n("el-menu-item-group",e._l(t.childrenMenus,(function(t){return n("el-menu-item",{key:t.path,attrs:{index:t.path}},[e._v(e._s(t.name)+" ")])})),1)],2):n("el-menu-item",{attrs:{index:t.path}},[n("i",{class:t.iconLs?t.iconLs:"el-icon-setting"}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.name))])])],1)})),0)],1)],1),n("el-main",[n("router-view"),"/sys"===e.$route.path?n("div",[n("el-button",{on:{click:e.queryuser}},[e._v("查询")])],1):e._e()],1)],1)],1)},f=[],p=(n("b64b"),n("b1f7")),m=n("da71"),b=n("9067"),g=function(e){return Object(b["a"])({method:"get",url:m["a"]+"/sysmgmt/user/all",params:e})},k={components:{},data:function(){return{tableData:[],userdetail:{},nowMenu:""}},computed:{pathNow:function(){return this.$route.path}},watch:{pathNow:function(e){this.nowMenu=e}},created:function(){if(this.userdetail=window.localStorage.getItem("userdetail")?JSON.parse(Object(p["a"])(window.localStorage.getItem("userdetail"))):{},console.log(this.userdetail,"我是 this.userdetail"),0===Object.keys(this.userdetail).length)return this.$message.warning("用户信息失效，请重新登录！"),this.$router.push("/login");this.nowMenu=this.$route.path},methods:{handleOpen:function(e,t){console.log(e,t)},handleClose:function(e,t){console.log(e,t)},loginout:function(){this.$loginout()},queryuser:function(){g().then((function(e){console.log(e)}))},personal:function(){var e=this;"/sys/plan"!==this.$route.path&&this.$nextTick((function(){console.log("出发了个人信息跳转"),e.$router.push({path:"/sys/plan"})}))}}},v=k,y=(n("a767"),Object(i["a"])(v,h,f,!1,null,"b98923ca",null)),w=y.exports;a["default"].use(d["a"]);var _=[{path:"/",name:"root",redirect:"/login"},{path:"/login",name:"login",component:function(){return n.e("chunk-260cf3f0").then(n.bind(null,"a55b"))}},{path:"/sys",name:"sys",component:w,redirect:"/sys/firstscreen",children:[{path:"firstscreen",name:"firstscreen",component:function(){return n.e("chunk-82a2af22").then(n.bind(null,"0f33"))},meta:{title:"概览首屏"}},{path:"privilege",name:"privilege",component:function(){return n.e("chunk-2e3c31c0").then(n.bind(null,"c0e8"))},meta:{title:"权限管理"}},{path:"role",name:"roles",component:function(){return n.e("chunk-c17dc010").then(n.bind(null,"de9d"))},meta:{title:"角色管理"}},{path:"user",name:"users",component:function(){return n.e("chunk-2a247e1e").then(n.bind(null,"0e84"))},meta:{title:"用户管理"}},{path:"region",name:"regions",component:function(){return Promise.all([n.e("chunk-1bcd2b73"),n.e("chunk-45cf0ee0")]).then(n.bind(null,"5273"))},meta:{title:"地域管理"}},{path:"department",name:"departments",component:function(){return n.e("chunk-5c66897c").then(n.bind(null,"792a"))},meta:{title:"部门管理"}},{path:"menu",name:"menus",component:function(){return n.e("chunk-703cac4d").then(n.bind(null,"5107"))},meta:{title:"菜单管理"}},{path:"customer",name:"customers",component:function(){return n.e("chunk-0b0597f2").then(n.bind(null,"7e60"))},meta:{title:"客户管理"}},{path:"interface",name:"interfaces",component:function(){return Promise.all([n.e("chunk-1bcd2b73"),n.e("chunk-b55be6d4")]).then(n.bind(null,"cd7b"))},meta:{title:"接口人管理"}},{path:"project",name:"projects",component:function(){return n.e("chunk-e86dbd04").then(n.bind(null,"57fa"))},meta:{title:"项目管理"}},{path:"post",name:"posts",component:function(){return Promise.all([n.e("chunk-1bcd2b73"),n.e("chunk-59790393")]).then(n.bind(null,"5213"))},meta:{title:"项目管理"}},{path:"plant",name:"plants",component:function(){return n.e("chunk-48d2460c").then(n.bind(null,"a99e"))},meta:{title:"植物"}},{path:"animal",name:"animals",component:function(){return n.e("chunk-2d2291e7").then(n.bind(null,"dba4"))},meta:{title:"动物"}},{path:"plan",name:"plans",component:function(){return n.e("chunk-3b2cd680").then(n.bind(null,"a215"))},meta:{title:"个人信息"}}]}],O=new d["a"]({routes:_});O.beforeEach((function(e,t,n){"/"===e.path?localStorage.getItem("userdetail")?n("/sys/firstscreen"):n("/login"):"/login"===e.path?localStorage.getItem("userdetail")?n("/sys/firstscreen"):n():localStorage.getItem("userdetail")?n():n("/login")}));var j=O,C=n("2f62");a["default"].use(C["a"]);var S=new C["a"].Store({state:{aaa:1111},mutations:{},actions:{},modules:{}}),M=n("5c96"),x=n.n(M),E=(n("0fae"),n("313e")),$=n("7555"),P=function(){Object($["c"])().then((function(e){e&&e.code&&"00000"===e.code&&(window.localStorage.removeItem("userdetail"),j.app.$router.push("/login"))}))},A=n("5c7f");(function(){n.e("chunk-76e9448e").then(n.t.bind(null,"be35",7))})(),a["default"].component("ECharts",A["a"]),a["default"].config.productionTip=!1,a["default"].use(x.a),a["default"].prototype.$echarts=E,a["default"].prototype.$loginout=P,window.__proto__.$loginout=P,new a["default"]({router:j,store:S,render:function(e){return e(l)}}).$mount("#app")},7555:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return u})),n.d(t,"d",(function(){return i}));var a=n("da71"),r=n("9067"),c=function(e){return Object(r["a"])({method:"get",url:a["a"]+"/verifyCode",params:e,responseType:"blob"})},o=function(e){return Object(r["a"])({method:"post",url:a["a"]+"/doLogin",data:e})},u=function(e){return Object(r["a"])({method:"get",url:a["a"]+"/logout",params:e})},i=function(e){return Object(r["a"])({method:"post",url:a["a"]+"/user/create",data:e})}},"7c55":function(e,t,n){"use strict";n("2395")},9067:function(e,t,n){"use strict";n("b64b"),n("99af"),n("d3b7");var a=n("bc3a"),r=n.n(a),c=n("5c96"),o=!1,u=r.a.create({timeout:6e4,headers:{"Cache-Control":"no-cache"}});u.interceptors.request.use((function(e){var t=e.url;if("get"===e.method&&e.params){t+="?";for(var n=Object.keys(e.params),a=0,r=n;a<r.length;a++){var c=r[a];t+="".concat(c,"=").concat(encodeURIComponent(e.params[c]),"&")}t=t.substring(0,t.length-1),e.params={}}return e.url=t,e})),u.interceptors.response.use((function(e){if("200"==e.status){var t=e.data?e.data:"";if("00000"==t.code)return t;if("-2"==t.code){if(t.data&&t.data.detailMsg&&t.data.detailMsg.length>0){var n="<div>";if(t.data)for(var a=0;a<t.data.detailMsg.length;a++)n+=t.data.detailMsg[a].msg,n+="<br/>";n+="</div>",console.log(n),c["MessageBox"].alert(n,"参数校验失败",{dangerouslyUseHTMLString:!0})}else Object(c["Message"])({message:"参数校验失败",type:"error",duration:3500});return t}return"CMA0200"==t.code||"CMA0220"==t.code||"CMA0230"==t.code?(Object(c["Message"])({message:t.message||t.msg||"用户登录已过期",type:"error",duration:3500}),o||(sessionClear(),window.$loginout()),t):(t&&!t.code||Object(c["Message"])({message:t.message||t.msg||"请求错误，请稍后重试",type:"error",duration:3500}),t)}Object(c["Message"])({message:"请求错误，请稍后重试",type:"error",duration:3500})}),(function(e){if(e.response)switch(e.response.status){case 401:window.$loginout()}return Promise.reject(e.response.data)})),t["a"]=u},a767:function(e,t,n){"use strict";n("43cf")},b1f7:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return i}));n("d3b7"),n("25f0");var a=n("3452"),r=n.n(a),c=r.a.enc.Utf8.parse("GWHCODEROFRAT520"),o=r.a.enc.Utf8.parse("KEYGENDHSI85K10M");function u(e){var t=r.a.enc.Hex.parse(e),n=r.a.enc.Base64.stringify(t),a=r.a.AES.decrypt(n,c,{iv:o,mode:r.a.mode.CBC,padding:r.a.pad.Pkcs7}),u=a.toString(r.a.enc.Utf8);return u.toString()}function i(e){var t=r.a.enc.Utf8.parse(e),n=r.a.AES.encrypt(t,c,{iv:o,mode:r.a.mode.CBC,padding:r.a.pad.Pkcs7});return n.ciphertext.toString().toUpperCase()}},da71:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=!1,r="";a?r="/api":(r="http://139.196.125.106:8084",console.log("################################"))}});