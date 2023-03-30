<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {ChunkModel} from "@/interfaces/models";
import Chunk from "./Chunk.vue"
import {useStore} from "@/stores";

let active_chunks = ref<number>()
let all_chunks = ref<ChunkModel[]>([])
const store = useStore()

const start = () => {
  all_chunks.value = []
  active_chunks.value = store.generate(7,16)
  //set active chunk
  for (let i:number = 0; i < active_chunks.value; i++) {
    switch (i) {
      case 1:
        all_chunks.value.push({id: i+1, type: "Start"})
        break;
      case 2:
        all_chunks.value.push({id: i+1, type: "Finish"})
        break;
      default:
        all_chunks.value.push({id: i+1, type: "Rooms"})
        break;
    }
  }
  // add empty chunks
  if (all_chunks.value.length < 16) {
    store.addEmptyItems(16, all_chunks.value)
  }
  store.shuffle(all_chunks.value)
}

onMounted(start)
</script>

<template>
  <div>
    <h1>{{ active_chunks }}</h1>
    <button @click="start">relaunch</button>

    <div class="wrap">
      <Chunk v-for="chunk in all_chunks" :id="chunk.id" :chunk="chunk"></Chunk>
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

