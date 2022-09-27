
import ApiService from "@/services/ApiService";
import JwtService from "@/services/JwtService";
import { Actions, Mutations } from "@/store/enums/storeEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

export interface Supplier {
  count : number,
  next : string,
  previous : string,
  results: {
    id : number,
    name : string,
    description : string
  }
}
export interface Quotes {
  count : number,
  next : string,
  previous : string,
  results: {
    id : number,
    amount : number,
    created : Date
    title : string,
    supplier_id : number
  }
}
export interface User {
    id : string,
    username : string,
    password: string,
    first_name : string,
    last_name : string
}

@Module
export default class ContentModule extends VuexModule {

    QuotesDatasource = {} as Quotes;
    SupplierDatasource = {} as Supplier;
    SupplierByIdDatasource = {} as Supplier;
    UserDatasource = {} as User;
    errors = {};
    isAuthenticated = !!JwtService.getToken();
    popUpVisible: boolean = false;
    
    get getQuotesDatasource() {
        return this.QuotesDatasource;
    }
    get getSupplierDatasource() {
        return this.SupplierDatasource;
    }
    get getSupplierByIdDatasource() {
        return this.SupplierByIdDatasource;
    }
    get getPopupVisible() {
      return this.popUpVisible;
    }


  @Mutation
  [Mutations.SET_ERROR](error: any) {
    this.errors = { ...error };
  }
  @Mutation
  [Mutations.SET_SUPPLIERS](data: Supplier) {
    this.isAuthenticated = true;
    this.SupplierDatasource = data;
    this.errors = {};
  }
  @Mutation
  [Mutations.SET_QUOTES](data: Quotes) {
    this.isAuthenticated = true;
    this.QuotesDatasource = data;
    this.errors = {};
  }
  @Mutation
  [Mutations.SET_SUPPLIERBYID_DATA](data: Supplier) {
    this.isAuthenticated = true;
    this.SupplierByIdDatasource = data;
    this.errors = {};
  }
  @Mutation
  [Mutations.SET_POPUP_VISIBLE](val: boolean) {
    this.popUpVisible = val;
  }

  
  @Action
  async [Actions.SUPPLIERS](page: any) {
    ApiService.setHeader();
    return await ApiService.get(`${process.env.VUE_APP_BASE}${process.env.VUE_APP_SUPPLIERS_URL}/?page=${page}&`)
      .then((res: any) => {
        this.context.commit(Mutations.SET_SUPPLIERS, res.data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

  @Action
  async [Actions.SUPPLIERBYID_DATA](id: number) {
    ApiService.setHeader();
    return await ApiService.get(`${process.env.VUE_APP_BASE}${process.env.VUE_APP_SUPPLIERS_URL}/${id}`)
      .then((res: any) => {
        if(res.data) {
          this.context.commit(Mutations.SET_SUPPLIERBYID_DATA, res.data);
          this.context.commit(Mutations.SET_POPUP_VISIBLE, true);
        }
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }
  @Action
  async [Actions.QUOTES](page: number) {
    ApiService.setHeader();
    return await ApiService.get(`${process.env.VUE_APP_BASE}${process.env.VUE_APP_QUOTES_URL}/?page=${page}&`)
      .then((res: any) => {
        this.context.commit(Mutations.SET_QUOTES, res.data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_ERROR, response.data.errors);
      });
  }

}