<template>
  <div>
    <el-table
      ref="table"
      v-loading="loading"
      class="[&_.el-button+.el-button]:ml-0.5 [&_.el-button.is-disabled]:text-zinc-300 [&_.el-scrollbar\_\_bar.is-horizontal]:h-2.5"
      :data="items"
      border
      stripe
      :size="size"
      header-cell-class-name="!bg-sky-100 bg-opacity-75 text-primary"
      v-bind="$attrs"
    >
      <el-table-column
        v-for="{ label, tooltip, ...rest } in columnsWithDefaultWidth"
        :key="label"
        v-bind="rest"
      >
        <template #header>
          {{ label }}

          <el-tooltip v-if="tooltip" placement="top">
            <template #content>
              <div v-html="tooltip"></div>
            </template>

            <Icon name="mdi:help-circle"></Icon>
          </el-tooltip>
        </template>
      </el-table-column>

      <slot></slot>
    </el-table>

    <el-pagination
      class="!py-3"
      v-bind="_paginationProps"
      :total="total"
      :current-page="page"
      :page-size="pageSize"
      :size="size"
      @update:current-page="updatePage"
      @update:page-size="updatePageSize"
    >
      <slot name="pagination"></slot>
    </el-pagination>
  </div>
</template>

<script setup>
const defaultPaginationProps = {
  background: true,
  pageSizes: [10, 20],
  layout: 'total, sizes, prev, pager, next, jumper, ->, slot',
};

const props = defineProps({
  size: {
    type: String,
    default: 'default',
  },

  items: {
    type: Array,
    default: () => [],
  },

  columns: {
    type: Array,
    default: () => [],
  },

  headerClass: {
    type: String,
    default: '!bg-sky-100 bg-opacity-75 text-primary tw-sky-800 py-3',
  },

  defaultColumnWidth: {
    type: [String, Number],
    default: 100,
  },

  loading: {
    type: Boolean,
  },

  total: {
    type: Number,
    default: 0,
  },

  paginationProps: {
    type: Object,
    default: () => ({}),
  },

  page: {
    type: Number,
    required: true,
  },

  pageSize: {
    type: Number,
    required: true,
  },

  updatePage: {
    type: Function,
    required: true,
  },

  updatePageSize: {
    type: Function,
    required: true,
  },
});

const columnsWithDefaultWidth = computed(() =>
  (props.columns ?? []).map((c) => ({
    minWidth: props.defaultColumnWidth,
    ...c,
  })),
);

const _paginationProps = computed(() => ({
  ...defaultPaginationProps,
  ...props.paginationProps,
}));
</script>
