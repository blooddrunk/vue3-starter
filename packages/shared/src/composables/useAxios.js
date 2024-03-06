/**
 * a modified version of https://vueuse.org/integrations/useAxios/
 */

import { until } from '@vueuse/core';
import axios from 'axios';
import { merge } from 'lodash-es';
import { computed, ref, shallowRef } from 'vue';

/**
 * Checks if a value is an axios instance.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - True if value is an axios instance, false otherwise.
 */
const isAxiosInstance = (val) => !!val?.request;

export function useAxios(...args) {
  const initialData = args[0];
  let defaultConfig = {};
  let instance = axios; // Use default axios instance if not provided

  if (args.length > 1) {
    if (isAxiosInstance(args[1])) {
      instance = args[1];
    } else {
      defaultConfig = args[1];
    }
  }

  let options = {
    immediate: false,
    shallow: true,
  };
  if (args.length > 2) {
    options = {
      ...options,
      ...args[args.length - 1],
    };
  }

  if (args.length === 4) {
    instance = args[2];
  }

  const response = shallowRef();
  const data = shallowRef(initialData);
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const error = shallowRef();

  const cancelTokenSource = axios.CancelToken.source;
  let cancelToken = cancelTokenSource();

  /**
   * Aborts the request.
   *
   * @param {string} [message] - A message to describe why the request was canceled.
   */
  const abort = (message) => {
    if (isFinished.value || !isLoading.value) return;

    cancelToken.cancel(message);
    cancelToken = cancelTokenSource();
    isAborted.value = true;
    isLoading.value = false;
    isFinished.value = false;
  };

  const loading = (loading) => {
    isLoading.value = loading;
    isFinished.value = !loading;
  };

  const waitUntilFinished = () =>
    new Promise((resolve, reject) => {
      until(isFinished)
        .toBe(true)
        .then(() => resolve(result))
        .catch(reject);
    });

  const then = (onFulfilled, onRejected) =>
    waitUntilFinished().then(onFulfilled, onRejected);

  const execute = async (config) => {
    error.value = undefined;

    const _config = merge(
      { cancelToken: cancelToken.token },
      defaultConfig,
      config,
    );

    abort();
    loading(true);

    try {
      const r = await instance.request(_config);
      response.value = r;
      const result = r.data;
      data.value = result;
      if (options.onSuccess) options.onSuccess(result);
    } catch (e) {
      console.error(e);
      error.value = e;
      if (options.onError) options.onError(e);
    } finally {
      if (options.onFinish) options.onFinish();
      loading(false);
    }

    return { then };
  };

  if (options.immediate && defaultConfig.url) {
    execute();
  }

  const result = {
    response,
    data,
    error,
    errorMessage: computed(() => error.value?.message),
    finished: isFinished,
    loading: isLoading,
    isFinished,
    isLoading,
    cancel: abort,
    isAborted,
    canceled: isAborted,
    aborted: isAborted,
    isCanceled: isAborted,
    abort,
    execute,
  };

  return {
    ...result,
    then,
  };
}
