import type { InstanceOptions, IOContext} from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Pokeapi extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://pokeapi.co/', context, options)
  }

  public async getPokemonId(PokemonId: string|number): Promise<string> {
    console.log("PokemonId:", PokemonId)
    return this.http.get(`/api/v2/pokemon/${PokemonId}`)
    }
  }
