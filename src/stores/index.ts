import {defineStore} from 'pinia'
import type {ActiveTileModel, ChunkModel} from "@/interfaces/models";

export const useStore = defineStore('store', () => {
    const generate = (to: number, from: number) => {
        return Math.floor(to + Math.random() * (from + 1 - to))
    }

    const shuffle = (arr: ActiveTileModel[] | ChunkModel[]) => {
        return arr.sort(() => Math.random() - 0.5);
    }

    const addEmptyItems = (max: number, arr: ChunkModel[] & ActiveTileModel[]) => {
        for (let i: number = 1; i <= max; i++) {
            if (!arr.find((el: ActiveTileModel | ChunkModel) => el.id === i)) {
                arr.push({"id": i, "type": 'Empty'})
            }
        }
    }

    return {generate, shuffle, addEmptyItems}
})
