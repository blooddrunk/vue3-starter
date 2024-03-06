export * from './types';
export * from './misc';
export * from './math';
export * from './axios';
export * from './echarts';

export const noop = () => {};

export const promiseTimeout = (
  ms,
  throwOnTimeout = false,
  reason = 'Timeout',
) =>
  new Promise((resolve, reject) => {
    if (throwOnTimeout) setTimeout(() => reject(reason), ms);
    else setTimeout(resolve, ms);
  });

export const isPromise = (promise) =>
  !!promise && typeof promise.then === 'function';
