export type Types = 'Start'|'Finish'|'Empty'|'Rooms'|'Secret'|'Full'

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