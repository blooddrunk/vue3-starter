import { isNil, mapKeys, mapValues, omit, pickBy } from 'lodash-es';

export const isNumeric = (num) => !Number.isNaN(Number.parseFloat(String(num)));

export const isNumericStrict = (num) => !isNaN(Number(num)) && isNumeric(num);

export const isObjectEmpty = (obj) =>
  obj !== null &&
  obj.constructor.name === 'Object' &&
  Object.keys(obj).length === 0;

export const getPlaceholderForNonValue = (
  value,
  { fallback = '--', isValueNumeric = false, includes = [] } = {},
) => {
  const shouldUseFallback =
    includes.some((v) => value === v) ||
    (Array.isArray(value)
      ? value.length === 0
      : isValueNumeric
        ? !isNumeric(value)
        : isNil(value));

  if (shouldUseFallback) {
    return fallback;
  }

  return value;
};

export const jsonToUrlParams = (obj) =>
  Object.entries(obj).reduce((params, [key, value]) => {
    params.append(key, value);
    return params;
  }, new URLSearchParams());

export const breakStringBy = (
  str,
  { breakpoint = 2, breakWith = '\n' } = {},
) => {
  if (!str) {
    return str;
  }

  let _breakpoint;
  if (typeof breakpoint === 'function') {
    _breakpoint = breakpoint(str);
  } else {
    _breakpoint = breakpoint;
  }

  if (_breakpoint <= 0) {
    return str;
  }

  return str.replace(new RegExp(`(.{${_breakpoint}})`, 'g'), `$1${breakWith}`);
};

export const trimValues = (filter) =>
  mapValues(filter, (value) => {
    if (value && typeof value === 'string') {
      return value.trim();
    }

    return value;
  });

/**
 * Extracts the file name from a resource path.
 *
 * @param {string} path The resource path.
 * @returns {string} The file name.
 */
export const getFileNameOfResource = (path) => {
  const matches = path.match(/([^/]+)(?=\.\w+$)/);
  return matches ? matches[0] : '';
};

export const createNamedMapForGlobImport = (modules) => {
  const modulesWithFileNameAsKey = mapKeys(modules, (value, key) =>
    getFileNameOfResource(key),
  );

  return pickBy(modulesWithFileNameAsKey, (value, key) => !key.startsWith('_'));
};

export const createNamedEntryForGlobImport = (modules) => {
  return Object.entries(createNamedMapForGlobImport(modules));
};

export const flattenTree = (tree, childrenKey = 'children') => {
  const result = [];

  const traverse = (subTree) => {
    subTree.forEach((item) => {
      const children = item[childrenKey];
      const rest = omit(item, [childrenKey]);

      const hasChildren = !!(children && children.length);
      result.push({
        ...rest,
        isLeaf: !hasChildren,
        children: children || [],
      });

      if (hasChildren) {
        traverse(children);
      }
    });
  };

  traverse(tree || []);

  return result;
};
