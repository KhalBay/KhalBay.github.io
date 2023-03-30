import { defineStore } from 'pinia'
import type {ChunkModel} from "@/interfaces/models";

export const useStore = defineStore('store', () => {
  const generate = (to: number, from: number) => {
    return Math.floor(to + Math.random() * (from + 1 - to))
  }

  const shuffle = (arr: object[]|ChunkModel[]) => {
    return arr.sort(() => Math.random() - 0.5);
  }

  const addEmptyItems = (amount: number, arr: ChunkModel[]|object[]) => {
    let num = amount - arr.length
    for (let i:number = 1; i <= num; i++) {
      arr.push({"id": amount-i, "type": 'Empty'})
    }
  }

  return {generate, shuffle, addEmptyItems}
})
