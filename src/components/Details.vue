<script setup>

const props = defineProps({
  details: {
    type: Object
  }
})
debugger

</script>

<template>
  <div class="card">
    {{details}}
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: lightgrey;
  min-width: 400px;
  min-height: 300px;
  margin: 10px;
}

</style>