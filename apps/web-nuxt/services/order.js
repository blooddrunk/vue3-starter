import { precisionFixed, precisionRound } from '@jn/shared';
import { random, sample } from 'lodash-es';

import { useAxios } from '@/composables/useAxios';

export const placeOrder = () => {
  const { execute, ...rest } = useAxios(
    {},
    {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'post',
    },
  );
  return {
    ...rest,
    execute: (item) =>
      execute({
        data: item,
      }),
  };
};

export const useOrderList = () => {
  return useAxios(
    [],
    {
      url: 'https://jsonplaceholder.typicode.com/posts',
      __transformData: (data) => {
        return [...Array(10).keys()].map((id) => {
          const items = data.slice(0, random(1, 3)).map((item) => ({
            ...item,
            price: precisionRound(random(1, 500, true)),
            thumbnail: 'http://via.placeholder.com/240x240',
            quantity: random(1, 10),
          }));

          return {
            orderNumber: String(id),
            orderTime: Date.now(),
            orderStatus: sample(['已预约', '已下单', '已办理', '已撤单']),
            quantity: items.reduce((acc, item) => item.quantity + acc, 0),
            totalPrice: precisionFixed(
              items.reduce((acc, item) => item.quantity * item.price + acc, 0),
            ),
            items,
          };
        });
      },
    },
    {
      immediate: false,
    },
  );
};

export const cancelOrder = () => {
  const { execute, ...rest } = useAxios(
    {},
    {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'post',
    },
  );
  return {
    ...rest,
    execute: (item) =>
      execute({
        data: item,
      }),
  };
};
