import { IOClients } from '@vtex/api'

import Pokeapi from './pokeapi'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get Pokeapi() {
    return this.getOrSet('Pokeapi', Pokeapi)
  }
}
