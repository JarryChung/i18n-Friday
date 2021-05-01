import qs from 'qs';
import { baseUrl } from './constants';
import { logout } from './auth';
import { message } from 'antd';

type TMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';
interface IRequestOptions extends RequestInit {
  data?: object;
  token?: string;
  method?: TMethod;
}
interface IResponse {
  code: number;
  message: string;
  data?: unknown;
}
interface IHttp {
  get(url: string, data?: object, options?: IRequestOptions): Promise<unknown>;
  put(url: string, data?: object, options?: IRequestOptions): Promise<unknown>;
  post(url: string, data?: object, options?: IRequestOptions): Promise<unknown>;
  delete(url: string, data?: object, options?: IRequestOptions): Promise<unknown>;
}

const request = (url: string, options: IRequestOptions) => {
  const { data, token, headers, ...otherOptions } = options;
  const config: IRequestOptions = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
      ...headers,
    },
    ...otherOptions,
  };

  config.method === 'GET'
    ? (url += `?${qs.stringify(data)}`)
    : (config.body = JSON.stringify(data || {}));

  return window
    .fetch(`${baseUrl}${url}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        logout();
        window.location.reload();
        return Promise.reject({ code: 401, message: '请重新登录' });
      }

      const data: IResponse = await response.json();
      if (response.ok) {
        if (data.code !== 0) {
          message.error(data.message);
          return Promise.reject(data);
        }
        return data;
      } else {
        message.error(response.statusText);
        return Promise.reject(data);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const http: IHttp = {
  get(url: string, data?: object, options: IRequestOptions = {}) {
    options = Object.assign(options, { data, method: 'GET' });
    return request(url, options);
  },

  put(url: string, data?: object, options: IRequestOptions = {}) {
    options = Object.assign(options, { data, method: 'PUT' });
    return request(url, options);
  },

  post(url: string, data?: object, options: IRequestOptions = {}) {
    options = Object.assign(options, { data, method: 'POST' });
    return request(url, options);
  },

  delete(url: string, data?: object, options: IRequestOptions = {}) {
    options = Object.assign(options, { data, method: 'DELETE' });
    return request(url, options);
  },
};
