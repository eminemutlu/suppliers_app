import { App } from "vue";
import axios from "axios";
import VueAxios from 'vue-axios'
import JwtService from "@/services/JwtService";
import { AxiosResponse, AxiosRequestConfig } from "axios";

class ApiService {

    public static vueInstance: App;

    public static init(app: App<Element>) {

      ApiService.vueInstance = app;
      ApiService.vueInstance.use(VueAxios, axios);
      ApiService.vueInstance.axios.defaults.baseURL = process.env.VUE_APP_HOST_APP_URL;
      ApiService.vueInstance.axios.defaults.headers.common['allowedHeaders'] = '*';

      axios.interceptors.response.use(
        (res) => {
          return res;
        },
        (err) => {
          if(err.response.status === 401) {
            JwtService.destroyToken();
            alert('Your session has expired! You are redirected to the login page.');
            setTimeout(() => {
              window.location.href = "/sign-in";
            }, 2000);
          }
          if(err.response.status === 500) {
            alert('The service is not responding! Try again later.');
            setTimeout(() => {
              window.location.href = "dashboard";
            }, 2000);
          }
          throw err;
        }
      )
    } 

    public static setHeader(): void {
      ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `Token ${JwtService.getToken()}`;
      ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
    }

    public static get(
      resource: string,
      slug = "" as string
    ): Promise<AxiosResponse> {
      return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
    }

    public static post(
      resource: string,
      params: AxiosRequestConfig
    ): Promise<AxiosResponse> {
      return ApiService.vueInstance.axios.post(`${resource}`, params);
    }

    public static put(
      resource: string,
      params: AxiosRequestConfig
    ): Promise<AxiosResponse> {
      return ApiService.vueInstance.axios.put(`${resource}`, params);
    }

    public static delete(resource: string): Promise<AxiosResponse> {
      return ApiService.vueInstance.axios.delete(resource);
    }
      
}

export default ApiService;
