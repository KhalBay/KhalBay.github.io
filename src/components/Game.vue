<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {ChunkModel} from "@/interfaces/models";
import Chunk from "./Chunk.vue"
import {useStore} from "@/stores";

const active_chunks = ref<number>()
const allChunks = ref<ChunkModel[]>([])
const store = useStore()

const start = () => {
  allChunks.value = []
  active_chunks.value = store.generate(7,16)
  //set active chunk
  for (let i:number = 0; i < active_chunks.value; i++) {
    switch (i) {
      case 1:
        allChunks.value.push({id: i+1, type: "Start"})
        break;
      case 2:
        allChunks.value.push({id: i+1, type: "Finish"})
        break;
      default:
        allChunks.value.push({id: i+1, type: "Rooms"})
        break;
    }
  }
  // add empty chunks
  if (allChunks.value.length < 16) {
    store.addEmptyItems(16, allChunks.value)
  }
  store.shuffle(allChunks.value)
}

onMounted(start)
</script>

<template>
  <div>
<!--    <h1>{{ active_chunks }}</h1>-->
<!--    <button @click="start">relaunch</button>-->

    <div class="wrap">
      <Chunk v-for="(chunk, id) in allChunks" :id="id + 1" :chunk="chunk"></Chunk>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 5px;
}
</style>

