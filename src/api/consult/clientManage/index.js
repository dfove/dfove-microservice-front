/* 
    客户管理接口
*/
import http from "@/config/http";
import baseUrl from "@/config/baseUrl";
const HEADERS = {
    headers: {
        "Content-Type": "application/json;"
    }
}

/////////////////////////////////// 咨询接待接口S ///////////////////////////////////
// 分页搜索客户信息列表
export const clientPage = params => http.post(`${baseUrl.client}/client/search/page`, params,HEADERS);
// 查找客户信息
export const clientSearch = clientId => http.get(`${baseUrl.client}/client/${clientId}`);
// 添加客户信息
export const clientAdd = params => http.post(`${baseUrl.client}/client`, params, HEADERS);
// 更新客户信息
export const clientUpdate = params => http.put(`${baseUrl.client}/client`, params, HEADERS);
// 删除客户信息
export const clientDelete = clientId => http.delete(`${baseUrl.client}/client/${clientId}`);
// 添加客户标签
export const clientLabel = params => http.post(`${baseUrl.client}/client/label`, params);
/////////////////////////////////// 咨询接待接口E ///////////////////////////////////

/////////////////////////////////// 客户跟进信息接口S ///////////////////////////////////
// 分页搜索客户跟进信息列表
export const clientfollowupPage = params => http.post(`${baseUrl.client}/clientfollowup/search/page`, params,HEADERS);
// 添加客户跟进信息
export const clientfollowupAdd = params => http.post(`${baseUrl.client}/clientfollowup`, params);
// 更新客户跟进信息
export const clientfollowupUpdate = params => http.put(`${baseUrl.client}/clientfollowup`, params);
// 删除客户跟进信息
export const clientfollowupDelete = followupId => http.delete(`${baseUrl.client}/clientfollowup/${followupId}`);
/////////////////////////////////// 客户跟进信息接口E ///////////////////////////////////

/////////////////////////////////// 标签设置接口S ///////////////////////////////////
// 不分页搜索客户标签列表
export const labelNoPage = params => http.post(`${baseUrl.client}/label/search`, params);
// 添加客户标签
export const labelAdd = params => http.post(`${baseUrl.client}/label`, params);
/////////////////////////////////// 标签设置接口E ///////////////////////////////////

/////////////////////////////////// 员工信息接口S ///////////////////////////////////
// 不分页搜索员工入职信息列表
export const employeesPage = params => http.post(`http://192.168.31.106:61002/zhyl/v1/entry/search`, params,HEADERS);
/////////////////////////////////// 员工信息接口E ///////////////////////////////////

/////////////////////////////////// 操作日志接口S ///////////////////////////////////
// 分页搜索客户操作日志
export const operationLogPage = params => http.post(`${baseUrl.client}/clientlog/search/page`, params,HEADERS);
/////////////////////////////////// 员工信息接口E ///////////////////////////////////

