<template>
  <section>
    <el-form inline @submit="handleSearch">
      <BaseInput name="query" label="Query" :show-label="false" clearable></BaseInput>

      <el-form-item>
        <BaseSearchButton :loading="isLoading"></BaseSearchButton>
      </el-form-item>
    </el-form>

    <BaseDataTable class="mt-3" v-bind="elementTableProps">
      <el-table-column prop="author" label="Author" width="100"></el-table-column>
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column prop="url" label="Link">
        <template #default="{ row }">
          <a class="text-primary" :href="row.url" target="_blank">
            {{ row.url }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="Created At" width="200">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
        </template>
      </el-table-column>
    </BaseDataTable>
  </section>
</template>

<script setup>
import { format, parseISO } from 'date-fns';
import { useForm } from 'vee-validate';

definePageMeta({
  requiresAuth: false,
});

const { values: filter, handleSubmit } = useForm({
  initialValues: {
    query: 'vue',
  },
});

const { fetchListAndReset, elementTableProps, isLoading } =
  useElementPaginatedTable(
    {
      url: 'https://hn.algolia.com/api/v1/search',
      __transformData: (data) => ({
        items: data?.hits,
        total: data?.nbHits,
      }),
    },
    {
      filter,

      transformPaginationToQuery: (pagination) => ({
        page: pagination.currentPage.value,
        hitsPerPage: pagination.pageSize.value,
      }),
    },
  );

const handleSearch = handleSubmit(() => {
  fetchListAndReset();
});

handleSearch();

const formatDate = (value) => format(parseISO(value), 'yyyy-MM-dd HH:ss');
</script>
