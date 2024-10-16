<script setup>
import { computed, onMounted, ref, watch } from "vue";
import http from "../../middleware/HttpController.js";
import Details from "./Details.vue";

const props = defineProps({
  categoryName: String,
})

const details = ref({ result: [] })

const getDetails = async (categoryName) => {
  try {
    const response = await http.get(`/search?query=${categoryName}`)
    if (response.status === 200) {
      details.value = response.data
    }
  } catch (err) {
    console.error(`Failed to fetch details: ${err.message}`)
  }
};

watch(
    () => props.categoryName,
    async (newVal) => {
      if (newVal) {
        await getDetails(newVal)
      }
    },
    { immediate: true }
);
</script>

<template>
  <div class="container">
    <Details
        v-for="detail in details.result || []"
        :key="detail.id"
        :details="detail"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
</style>
