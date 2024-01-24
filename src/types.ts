import { ReactNode } from "react";

export interface DataHeaders {
    Authorization: string;
    'content-type'?: string;
    Accept?: string;
    'X-VIEWNAME'?: string;
  }

  export interface Props {
    children?: ReactNode
  }