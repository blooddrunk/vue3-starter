import { flattenTree } from '@jn/shared';
import { availableSystemList } from '~/utils/constants';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';

import {
  getFirstNavigableMenu as _getFirstNavigableMenu,
  allMenuList,
  menuLookup as rawMenuLookup,
  menuPerSystem as rawMenuPerSystem,
} from '@/utils/menu';

export const useMenuStore = defineStore('menu', () => {
  const currentMenuList = shallowRef([]);
  const menuLookup = shallowRef(rawMenuLookup);
  const menuPerSystem = shallowRef(rawMenuPerSystem);
  const menuList = shallowRef(flattenTree(allMenuList));

  const currentFlattenedMenuList = computed(() =>
    flattenTree(currentMenuList.value),
  );
  const menuLookupById = computed(() => menuLookup.value.byId);
  const menuLookupByRoute = computed(() => menuLookup.value.byRoute);
  const menuIdList = computed(() => menuList.value.map((item) => item.id));
  const whitelistedMenuList = computed(() =>
    menuList.value.filter((item) => item.id.startsWith('__whitelisted_')),
  );
  const whitelistedMenuIdList = computed(() =>
    whitelistedMenuList.value.map((item) => item.id),
  );
  const getFirstNavigableMenu = ({ excludeRoutes } = {}) => {
    const target = _getFirstNavigableMenu(currentMenuList.value, {
      excludeRoutes,
    });
    if (target) {
      return menuLookupByRoute.value[target.route];
    }
    return null;
  };
  const firstNavigableMenu = computed(() => getFirstNavigableMenu());

  const systemList = ref(availableSystemList);
  const currentSystem = ref('');
  const systemValueList = computed(() =>
    systemList.value.map((item) => item.value),
  );
  const isSystemSole = computed(() => systemValueList.value.length <= 1);
  const firstAvailableSystem = computed(() => systemList.value[0]);

  const switchSystem = (system) => {
    currentSystem.value = system;
    currentMenuList.value = menuPerSystem.value[system];
  };

  const clearSystem = () => {
    currentSystem.value = '';
    currentMenuList.value = [];
  };

  return {
    currentMenuList,
    menuLookup,
    menuList,
    currentFlattenedMenuList,
    menuLookupById,
    menuLookupByRoute,
    menuIdList,
    whitelistedMenuList,
    whitelistedMenuIdList,
    firstNavigableMenu,
    getFirstNavigableMenu,

    systemList,
    currentSystem,
    isSystemSole,
    firstAvailableSystem,
    switchSystem,
    clearSystem,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot));
}
