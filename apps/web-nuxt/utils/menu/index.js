import { createNamedMapForGlobImport } from '@jn/shared';
import { mergeWith } from 'lodash-es';

export const createMenuLookup = (menuList, system) => {
  const byId = {};
  const byRoute = {};

  const traverse = (tree) =>
    tree.forEach((item) => {
      if (!item.id) {
        throw new Error(`Menu item must have a 'id' field: ${item}`);
      }

      const newItem = {
        ...item,
        system,
      };

      byId[item.id] = { ...newItem };
      if (item.route) {
        byRoute[item.route] = { ...newItem };
      }

      if (item.children && item.children.length) {
        traverse(item.children);
      }
    });

  traverse(menuList);

  return {
    byId,
    byRoute,
  };
};

export const getFirstNavigableMenu = (menuList, { excludeRoutes } = {}) => {
  for (const item of menuList) {
    if (item.route) {
      if (excludeRoutes) {
        if (!excludeRoutes.includes(item.route)) {
          return item;
        }
      } else {
        return item;
      }
    } else if (item.children) {
      return getFirstNavigableMenu(item.children);
    } else {
      return null;
    }
  }
};

export const getRouteOfMenuItem = (item) => {
  if (item && item.route && item.id) {
    if (typeof item.route !== 'string') {
      throw new Error(`[route] property of menu item must be route name`);
    }
    return { name: item.route };
  }

  return undefined;
};

// Dynamic imports and data structure manipulation remain unchanged
const menuModules = createNamedMapForGlobImport(
  import.meta.glob(['./system/*.js'], {
    import: 'default',
    eager: true,
  }),
);

export const allMenuList = Object.values(menuModules).flat();

export const menuLookup = mergeWith(
  {},
  createMenuLookup(menuModules['main'], 'main'),
  createMenuLookup(menuModules['secondary'], 'secondary'),
  (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  },
);

// The typing of menuPerSystem's object keys to SystemValue is removed
export const menuPerSystem = {
  main: menuModules['main'],
  secondary: menuModules['secondary'],
};
