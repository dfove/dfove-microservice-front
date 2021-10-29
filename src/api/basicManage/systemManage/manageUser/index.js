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

// 获取用户不分页列表
export const getUserNoPage = params =>
  http.post(`${baseUrl.admin}/adminrole/search/extends`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// 获取角色扩展列表（不分页）
export const getRoleNoPage = params =>
  http.post(`${baseUrl.admin}/role/search`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
