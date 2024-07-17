export enum ContentType {
    JSON = 'application/json',
    FORM = 'application/x-www-form-urlencoded',
    MULTIPART = 'multipart/form-data',
    TEXT = 'text/plain',
  }

export enum Accept {
    JSON = 'application/json',
  }
  
export enum HttpHeader {
    CONTENT_TYPE = 'Content-Type',
    AUTHORIZATION = 'Authorization',
    ACCEPT = 'Accept',
  }


export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type ValueOf<T> = T[keyof T];