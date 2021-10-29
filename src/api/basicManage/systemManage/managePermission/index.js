/*
  基础管理
 */
  import http from "@/config/http";
  import baseUrl from "@/config/baseUrl";
  
  //------------------------------------------------------------------------------------
  // 权限管理
  // 获取权限列表
  export const getPermissionoPage = params =>
    http.post(`${baseUrl.admin}/permission/search/page/topic`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  // 添加权限
  export const addPermissiono = params =>
    http.post(`${baseUrl.admin}/permission`, params);
  // 修改权限
  export const editPermissiono = params =>
    http.put(`${baseUrl.admin}/permission`, params);
  // 删除权限
  export const deletePermissiono = id =>
    http.delete(`${baseUrl.admin}/permission/${id}`);