<script setup>
import Filter from './components/Filter.vue'
import DetailsContainer from "./components/DetailsContainer.vue";
import {ref} from "vue";

const clickedCategory = ref('')

const selectedCategory = (selectedCategory) => {
  clickedCategory.value = selectedCategory
}
</script>

<template>
  <Filter @selectedCategory="selectedCategory"/>
  <DetailsContainer :categoryName="clickedCategory"/>
</template>

<style scoped>

</style>
