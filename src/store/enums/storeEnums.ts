

enum Actions {
    // action types
    LOGIN = "login",
    REGISTER = "regester",
    JWTAUTH = "jwtauth",
    LOGOUT = "logout",
    SUPPLIERS = "suppliers",
    SUPPLIERBYID_DATA = "supplierByIdData",
    QUOTES = 'quotes',
}
  
enum Mutations {
    // mutation types
    SET_AUTH = "setAuth",
    SET_ERROR = "setError",
    SET_SUPPLIERS = "setSuppliers",
    SET_SUPPLIERBYID_DATA = "setSupplierByIdData",
    SET_POPUP_VISIBLE = "setPopupVisible",
    SET_QUOTES = 'setQuotes',
    SET_SUPPLIERBYID = 'setSupplierById', 
    PURGE_AUTH = "logOut",
}
  
export { Actions, Mutations };
  