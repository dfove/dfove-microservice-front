/*
  基础管理
 */
import http from "@/config/http";
import baseUrl from "@/config/baseUrl";

//--------------------------------------------------------------------------------------
// 角色管理
// 获取角色列表
export const getRoleList = params =>
  http.post(`${baseUrl.admin}/role/search`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
// 获取菜单权限列表
export const getMenuPermissionList = params =>
  http.post(`${baseUrl.admin}/menu/search/permission`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
// 创建角色
export const createRole = params => http.post(`${baseUrl.admin}/role`, params);
// 修改角色
export const editRole = params => http.put(`${baseUrl.admin}/role`, params);
// 删除角色
export const deleteRole = roleId =>
  http.delete(`${baseUrl.admin}/role/${roleId}`);
// 批量更新角色菜单
export const updateRoleMenu = params =>
  http.put(`${baseUrl.admin}/rolemenu/batch`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
// 批量更新角色权限
export const updateRolePermission = params =>
  http.put(`${baseUrl.admin}/rolepermission/batch`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
// 获取角色已拥有的菜单列表
export const getRoleMenu = params =>
  http.post(`${baseUrl.admin}/rolemenu/search/extends`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
// 获取角色已拥有的权限
export const getRolePermission = params =>
  http.post(`${baseUrl.admin}/rolepermission/search/extends`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// 获取所有权限
export const getAllPrivilegeList = params =>
  http.post(`${baseUrl.admin}/permission/search`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
