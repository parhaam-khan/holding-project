import axios from "axios";
import { apiUrl } from "./apiUrl";
import { DataHeaders } from "@/types";

export const API = async(url:string, method:string, data?:{},header:DataHeaders ={}) => {
    let headers = {
        ...header,
        Authorization: 'Basic YXBpOm11cHJhIzEyM0A=',
        'X-VIEWNAME': header['X-VIEWNAME'] ? header['X-VIEWNAME'] : 'default',
        'Content-Type': header['Content-Type'] ? header['Content-Type'] : 'application/json',
        'Accept': header['Accept'] ? header['Accept'] : 'application/json',
      };
    let response = await axios({
        method: method,
        url: apiUrl + url,
        headers: headers,
        data: data ?? {},
      });
      return response;
}