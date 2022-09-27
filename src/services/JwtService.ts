const ID_TOKEN_KEY = "token" as string;
const USER_FULLNAME = "userName" as string;
const USER_ID = "userId" as string;

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

//user
export const getUserName = (): string | null => {
  return window.localStorage.getItem(USER_FULLNAME);
};
//userId
export const getUserId = (value: string): void => {
  window.localStorage.setItem(USER_ID, value);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

//user
 export const saveUserName = (value: string): void => {
  window.localStorage.setItem(USER_FULLNAME, value);
};

//userId
export const saveUserId = (value: string): void => {
  window.localStorage.setItem(USER_ID, value);
};


/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
  window.localStorage.removeItem(USER_FULLNAME);
  window.localStorage.removeItem(USER_ID);
};


export default { 
  getToken, 
  getUserName,
  getUserId,
  saveToken, 
  saveUserName,
  saveUserId,
  destroyToken
};
