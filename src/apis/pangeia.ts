import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

const config = Axios.create({
  baseURL: 'http://127.0.0.1:3333',
  timeout: 0,
});

let cancelTokens: CancelTokenSource[] = [];

export const cancelAllRequests = (): void => {
  cancelTokens.forEach((source) => {
    source.cancel('Request was canceled by user');
  });

  cancelTokens = [];
};

export class PangeiaApi {
  static get(relativeUrl: string, configs: AxiosRequestConfig<object> = {}): Promise<AxiosResponse> {
    const source = Axios.CancelToken.source();
    cancelTokens.push(source);

    return config.get(relativeUrl, { ...configs, cancelToken: source.token });
  }

  static post(relativeUrl: string, data?: object, configs: AxiosRequestConfig<object> = {}): Promise<AxiosResponse> {
    const source = Axios.CancelToken.source();
    cancelTokens.push(source);

    return config.post(relativeUrl, data ?? {}, { ...configs, cancelToken: source.token });
  }

  static patch(relativeUrl: string, data?: object, configs: AxiosRequestConfig<object> = {}): Promise<AxiosResponse> {
    const source = Axios.CancelToken.source();
    cancelTokens.push(source);

    return config.patch(relativeUrl, data ?? {}, { ...configs, cancelToken: source.token });
  }

  static put(relativeUrl: string, data?: object, configs: AxiosRequestConfig<object> = {}): Promise<AxiosResponse> {
    const source = Axios.CancelToken.source();
    cancelTokens.push(source);

    return config.put(relativeUrl, data ?? {}, { ...configs, cancelToken: source.token });
  }

  static delete(relativeUrl: string, configs: AxiosRequestConfig<object> = {}): Promise<AxiosResponse> {
    const source = Axios.CancelToken.source();
    cancelTokens.push(source);

    return config.delete(relativeUrl, { ...configs, cancelToken: source.token });
  }
}
