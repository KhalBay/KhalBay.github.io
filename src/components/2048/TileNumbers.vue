<template>
  <div class="tile">
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    default: 0
  },
  msg: {
    type: String,
  }
})


</script>

<style scoped lang="scss">
.tile {
  width: 100px;
  height: 100px;
  background: #ffed00;
}
</style>