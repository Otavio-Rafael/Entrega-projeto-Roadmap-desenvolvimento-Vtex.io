export type PokemonData = {
  name?: string
  height?: number
  sprites?: { front_default: string }
  types?: Type[]
  id?: number
}
interface Type {
    slot: number
    type: {
    name: string
    url: string
}
}
export type Status = 'search' | 'loading' | 'success' | 'error_height' | 'error_api'