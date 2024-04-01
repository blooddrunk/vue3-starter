import { merge } from 'lodash-es';

export default defineNuxtRouteMiddleware((to) => {
  const navTabStore = useNavTabStore();
  const menuStore = useMenuStore();

  const { meta, query, name } = to;

  if (typeof query._experimentalNavTab !== 'undefined') {
    const shouldDisableNavTab = query._experimentalNavTab === '0';
    navTabStore.experimentalNavTab = !shouldDisableNavTab;

    if (shouldDisableNavTab) {
      navTabStore.clearNavTab();
      return;
    }
  }

  const matchedMenu = menuStore.menuLookupByRoute[name];

  if (meta.openInTab !== false && matchedMenu) {
    navTabStore.setActiveTab(matchedMenu.route);
    navTabStore.addTab(
      merge({}, matchedMenu, {
        routerProps: query,
      }),
    );
  }
});
