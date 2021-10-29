import Vue from "vue";
import Router from "vue-router";

import Layout from "@/views/layout";
import Main from "@/views/layout/components/Main";
import Login from "@/views/login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    // {
    //   path: "/",
    //   redirect: '/home',
    //   name: "Layout",
    //   component: Layout,
    //   meta: {
    //     name: "互联网养老信息化系统"
    //   },
    //   children: [
    //     {
    //       path: "/home",
    //       name: "首页",
    //       component: () => import("@/views/home"),
    //       meta: {
    //         name: "首页",
    //         type: 1
    //       }
    //     },
    //     {
    //       path: "/agedManage",
    //       name: "老人管理",
    //       // redirect: '/agedManage/bookbuilding',
    //       component: Main,
    //       meta: {
    //         name: "老人管理"
    //       },
    //       children: [
    //         {
    //           path: "/agedManage/bookbuilding",
    //           name: "建档入住",
    //           component: () => import("@/views/agedManage/bookbuilding"),
    //           meta: {
    //             name: "建档入住"
    //           }
    //         },
    //         {
    //           path: "/agedManage/bookbuilding/checkIn/:name",
    //           name: "入住登记",
    //           component: () =>
    //             import("@/views/agedManage/bookbuilding/checkIn"),
    //           meta: {
    //             name: "入住登记",
    //             type: 1
    //           }
    //         },
    //         {
    //           path: "/agedManage/bookbuilding/pay",
    //           name: "入住缴费",
    //           component: () => import("@/views/agedManage/bookbuilding/pay"),
    //           meta: {
    //             name: "入住缴费",
    //             type: 1
    //           }
    //         },
    //         {
    //           path: "/agedManage/agedList",
    //           name: "老人列表",
    //           component: () => import("@/views/agedManage/agedList"),
    //           meta: {
    //             name: "老人列表",
    //             type: 1
    //           }
    //         },
    //         {
    //           path: "/agedManage/agedList/:id",
    //           name: "老人档案",
    //           component: () => import("@/views/agedManage/agedList/file"),
    //           meta: {
    //             name: "老人档案"
    //           }
    //         },
    //         {
    //           path: "/agedManage/bookbuilding/quitManage",
    //           name: "退住管理",
    //           component: () =>
    //             import("@/views/agedManage/bookbuilding/quitManage"),
    //           meta: {
    //             name: "退住管理"
    //           }
    //         }
    //       ]
    //     },

    //     {
    //       path: "/dailyManage",
    //       name: "日常管理",
    //       // redirect: "/dailyManage/nurseManage",
    //       component: Main,
    //       meta: {
    //         name: "日常管理"
    //       },
    //       children: [
    //         {
    //           path: "/dailyManage/nurseManage",
    //           name: "护理管理",
    //           // redirect: "/dailyManage/nurseOverview",
    //           component: Main,
    //           meta: {
    //             name: "护理管理"
    //           },
    //           children: [
    //             {
    //               path: "/dailyManage/nurseOverview",
    //               name: "护理概览",
    //               component: () =>
    //                 import("@/views/dailyManage/nurseOverview"),
    //               meta: {
    //                 name: "护理概览"
    //               }
    //             },
    //             {
    //               path: "/dailyManage/nurseOverview/taskManage",
    //               name: "护理任务管理",
    //               component: () =>
    //                 import("@/views/dailyManage/nurseOverview/taskManage"),
    //               meta: {
    //                 name: "护理任务管理"
    //               }
    //             },
    //             {
    //               path: "/dailyManage/nurseOverview/changeBeds",
    //               name: "更换床位",
    //               component: () =>
    //                 import("@/views/dailyManage/nurseOverview/changeBeds"),
    //               meta: {
    //                 name: "更换床位"
    //               }
    //             },
    //             {
    //               path: "/dailyManage/nurseOverview/changeFoodPackage",
    //               name: "更换餐饮套餐",
    //               component: () =>
    //                 import(
    //                   "@/views/dailyManage/nurseOverview/changeFoodPackage"
    //                 ),
    //               meta: {
    //                 name: "更换餐饮套餐"
    //               }
    //             },
    //             {
    //               path: "/dailyManage/nurseOverview/changeCarePackages",
    //               name: "更换护理套餐",
    //               component: () =>
    //                 import(
    //                   "@/views/dailyManage/nurseOverview/changeCarePackages"
    //                 ),
    //               meta: {
    //                 name: "更换护理套餐"
    //               }
    //             },
    //             {
    //               path: "/dailyManage/nurseOverview/unassignedElderly",
    //               name: "未分配老人",
    //               component: () =>
    //                 import(
    //                   "@/views/dailyManage/nurseOverview/unassignedElderly"
    //                 ),
    //               meta: {
    //                 name: "未分配老人"
    //               }
    //             },
    //             {
    //               path: "/dailyManage/nurseOverview/nurseAllTasks/:id",
    //               name: "护工全部任务",
    //               component: () =>
    //                 import(
    //                   "@/views/dailyManage/nurseOverview/nurseAllTasks"
    //                 ),
    //               meta: {
    //                 name: "护工全部任务"
    //               }
    //             },
    //             {
    //               path: "/dailyManage/staffGroupAssignment",
    //               name: "护工组分配",
    //               component: () =>
    //                 import("@/views/dailyManage/staffGroupAssignment"),
    //               meta: {
    //                 name: "护工组分配"
    //               }
    //             },
    //             {
    //               path: "/dailyManage/staffAssignment",
    //               name: "护工分配",
    //               component: Main,
    //               meta: {
    //                 name: "护工分配",
    //                 type: 1
    //               },
    //               children: [
    //                 {
    //                   path: "/dailyManage/staffAssignment",
    //                   name: "护工分配",
    //                   component: () =>
    //                     import("@/views/dailyManage/staffAssignment"),
    //                   meta: {
    //                     name: "护工分配"
    //                   }
    //                 },
    //                 {
    //                   path: "/dailyManage/bedsDistribution",
    //                   name: "床位分配",
    //                   component: () =>
    //                     import(
    //                       "@/views/dailyManage/staffAssignment/bedsDistribution"
    //                     ),
    //                   meta: {
    //                     name: "床位分配"
    //                   }
    //                 }
    //               ]
    //             },
    //             {
    //               path: "/dailyManage/specialCare",
    //               name: "特殊护理",
    //               component: Main,
    //               meta: {
    //                 name: "特殊护理",
    //                 type: 1
    //               },
    //               children: [
    //                 {
    //                   path: "/dailyManage/specialCare",
    //                   name: "特殊护理",
    //                   component: () =>
    //                     import("@/views/dailyManage/specialCare"),
    //                   meta: {
    //                     name: "特殊护理"
    //                   }
    //                 },
    //                 {
    //                   path: "/dailyManage/specialCare/add",
    //                   name: "新增特殊护理",
    //                   component: () =>
    //                     import(
    //                       "@/views/dailyManage/specialCare/addSpecialCare"
    //                     ),
    //                   meta: {
    //                     name: "新增特殊护理"
    //                   }
    //                 }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },

    //     {
    //       path: "/consult",
    //       name: "咨询接待",
    //       component: Main,
    //       // redirect: '/consult/clientManage/clientOverview',
    //       meta: {
    //         name: "咨询接待"
    //       },
    //       children: [
    //         {
    //           path: "/consult/clientManage/clientOverview",
    //           name: "客户概览",
    //           component: () =>
    //             import("@/views/consult/clientManage/clientOverview"),
    //           meta: {
    //             name: "客户概览"
    //           }
    //         },
    //         // {
    //         //   path: "/consult/clientManage/clientOverview",
    //         //   name: "clientOverview",
    //         //   component: Main,

    //         //   meta: {
    //         //     name: "客户概览",
    //         //     // type: 1
    //         //   },
    //         // children: [
    //         //   {
    //         //     path: "/consult/clientManage/clientOverview",
    //         //     name: "clientOverview",
    //         //     component: () =>
    //         //       import("@/views/consult/clientManage/clientOverview"),
    //         //     meta: {
    //         //       name: "概览"
    //         //     }
    //         //   }
    //         // ]
    //         // },
    //         {
    //           path: "/consult/clientManage/client/list",
    //           name: "客户管理",
    //           component: Main,
    //           meta: {
    //             name: "客户管理",
    //             type: 1
    //           },
    //           children: [
    //             {
    //               path: "/consult/clientManage/client/list",
    //               name: "客户",
    //               component: () =>
    //                 import("@/views/consult/clientManage/client"),
    //               meta: {
    //                 name: "客户"
    //               }
    //             },
    //             {
    //               path: "/consult/clientManage/client/add",
    //               name: "新增客户",
    //               component: () =>
    //                 import("@/views/consult/clientManage/client/addOrEdit"),
    //               meta: {
    //                 name: "新增客户"
    //               }
    //             },
    //             {
    //               path: "/consult/clientManage/client/edit/:id",
    //               name: "编辑客户",
    //               component: () =>
    //                 import("@/views/consult/clientManage/client/addOrEdit"),
    //               meta: {
    //                 name: "编辑客户"
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           path: "/consult/clientManage/clientPublic/list",
    //           name: "公海客户管理",
    //           component: Main,
    //           meta: {
    //             name: "公海客户管理",
    //             type: 1
    //           },
    //           children: [
    //             {
    //               path: "/consult/clientManage/clientPublic/list",
    //               name: "公海客户",
    //               component: () =>
    //                 import("@/views/consult/clientManage/clientPublic"),
    //               meta: {
    //                 name: "公海客户"
    //               }
    //             },
    //             {
    //               path: "/consult/clientManage/clientPublic/add",
    //               name: "新增公海客户",
    //               component: () =>
    //                 import(
    //                   "@/views/consult/clientManage/clientPublic/addOrEdit"
    //                 ),
    //               meta: {
    //                 name: "clientPublicEdit"
    //               }
    //             },
    //             {
    //               path: "/consult/clientManage/clientPublic/edit/:id",
    //               name: "编辑公海客户",
    //               component: () =>
    //                 import(
    //                   "@/views/consult/clientManage/clientPublic/addOrEdit"
    //                 ),
    //               meta: {
    //                 name: "编辑公海客户"
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           path: "/consult/clientManage/clientAbandon/list",
    //           name: "垃圾客户管理",
    //           component: Main,
    //           meta: {
    //             name: "垃圾客户管理",
    //             type: 1
    //           },
    //           children: [
    //             {
    //               path: "/consult/clientManage/clientAbandon/list",
    //               name: "垃圾客户",
    //               component: () =>
    //                 import("@/views/consult/clientManage/clientAbandon"),
    //               meta: {
    //                 name: "垃圾客户"
    //               }
    //             },
    //             {
    //               path: "/consult/clientManage/clientAbandon/add",
    //               name: "新增垃圾客户",
    //               component: () =>
    //                 import(
    //                   "@/views/consult/clientManage/clientAbandon/addOrEdit"
    //                 ),
    //               meta: {
    //                 name: "新增垃圾客户"
    //               }
    //             },
    //             {
    //               path: "/consult/clientManage/clientAbandon/edit/:id",
    //               name: "编辑垃圾客户",
    //               component: () =>
    //                 import(
    //                   "@/views/consult/clientManage/clientAbandon/addOrEdit"
    //                 ),
    //               meta: {
    //                 name: "编辑垃圾客户"
    //               }
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       path: "/expenseManage",
    //       name: "费用管理",
    //       // redirect: '/expenseManage/account',
    //       component: Main,
    //       meta: {
    //         name: "费用管理"
    //       },
    //       children: [
    //         {
    //           path: "/expenseManage/account",
    //           name: "老人账户",
    //           component: () => import("@/views/expenseManage/account"),
    //           meta: {
    //             name: "老人账户",
    //             type: 1
    //           }
    //         },
    //         {
    //           path: "/expenseManage/settlement",
    //           name: "结算列表",
    //           component: () => import("@/views/expenseManage/settlement"),
    //           meta: {
    //             name: "结算列表",
    //             type: 1
    //           }
    //         },
    //         {
    //           path: "/expenseManage/withdraw",
    //           name: "退住结算",
    //           component: () => import("@/views/expenseManage/withdraw"),
    //           meta: {
    //             name: "退住结算",
    //             type: 1
    //           }
    //         }
    //       ]
    //     },
    //     {
    //       path: "/basicManage",
    //       name: "基础管理",
    //       // redirect: '/basicManage/organizationInfo',
    //       component: Main,
    //       meta: {
    //         name: "基础管理"
    //       },
    //       children: [
    //         {
    //           path: "/basicManage/organizationInfo",
    //           name: "机构信息",
    //           component: () => import("@/views/basicManage/organizationInfo"),
    //           meta: {
    //             name: "机构信息",
    //             type: 1
    //           }
    //         },
    //         {
    //           path: "/basicManage/basicsSetting",
    //           name: "基础设置",
    //           component: Main,
    //           meta: {
    //             name: "基础设置"
    //           },
    //           children: [
    //             {
    //               path: "/basicManage/basicsSetting/manageBuilding",
    //               name: "楼房管理",
    //               component: () =>
    //                 import("@/views/basicManage/basicsSetting/manageBuilding"),
    //               meta: {
    //                 name: "楼房管理"
    //               }
    //             },
    //             {
    //               path: "/basicManage/basicsSetting/manageBedType",
    //               name: "床位类型管理",
    //               component: () =>
    //                 import("@/views/basicManage/basicsSetting/manageBedType"),
    //               meta: {
    //                 name: "床位类型管理"
    //               }
    //             },
    //             {
    //               path: "/basicManage/basicsSetting/manageNursingProject",
    //               name: "护理项目管理",
    //               component: () =>
    //                 import(
    //                   "@/views/basicManage/basicsSetting/manageNursingProject"
    //                 ),
    //               meta: {
    //                 name: "护理项目管理"
    //               }
    //             },
    //             {
    //               path: "/basicManage/basicsSetting/manageCarePackages",
    //               // redirect:
    //               //   "/basicManage/basicsSetting/manageCarePackages/list",
    //               name: "护理套餐管理",
    //               component: Main,
    //               meta: {
    //                 name: "护理套餐管理"
    //               },
    //               children: [
    //                 {
    //                   path:
    //                     "/basicManage/basicsSetting/manageCarePackages/list",
    //                   name: "护理套餐列表",
    //                   component: () =>
    //                     import(
    //                       "@/views/basicManage/basicsSetting/manageCarePackages"
    //                     ),
    //                   meta: {
    //                     name: "护理套餐列表"
    //                   }
    //                 },
    //                 {
    //                   path: "/basicManage/basicsSetting/manageCarePackages/add",
    //                   name: "添加护理套餐",
    //                   component: () =>
    //                     import(
    //                       "@/views/basicManage/basicsSetting/manageCarePackages/addOrEdit"
    //                     ),
    //                   meta: {
    //                     name: "添加护理套餐"
    //                   }
    //                 },
    //                 {
    //                   path:
    //                     "/basicManage/basicsSetting/manageCarePackages/edit/:id",
    //                   name: "编辑护理套餐",
    //                   component: () =>
    //                     import(
    //                       "@/views/basicManage/basicsSetting/manageCarePackages/addOrEdit"
    //                     ),
    //                   meta: {
    //                     name: "编辑护理套餐"
    //                   }
    //                 }
    //               ]
    //             },
    //             {
    //               path: "/basicManage/basicsSetting/manageDining",
    //               name: "餐饮套餐管理",
    //               // redirect: "/basicManage/basicsSetting/manageDining/list",
    //               component: Main,
    //               meta: {
    //                 name: "餐饮套餐管理"
    //               },
    //               children: [
    //                 {
    //                   path: "/basicManage/basicsSetting/manageDining/list",
    //                   name: "餐饮套餐列表",
    //                   component: () =>
    //                     import(
    //                       "@/views/basicManage/basicsSetting/manageDining"
    //                     ),
    //                   meta: {
    //                     name: "餐饮套餐列表"
    //                   }
    //                 },
    //                 {
    //                   path: "/basicManage/basicsSetting/manageDining/add",
    //                   name: "添加餐饮套餐",
    //                   component: () =>
    //                     import(
    //                       "@/views/basicManage/basicsSetting/manageDining/addOrEdit"
    //                     ),
    //                   meta: {
    //                     name: "添加餐饮套餐"
    //                   }
    //                 },
    //                 {
    //                   path: "/basicManage/basicsSetting/manageDining/edit/:id",
    //                   name: "编辑餐饮套餐",
    //                   component: () =>
    //                     import(
    //                       "@/views/basicManage/basicsSetting/manageDining/addOrEdit"
    //                     ),
    //                   meta: {
    //                     name: "编辑餐饮套餐"
    //                   }
    //                 }
    //               ]
    //             },
    //             {
    //               path: "/basicManage/basicsSetting/manageCostItem",
    //               // redirect: "/basicManage/basicsSetting/manageCostItem/list",
    //               name: "费用项目管理",
    //               component: Main,
    //               meta: {
    //                 name: "费用项目管理"
    //               },
    //               children: [
    //                 {
    //                   path: "/basicManage/basicsSetting/manageCostItem/list",
    //                   name: "费用项目列表",
    //                   component: () =>
    //                     import(
    //                       "@/views/basicManage/basicsSetting/manageCostItem"
    //                     ),
    //                   meta: {
    //                     name: "费用项目列表"
    //                   }
    //                 },
    //                 {
    //                   path: "/basicManage/basicsSetting/manageCostItem/add",
    //                   name: "添加费用项目",
    //                   component: () =>
    //                     import(
    //                       "@/views/basicManage/basicsSetting/manageCostItem/addOrEdit"
    //                     ),
    //                   meta: {
    //                     name: "添加费用项目"
    //                   }
    //                 },
    //                 {
    //                   path:
    //                     "/basicManage/basicsSetting/manageCostItem/edit/:id",
    //                   name: "编辑费用项目",
    //                   component: () =>
    //                     import(
    //                       "@/views/basicManage/basicsSetting/manageCostItem/addOrEdit"
    //                     ),
    //                   meta: {
    //                     name: "编辑费用项目"
    //                   }
    //                 }
    //               ]
    //             }
    //           ]
    //         },
    //         {
    //           path: "/basicManage/materialManage",
    //           name: "资料管理",
    //           // redirect: "/basicManage/materialManage/addressBook",
    //           component: Main,
    //           meta: {
    //             name: "资料管理"
    //           },
    //           children: [
    //             {
    //               path: "/basicManage/materialManage/addressBook",
    //               name: "通讯录管理",
    //               component: () =>
    //                 import("@/views/basicManage/materialManage/addressBook"),
    //               meta: {
    //                 name: "通讯录管理"
    //               }
    //             },
    //             {
    //               path: "/basicManage/materialManage/inform",
    //               name: "通知公告",
    //               component: () =>
    //                 import("@/views/basicManage/materialManage/inform"),
    //               meta: {
    //                 name: "通知公告"
    //               }
    //             }
    //           ]
    //         },
    //         {
    //           path: "/basicManage/systemManage",
    //           name: "系统管理",
    //           // redirect: "/basicManage/systemManage/manageUser",
    //           component: Main,
    //           meta: {
    //             name: "系统管理"
    //           },
    //           children: [
    //             {
    //               name: "用户管理",
    //               path: "/basicManage/systemManage/manageUser",
    //               component: () =>
    //                 import("@/views/basicManage/systemManage/manageUser"),
    //               meta: {
    //                 name: "用户管理"
    //               }
    //             },
    //             {
    //               name: "权限管理",
    //               path: "/basicManage/systemManage/managePermission",
    //               component: () =>
    //                 import("@/views/basicManage/systemManage/managePermission"),
    //               meta: {
    //                 name: "权限管理"
    //               }
    //             },
    //             {
    //               name: "个人设置",
    //               path: "/basicManage/systemManage/userSetting",
    //               component: () =>
    //                 import("@/views/basicManage/systemManage/userSetting"),
    //               meta: {
    //                 name: "个人设置"
    //               }
    //             },
    //             {
    //               name: "菜单管理",
    //               path: "/basicManage/systemManage/manageMenu",
    //               component: () =>
    //                 import("@/views/basicManage/systemManage/manageMenu"),
    //               meta: {
    //                 name: "菜单管理"
    //               }
    //             },
    //             {
    //               name: "角色管理",
    //               path: "/basicManage/systemManage/manageRole",
    //               component: () =>
    //                 import("@/views/basicManage/systemManage/manageRole"),
    //               meta: {
    //                 name: "角色管理"
    //               }
    //             },
    //             {
    //               name: "部门管理",
    //               path: "/basicManage/systemManage/manageOrganization",
    //               component: () =>
    //                 import(
    //                   "@/views/basicManage/systemManage/manageOrganization"
    //                 ),
    //               meta: {
    //                 name: "部门管理"
    //               }
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]
});
