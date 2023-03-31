<script lang="ts" setup>
import Tile from "@/components/Tile.vue";
import {onMounted, ref} from "vue";
import {useStore} from "@/stores";
import type {ActiveTileModel, ChunkModel} from "@/interfaces/models";

interface Props {
  chunk: ChunkModel
}

const props = defineProps<Props>()
const store = useStore()
let activeTile = ref<number>(0)
let orderTileCheck = 1
let lastOrderTileCheck = 0
let active_tile = ref<ActiveTileModel[]>([])

const steper = (num: number) => {
  if (orderTileCheck <= activeTile.value / 2) {
    if (active_tile.value.find(el => el.id === num)) {
      const tile = active_tile.value.find(el => el.id === num) as ActiveTileModel
      if (tile) {
        tile.status = 'checked'
      }
    }
    if (num - 10 > 0) {
      const tile = active_tile.value.find(el => el.id === num - 10) as ActiveTileModel
      if (tile && !tile.order) {
        tile.status = 'await'
        tile.order = orderTileCheck
        orderTileCheck++
      }
    }
    if (num % 10 !== 0) {
      const tile = active_tile.value.find(el => el.id === num +1) as ActiveTileModel
      if (tile && !tile.order) {
        tile.status = 'await'
        tile.order = orderTileCheck
        orderTileCheck++
      }
    }
    if (num + 10 < 100) {
      const tile = active_tile.value.find(el => el.id === num + 10) as ActiveTileModel
      if (tile && !tile.order) {
        tile.status = 'await'
        tile.order = orderTileCheck
        orderTileCheck++
      }
    }
    if ((num - 1) % 10 !== 0) {
      const tile = active_tile.value.find(el => el.id === num - 1) as ActiveTileModel
      if (tile && !tile.order) {
        tile.status = 'await'
        tile.order = orderTileCheck
        orderTileCheck++
      }
    }
    lastOrderTileCheck++

    let nextItem = active_tile.value.find(el => el.order === lastOrderTileCheck) as ActiveTileModel
    console.log(nextItem)
    setTimeout(() => steper(nextItem?.id), 200)
  } else {
    // console.log('end', active_tile.value.filter(el => el.status === 'checked').length)
    // active_tile.value.sort(function (a, b) {
    //   return a.id - b.id
    // })
  }
}


const render = () => {
  switch (props.chunk.type) {
    case "Start":
      activeTile.value = store.generate(25, 100)
      store.addEmptyItems(100, active_tile.value)
      console.log(activeTile.value)
      steper(activeTile.value)
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
    <Tile v-for="(tile, id) in active_tile" class="tile" :active="tile.status" :id="tile.id"></Tile>
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