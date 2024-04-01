import { useAxios as _useAxios, createAxios } from '@jn/shared';
import { isPlainObject } from 'lodash-es';

const isServerResponse = (r) => {
  return isPlainObject(r) && 'code' in r && 'message' in r;
};

export const axios = createAxios({
  __validateResponse: (data) => {
    if (isServerResponse(data)) {
      const { code = 200, message = 'Unknown Error', ...rest } = data;

      switch (`${code}`) {
        case '200':
          return rest;
        default: {
          throw new Error(message);
        }
      }
    }

    return data;
  },

  __transformData: (data) => data && data.data,
});

export function useAxios(initialData, config, options) {
  const alertOnError = !!options?.alertOnError;
  if (alertOnError && !options?.onError) {
    options.onError = (e) => {
      alert(e.message || 'An error occured');
    };
  }
  if (config) {
    return _useAxios(initialData, config, axios, options);
  } else {
    return _useAxios(initialData, axios, options);
  }
}
