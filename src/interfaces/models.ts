export type Types = 'Start'|'Finish'|'Empty'|'Rooms'|'Secret'|'Full'
export type Keyup = 'up'|'left'|'down'|'right'

export interface ChunkModel {
    id: number
    type: Types
}

export interface ActiveTileModel {
    id: number
    status: string
    order: number
    type?: Types
}

export interface ChunkAndActiveTileModel {
    id: number
    status?: string
    order?: number
    type?: Types
}

export interface TileNumbersModel {
    id: number
    position: number
    num: number
    isSum: boolean
}