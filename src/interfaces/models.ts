export type ChunkTypes = 'Start'|'Finish'|'Empty'|'Rooms'|'Secret'

export interface ChunkModel {
    id: number
    type: ChunkTypes
}