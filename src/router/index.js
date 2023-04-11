import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/sys",
    name: "sys",
    component: Home,
    redirect: "/sys/firstscreen",
    children: [
      {
        path: "firstscreen",
        name: "firstscreen",
        component: () => import("@/views/otherview/FirstScreen.vue"),
        meta: {
          title: "概览首屏",
        },
      },
      {
        path: "privilege",
        name: "privilege",
        component: () => import("@/views/sysmanage/privilege/index.vue"),
        meta: {
          title: "权限管理",
        },
      },
      {
        path: "role",
        name: "roles",
        component: () => import("@/views/sysmanage/roles/index.vue"),
        meta: {
          title: "角色管理",
        },
      },
      {
        path: "user",
        name: "users",
        component: () => import("@/views/sysmanage/users/index.vue"),
        meta: {
          title: "用户管理",
        },
      },
    
      {
        path: "menu",
        name: "menus",
        component: () => import("@/views/sysmanage/menus/index.vue"),
        meta: {
          title: "菜单管理",
        },
      },
     
      {
        path: "personalInformation",
        name: "personalInformation",
        component: () => import("@/views/sysmanage/personal-information/index.vue"),
        meta: {
          title: "个人信息",
        },
      }
    ],
  },
  {
    path: "/app",
    name: "app",
    component: Home,
    children:[
      {
        path:"employeeAsset",
        name:"employeeAssets",
        component:()=>import("@/views/app/employee-asset/EmployeeAsset.vue"),
        meta:{
          title:"员工信息"
        }
      }, {
        path: "customer",
        name: "customers",
        component: () => import("@/views/app/customer/index.vue"),
        meta: {
          title: "客户管理",
        }
      },
      {
        path: "interface",
        name: "interfaces",
        component: () => import("@/views/app/interface/index.vue"),
        meta: {
          title: "接口人管理",
        },
      },
      {
        path: "project",
        name: "projects",
        component: () => import("@/views/app/project/index.vue"),
        meta: {
          title: "项目管理",
        },
      },
      {
        path: "post",
        name: "posts",
        component: () => import("@/views/app/post/index.vue"),
        meta: {
          title: "项目管理",
        },
      },
      {
        path: "employeeInformation",
        name: "employeeInformation",
        component: () => import("@/views/app/employee-information/index.vue"),
        meta: {
          title: "员工信息",
        },
      },
      {
        path: "region",
        name: "regions",
        component: () => import("@/views/app/region/index.vue"),
        meta: {
          title: "地域管理",
        },
      },
      {
        path: "department",
        name: "departments",
        component: () => import("@/views/app/department/index.vue"),
        meta: {
          title: "部门管理",
        },
      },
    ]
  },
];

const router = new VueRouter({
  routes,
});
// 设置路由守卫，[请求鉴权接口 暂不介入也可以]，设置放行和转跳的逻辑
router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    if (localStorage.getItem("userdetail")) {
      next("/sys/firstscreen");
    } else {
      next("/login");
    }
  } else if (to.path === "/login") {
    if (localStorage.getItem("userdetail")) {
      next("/sys/firstscreen");
    } else {
      next();
    }
  } else {
    if (localStorage.getItem("userdetail")) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
