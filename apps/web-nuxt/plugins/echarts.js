import { createNamedEntryForGlobImport } from '@jn/shared';

import 'echarts-liquidfill';

import {
  BarChart,
  GaugeChart,
  LineChart,
  MapChart,
  PieChart,
} from 'echarts/charts';
import {
  DatasetComponent,
  GeoComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import { registerMap, registerTheme, use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import VueEcharts from 'vue-echarts';

export default defineNuxtPlugin((nuxtApp) => {
  use([
    CanvasRenderer,

    BarChart,
    LineChart,
    PieChart,
    GaugeChart,
    MapChart,

    DatasetComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GeoComponent,
  ]);

  /**
   * register themes
   * TODO: static theme type
   */
  const themeModules = import.meta.glob('./echarts/theme/*.js', {
    import: 'default',
  });
  createNamedEntryForGlobImport(themeModules).forEach(async ([key, m]) => {
    registerTheme(key, await m());
  });

  /**
   * register maps
   * TODO: static map type
   */
  const mapModules = import.meta.glob('./echarts/map/*.json', {
    import: 'default',
  });
  createNamedEntryForGlobImport(mapModules).forEach(async ([key, m]) => {
    registerMap(key, await m());
  });

  nuxtApp.vueApp.component('ECharts', VueEcharts);
});
