<template>
  <div class="news-pagination text-center">
    <v-pagination
      v-model="currentPage"
      :length="total"
      :total-visible="totalVisible"
      circle
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "NewsPagination",
  data: () => ({
    currentPage: 1,
    total: 100,
    totalVisible: 7,
  }),
};
</script>

<style scoped></style>
