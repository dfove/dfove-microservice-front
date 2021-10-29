/*
  基础管理
 */
import http from "@/config/http";
import baseUrl from "@/config/baseUrl";

//------------------------------------------------------------------------------------
// 部门管理
// 获取用户列表
export const getUserPage = params =>
  http.post(`${baseUrl.admin}/admin/search/page`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// 添加部门
export const addOrganization = params =>
  http.post(`${baseUrl.admin}/organization`, params);
// 修改部门
export const editOrganization = params =>
  http.put(`${baseUrl.admin}/organization`, params);
// 删除部门
export const deleteOrganization = id =>
  http.delete(`${baseUrl.admin}/organization/${id}`, params);
// 获取管理员已拥有的角色
export const getUserRole = params =>
  http.post(`${baseUrl.admin}/adminrole/search/extends`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
// 获取不分页的管理员角色列表
export const getUserRoleNoPaging = params =>
    http.post(`${baseUrl.admin}/role/search`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
