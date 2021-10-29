/*
  日常管理-事故管理
 */
  import http from "@/config/http";
  import baseUrl from "@/config/baseUrl";
  
  // 事故table分页列表
  export const apiTablePage = params =>
    http.post(`${baseUrl.daily}/agedaccident/search/page`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });

 // 事故table分页列表
 export const apiDeleteAccident = id =>
 http.delete(`${baseUrl.daily}/agedaccident/${id}`);
  