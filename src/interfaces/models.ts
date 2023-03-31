export type ChunkTypes = 'Start'|'Finish'|'Empty'|'Rooms'|'Secret'

export interface ChunkModel {
    id: number
    type: ChunkTypes
}

export interface ActiveTileModel {
    id: number
    status: string
    order: number
    type?:string
}