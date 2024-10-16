<script setup>

const props = defineProps({
  details: {
    type: Object
  }
})

</script>

<template>
  <div class="card">
    {{props.details}}
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: lightgrey;
  min-width: 500px;
  min-height: 300px;
  margin: 10px;
}

</style>