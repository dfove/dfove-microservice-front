/*
  添加事故
 */
  import http from "@/config/http";
  import baseUrl from "@/config/baseUrl";
  
  // 添加事故
  export const apiAddAccident = params =>
    http.post(`${baseUrl.daily}/agedaccident`, params, {
        headers: {
            "Content-Type": "application/json"
          }
    });

      // 获取事故信息
  export const apiInformation = id =>
  http.get(`${baseUrl.daily}/agedaccident/${id}`);
  