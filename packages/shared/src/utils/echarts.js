import { merge } from 'lodash-es';
import { unref } from 'vue';

export const normalizeSeries = (
  enhancedDimensions,
  type,
  { hasCategoryDimension = true } = {},
) => {
  const dimensions = [];
  const series = [];

  unref(enhancedDimensions).forEach((dimension, index) => {
    // first row is category dimension
    if (hasCategoryDimension && index === 0) {
      dimensions.push(dimension);
      return;
    }

    const definitionItem =
      typeof dimension === 'string' ? { name: dimension } : dimension;
    const { name, displayName, displayDimension, isPercentage, seriesConfig } =
      definitionItem;

    dimensions.push({
      name,
      displayName,
    });

    let maybePercentageDimension = displayDimension;
    if (isPercentage && !displayDimension) {
      maybePercentageDimension = `${name}_Percentage`;
    }

    const extraSeriesConfig = seriesConfig || {};
    extraSeriesConfig.type = extraSeriesConfig.type || type;

    if (!extraSeriesConfig.type) {
      throw new Error(`series type of [${name}] is missing`);
    }

    const seriesItem = merge(
      {
        encode: {
          x: [0],
          y: name,
          seriesName: name,
          tooltip: name,
        },
      },
      extraSeriesConfig,
    );

    if (maybePercentageDimension) {
      dimensions.push(maybePercentageDimension);
      if (seriesItem.encode) {
        seriesItem.encode.tooltip = maybePercentageDimension;
      }
    }

    series.push(seriesItem);
  });

  return {
    dimensions,
    series,
  };
};

export const getRegionNameList = (geojson) =>
  geojson.features.map(({ properties }) => properties.name);
