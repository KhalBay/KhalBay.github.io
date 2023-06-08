<script lang="ts" setup>
interface Props {
  active: Boolean
  tile: Object
}

defineProps<Props>()
</script>

<template>
  <div :class="{'active': active, 'await': active === 'await'}">

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
}
</style>