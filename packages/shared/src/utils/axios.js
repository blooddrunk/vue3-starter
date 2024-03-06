import axiosDefault from 'axios';
import { defaultsDeep, isPlainObject } from 'lodash-es';
import Nprogress from 'nprogress';

import { jsonToUrlParams } from './misc';

export const setupInterceptor = (instance) => {
  const onError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    }
    return Promise.reject(error);
  };

  instance.interceptors.request.use((config) => {
    const presetConfig = { method: 'GET' };

    if (config.__urlEncoded) {
      presetConfig.headers = presetConfig.headers || {};
      presetConfig.headers['content-type'] =
        'application/x-www-form-urlencoded';
      if (isPlainObject(config.data)) {
        config.data = jsonToUrlParams(config.data);
      }
    }

    config = defaultsDeep(config, presetConfig);

    return config;
  }, onError);

  instance.interceptors.response.use((response) => {
    const { config } = response;

    try {
      if (typeof config.__validateResponse === 'function') {
        response.data = config.__validateResponse(response.data, response);
      }

      if (typeof config.__transformData === 'function') {
        response.data = config.__transformData(response.data, response);
      }
    } catch (error) {
      error.config = response.config;
      console.error(error);
      throw error;
    }

    return response;
  }, onError);
};

export const setupProgress = (instance) => {
  let pendingRequests = 0;
  let showProgress = true;

  const onError = (error) => {
    if (showProgress === false) {
      return;
    }

    pendingRequests--;

    if (pendingRequests <= 0) {
      pendingRequests = 0;
      Nprogress.done();
    }

    return Promise.reject(error);
  };

  instance.interceptors.request.use((config) => {
    showProgress = config.__showProgress;

    if (showProgress !== false) {
      if (pendingRequests === 0) {
        Nprogress.start();
      }

      pendingRequests++;
    }

    return config;
  }, onError);

  instance.interceptors.response.use((response) => {
    if (showProgress !== false) {
      pendingRequests--;
      if (pendingRequests <= 0) {
        pendingRequests = 0;
        Nprogress.done();
      }
    }

    return response;
  }, onError);

  const onProgress = (event) => {
    if (!pendingRequests) {
      return;
    }

    const progress = event.loaded / (event.total ?? 1 * pendingRequests) || 0;
    Nprogress.set(Math.min(1, progress));
  };

  instance.defaults.onUploadProgress = onProgress;
  instance.defaults.onDownloadProgress = onProgress;
};

export const createAxios = (config) => {
  const axios = axiosDefault.create(
    defaultsDeep(
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
        },
      },
      config,
    ),
  );

  setupInterceptor(axios);
  setupProgress(axios);

  return axios;
};
