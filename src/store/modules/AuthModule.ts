
import ApiService from "@/services/ApiService";
import JwtService from "@/services/JwtService";
import { Actions, Mutations } from "@/store/enums/storeEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface User {
    id?: string;
    username: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    auth_token: string;
  }

export interface UserAuthInfo {
    user: User;
    isAuthenticated: boolean;
  }

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {

  errors = {};
  user = {} as User;
  isAuthenticated = !!JwtService.getToken();


  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
      return this.isAuthenticated;
  }

    
  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error: any) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
    JwtService.destroyToken();
  }


  @Mutation
  [Mutations.SET_AUTH](data: User) {
    this.isAuthenticated = true;
    this.errors = {};
    JwtService.saveToken(data.auth_token);
    JwtService.saveUserName(data.username);
    if(data.id){
      JwtService.saveUserId(data.id);
    }
  }
  

  @Action
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }
    
  @Action
  [Actions.LOGIN](credentials: any) {
      return ApiService.post('/api-token-auth/', credentials)
      .then(({ data }) => {
        const result: User = {
          auth_token: data.token,
          username: credentials.username
        }
          this.context.commit(Mutations.SET_AUTH, result);
      })
      .catch(({ error }) => {
        if(!error) {
          const err: Object = {
            message: 'error'
          }
          this.context.commit(Mutations.SET_ERROR, err);
        } else {
          this.context.commit(Mutations.SET_ERROR, error);
        }
      });
  }
  @Action
  [Actions.REGISTER](credentials: any) {
      return ApiService.post(`${process.env.VUE_APP_BASE}${process.env.VUE_APP_USERS_URL}`, credentials)
      .then(({ data }) => {
        const result: User = {
          id: data.id,
          auth_token: data.auth_token,
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name
        }
          this.context.commit(Mutations.SET_AUTH, result);
      })
      .catch(({ error }) => {
        if(!error) {
          const err: Object = {
            message: 'error'
          }
          this.context.commit(Mutations.SET_ERROR, err);
        } else {
          this.context.commit(Mutations.SET_ERROR, error);
        }
      });
  }

}
