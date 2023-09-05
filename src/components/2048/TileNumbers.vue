<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    default: 0
  },
})
</script>

<template>
  <div :class="`tile tile-${value}`">
    {{ value ? value : '' }}
  </div>
</template>

<style scoped lang="scss">
.tile {
  width: 100px;
  height: 100px;
  background-color: #a5a5a5;
  font-size: 40px;
  font-weight: 900;
  font-family: "system-ui";
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
}
</style>