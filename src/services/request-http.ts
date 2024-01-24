import axios from "axios";
import { apiUrl } from "./apiUrl";
import { DataHeaders } from "@/types";

export const API = async(url:string, method:string, data?:{},header:any ={}) => {
    let headers = {
        Authorization: 'Basic YXBpOm11cHJhIzEyM0A=',
        'X-VIEWNAME': header['X-VIEWNAME'] ? header['X-VIEWNAME'] : 'default',
        'Content-Type': header['Content-Type'] ? header['Content-Type'] : 'application/json',
        'Accept': header['Accept'] ? header['Accept'] : 'application/json',
      };
    let response = await axios({
        method: method,
        url: apiUrl + url,
        headers: headers,
        data: data,
      });
      return response;
}

// export const requestHttp = async(url:string, method:string, headers:object, data?:object) => {
//     const reqUrl = apiUrl + url;
//       try {
//         const res = await chooseMethod(method,reqUrl,headers,data);
//         return {
//           status: 'success',
//           content: res && res.data,
//         };
//       } catch (err:any) {
//         return {
//           status: 'errors',
//           errors: err && err.response && err.response.data,
//         };
//       }
// }

// function chooseMethod(method:string,reqUrl:string,headers:object,data?:object) {
//     switch (method) {
//       case 'get':
//         return axios.get(reqUrl, { headers: headers, data:data });
//       case 'post':
//         return axios.post(reqUrl,data, { headers:headers });
//       case 'delete':
//         return axios.delete(reqUrl, {
//           headers: headers,
//           data: data,
//         });
//       case 'patch':
//         return axios.patch(reqUrl, data, { headers: headers });
//       case 'put':
//         return axios.put(reqUrl, data, { headers: headers });
//       default:
//         break;
//     }
//   }

export const dataHeaders:DataHeaders = {
'Authorization': 'Basic YXBpOm11cHJhIzEyM0A=',
  };