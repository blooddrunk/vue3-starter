import { useStorage } from '@vueuse/core';
import { keyBy, pick } from 'lodash-es';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const menuStore = useMenuStore();

  const auth = ref({
    user: useStorage('some_app_user', {
      userName: 'admin',
      menuList: ['dashboard', 'admin', 'admin-account', 'admin-role'],
    }),
  });

  const user = computed(() => auth.value.user);
  const userName = computed(() => user.value.userName);
  const isAdmin = computed(() => userName.value === 'admin');
  const isLoggedIn = computed(() => !!userName.value);

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
  } = useLogin();
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

  const permittedMenuLookupById = computed(() =>
    isAdmin.value
      ? menuStore.menuLookupById
      : pick(
          menuStore.menuLookupById,
          menuStore.whitelistedMenuIdList.concat(user.value.menuList || []),
        ),
  );

  const permittedMenuList = computed(() =>
    Object.values(permittedMenuLookupById.value),
  );
  const permittedMenuLookupByRoute = computed(() =>
    keyBy(
      permittedMenuList.value.filter((item) => !!item.route),
      'route',
    ),
  );

  const permittedMenuListBySystem = computed(() =>
    menuStore.currentFlattenedMenuList.filter(
      (item) => !!permittedMenuLookupById.value[item.id],
    ),
  );

  const getFirstPermittedMenu = ({
    excludeIds,
    excludeRoutes,
    currentSystemOnly = false,
  } = {}) => {
    for (const item of currentSystemOnly
      ? permittedMenuListBySystem.value
      : permittedMenuList.value) {
      if (
        (excludeRoutes && excludeRoutes.includes(item.route)) ||
        (excludeIds && excludeIds.includes(item.id))
      ) {
        continue;
      } else if (item.route) {
        return item;
      }
    }
    return null;
  };

  const firstPermittedMenu = computed(() => getFirstPermittedMenu());
  const firstPermittedMenuBySystem = computed(() =>
    getFirstPermittedMenu({ currentSystemOnly: true }),
  );

  return {
    user,
    userName,
    isAdmin,
    isLoggedIn,
    loginError,
    hasLoginError,
    isLoginPending,
    permittedMenuLookupById,
    permittedMenuLookupByRoute,
    firstPermittedMenu,
    firstPermittedMenuBySystem,
    getFirstPermittedMenu,
    updateUser,
    login,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
