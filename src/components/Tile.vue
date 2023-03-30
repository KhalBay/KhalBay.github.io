<script lang="ts" setup>
interface Props {
  active: Boolean
  tile: Object
}

const props = defineProps<Props>()

</script>

<template>
  <div :class="{'active': active}">

  </div>
</template>

<style scoped lang="scss">
.tile {
  width: 10px;
  height: 10px;
  background: blue;

  &.active {
    background: darkkhaki !important;
  }
}
</style>