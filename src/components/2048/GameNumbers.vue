<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue"
import type {Keyup, TileNumbersModel} from "@/interfaces/models"
import Tile from "@/components/2048/TileNumbers.vue"

const tileWrapper = ref()
const allTile = ref<TileNumbersModel[]>([])
const lastClone = ref<TileNumbersModel[]>([])
const score = ref(0)
const bestScore = ref(0)
const animationType = ref('')
const gameOver = ref(false)
const winClass = ref(false)

const winTile = computed(() => allTile.value.some((el: TileNumbersModel) => el.num >= 2048))
const freedomTile = computed(() => allTile.value.some((el: TileNumbersModel) => el.num === 0))

const checkLS = () => {
  if (localStorage.getItem('bestScore2048')) {
    bestScore.value = Number(localStorage.getItem('bestScore2048'))
  }
}

const getRandomNumber = (min: number, max: number, count: number = 1): number[] => {
  let randomNum: number[] = []
  for (let i: number = 0; i < count; i++) {
    randomNum.push(Math.trunc(Math.random() * (max - min) + min))
  }
  return randomNum
}

const createTiles = () => {
  const twoRandomTile: number[] = getRandomNumber(0, 16, 12)
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
  animationType.value = 'creat'
  const newNumAdd = getRandomNumber(0, 5)[0] === 4 ? 4 : 2
  const emptyTiles: TileNumbersModel[] = allTile.value.filter((el: TileNumbersModel) => !el.num)
  const newRandomIndex = getRandomNumber(0, emptyTiles.length)
  emptyTiles[newRandomIndex[0]].num = newNumAdd
  allTile.value.forEach(el => {
    el.isSum = false
  })
}

