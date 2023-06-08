<script lang="ts" setup>
import Tile from "@/components/Tile.vue";
import {onMounted, ref} from "vue";
import {useStore} from "@/stores";
import type {ActiveTileModel, ChunkModel} from "@/interfaces/models";

interface Props {
  chunk: ChunkModel
}
const emptyActiveTileModel: ActiveTileModel = { id: 0, status: "", order: 0 };

const props = defineProps<Props>()
const store = useStore()

const startWithTile = ref<number>(0)
const allCheckedTile = ref<number>(1)
const lastCheckedTileNum = ref<number>(0)

const allTiles = ref<ActiveTileModel[]>([])
const onlyActiveTiles = ref<number[]>([])
const nextTileToCheck = ref<ActiveTileModel>(emptyActiveTileModel)

const stepping = (id: number) => {
  if (allCheckedTile.value <= startWithTile.value / 2) { // Check half tiles
    checkCurrentTile(id)
    addNextTileToCheck(id)

    lastCheckedTileNum.value++
    nextTileToCheck.value = allTiles.value.find(el => el.order === lastCheckedTileNum.value) as ActiveTileModel
    setTimeout(() => stepping(nextTileToCheck.value.id), 50)
  } else {
    allTiles.value.forEach((el:any) => {
        if (el.type === 'Full') onlyActiveTiles.value.push(el.id)
    })


    let upPoint = onlyActiveTiles.value[0],
        downPoint = onlyActiveTiles.value[onlyActiveTiles.value.length - 1],
        rightPoint: Number[] = [],
        leftPoint: Number[] = []

    onlyActiveTiles.value.reduce((acc: number, el : number) => { // add right points
      if (el % 10 <= acc && el % 10 !== 0) {
        if (+rightPoint[0] % 10 > el % 10 ) rightPoint.pop()
        acc = el % 10
        rightPoint.push(el)
      }
      if (rightPoint.length > 1 && +rightPoint[0] % 10 !== +rightPoint[1] % 10) rightPoint.shift()
      return acc
    }, 9)

    onlyActiveTiles.value.reduce((acc: number, el : number) => { // add left points
      if (el % 10 === 0) {
        if (+leftPoint[0] % 10 !== 0) leftPoint = []
        leftPoint.push(el)
      }
      if (el % 10 >= acc && +leftPoint[0] % 10 !== 0) {
        if (+leftPoint[0] % 10 < el % 10 ) leftPoint.pop()
        acc = el % 10
        leftPoint.push(el)
      }
      if (leftPoint.length > 1 && +leftPoint[0] % 10 !== +leftPoint[1] % 10) leftPoint.shift()
      return acc
    }, 0)



    // if (num < upPoint + 10) { // Если больше вехней границы
    //   const tile = allTiles.value.find(el => el.id === num) as ActiveTileModel
    //   if (tile) {
    //     tile.status = 'checked'
    //     tile.type = 'Full'
    //   }
    // }
    // lastCheckedTileNum++
    console.log('onlyActiveTiles', onlyActiveTiles.value);

    console.log('upPoint', upPoint)
    console.log('downPoint', downPoint)
    console.log('rightPoint', rightPoint)
    console.log('leftPoint', leftPoint)
  }
}

const checkCurrentTile = (id: number) => {
  if (allTiles.value.find(el => el.id === id)) {
    const tile = allTiles.value.find(el => el.id === id) as ActiveTileModel
    if (tile) {
      tile.status = 'checked'
      tile.type = 'Full'
    }
  }
}

const updateTileValue = (tile: ActiveTileModel) => {
  tile.status = 'await'
  tile.order = allCheckedTile.value
  tile.type = 'Full'
  allCheckedTile.value++
}

const addNextTileToCheck = (id: number) => {
  if (id - 10 > 0) { // Add next tile to check up
    const tile = allTiles.value.find(el => el.id === id - 10) as ActiveTileModel
    if (tile && !tile.order) updateTileValue(tile)
  }
  if (id % 10 !== 0) { // Add next tile to check right
    const tile = allTiles.value.find(el => el.id === id + 1) as ActiveTileModel
    if (tile && !tile.order) updateTileValue(tile)
  }
  if (id + 10 < 100) { // Add next tile to check down
    const tile = allTiles.value.find(el => el.id === id + 10) as ActiveTileModel
    if (tile && !tile.order) updateTileValue(tile)
  }
  if ((id - 1) % 10 !== 0) { // Add next tile to check left
    const tile = allTiles.value.find(el => el.id === id - 1) as ActiveTileModel
    if (tile && !tile.order) updateTileValue(tile)
  }
}


const render = () => {
  switch (props.chunk.type) {
    case "Start":
      startWithTile.value = store.generate(37, 37)
      // startWithTile.value = store.generate(39, 39)
      // startWithTile.value = store.generate(77, 77)
      // startWithTile.value = store.generate(67, 67)
      // startWithTile.value = store.generate(88, 88)
      // startWithTile.value = store.generate(100, 100)
      // startWithTile.value = store.generate(25, 100)
      store.addEmptyItems(100, allTiles.value)
      console.log('start with:', startWithTile.value)
      stepping(startWithTile.value)
      break;
    default:
      store.addEmptyItems(100, allTiles.value)
      break;
  }
}

onMounted(render)
</script>

<template>
  <div :class="{'disabled': chunk.type === 'Empty', 'start': chunk.type === 'Start', 'finish': chunk.type === 'Finish'}"
       class="chunk-wrap">
    <Tile v-for="tile in allTiles" class="tile" :active="tile.status" :id="tile.id"></Tile>
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
    filter: grayscale(1);
  }

  &.start {
    .tile {
      background: green;
    }
  }

  &.finish {
    .tile {
      background: red;
    }
  }
}

</style>