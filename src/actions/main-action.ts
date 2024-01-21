import { API, dataHeaders, requestHttp } from "@/services/request-http";

export const getAllHoldingData = (merchantId:number) => {
    dataHeaders['content-type'] = "application/json";
    dataHeaders["Accept"] = "application/json";
    dataHeaders["X-VIEWNAME"] = "default";
  requestHttp(`${merchantId}/holding`, "get", dataHeaders)
}