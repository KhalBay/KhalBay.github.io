<script lang="ts" setup>
interface Props {
  status: String
  tile?: Object
}

defineProps<Props>()
</script>

<template>
  <div :class="{'active': status, 'await': status === 'await', 'error': status === 'error'}">

  </div>
</template>

<style scoped lang="scss">
.tile {
  width: 10px;
  height: 10px;
  background: greenyellow;

  &.active {
    background: darkkhaki !important;
  }
  &.await {
    background: #ffed00 !important;
  }
  &.error {
    background: red !important;
  }
}
</style>