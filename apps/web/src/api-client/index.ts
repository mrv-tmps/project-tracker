
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import config from '../configs/index';
import { auth } from '../utils/Firebase';

export const baseURL = `${config.API_URL}`;
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (res) => res,
  interceptErrorResponse,
);

axiosInstance.interceptors.request.use(
  interceptAuthRequest,
  interceptErrorResponse,
);

const ApiClient = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use: <ApiType>(api: new (...args: any[]) => ApiType): ApiType => new api(undefined, baseURL, axiosInstance)
};

function interceptErrorResponse(error: AxiosError) {
  throw error;
}

async function interceptAuthRequest(currentConfig: AxiosRequestConfig) {
  const token = await auth.currentUser?.getIdToken(true);

  if (token && currentConfig && currentConfig.headers) {
    currentConfig.headers['authorization'] = `Bearer ${token}`;
  }

  return currentConfig;
}

export default ApiClient;
