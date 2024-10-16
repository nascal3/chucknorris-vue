<script setup>
import {onMounted, ref,} from 'vue'
const categories = ref([])

const getCategories = async () => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/categories');
    if (response.ok) {
      categories.value = await response.json();
    }
  } catch (err) {
    console.error(`Failed to fetch users: ${err.message}`)
  }
}

const getCategoryName = async (categoryName) => {
  const emit = defineEmits(['messageSent']);
  emit('selectedCategory', categoryName);
}

onMounted(getCategories)

</script>

<template>
  <div v-if="categories.length" >
    <div v-for="category in categories" :key="category">
      <span @click="getCategoryName(category)">{{category}}</span>
    </div>
  </div>

</template>

<style lang="scss" scoped>


</style>
