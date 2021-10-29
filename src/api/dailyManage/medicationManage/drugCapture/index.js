/*
  药品缴存
 */
import http from "@/config/http";
import baseUrl from "@/config/baseUrl";

// 获取table数据
export const apiDrugTable = params =>
  http.post(`${baseUrl.daily}/ageddrug/search/page`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// 添加
export const apiAddingentries = params =>
  http.post(`${baseUrl.daily}/ageddrug`, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// 获取事故信息
export const apiInformation = id =>
  http.get(`${baseUrl.daily}/agedaccident/${id}`);