const checkConditionsAndMove = (way: Keyup, element: TileNumbersModel): void => {
  let prevTile: TileNumbersModel | undefined
  let prevPosition: number
  switch (way) {
    case 'up':
      if (element.position > 20) {
        prevPosition = element.position - 10
      } else {
        break
      }
      prevTile = allTile.value.find((item: TileNumbersModel) => item.position === prevPosition)
      if (prevTile?.num === element.num && !prevTile.isSum) {
        prevTile.num *= 2
        score.value += prevTile.num
        prevTile.isSum = true
        element.num = 0
        break
      }
      if (!prevTile?.num && prevTile) {
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
      if (prevTile?.num === element.num && !prevTile.isSum) {
        prevTile.num *= 2
        score.value += prevTile.num
        prevTile.isSum = true
        element.num = 0
        break
      }
      if (!prevTile?.num && prevTile) {
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
      if (prevTile?.num === element.num && !prevTile.isSum) {
        prevTile.num *= 2
        score.value += prevTile.num
        prevTile.isSum = true
        element.num = 0
        break
      }
      if (!prevTile?.num && prevTile) {
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
      if (prevTile?.num === element.num && !prevTile.isSum) {
        prevTile.num *= 2
        score.value += prevTile.num
        prevTile.isSum = true
        element.num = 0
        break
      }
      if (!prevTile?.num && prevTile) {
        prevTile.num = element.num
        element.num = 0
        checkConditionsAndMove('right', prevTile)
      }
      break
  }
}

const moveUp = () => {
  animationType.value = 'up'
  lastClone.value = JSON.parse(JSON.stringify(allTile.value))
  allTile.value = allTile.value.sort((a, b) => a.id - b.id)
  allTile.value.forEach((el: TileNumbersModel) => {
    if (el.num && el.position > 20) checkConditionsAndMove('up', el)
  })
  if (JSON.stringify(lastClone.value) !== JSON.stringify(allTile.value)) {
    setTimeout(addNewNumber, 50)
  }
}

const moveDown = () => {
  animationType.value = 'down'
  lastClone.value = JSON.parse(JSON.stringify(allTile.value))
  allTile.value = allTile.value.sort((a, b) => b.id - a.id)
  allTile.value.forEach((el: TileNumbersModel) => {
    if (el.num && el.position < 40) checkConditionsAndMove('down', el)
  })
  allTile.value = allTile.value.sort((a, b) => a.id - b.id)
  if (JSON.stringify(lastClone.value) !== JSON.stringify(allTile.value)) {
    setTimeout(addNewNumber, 50)
  }
}

const moveLeft = () => {
  animationType.value = 'left'
  lastClone.value = JSON.parse(JSON.stringify(allTile.value))
  allTile.value = allTile.value.sort((a, b) => a.position % 10 - b.position % 10)
  allTile.value.forEach((el: TileNumbersModel) => {
    if (el.num && el.position % 10 !== 1) checkConditionsAndMove('left', el)
  })
  allTile.value = allTile.value.sort((a, b) => a.id - b.id)
  if (JSON.stringify(lastClone.value) !== JSON.stringify(allTile.value)) {
    setTimeout(addNewNumber, 50)
  }
}

const moveRight = () => {
  animationType.value = 'right'
  lastClone.value = JSON.parse(JSON.stringify(allTile.value))
  allTile.value = allTile.value.sort((a, b) => b.position % 10 - a.position % 10)
  allTile.value.forEach((el: TileNumbersModel) => {
    if (el.num && el.position % 10 !== 4) checkConditionsAndMove('right', el)
  })
  allTile.value = allTile.value.sort((a, b) => a.id - b.id)
  if (JSON.stringify(lastClone.value) !== JSON.stringify(allTile.value)) {
    setTimeout(addNewNumber, 50)
  }
}

const checkLoseConditions = () => {
  const tilesForCheck = allTile.value.filter((el: TileNumbersModel) => [1,3,4,6,9,11,12,14].includes(el.id))
  const isSum = tilesForCheck.map((el: TileNumbersModel) => checkSumWithNeighbor(el))
  if (isSum.every((el: boolean) => !el) && !freedomTile.value) gameOver.value = true
  if (bestScore.value < score.value) {
    localStorage.setItem('bestScore2048', score.value.toString())
    bestScore.value = score.value
  }
}

const checkSumWithNeighbor = (element: TileNumbersModel): boolean => {
  const neighbor1 = allTile.value.some((el: TileNumbersModel) => el.position === element.position - 1 && el.num === element.num)
  const neighbor2 = allTile.value.some((el: TileNumbersModel) => el.position === element.position + 1 && el.num === element.num)
  const neighbor3 = allTile.value.some((el: TileNumbersModel) => el.position === element.position + 10 && el.num === element.num)
  const neighbor4 = allTile.value.some((el: TileNumbersModel) => el.position === element.position - 10 && el.num === element.num)
  return neighbor1 || neighbor2 || neighbor3 || neighbor4
}

const relaunchGame = () => {
  allTile.value = []
  score.value = 0
  gameOver.value = false
  createTiles()
}

const gameWin = () => {
  winClass.value = true
  setTimeout(() => winClass.value = false, 3000)
}

// Цвета ещё поменять

watch(winTile, gameWin)
watch(freedomTile, checkLoseConditions)

onMounted(() => {
  checkLS()
  createTiles()
  tileWrapper.value?.focus()
})
</script>

<template>
  <div class="info-wrap">
    <div class="count-result">
      <div class="count-result-item">
        <div class="item-title">
          Score
        </div>
        <div class="item-result">
          {{ score }}
        </div>
      </div>
      <div class="count-result-item">
        <div class="item-title">
          Best
        </div>
        <div class="item-result">
          {{ bestScore }}
        </div>
      </div>
    </div>
    <div
      class="button-relaunch"
      @click="relaunchGame"
    >
      New game
    </div>
  </div>
  <div
    ref="tileWrapper"
    v-touch:swipe.top="moveUp"
    v-touch:swipe.bottom="moveDown"
    v-touch:swipe.left="moveLeft"
    v-touch:swipe.right="moveRight"
    class="wrap"
    :class="{'game-over': gameOver, 'game-win': winClass}"
    tabindex="0"
    @keyup.up="moveUp"
    @keyup.down="moveDown"
    @keyup.left="moveLeft"
    @keyup.right="moveRight"
  >
    <tile
      v-for="tile in allTile"
      :id="tile.position"
      :key="tile.id"
      :value="tile.num"
      :animation-type="animationType"
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

.game-over {
  background: rgba(255, 0, 0, 0.15);
  position: relative;

  &::before {
    content: 'Game over';
    position: absolute;
    font-weight: 900;
    font-size: 58px;
    justify-content: center;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
}

.game-win {
  background: rgba(132, 255, 0, 0.22);
  position: relative;

  &::before {
    content: 'You win!';
    position: absolute;
    font-weight: 900;
    font-size: 58px;
    justify-content: center;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
}

.info-wrap {
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px 0;

  .count-result {
    display: flex;
    gap: 20px;

    .button-relaunch {
      background: #c9c9c9;
      padding: 0 20px;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    &-item {
      background: #c9c9c9;
      padding: 0 20px;
      border-radius: 2px;
      text-align: center;

      .item-title {
        text-decoration: underline;
      }
      .item-result {
        font-weight: 700;
      }
    }
  }
}
</style>