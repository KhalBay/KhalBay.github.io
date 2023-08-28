<script setup lang="ts">
import GameDungeon from "@/components/GameDungeon.vue";
import Game from "@/components/2048/GameNumbers.vue";
import {ref} from "vue";

const gameActive = ref<boolean>(true)

const relaunchGame = () => {
  gameActive.value = false
  setTimeout(() => gameActive.value = true,10)
}
</script>

<template>
  <main>
    <button @click="relaunchGame">
      relaunch
    </button>
    <game v-if="gameActive" />
  </main>
</template>
