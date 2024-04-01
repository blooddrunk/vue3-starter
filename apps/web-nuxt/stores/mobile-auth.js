import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useMobileAuthStore = defineStore('mobile-auth', () => {
  const stagedLoginInfo = ref({
    mobile: '',
    authCode: '',
    isUserAgreementChecked: false,
  });

  const auth = ref({
    user: useStorage('hsop_auth_mobile_user', {
      mobile: '13312331233',
      area: '310102',
    }),
  });

  const user = computed(() => auth.value.user);
  const mobile = computed(() => user.value.mobile);
  const area = computed(() => user.value.area);
  const isLoggedIn = computed(() => !!mobile.value);

  const updateUser = (payload) => {
    auth.value.user = {
      ...auth.value.user,
      ...payload,
    };
  };

  const {
    data,
    isLoading: isLoginPending,
    loginRequest,
    error: loginError,
  } = useMobileLogin();
  const hasLoginError = computed(() => !!loginError.value);
  const login = async (payload) => {
    await loginRequest(payload);

    if (data.value) {
      updateUser(data.value);
    }
  };

  const logout = () => {
    auth.value.user = {};
    loginError.value = '';
  };

  return {
    stagedLoginInfo,
    user,
    mobile,
    area,
    isLoggedIn,
    loginError,
    hasLoginError,
    isLoginPending,

    updateUser,
    login,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMobileAuthStore, import.meta.hot));
}
