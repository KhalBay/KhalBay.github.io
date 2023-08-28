<script setup lang="ts">
import {ref} from "vue";
import Tile from "@/components/2048/TileNumbers.vue";

const allTile = ref<Number>(16)
</script>

<template>
  <div class="wrap">
    <tile
      v-for="(tile, id) in allTile"
      :id="id + 1"
      :key="id"
      :value="tile"
    />
  </div>
</template>

<style scoped lang="scss">
.wrap {
  background: gray;
  padding: 15px;
  border-radius: 8px;
}
</style>