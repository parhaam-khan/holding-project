import { ReactNode } from "react";

export interface DataHeaders {
    Authorization?: string;
    'Content-Type'?: string;
    Accept?: string;
    'X-VIEWNAME'?: string;
    'SM-TOKEN'?: string;
  }

  export interface LayoutProps {
    children?: ReactNode,
    footer?:boolean,
    loginCheck?:boolean,
    apiCode?:number
  }