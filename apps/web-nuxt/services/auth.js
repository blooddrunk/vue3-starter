import { promiseTimeout } from '@jn/shared';
import { ref } from 'vue';

export const useLogin = () => {
  const data = ref();
  const isLoading = ref(false);
  const error = ref(null);

  const loginRequest = async (payload) => {
    isLoading.value = true;

    try {
      await promiseTimeout(1500);

      if (payload.userName !== 'admin' && payload.userName !== 'guest') {
        throw new Error('wrong auth info');
      }

      data.value = {
        userName: payload.userName,
        menuList:
          payload.userName === 'admin'
            ? [
                'main-home',
                'main-admin',
                'main-admin-account',
                'main-admin-role',
              ]
            : ['main-home', 'main-admin', 'main-admin-role'],
      };
      return data.value;
    } catch (e) {
      error.value = e.message;
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    isLoading,
    error,
    loginRequest,
  };
};

export const useAuthCode = () => {
  const isLoading = ref(false);
  const execute = async () => {
    isLoading.value = true;
    await promiseTimeout(1000);
    isLoading.value = false;
  };

  return {
    isLoading,
    execute,
  };
};

export const useMobileLogin = () => {
  const data = ref();
  const isLoading = ref(false);
  const error = ref(null);

  const loginRequest = async (payload) => {
    isLoading.value = true;

    try {
      await promiseTimeout(1500);

      if (payload.authCode !== '123456') {
        throw new Error('wrong auth info');
      }

      data.value = {
        mobile: payload.mobile,
      };
      return data.value;
    } catch (e) {
      error.value = e.message;
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    isLoading,
    error,
    loginRequest,
  };
};
