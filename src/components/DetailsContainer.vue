<script setup>
import {onMounted, ref} from "vue";
import Details from "./Details.vue";


const props = defineProps({
  categoryName: String
})

const details = ref([])

const getDetails = async (categoryName) => {
  try {
    const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${'food'}`);
    if (response.ok) {
      details.value = await response.json();
    }
  } catch (err) {
    console.error(`Failed to fetch users: ${err.message}`)
  }
}


onMounted(getDetails(props.categoryName))
</script>

<template>
  <div class="container">
    <Details v-for="detail in details.result" :key="detail.id" :detals="detail"/>
  </div>

</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

</style>