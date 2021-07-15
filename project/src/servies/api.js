import axios from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/six-cities';
const REQEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
};

export const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw err;
  };

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') ?? '';
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
