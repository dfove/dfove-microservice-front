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
    {
      path: "/",
      redirect: '/home',
      name: "Layout",
      component: Layout,
      meta: {
        name: "互联网养老信息化系统"
      },
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/home"),
          meta: {
            name: "首页",
            type: 1
          }
        },

        {
          path: "/agedManage",
          name: "agedManage",
          // redirect: '/agedManage/bookbuilding',
          component: Main,
          meta: {
            name: "老人管理"
          },
          children: [
            {
              path: "/agedManage/bookbuilding",
              name: "bookbuilding",
              component: () => import("@/views/agedManage/bookbuilding"),
              meta: {
                name: "建档入住"
              }
            },
            {
              path: "/agedManage/bookbuilding/checkIn/:name",
              name: "bookbuilding",
              component: () =>
                import("@/views/agedManage/bookbuilding/checkIn"),
              meta: {
                name: "入住登记",
                type: 1
              }
            },
            {
              path: "/agedManage/bookbuilding/pay",
              name: "bookbuilding",
              component: () => import("@/views/agedManage/bookbuilding/pay"),
              meta: {
                name: "入住缴费",
                type: 1
              }
            },
            {
              path: "/agedManage/agedList",
              name: "agedList",
              component: () => import("@/views/agedManage/agedList"),
              meta: {
                name: "老人列表",
                type: 1
              }
            },
            {
              path: "/agedManage/agedList/:id",
              name: "agedFile",
              component: () => import("@/views/agedManage/agedList/file"),
              meta: {
                name: "老人档案"
              }
            },
            {
              path: "/agedManage/bookbuilding/quitManage",
              name: "quitManage",
              component: () =>
                import("@/views/agedManage/bookbuilding/quitManage"),
              meta: {
                name: "退住管理"
              }
            }
          ]
        },

        {
          path: "/dailyManage",
          name: "dailyManage",
          component: Main,
          meta: {
            name: "日常管理"
          },
          children: [
            {
              path: "/dailyManage/nurseManage",
              name: "nurseManage",
              component: Main,
              meta: {
                name: "护理管理"
              },
              children: [
                {
                  path: "/dailyManage/nurseManage/nurseOverview",
                  name: "nurseOverview",
                  component: Main,
                  meta: {
                    name: "护理概览"
                  },
                  children: [
                    {
                      path: "/dailyManage/nurseManage/nurseOverview",
                      name: "nurseOverview",
                      component: () =>
                        import("@/views/dailyManage/nurseManage/nurseOverview"),
                      meta: {
                        name: "护理概览"
                      },
                    },
                    {
                      path: "/dailyManage/nurseManage/nurseOverview/taskManage",
                      name: "taskManage",
                      component: () =>
                        import("@/views/dailyManage/nurseManage/nurseOverview/taskManage"),
                      meta: {
                        name: "护理任务管理"
                      }
                    },
                    {
                      path: "/dailyManage/nurseManage/nurseOverview/changeBeds",
                      name: "changeBeds",
                      component: () =>
                        import("@/views/dailyManage/nurseManage/nurseOverview/changeBeds"),
                      meta: {
                        name: "更换床位"
                      }
                    },
                    {
                      path: "/dailyManage/nurseManage/nurseOverview/changeFoodPackage",
                      name: "changeFoodPackage",
                      component: () =>
                        import(
                          "@/views/dailyManage/nurseManage/nurseOverview/changeFoodPackage"
                        ),
                      meta: {
                        name: "更换餐饮套餐"
                      }
                    },
                    {
                      path: "/dailyManage/nurseManage/nurseOverview/changeCarePackages",
                      name: "changeCarePackages",
                      component: () =>
                        import(
                          "@/views/dailyManage/nurseManage/nurseOverview/changeCarePackages"
                        ),
                      meta: {
                        name: "更换护理套餐"
                      }
                    },
                    {
                      path: "/dailyManage/nurseManage/nurseOverview/unassignedElderly",
                      name: "unassignedElderly",
                      component: () =>
                        import(
                          "@/views/dailyManage/nurseManage/nurseOverview/unassignedElderly"
                        ),
                      meta: {
                        name: "未分配老人"
                      }
                    },
                    {
                      path: "/dailyManage/nurseManage/nurseOverview/nurseAllTasks/:id",
                      name: "nurseAllTasks",
                      component: () =>
                        import(
                          "@/views/dailyManage/nurseManage/nurseOverview/nurseAllTasks"
                        ),
                      meta: {
                        name: "护工全部任务"
                      }
                    },
                  ]
                },
                {
                  path: "/dailyManage/nurseManage/staffGroupAssignment",
                  name: "staffGroupAssignment",
                  component: () =>
                    import("@/views/dailyManage/nurseManage/staffGroupAssignment"),
                  meta: {
                    name: "护工组分配"
                  }
                },
                {
                  path: "/dailyManage/nurseManage/staffAssignment",
                  name: "staffAssignment",
                  component: Main,
                  meta: {
                    name: "护工分配",
                    type: 1
                  },
                  children: [
                    {
                      path: "/dailyManage/nurseManage/staffAssignment",
                      name: "staffAssignment",
                      component: () =>
                        import("@/views/dailyManage/nurseManage/staffAssignment"),
                      meta: {
                        name: "护工分配"
                      }
                    },
                    {
                      path: "/dailyManage/nurseManage/bedsDistribution",
                      name: "bedsDistribution",
                      component: () =>
                        import(
                          "@/views/dailyManage/nurseManage/staffAssignment/bedsDistribution"
                        ),
                      meta: {
                        name: "床位分配"
                      }
                    }
                  ]
                },
                {
                  path: "/dailyManage/nurseManage/specialCare",
                  name: "specialCare",
                  component: Main,
                  meta: {
                    name: "特殊护理",
                    type: 1
                  },
                  children: [
                    {
                      path: "/dailyManage/nurseManage/specialCare",
                      name: "specialCare",
                      component: () =>
                        import("@/views/dailyManage/nurseManage/specialCare"),
                      meta: {
                        name: "特殊护理"
                      }
                    },
                    {
                      path: "/dailyManage/nurseManage/specialCare/add",
                      name: "addSpecialCare",
                      component: () =>
                        import(
                          "@/views/dailyManage/nurseManage/specialCare/addSpecialCare"
                        ),
                      meta: {
                        name: "新增特殊护理"
                      }
                    }
                  ]
                }
              ]
            },
            {
              path: "/dailyManage/medicationManage",
              name: "medicationManage",
              component: Main,
              meta: {
                name: "用药管理"
              },
              children: [
                {
                  path: "/dailyManage/medicationManage/drugCapture",
                  name: "drugCapture",
                  component: () =>
                  import("@/views/dailyManage/medicationManage/drugCapture"),
                  meta: {
                    name: "药品缴存"
                  },
                },
                {
                  path: "/dailyManage/medicationManage/medicineSet",
                  name: "medicineSet",
                  component: () =>
                  import("@/views/dailyManage/medicationManage/medicineSet"),
                  meta: {
                    name: "用药设置"
                  },
                },
                {
                  path: "/dailyManage/medicationManage/temporaryUse",
                  name: "temporaryUse",
                  component: () =>
                  import("@/views/dailyManage/medicationManage/temporaryUse"),
                  meta: {
                    name: "临时用药"
                  },
                },
              ]
            },
            {
              path: "/dailyManage/accidentManage/list",
              name: "accidentManage",
              component: Main,
              meta: {
                name: "事故管理"
              },
              children: [
                {
                  path: "/dailyManage/accidentManage/list",
                  name: "accidentManage",
                  component: () =>
                  import("@/views/dailyManage/accidentManage"),
                  meta: {
                    name: "事故管理"
                  },
                },
                {
                  path: "/dailyManage/accidentManage/add",
                  name: "addAccident",
                  component: () =>
                  import("@/views/dailyManage/accidentManage/addAccident"),
                  meta: {
                    name: "添加事故"
                  },
                },
                {
                  path: "/dailyManage/accidentManage/edit/:id",
                  name: "editAccident",
                  component: () =>
                  import("@/views/dailyManage/accidentManage/addAccident"),
                  meta: {
                    name: "修改事故"
                  },
                },
              ]
            }
          ]
        },

        {
          path: "/consult",
          name: "consult",
          component: Main,
          // redirect: '/consult/clientManage/clientOverview',
          meta: {
            name: "咨询接待"
          },
          children: [
            {
              path: "/consult/clientManage/clientOverview",
              name: "clientOverview",
              component: () =>
                import("@/views/consult/clientManage/clientOverview"),
              meta: {
                name: "客户概览"
              }
            },
            // {
            //   path: "/consult/clientManage/clientOverview",
            //   name: "clientOverview",
            //   component: Main,

            //   meta: {
            //     name: "客户概览",
            //     // type: 1
            //   },
            // children: [
            //   {
            //     path: "/consult/clientManage/clientOverview",
            //     name: "clientOverview",
            //     component: () =>
            //       import("@/views/consult/clientManage/clientOverview"),
            //     meta: {
            //       name: "概览"
            //     }
            //   }
            // ]
            // },
            {
              path: "/consult/clientManage/client/list",
              name: "clientList",
              component: Main,
              meta: {
                name: "客户管理",
                type: 1
              },
              children: [
                {
                  path: "/consult/clientManage/client/list",
                  name: "clientList",
                  component: () =>
                    import("@/views/consult/clientManage/client"),
                  meta: {
                    name: "客户"
                  }
                },
                {
                  path: "/consult/clientManage/client/add",
                  name: "clientAdd",
                  component: () =>
                    import("@/views/consult/clientManage/client/addOrEdit"),
                  meta: {
                    name: "新增客户"
                  }
                },
                {
                  path: "/consult/clientManage/client/edit/:id",
                  name: "clientEdit",
                  component: () =>
                    import("@/views/consult/clientManage/client/addOrEdit"),
                  meta: {
                    name: "编辑客户"
                  }
                },
                {
                  path: "/consult/clientManage/client/detail/:id",
                  name: "clientDetail",
                  component: () =>
                    import("@/views/consult/clientManage/clientDetail"),
                  meta: {
                    name: "客户详情"
                  }
                },
              ]
            },
            {
              path: "/consult/clientManage/clientPublic/list",
              name: "clientPublic",
              component: Main,
              meta: {
                name: "公海客户管理",
                type: 1
              },
              children: [
                {
                  path: "/consult/clientManage/clientPublic/list",
                  name: "clientPublic",
                  component: () =>
                    import("@/views/consult/clientManage/clientPublic"),
                  meta: {
                    name: "公海客户"
                  }
                },
                {
                  path: "/consult/clientManage/clientPublic/add",
                  name: "clientPublicAdd",
                  component: () =>
                    import(
                      "@/views/consult/clientManage/clientPublic/addOrEdit"
                    ),
                  meta: {
                    name: "新增公海客户"
                  }
                },
                {
                  path: "/consult/clientManage/clientPublic/edit/:id",
                  name: "clientPublicEdit",
                  component: () =>
                    import(
                      "@/views/consult/clientManage/clientPublic/addOrEdit"
                    ),
                  meta: {
                    name: "编辑公海客户"
                  }
                },
                {
                  path: "/consult/clientManage/clientPublic/detail/:id",
                  name: "highSeasClientDetail",
                  component: () =>
                    import("@/views/consult/clientManage/clientDetail"),
                  meta: {
                    name: "公海客户详情"
                  }
                },
              ]
            },
            {
              path: "/consult/clientManage/clientAbandon/list",
              name: "clientAbandon",
              component: Main,
              meta: {
                name: "垃圾客户管理",
                type: 1
              },
              children: [
                {
                  path: "/consult/clientManage/clientAbandon/list",
                  name: "clientAbandon",
                  component: () =>
                    import("@/views/consult/clientManage/clientAbandon"),
                  meta: {
                    name: "垃圾客户"
                  }
                },
                {
                  path: "/consult/clientManage/clientAbandon/detail/:id",
                  name: "garbageClientDetail",
                  component: () =>
                    import("@/views/consult/clientManage/clientDetail"),
                  meta: {
                    name: "垃圾客户详情"
                  }
                },
              ]
            }
          ]
        },
        
        {
          path: "/expenseManage",
          name: "expenseManage",
          // redirect: '/expenseManage/account',
          component: Main,
          meta: {
            name: "费用管理"
          },
          children: [
            {
              path: "/expenseManage/account",
              name: "account",
              component: () => import("@/views/expenseManage/account"),
              meta: {
                name: "老人账户",
                type: 1
              }
            },
            {
              path: "/expenseManage/settlement",
              name: "settlement",
              component: () => import("@/views/expenseManage/settlement"),
              meta: {
                name: "结算列表",
                type: 1
              }
            },
            {
              path: "/expenseManage/withdraw",
              name: "withdraw",
              component: () => import("@/views/expenseManage/withdraw"),
              meta: {
                name: "退住结算",
                type: 1
              }
            }
          ]
        },

        {
          path: "/personnelManage",
          name: "personnelManage",
          component: Main,
          meta: {
            name: "人事管理"
          },
          children: [
            {
              path: "/personnelManage/employeeFiles/list",
              name: "employeeFiles",
              component: Main,
              meta: {
                name: "员工档案",
              },
              children: [
                {
                  path: "/personnelManage/employeeFiles/list",
                  name: "employeeFiles",
                  component: () => import("@/views/personnelManage/employeeFiles"),
                  meta: {
                    name: "员工档案",
                  },
                },
                {
                  path: "/personnelManage/employeeFiles/add",
                  name: "addEmploy",
                  component: () => import("@/views/personnelManage/employeeFiles/addEditEmploy"),
                  meta: {
                    name: "新增员工",
                  },
                },
                {
                  path: "/personnelManage/employeeFiles/employDetail/:id",
                  name: "employDetail",
                  component: () => import("@/views/personnelManage/employeeFiles/employDetail"),
                  meta: {
                    name: "员工详情",
                  },
                },
              ]
            },

            {
              path: "/personnelManage/organizationalStructure",
              name: "organizationalStructure",
              component: Main,
              meta: {
                name: "组织架构",
              },
              children: [
                {
                  path: "/personnelManage/organizationalStructure/departmentManage",
                  name: "departmentManage",
                  component: () => import("@/views/personnelManage/organizationalStructure/departmentManage"),
                  meta: {
                    name: "部门管理",
                  },
                },
                {
                  path: "/personnelManage/organizationalStructure/postManage",
                  name: "postManage",
                  component: () => import("@/views/personnelManage/organizationalStructure/postManage"),
                  meta: {
                    name: "岗位管理",
                  },
                },
              ]
            },

            {
              path: "/personnelManage/attendanceSet",
              name: "attendanceSet",
              component: Main,
              meta: {
                name: "考勤设置",
              },
              children: [
                {
                  path: "/personnelManage/attendanceSet/attendanceGroupManage/list",
                  name: "attendanceGroupManage",
                  component: Main,
                  meta: {
                    name: "考勤组管理",
                  },
                  children: [
                    {
                      path: "/personnelManage/attendanceSet/attendanceGroupManage/list",
                      name: "attendanceGroupManage",
                      component: () => import("@/views/personnelManage/attendanceSet/attendanceGroupManage"),
                      meta: {
                        name: "考勤组管理",
                      },
                    },
                    // {
                    //   path: "/personnelManage/attendanceSet/attendanceGroupManage/add",
                    //   name: "addAttendanceGroup",
                    //   component: () => import("@/views/personnelManage/attendanceSet/attendanceGroupManage/addEditAttendanceGroup"),
                    //   meta: {
                    //     name: "新增考勤组",
                    //   },
                    // },
                    // {
                    //   path: "/personnelManage/attendanceSet/attendanceGroupManage/edit/:id",
                    //   name: "editAttendanceGroup",
                    //   component: () => import("@/views/personnelManage/attendanceSet/attendanceGroupManage/addEditAttendanceGroup"),
                    //   meta: {
                    //     name: "编辑考勤组",
                    //   },
                    // },
                  ]
                },
                {
                  path: "/personnelManage/attendanceSet/shiftManage/list",
                  name: "shiftManage",
                  component: Main,
                  meta: {
                    name: "班次管理",
                  },
                  children: [
                    {
                      path: "/personnelManage/attendanceSet/shiftManage/list",
                      name: "shiftManage",
                      component: () => import("@/views/personnelManage/attendanceSet/shiftManage"),
                      meta: {
                        name: "班次管理",
                      },
                    },
                    {
                      path: "/personnelManage/attendanceSet/shiftManage/add",
                      name: "addShift",
                      component: () => import("@/views/personnelManage/attendanceSet/shiftManage/addEditShift"),
                      meta: {
                        name: "新增班次",
                      },
                    },
                    {
                      path: "/personnelManage/attendanceSet/shiftManage/edit/:id",
                      name: "editShift",
                      component: () => import("@/views/personnelManage/attendanceSet/shiftManage/addEditShift"),
                      meta: {
                        name: "编辑班次",
                      },
                    },
                  ]
                },
                {
                  path: "/personnelManage/attendanceSet/scheduling/list",
                  name: "scheduling",
                  component: Main,
                  meta: {
                    name: "排班管理",
                  },
                  children: [
                    {
                      path: "/personnelManage/attendanceSet/scheduling/list",
                      name: "scheduling",
                      component: () => import("@/views/personnelManage/attendanceSet/scheduling"),
                      meta: {
                        name: "排班管理",
                      },
                    },
                    {
                      path: "/personnelManage/attendanceSet/scheduling/forScheduling/:id",
                      name: "forScheduling",
                      component: () => import("@/views/personnelManage/attendanceSet/scheduling/forScheduling"),
                      meta: {
                        name: "排班",
                      },
                    },
                    
                  ]
                },
              ]
            },
           
          ]
        },

        {
          path: "/communityService",
          name: "communityService",
          component: Main,
          meta: {
            name: "社区服务"
          },
          children: [
            {
              path: "/communityService/userManage",
              name: "userManage",
              component: Main,
              meta: {
                name: "用户管理",
              },
              children: [
                {
                  path: "/communityService/userManage/list",
                  name: "userManage",
                  component: () =>
                    import("@/views/communityService/userManage"),
                  meta: {
                    name: "用户管理"
                  }
                },
                {
                  path: "/communityService/userManage/userCollect",
                  name: "userCollect",
                  component: () =>
                    import("@/views/communityService/userManage/userCollect"),
                  meta: {
                    name: "用户收藏"
                  }
                },
                {
                  path: "/communityService/userManage/userFootprint",
                  name: "userFootprint",
                  component: () =>
                    import("@/views/communityService/userManage/userFootprint"),
                  meta: {
                    name: "用户足迹"
                  }
                },
                {
                  path: "/communityService/userManage/userFeedback",
                  name: "userFeedback",
                  component: () =>
                    import("@/views/communityService/userManage/userFeedback"),
                  meta: {
                    name: "意见反馈"
                  }
                },
              ]
            },

            {
              path: "/communityService/orderManage",
              name: "orderManage",
              component: Main,
              meta: {
                name: "订单管理",
              },
              children: [
                {
                  path: "/communityService/orderManage/serviceOrder/list",
                  name: "serviceOrder",
                  component: Main,
                  meta: {
                    name: "服务订单管理",
                  },
                  children: [
                    {
                      path: "/communityService/orderManage/serviceOrder/list",
                      name: "serviceOrder",
                      component: () =>
                        import("@/views/communityService/orderManage/serviceOrder"),
                      meta: {
                        name: "服务订单管理"
                      },
                    },
                    {
                      path: "/communityService/orderManage/serviceOrder/detail/:id",
                      name: "serviceOrderDetail",
                      component: () =>
                        import("@/views/communityService/orderManage/serviceOrder/serviceOrderDetail"),
                      meta: {
                        name: "服务订单详情"
                      },
                    },
                  ]
                },
                {
                  path: "/communityService/orderManage/goodsOrder/list",
                  name: "goodsOrder",
                  component: Main,
                  meta: {
                    name: "商品订单管理",
                  },
                  children: [
                    {
                      path: "/communityService/orderManage/goodsOrder/list",
                      name: "goodsOrder",
                      component: () =>
                        import("@/views/communityService/orderManage/goodsOrder"),
                      meta: {
                        name: "商品订单管理"
                      },
                    },
                    {
                      path: "/communityService/orderManage/goodsOrder/detail/:id",
                      name: "goodsOrderDetail",
                      component: () =>
                        import("@/views/communityService/orderManage/goodsOrder/goodsOrderDetail"),
                      meta: {
                        name: "商品订单详情"
                      },
                    },
                  ]
                },
                {
                  path: "/communityService/orderManage/orderSetting",
                  name: "orderSetting",
                  component: () =>
                    import("@/views/communityService/orderManage/orderSetting"),
                  meta: {
                    name: "订单设置"
                  },
                }
              ]
            },
            {
              path: "/communityService/commodityManage",
              name: "commodityManage",
              component: Main,
              meta: {
                name: "商品管理",
              },
              children: [
                {
                  path: "/communityService/commodityManage/channelMange",
                  name: "channelMange",
                  component: () =>
                    import("@/views/communityService/commodityManage/channelMange"),
                  meta: {
                    name: "频道管理",
                  },
                },
                {
                  path: "/communityService/commodityManage/goods/list",
                  name: "goodsList",
                  component: Main,
                  meta: {
                    name: "商品列表",
                  },
                  children: [
                    {
                      path: "/communityService/commodityManage/goods/list",
                      name: "goodsList",
                      component: () =>
                        import("@/views/communityService/commodityManage/goodsList"),
                      meta: {
                        name: "商品列表",
                      },
                    },
                    {
                      path: "/communityService/commodityManage/goods/add",
                      name: "addgoods",
                      component: () =>
                        import("@/views/communityService/commodityManage/goodsList/addgoods"),
                      meta: {
                        name: "发布商品",
                      },
                    },
                    {
                      path: "/communityService/commodityManage/goods/edit/:id",
                      name: "editgoods",
                      component: () =>
                        import("@/views/communityService/commodityManage/goodsList/editgoods"),
                      meta: {
                        name: "编辑商品",
                      },
                    },
                    {
                      path: "/communityService/commodityManage/goods/detail",
                      name: "goodsDetail",
                      component: () =>
                        import("@/views/communityService/commodityManage/goodsList/goodsDetail"),
                      meta: {
                        name: "商品详情",
                      },
                    },
                  ]
                },
                {
                  path: "/communityService/commodityManage/evaluationManage/list",
                  name: "evaluationManage",
                  component: Main,
                  meta: {
                    name: "评价管理",
                  },
                  children: [
                    {
                      path: "/communityService/commodityManage/evaluationManage/list",
                      name: "evaluationManage",
                      component: () =>
                        import("@/views/communityService/commodityManage/evaluationManage"),
                      meta: {
                        name: "评价管理",
                      },
                    },
                    {
                      path: "/communityService/commodityManage/evaluationManage/detail",
                      name: "evaluationDetail",
                      component: () =>
                        import("@/views/communityService/commodityManage/evaluationManage/evaluationDetail"),
                      meta: {
                        name: "评价详情",
                      },
                    }
                  ]
                }
              ]
            },
            {
              path: "/communityService/commodityManage/afterSaleManage",
              name: "afterSaleManage",
              component: Main,
              meta: {
                name: "售后管理",
              },
              children: [
                {
                  path: "/communityService/commodityManage/afterSaleManage/goodsAfterSale/list",
                  name: "goodsAfterSaleManage",
                  component: Main,
                  meta: {
                    name: "商品售后管理",
                  },
                  children: [
                    {
                      path: "/communityService/commodityManage/afterSaleManage/goodsAfterSale/list",
                      name: "goodsAfterSaleManage",
                      component: () =>
                        import("@/views/communityService/afterSaleManage/goodsAfterSaleManage"),
                      meta: {
                        name: "商品售后管理",
                      },
                    },
                    {
                      path: "/communityService/commodityManage/afterSaleManage/goodsAfterSale/afterSaleDetail",
                      name: "afterSaleDetail",
                      component: () =>
                        import("@/views/communityService/afterSaleManage/goodsAfterSaleManage/afterSaleDetail"),
                      meta: {
                        name: "商品售后详情",
                      },
                    },
                  ]
                },
                {
                  path: "/communityService/commodityManage/afterSaleManage/complaintManage/list",
                  name: "complaintManage",
                  component: Main,
                  meta: {
                    name: "投诉管理",
                  },
                  children: [
                    {
                      path: "/communityService/commodityManage/afterSaleManage/complaintManage/list",
                      name: "complaintManage",
                      component: () =>
                        import("@/views/communityService/afterSaleManage/complaintManage"),
                      meta: {
                        name: "投诉管理",
                      },
                    },
                    {
                      path: "/communityService/commodityManage/afterSaleManage/complaintManage/complaintDetail",
                      name: "complaintDetail",
                      component: () =>
                        import("@/views/communityService/afterSaleManage/complaintManage/complaintDetail"),
                      meta: {
                        name: "投诉详情",
                      },
                    },
                  ]
                },

              ]
            },
            {
              path: "/communityService/marketing",
              name: "marketing",
              component: Main,
              meta: {
                name: "营销推广",
              },
              children: [
                {
                  path: "/communityService/marketing/advertisingManage",
                  name: "advertisingManage",
                  component: () =>
                    import("@/views/communityService/marketing/advertisingManage"),
                  meta: {
                    name: "广告管理"
                  }
                },
                {
                  path: "/communityService/marketing/thematicEventManage/list",
                  name: "thematicEventManage",
                  component: Main,
                  meta: {
                    name: "专题活动管理",
                    type: 1
                  },
                  children: [
                    {
                      path: "/communityService/marketing/thematicEventManage/list",
                      name: "thematicEventManage",
                      component: () =>
                        import("@/views/communityService/marketing/thematicEventManage"),
                      meta: {
                        name: "专题活动管理",
                      },
                    },
                    {
                      path: "/communityService/marketing/thematicEventManage/add",
                      name: "addThematicEvent",
                      component: () =>
                        import("@/views/communityService/marketing/thematicEventManage/addThematicEvent"),
                      meta: {
                        name: "添加专题活动",
                      },
                    },
                    {
                      path: "/communityService/marketing/thematicEventManage/edit/:id",
                      name: "editThematicEvent",
                      component: () =>
                        import("@/views/communityService/marketing/thematicEventManage/addThematicEvent"),
                      meta: {
                        name: "编辑专题活动",
                      },
                    },
                    {
                      path: "/communityService/marketing/thematicEventManage/detail/:id",
                      name: "thematicEventDetail",
                      component: () =>
                        import("@/views/communityService/marketing/thematicEventManage/thematicEventDetail"),
                      meta: {
                        name: "专题活动详情",
                      },
                    },
                  ]
                },

                {
                  path: "/communityService/marketing/couponsManage",
                  name: "couponsManage",
                  component: Main,
                  meta: {
                    name: "优惠券管理",
                    type: 1
                  },
                  children: [
                    {
                      path: "/communityService/marketing/couponsManage/list",
                      name: "couponsManage",
                      component: () =>
                        import("@/views/communityService/marketing/couponsManage"),
                      meta: {
                        name: "优惠券管理",
                      },
                    },
                    {
                      path: "/communityService/marketing/couponsManage/detail/:id",
                      name: "couponsDetail",
                      component: () =>
                        import("@/views/communityService/marketing/couponsManage/couponsDetail"),
                      meta: {
                        name: "优惠券详情",
                      },
                    },
                    {
                      path: "/communityService/marketing/couponsManage/add",
                      name: "addCoupon",
                      component: () =>
                        import("@/views/communityService/marketing/couponsManage/addCoupon"),
                      meta: {
                        name: "添加优惠券",
                      },
                    },
                    {
                      path: "/communityService/marketing/couponsManage/edit/:id",
                      name: "editCoupon",
                      component: () =>
                        import("@/views/communityService/marketing/couponsManage/addCoupon"),
                      meta: {
                        name: "编辑优惠券",
                      },
                    },
                  ]
                },
              ]
            },
          ]
        },

        {
          path: "/basicManage",
          name: "basicManage",
          // redirect: '/basicManage/organizationInfo',
          component: Main,
          meta: {
            name: "基础管理"
          },
          children: [
            {
              path: "/basicManage/organizationInfo",
              name: "organizationInfo",
              component: () => import("@/views/basicManage/organizationInfo"),
              meta: {
                name: "机构信息",
                type: 1
              }
            },
            {
              path: "/basicManage/basicsSetting",
              name: "basicsSetting",
              component: Main,
              meta: {
                name: "基础设置"
              },
              children: [
                {
                  path: "/basicManage/basicsSetting/manageBuilding",
                  name: "manageBuilding",
                  component: () =>
                    import("@/views/basicManage/basicsSetting/manageBuilding"),
                  meta: {
                    name: "楼房管理"
                  }
                },
                {
                  path: "/basicManage/basicsSetting/manageBedType",
                  name: "manageBedType",
                  component: () =>
                    import("@/views/basicManage/basicsSetting/manageBedType"),
                  meta: {
                    name: "床位类型管理"
                  }
                },
                {
                  path: "/basicManage/basicsSetting/manageNursingProject",
                  name: "manageNursingProject",
                  component: () =>
                    import(
                      "@/views/basicManage/basicsSetting/manageNursingProject"
                    ),
                  meta: {
                    name: "护理项目管理"
                  }
                },
                {
                  path: "/basicManage/basicsSetting/manageCarePackages",
                  // redirect:
                  //   "/basicManage/basicsSetting/manageCarePackages/list",
                  name: "manageCarePackages",
                  component: Main,
                  meta: {
                    name: "护理套餐管理"
                  },
                  children: [
                    {
                      path:
                        "/basicManage/basicsSetting/manageCarePackages/list",
                      name: "manageCarePackagesList",
                      component: () =>
                        import(
                          "@/views/basicManage/basicsSetting/manageCarePackages"
                        ),
                      meta: {
                        name: "护理套餐列表"
                      }
                    },
                    {
                      path: "/basicManage/basicsSetting/manageCarePackages/add",
                      name: "addCarePackages",
                      component: () =>
                        import(
                          "@/views/basicManage/basicsSetting/manageCarePackages/addOrEdit"
                        ),
                      meta: {
                        name: "添加护理套餐"
                      }
                    },
                    {
                      path:
                        "/basicManage/basicsSetting/manageCarePackages/edit/:id",
                      name: "editCarePackages",
                      component: () =>
                        import(
                          "@/views/basicManage/basicsSetting/manageCarePackages/addOrEdit"
                        ),
                      meta: {
                        name: "编辑护理套餐"
                      }
                    }
                  ]
                },
                {
                  path: "/basicManage/basicsSetting/manageDining",
                  name: "manageDining",
                  // redirect: "/basicManage/basicsSetting/manageDining/list",
                  component: Main,
                  meta: {
                    name: "餐饮套餐管理"
                  },
                  children: [
                    {
                      path: "/basicManage/basicsSetting/manageDining/list",
                      name: "manageDiningList",
                      component: () =>
                        import(
                          "@/views/basicManage/basicsSetting/manageDining"
                        ),
                      meta: {
                        name: "餐饮套餐列表"
                      }
                    },
                    {
                      path: "/basicManage/basicsSetting/manageDining/add",
                      name: "addDining",
                      component: () =>
                        import(
                          "@/views/basicManage/basicsSetting/manageDining/addOrEdit"
                        ),
                      meta: {
                        name: "添加餐饮套餐"
                      }
                    },
                    {
                      path: "/basicManage/basicsSetting/manageDining/edit/:id",
                      name: "editDining",
                      component: () =>
                        import(
                          "@/views/basicManage/basicsSetting/manageDining/addOrEdit"
                        ),
                      meta: {
                        name: "编辑餐饮套餐"
                      }
                    }
                  ]
                },
                {
                  path: "/basicManage/basicsSetting/manageCostItem",
                  // redirect: "/basicManage/basicsSetting/manageCostItem/list",
                  name: "manageCostItem",
                  component: Main,
                  meta: {
                    name: "费用项目管理"
                  },
                  children: [
                    {
                      path: "/basicManage/basicsSetting/manageCostItem/list",
                      name: "manageDiningList",
                      component: () =>
                        import(
                          "@/views/basicManage/basicsSetting/manageCostItem"
                        ),
                      meta: {
                        name: "费用项目列表"
                      }
                    },
                    {
                      path: "/basicManage/basicsSetting/manageCostItem/add",
                      name: "addDining",
                      component: () =>
                        import(
                          "@/views/basicManage/basicsSetting/manageCostItem/addOrEdit"
                        ),
                      meta: {
                        name: "添加费用项目"
                      }
                    },
                    {
                      path:
                        "/basicManage/basicsSetting/manageCostItem/edit/:id",
                      name: "editDining",
                      component: () =>
                        import(
                          "@/views/basicManage/basicsSetting/manageCostItem/addOrEdit"
                        ),
                      meta: {
                        name: "编辑费用项目"
                      }
                    }
                  ]
                }
              ]
            },
            {
              path: "/basicManage/materialManage",
              name: "materialManage",
              // redirect: "/basicManage/materialManage/addressBook",
              component: Main,
              meta: {
                name: "资料管理"
              },
              children: [
                {
                  path: "/basicManage/materialManage/addressBook",
                  name: "addressBook",
                  component: () =>
                    import("@/views/basicManage/materialManage/addressBook"),
                  meta: {
                    name: "通讯录管理"
                  }
                },
                {
                  path: "/basicManage/materialManage/inform",
                  name: "inform",
                  component: () =>
                    import("@/views/basicManage/materialManage/inform"),
                  meta: {
                    name: "通知公告"
                  }
                }
              ]
            },
            {
              path: "/basicManage/systemManage",
              name: "systemManage",
              // redirect: "/basicManage/systemManage/manageUser",
              component: Main,
              meta: {
                name: "系统管理"
              },
              children: [
                {
                  name: "ManageUser",
                  path: "/basicManage/systemManage/manageUser",
                  component: () =>
                    import("@/views/basicManage/systemManage/manageUser"),
                  meta: {
                    name: "用户管理"
                  }
                },
                {
                  name: "ManagePermission",
                  path: "/basicManage/systemManage/managePermission",
                  component: () =>
                    import("@/views/basicManage/systemManage/managePermission"),
                  meta: {
                    name: "权限管理"
                  }
                },
                {
                  name: "userSetting",
                  path: "/basicManage/systemManage/userSetting",
                  component: () =>
                    import("@/views/basicManage/systemManage/userSetting"),
                  meta: {
                    name: "个人设置"
                  }
                },
                {
                  name: "manageMenu",
                  path: "/basicManage/systemManage/manageMenu",
                  component: () =>
                    import("@/views/basicManage/systemManage/manageMenu"),
                  meta: {
                    name: "菜单管理"
                  }
                },
                {
                  name: "manageRole",
                  path: "/basicManage/systemManage/manageRole",
                  component: () =>
                    import("@/views/basicManage/systemManage/manageRole"),
                  meta: {
                    name: "角色管理"
                  }
                },
                {
                  name: "manageOrganization",
                  path: "/basicManage/systemManage/manageOrganization",
                  component: () =>
                    import(
                      "@/views/basicManage/systemManage/manageOrganization"
                    ),
                  meta: {
                    name: "部门管理"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});
