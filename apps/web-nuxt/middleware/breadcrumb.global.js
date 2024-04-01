export default defineNuxtRouteMiddleware((to) => {
  const uiStore = useUIStore();
  const menuStore = useMenuStore();

  const { matched } = to;

  let breadcrumbList = [];

  const { meta } = matched[matched.length - 1];

  if (Array.isArray(meta.breadcrumb)) {
    breadcrumbList = meta.breadcrumb;
  } else if (meta.breadcrumb) {
    breadcrumbList = matched.reduce((acc, record) => {
      const matchedMenu = menuStore.menuLookupByRoute[record.name];

      if (matchedMenu) {
        if (record.meta?.breadcrumb === true) {
          acc.push({
            route: matchedMenu.route,
            title: matchedMenu.title ?? '未命名',
            icon: matchedMenu.icon,
          });
        } else if (record.meta?.breadcrumb) {
          acc = acc.concat(record.meta?.breadcrumb);
        }
      } else {
        console.warn(
          `failed to find a matched menu item for route '${record.name}'`,
        );
      }

      return acc;
    }, []);
  }

  uiStore.breadcrumbList = breadcrumbList;
});
