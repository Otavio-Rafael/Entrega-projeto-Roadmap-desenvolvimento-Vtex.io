import React from 'react'
export const Card = (parametros: any) => {
    console.log(parametros)
  return (
    <div >
      {parametros.pokemonId.name}
      {parametros.pokemonId.sprites ? <img src={parametros.pokemonId.sprites.front_default} alt={parametros.pokemonId.name} /> : null}
      {parametros.pokemonId.height}
    </div>
  )
}