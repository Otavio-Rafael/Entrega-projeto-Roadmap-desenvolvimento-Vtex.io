import React from 'react'
import { PokemonData } from '../../typings/pokemon'

export const Card = ( PokemonData : PokemonData ) => (
  <>
    <div className="pkf-card-field">
      <span className="pkf-card-label">Nome:</span>
      <span className="pkf-card-value pkf-card-value--name">{PokemonData.name}</span>
    </div>
    <div className="pkf-card-field">
      <span className="pkf-card-label">Altura:</span>
      <span className="pkf-card-value">{PokemonData.height}</span>
    </div>
  </>
)
