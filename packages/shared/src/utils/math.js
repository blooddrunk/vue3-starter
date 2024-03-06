import { getPlaceholderForNonValue, isNumeric } from './misc';

export const now = () => Date.now();
export const timestamp = () => +Date.now();

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};

export const precisionRound = (number, precision = 2) => {
  const factor = Math.pow(10, precision);
  return Math.round(Number.parseFloat(String(number)) * factor) / factor;
};

export const precisionFixed = (number, precision = 2) => {
  const result = precisionRound(number, precision);
  return result.toFixed(precision);
};

/**
 * stolen from vuetify
 * https://github.com/vuetifyjs/vuetify/blob/v3.0.5/packages/vuetify/src/util/helpers.ts
 */
export function convertToUnit(str, unit = 'px') {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str)) {
    return String(str);
  } else {
    return `${Number(str)}${unit}`;
  }
}

export const toPercentage = (
  number,
  { precision = 2, multiplier = 1, symbol = '%', ...rest } = {},
) => {
  const isValueNumeric = isNumeric(number);

  return isValueNumeric
    ? `${precisionRound(toNumber(number) * multiplier, precision)}${symbol || ''}`
    : getPlaceholderForNonValue(number, {
        isValueNumeric: true,
        ...rest,
      });
};

export const toDisplayString = (
  number,
  { precision = 2, fixed = false, ...rest } = {},
) => {
  const isValueNumeric = isNumeric(number);

  return isValueNumeric
    ? new Intl.NumberFormat('en-US', {
        minimumFractionDigits: fixed ? precision : 0,
        maximumFractionDigits: precision,
      }).format(toNumber(number))
    : getPlaceholderForNonValue(number, {
        isValueNumeric: true,
        ...rest,
      });
};

export const toCompactDisplayString = (
  number,
  {
    breakpoints = [
      [10000, '万'],
      [100000000, '亿'],
    ],
    withSuffix = true,
    precision,
    ...rest
  } = {},
) => {
  const isValueNumeric = isNumeric(number);

  if (!isValueNumeric) {
    return getPlaceholderForNonValue(number, {
      isValueNumeric: true,
      ...rest,
    });
  }

  const num = toNumber(number);
  const hitBreakpoint = breakpoints
    .slice()
    .reverse()
    .find((breakpoint) => {
      const breakpointConfig = Array.isArray(breakpoint)
        ? breakpoint
        : [breakpoint];
      const [breakValue] = breakpointConfig;
      return Math.abs(num) >= breakValue;
    });

  if (hitBreakpoint) {
    const [breakValue, valueSuffix] = hitBreakpoint;

    return `${precisionRound(num / breakValue, precision)}${
      withSuffix && valueSuffix ? valueSuffix : ''
    }`;
  }

  return num.toString();
};
