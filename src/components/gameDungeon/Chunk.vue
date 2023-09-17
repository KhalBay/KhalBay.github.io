<script lang="ts" setup>
import Tile from "@/components/gameDungeon/Tile.vue";
import {computed, onMounted, ref} from "vue";
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
const allActiveTiles = ref<number[]>([])
const nextTileToCheck = ref<ActiveTileModel>(emptyActiveTileModel)

const borderPointUp = ref<number>(0)
const borderPointRight = ref<number[]>([])
const borderPointDown = ref<number>(0)
const borderPointLeft = ref<number[]>([])

const onlyCheckedTiles = computed(() => allTiles.value.filter(el => el.status === 'checked'))

const stepping = (id: number, withCount: boolean = true) => {
  if (allCheckedTile.value <= startWithTile.value / 2) { // Check half tiles
    checkCurrentTile(id)
    addNextTileToCheck(id)

    lastCheckedTileNum.value++
    nextTileToCheck.value = allTiles.value.find(el => el.order === lastCheckedTileNum.value) as ActiveTileModel
    setTimeout(() => stepping(nextTileToCheck.value.id), 50)
  } else {
    if (withCount) countBorderPoints()

    let numToNextStrochkyD = borderPointDown.value + (10 - (borderPointDown.value % 10)) // Если больше нижней границы
    let numToNextStrochkyU = borderPointUp.value - (borderPointUp.value % 10) // Если больше Верхней границы
    let numToNextStrochkyR = borderPointRight.value[0] % 10 === 0 ? 10 : borderPointRight.value[0] % 10
    let numToNextStrochkyL = borderPointLeft.value[0] % 10 === 0 ? 10 : borderPointLeft.value[0] % 10

    let idNew = id % 10 === 0 ? 10 : id % 10

    console.log('numToNextStrochkyD', numToNextStrochkyD)
    console.log('numToNextStrochkyU', numToNextStrochkyU)
    console.log('numToNextStrochkyR', numToNextStrochkyR)
    console.log('numToNextStrochkyL', numToNextStrochkyL)

    if (id > numToNextStrochkyD || id < numToNextStrochkyU || idNew < numToNextStrochkyR || idNew > numToNextStrochkyL) {
      // alert(id)
      const tile = allTiles.value.find(el => el.id === id) as ActiveTileModel
      if (tile) {
        tile.status = 'error'
        tile.type = 'Full'
      }
    } else {
      checkCurrentTile(id)
      addNextTileToCheck(id)
    }

    lastCheckedTileNum.value++
    nextTileToCheck.value = allTiles.value.find(el => el.order === lastCheckedTileNum.value) as ActiveTileModel
    if (onlyCheckedTiles.value.length <= startWithTile.value) setTimeout(() => stepping(nextTileToCheck.value.id, false), 50)
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

const countBorderPoints = () => {
  allTiles.value.forEach((el:any) => {
    if (el.type === 'Full') allActiveTiles.value.push(el.id)
  })

  borderPointUp.value = allActiveTiles.value[0]
  borderPointDown.value = allActiveTiles.value[allActiveTiles.value.length - 1]


  //Нужен ли массив если я использую через [0]??
  allActiveTiles.value.reduce((acc: number, el : number) => { // add right points
    if (el % 10 <= acc && el % 10 !== 0) {
      if (+borderPointRight.value[0] % 10 > el % 10 ) borderPointRight.value.pop()
      acc = el % 10
      borderPointRight.value.push(el)
    }
    if (borderPointRight.value.length > 1 && +borderPointRight.value[0] % 10 !== +borderPointRight.value[1] % 10) borderPointRight.value.shift()
    return acc
  }, 9)

  //Нужен ли массив если я использую через [0]??
  allActiveTiles.value.reduce((acc: number, el : number) => { // add left points
    if (el % 10 === 0) {
      if (+borderPointLeft.value[0] % 10 !== 0) borderPointLeft.value = []
      borderPointLeft.value.push(el)
    }
    if (el % 10 >= acc && +borderPointLeft.value[0] % 10 !== 0) {
      if (+borderPointLeft.value[0] % 10 < el % 10 ) borderPointLeft.value.pop()
      acc = el % 10
      borderPointLeft.value.push(el)
    }
    if (borderPointLeft.value.length > 1 && +borderPointLeft.value[0] % 10 !== +borderPointLeft.value[1] % 10) borderPointLeft.value.shift()
    return acc
  }, 0)
}


const render = () => {
  switch (props.chunk.type) {
    case "Start":
      // startWithTile.value = store.generate(37, 37)
      // startWithTile.value = store.generate(39, 39)
      // startWithTile.value = store.generate(77, 77) // problem
      // startWithTile.value = store.generate(67, 67) //too
      // startWithTile.value = store.generate(88, 88) //too
      // startWithTile.value = store.generate(100, 100) //too
      // startWithTile.value = store.generate(91, 91)
      // startWithTile.value = store.generate(61, 61)
      // startWithTile.value = store.generate(25, 25)
      // startWithTile.value = store.generate(31, 31)
      // startWithTile.value = store.generate(16, 16)
      startWithTile.value = store.generate(25, 100)
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
  <div
    :class="{'disabled': chunk.type === 'Empty', 'start': chunk.type === 'Start', 'finish': chunk.type === 'Finish'}"
    class="chunk-wrap"
  >
    <Tile
      v-for="tile in allTiles"
      :id="tile.id"
      class="tile"
      :status="tile.status"
    />
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