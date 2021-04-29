import { authTokenKey } from './constants';
import { http } from './http';

export interface IUser {
  id: string;
  name: string;
  token: string;
}
export interface IAuthResponse {
  user: IUser;
}
export interface IAuthRequset {
  username: string;
  password: string;
}

export const getToken = () => window.localStorage.getItem(authTokenKey);

export const setToken = (user: IUser) => {
  window.localStorage.setItem(authTokenKey, user.token);
  return user;
};

export const logout = async () => window.localStorage.removeItem(authTokenKey);

export const login = (data: IAuthRequset) => {
  return http.post('/login', data).then((data) => {
    return setToken((data as IAuthResponse).user);
  });
};

export const register = (data: IAuthRequset) => {
  return http.post('/register', data).then((data) => {
    return setToken((data as IAuthResponse).user);
  });
};
