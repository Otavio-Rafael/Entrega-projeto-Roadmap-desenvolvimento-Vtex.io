import React from 'react'

interface CardProps {
  pokemonId: {
    name: string
    height: number
    sprites: { front_default: string }
    [key: string]: any
  }
}

export const Card = ({ pokemonId: pokemon }: CardProps) => (
  <>
    <div className="pkf-card-field">
      <span className="pkf-card-label">Nome:</span>
      <span className="pkf-card-value pkf-card-value--name">{pokemon.name}</span>
    </div>
    <div className="pkf-card-field">
      <span className="pkf-card-label">Altura:</span>
      <span className="pkf-card-value">{pokemon.height}</span>
    </div>
  </>
)
