/* 
    客户概览接口
*/
import http from "@/config/http";
import baseUrl from "@/config/baseUrl";
const HEADERS = {
    headers: {
        "Content-Type": "application/json;"
    }
}


//------------------------------------------------------------------------------------
// 客户池统计
export const statisticsClient = () => http.get(`${baseUrl.client}/statistics/client`);
// 公海池统计
export const statisticsPublic = () => http.get(`${baseUrl.client}/statistics/public`);
// 客户成交量
export const statisticsWinClient = () => http.get(`${baseUrl.client}/statistics/sum`);
// 业务员总量
export const statisticsStaff = () => http.get(`${baseUrl.client}/statistics/staff`);
// 成交金额
export const statisticsMoney = () => http.get(`${baseUrl.client}/statistics/money`);

// 数据简报
export const statisticsDatareport = () => http.get(`${baseUrl.client}/statistics/datareport`);

// 新增客户
export const statisticsAddClient = () => http.get(`${baseUrl.client}/statistics/addclient`);
// 客户来源
export const statisticsSource = () => http.get(`${baseUrl.client}/statistics/source`);
// 客户成交数
export const statisticsBargain = () => http.get(`${baseUrl.client}/statistics/bargain`);
// 业绩排行
export const statisticsRanking = () => http.get(`${baseUrl.client}/statistics/ranking`);

// 分页搜索客户信息列表
export const statisticsPage = params => http.post(`${baseUrl.client}/statistics/search/page`, params);
//------------------------------------------------------------------------------------