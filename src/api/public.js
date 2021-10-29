/*
  公共接口
 */
import http from "@/config/http";
import baseUrl from "@/config/baseUrl";

// 获取自己资料信息
export const getUserInfo = () =>
  http.get(`${baseUrl.admin}/admin/0`);

// 上传图片/文件接口
export const upload = params =>
  http.post(`${baseUrl.fastdfs}/fastdfs/pc/upload`, params, {
    headers: {
      'Content-Type': "multipart/form-data"
    }
  });

// 获取机构列表接口
export const getOrganizationList = params =>
  http.post(`${baseUrl.admin}/organization/search`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// 获取用户列表不分页
export const userNoPage = params =>
  http.post(`${baseUrl.admin}/menu/search`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// 获取用户已拥有的角色
export const getUserRole = params =>
  http.post(`${baseUrl.admin}/adminrole/search/extends`, params, {
    headers: {
      "Content-Type": "application/json"
    }
});

// 清楚权限缓存
export const clearCacheData = () =>
  http.delete(`${baseUrl.admin}/permission/redis`, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// 登录
export const reqLogin = params =>
  http.post(`${baseUrl.admin}/login`, params, { noCertification: true });

// 退出登录
export const logout = () =>
http.get(`${baseUrl.admin}/login/quit`);

// 获取当前登录用户的菜单列表
export const currentUserMenu = () =>
http.get(`${baseUrl.admin}/menu/admin`);


