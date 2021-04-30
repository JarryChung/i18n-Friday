import React, { ReactNode, useContext, useState } from 'react';
import { http } from 'helpers/http';
import { useMount } from 'helpers/hooks';
import {
  getToken,
  login as loginFn,
  logout as logoutFn,
  register as registerFn,
  IAuthRequset,
  IAuthResponse,
  IUser,
} from 'helpers/auth';

const initUser = async () => {
  let user = null;
  let isLoading = false; // TODO 联调后设置为 true
  const token = getToken();
  if (token) {
    const data = await http.get('/me', { token });
    user = (data as IAuthResponse).user;
    isLoading = false;
  }
  return { user, isLoading };
};

const AuthContext = React.createContext<
  | {
      user: IUser | null;
      isLoading: boolean;
      login: (data: IAuthRequset) => void;
      register: (data: IAuthRequset) => void;
      logout: () => void;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = (data: IAuthRequset) => loginFn(data).then(setUser);
  const register = (data: IAuthRequset) => registerFn(data).then(setUser);
  const logout = () => logoutFn().then(() => setUser(null));

  useMount(() => {
    initUser().then(({ user, isLoading }) => {
      setUser(user);
      setIsLoading(isLoading);
    });
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, isLoading, login, register, logout }}
    />
  );
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 中使用');
  }
  return context;
};
