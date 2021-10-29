/*
  基础管理
 */
  import http from "@/config/http";
  import baseUrl from "@/config/baseUrl";
  
  //------------------------------------------------------------------------------------
  // 用户管理
  // 获取用户列表
  export const getUserPage = params =>
    http.post(`${baseUrl.admin}/admin/search/page`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  // 获取用户不分页列表
  export const getUserNoPage = params =>
    http.post(`${baseUrl.admin}/adminrole/search/extends`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  // 添加用户
  export const addUser = params => http.post(`${baseUrl.admin}/admin`, params);
  // 修改用户
  export const editUser = params => http.put(`${baseUrl.admin}/admin`, params);
  // 删除用户
  export const deleteUser = id => http.delete(`${baseUrl.admin}/admin/${id}`);
  // 更新用户角色
  export const updateUserRole = params =>
    http.put(`${baseUrl.admin}/adminrole/batch`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  // 重置用户密码
  export const resetUserPassword = params =>
    http.put(`${baseUrl.admin}/admin/password/reset`, params);
  
  //------------------------------------------------------------------------------------
  // 角色管理
  // 获取角色扩展列表（不分页）
  export const getRoleNoPage = params =>
    http.post(`${baseUrl.admin}/role/search`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  
  // 获取用户的角色
  export const getUserRole = params =>
    http.post(`${baseUrl.admin}/adminrole/search/extends`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  
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
  export const createRole = params =>
    http.post(`${baseUrl.admin}/role`, params);
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