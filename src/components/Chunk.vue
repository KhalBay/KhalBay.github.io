<script lang="ts" setup>
import Tile from "@/components/Tile.vue";
import {onMounted, ref} from "vue";
import {useStore} from "@/stores";
import type {ChunkModel} from "@/interfaces/models";

interface Props {
  chunk: ChunkModel
}

const props = defineProps<Props>()
const store = useStore()
let activeTile = ref<number>()

let active_tile = ref<any>([])

const log = () => {
  console.log(1)
}

const active = (val:any) => {
  active_tile.value.includes(val)
}


const render = () => {
  switch (props.chunk.type) {
    case "Start":
      activeTile.value = store.generate(25, 100)
      active_tile.value.push(activeTile.value)
        setTimeout(log, 2000)
      active_tile.value.push(activeTile.value - 10, activeTile.value + 1, activeTile.value + 10, activeTile.value - 1)
      store.addEmptyItems(100, active_tile.value)
      break;
    default:
      store.addEmptyItems(100, active_tile.value)
      break;
  }
}

onMounted(render)
</script>

<template>
  <div :class="{'disabled': chunk.type === 'Empty', 'start': chunk.type === 'Start', 'finish': chunk.type === 'Finish'}"
       class="chunk-wrap">
    <Tile v-for="(n, id) in 100" class="tile" :active="active_tile.includes(n)" :id="id+1"></Tile>
  </div>
</template>

<style scoped lang="scss">
.chunk-wrap {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 1px;
  width: auto;
  height: auto;

  &.disabled {
    opacity: .4;
  }

  &.start {
    .tile {
      background: #00bd7e;
    }
  }

  &.finish {
    .tile {
      background: red;
    }
  }
}

</style>