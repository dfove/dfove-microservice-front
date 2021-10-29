
import router from "@/router/index";
import { currentUserMenu } from "@/api/public";

export default {
  state: {
    hasGetRoute: false,
    get menuList() {
      return JSON.parse(localStorage.getItem("USER_MENU"));
    },
    set menuList(data) {
      localStorage.setItem("USER_MENU", JSON.stringify(data));
    },
  },
  mutations: {
    CLEAR_ALL (state, data) {
      state.hasGetRoute = false
      state.menuList = []
    },
    SET_MENULIST(state, data) {},
    ADD_ROUTES(state, data) {
      state.menuList = data;
      const routerList = [
        {
          path: "/",
          redirect: "/home",
          name: "Layout",
          component: () => import("@/views/layout"),
          meta: {
            name: "点服科技信息化系统"
          },
          children: data
        },
        {
          path: "*",
          name: "404",
          component: () => import("@/views/error/404"),
        },
      ];
      state.hasGetRoute = true
      localStorage.setItem("USER_MENU", JSON.stringify(routerList));
      router.addRoutes(routerList);      
      router.options.routes.push(...routerList);
      // console.log("所有菜单", router);
    }
  },
  actions: {
    // 获取动态菜单
    GET_PERMISSION({ commit, state }) {
      currentUserMenu().then(res => {
        let formatData = [];
        res.data.map(item => {
          let obj = {
            path: item.menuUrl,
            name: item.menuName,
            menuId: item.menuId,
            parentId: item.parentId,
            menuOrder: item.menuOrder,
            menuImg: item.menuImg,
            meta: {
              menuType: item.menuType, // 用来判断菜单的显示隐藏
              name: item.menuName,
              icon: item.menuImg,
              permissions: item.permissionIdents
            },
            component: loadView(item.componentUrl),
            children: []
          };
          menuChildrenLoop(item, obj);
          formatData.push(obj);
        });
        commit("ADD_ROUTES", formatData);
      });
    }
  }
};

// 设置重定向
// function setRedirect(item) {
//   if (item.children && item.children.length >= 1) {
//     item.children.forEach(item2 => {
//       if (item2.meta.menuType == 1) {
//         item.redirect = `${item.children[0].path}`;
//         setRedirect(item2);
//       }
//     });
//   }
// }

// 根据前端的路由，重新组织数据
function menuChildrenLoop(item, obj) {
  if (Array.isArray(item.children) && item.children.length) {
    item.children.forEach(item2 => {
      let menuList = {
        path: item2.menuUrl,
        name: item2.menuName,
        parentId: item2.parentId,
        menuOrder: item2.menuOrder,
        menuId: item2.menuId,
        menuImg: item2.menuImg,
        meta: {
          menuType: item2.menuType, // 用来判断菜单的显示隐藏
          name: item2.menuName,
          icon: item2.menuImg,
          permissions: item2.permissionIdents
        },
        // component: r => require([`@/${item2.componentUrl}`], r),
        component: loadView(item2.componentUrl),
        component2: item2.componentUrl,
        children: []
      };
      obj.children.push(menuList);
      menuChildrenLoop(item2, menuList);
    });
  }
}

function loadView(view) {
  // 路由懒加载
  return () => import(`@/views${view}`);
  // return (resolve) => require([`@${view}.vue`], resolve)
}
