<script setup>
import {onMounted, ref,} from 'vue'
const emit = defineEmits(['selectedCategory'])
import http from "../../middleware/HttpController.js";
const categories = ref([])

const getCategories = async () => {
  try {
    const response = await http.get(`/categories`);
    if (response.status === 200) {
      categories.value = response.data
    }
  } catch (err) {
    console.error(`Failed to fetch users: ${err.message}`)
  }
}

const getCategoryName = async (categoryName) => {
  emit('selectedCategory', categoryName)
}

onMounted(async () => {
  await getCategories()
})

</script>

<template>
  <div class="filters" v-if="categories.length" >
    <div class="filter" v-for="category in categories" :key="category">
      <span @click="getCategoryName(category)">{{category}}</span>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: row;
   .filter {
     margin: 10px;
     background-color: aliceblue;
     padding: 10px;
     cursor: pointer;
     border-radius: 50px;
   }
}

</style>
