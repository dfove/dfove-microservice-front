/*
  基础管理
 */
  import http from "@/config/http";
  import baseUrl from "@/config/baseUrl";
  
  //--------------------------------------------------------------------------------------
  // 菜单管理
  // 获取菜单列表
  export const menuPage = params =>
    http.post(`${baseUrl.admin}/menu/search/page`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  // 获取菜单列表不分页
  export const menuNoPage = params =>
    http.post(`${baseUrl.admin}/menu/searchs`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  // 添加菜单
  export const addMenu = params => http.post(`${baseUrl.admin}/menu`, params);
  // 修改菜单
  export const editMenu = params => http.put(`${baseUrl.admin}/menu`, params);
  // 删除菜单
  export const deleteMenu = params =>
    http.delete(`${baseUrl.admin}/menu/${params.menuId}`);