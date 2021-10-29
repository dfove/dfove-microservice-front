/*
  基础管理
 */
import http from "@/config/http";
import baseUrl from "@/config/baseUrl";

//------------------------------------------------------------------------------------
// 个人设置
// 获取用户列表
export const getUserPage = params =>
  http.post(`${baseUrl.admin}/admin/search/page`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
// 修改个人资料
export const changeUserInfo = params =>
  http.put(`${baseUrl.admin}/admin`, params);
// 修改密码
export const changePassword = params =>
  http.post(`${baseUrl.admin}/admin/password/update`, params);
