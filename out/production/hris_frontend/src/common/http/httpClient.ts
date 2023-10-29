/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios, {
   AxiosInstance,
   AxiosResponse,
   Method,
   InternalAxiosRequestConfig,
   AxiosPromise,
} from 'axios';

export interface Request {
   headers?: Record<string, string>;
   data?: any;
   params?: any;
}

export class HttpClient {
   private baseURL: string;
   private httpClient: AxiosInstance;

   constructor(baseURL?: string) {
      this.baseURL = baseURL ?? import.meta.env.VITE_REACT_EMPLOYEE_API_END_POINT;
      //this.baseURL = baseURL ?? import.meta.env.VITE_REACT_API_END_POINT;
      this.httpClient = axios.create({
         baseURL: this.baseURL,
         timeout: 60000,
      });

      this.httpClient.interceptors.request.use(this.handleRequestUse);
      this.httpClient.interceptors.response.use(this.handleResponseUse);
   }
   //add our interceptor logic,
   //which can modify the request or response before they are sent or received.

   private handleRequestUse(config: InternalAxiosRequestConfig) {
      // handle request interceptor logic here
      return config;
   }

   private handleResponseUse(config: AxiosResponse) {
      // handle response interceptor logic here
      return config;
   }

   private async handleRequest(
      url: string,
      method: Method,
      config: Request = {},
   ): Promise<AxiosResponse<any>> {
      const { headers, data, params } = config;
      const response = await this.httpClient.request({
         url,
         method,
         data,
         params,
         headers,
      });
      return response;
   }

   public get<T>(url: string, config: Request = {}): AxiosPromise<T> {
      return this.handleRequest(url, 'get', config);
   }

   public post<T>(url: string, config: Request = {}): AxiosPromise<T> {
      return this.handleRequest(url, 'post', config);
   }

   public put<T>(url: string, config: Request = {}): AxiosPromise<T> {
      return this.handleRequest(url, 'put', config);
   }

   public delete<T>(url: string, config: Request = {}): AxiosPromise<T> {
      return this.handleRequest(url, 'delete', config);
   }

   public patch<T>(url: string, config: Request = {}): AxiosPromise<T> {
      return this.handleRequest(url, 'patch', config);
   }
}

export default HttpClient;
