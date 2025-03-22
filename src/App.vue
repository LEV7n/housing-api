<template>
  <div id="app">
    <h1>Housing Search</h1>
    <search-form />
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm/index.vue';

export default {
  components: {
    /** @type {Component} */
    SearchForm
  },
};
</script>