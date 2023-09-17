<script setup lang="ts">
import GameDungeon from "@/components/gameDungeon/GameDungeon.vue";
import {ref} from "vue";
import GameNumbers from "@/components/game2048/GameNumbers.vue";

// const gameActive = ref<boolean>(true)

// const relaunchGame = () => {
//   gameActive.value = false
//   setTimeout(() => gameActive.value = true,1)
// }
</script>

<template>
  <main>
    <!--    <button @click="relaunchGame">-->
    <!--      relaunch-->
    <!--    </button>-->
    <game-numbers />
    <!--    <game-dungeon v-if="gameActive"/>-->
  </main>
</template>
