<script setup lang="ts">
import {onMounted, ref} from "vue"
import type {Keyup, TileNumbersModel} from "@/interfaces/models"
import Tile from "@/components/2048/TileNumbers.vue"

const tileWrapper = ref<HTMLElement>()
const allTile = ref<TileNumbersModel[]>([])
const lastClone = ref<TileNumbersModel[]>([])
const score = ref<number>(0)

const getRandomNumber = (min: number, max: number, count: number = 1): number[] => {
  let randomNum: number[] = []
  for (let i: number = 0; i < count; i++) {
    randomNum.push(Math.trunc(Math.random() * (max - min) + min))
  }
  return randomNum
}

const createTiles = (): void => {
  const twoRandomTile: number[] = getRandomNumber(0, 16, 2)
  for (let i: number = 0; i < 16; i++) {
    allTile.value.push({
      id: i,
      position: +`${Math.trunc(i / 4) % 4}${i % 4}` + 11,
      num: twoRandomTile.includes(i) ? 2 : 0,
      isSum: false
    })
  }
}

const addNewNumber = () => {
  const newNumAdd: number = getRandomNumber(0,5)[0] === 4 ? 4 : 2
  const emptyTiles: TileNumbersModel[] = allTile.value.filter((el: TileNumbersModel) => !el.num)
  const newRandomIndex = getRandomNumber(0, emptyTiles.length)
  emptyTiles[newRandomIndex[0]].num = newNumAdd
  allTile.value.forEach(el => {
    el.isSum = false
  })
}

const checkConditionsAndMove = (way: Keyup, element: TileNumbersModel) => {
  let prevTile: TileNumbersModel
  let prevPosition: number
  switch (way) {
    case 'up':
      if (element.position > 20) {
        prevPosition = element.position - 10
      } else {
        break
      }
      prevTile = allTile.value.find((item: TileNumbersModel) => item.position === prevPosition)
      if (prevTile.num === element.num && !prevTile.isSum) {
        prevTile.num *= 2
        prevTile.isSum = true
        element.num = 0
        break
      }
      if (!prevTile.num) {
        prevTile.num = element.num
        element.num = 0
        checkConditionsAndMove('up', prevTile)
      }
      break
    case 'down':
      if (element.position < 40) {
        prevPosition = element.position + 10
      } else {
        break
      }
      prevTile = allTile.value.find((item: TileNumbersModel) => item.position === prevPosition)
      if (prevTile.num === element.num && !prevTile.isSum) {
        prevTile.num *= 2
        prevTile.isSum = true
        element.num = 0
        break
      }
      if (!prevTile.num) {
        prevTile.num = element.num
        element.num = 0
        checkConditionsAndMove('down', prevTile)
      }
      break
    case 'left':
      if (element.position % 10 !== 1) {
        prevPosition = element.position - 1
      } else {
        break
      }
      prevTile = allTile.value.find((item: TileNumbersModel) => item.position === prevPosition)
      if (prevTile.num === element.num && !prevTile.isSum) {
        prevTile.num *= 2
        prevTile.isSum = true
        element.num = 0
        break
      }
      if (!prevTile.num) {
        prevTile.num = element.num
        element.num = 0
        checkConditionsAndMove('left', prevTile)
      }
      break
    case 'right':
      if (element.position % 10 !== 4) {
        prevPosition = element.position + 1
      } else {
        break
      }
      prevTile = allTile.value.find((item: TileNumbersModel) => item.position === prevPosition)
      if (prevTile.num === element.num && !prevTile.isSum) {
        prevTile.num *= 2
        prevTile.isSum = true
        element.num = 0
        break
      }
      if (!prevTile.num) {
        prevTile.num = element.num
        element.num = 0
        checkConditionsAndMove('right', prevTile)
      }
      break
  }
}

const moveUp = () => {
  lastClone.value = JSON.parse(JSON.stringify(allTile.value))
  allTile.value = allTile.value.sort((a, b) => a.id - b.id)
  allTile.value.forEach((el: TileNumbersModel) => {
    if (el.num && el.position > 20) checkConditionsAndMove('up', el)
  })
  if (JSON.stringify(lastClone.value) !== JSON.stringify(allTile.value)) {
    addNewNumber()
  }
}

const moveDown = () => {
  lastClone.value = JSON.parse(JSON.stringify(allTile.value))
  allTile.value = allTile.value.sort((a, b) => b.id - a.id)
  allTile.value.forEach((el: TileNumbersModel) => {
    if (el.num && el.position < 40) checkConditionsAndMove('down', el)
  })
  allTile.value = allTile.value.sort((a, b) => a.id - b.id)
  if (JSON.stringify(lastClone.value) !== JSON.stringify(allTile.value)) {
    addNewNumber()
  }
}

const moveLeft = () => {
  lastClone.value = JSON.parse(JSON.stringify(allTile.value))
  allTile.value = allTile.value.sort((a, b) => a.position % 10 - b.position % 10)
  allTile.value.forEach((el: TileNumbersModel) => {
    if (el.num && el.position % 10 !== 1) checkConditionsAndMove('left', el)
  })
  allTile.value = allTile.value.sort((a, b) => a.id - b.id)
  if (JSON.stringify(lastClone.value) !== JSON.stringify(allTile.value)) {
    addNewNumber()
  }
}

const moveRight = () => {
  lastClone.value = JSON.parse(JSON.stringify(allTile.value))
  allTile.value = allTile.value.sort((a, b) => b.position % 10 - a.position % 10)
  allTile.value.forEach((el: TileNumbersModel) => {
    if (el.num && el.position % 10 !== 4) checkConditionsAndMove('right', el)
  })
  allTile.value = allTile.value.sort((a, b) => a.id - b.id)
  if (JSON.stringify(lastClone.value) !== JSON.stringify(allTile.value)) {
    addNewNumber()
  }
}

// Анимация
// Цвета ещё поменять
// Конец игры и победа
// Счёт

onMounted(() => {
  createTiles()
  tileWrapper.value?.focus()
})
</script>

<template>
<!--  <div class="score">Счёт: {{score}}</div>-->
  <div
    ref="tileWrapper"
    class="wrap"
    tabindex="0"
    @keyup.up="moveUp"
    @keyup.down="moveDown"
    @keyup.left="moveLeft"
    @keyup.right="moveRight"
    v-touch:swipe.top="moveUp"
    v-touch:swipe.bottom="moveDown"
    v-touch:swipe.left="moveLeft"
    v-touch:swipe.right="moveRight"
  >
    <tile
      v-for="tile in allTile"
      :id="tile.position"
      :key="tile.id"
      :value="tile.num"
    />
  </div>
</template>

<style scoped lang="scss">
.wrap {
  background: #c9c9c9;
  padding: 15px;
  border-radius: 8px;
  outline: none;
}
</style>