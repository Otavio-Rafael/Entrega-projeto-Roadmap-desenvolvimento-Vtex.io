import type { FC } from 'react'
import React, { useState } from 'react'
import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import "./style.css"
import { Card } from './Card/Card'

const CSS_HANDLES = ['example', 'button', 'input'] as const

/**
 * @description Example React Component.
 * @version 1.0.0
 */
const PokemonForm: FC = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const [pokemonId, setPokemonId] = useState <any> ()

  const [pokemon, setPokemonState] = useState({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPokemonId(e.target.value)
}

  
const setPokemon = async () => {
  const body = {pokemon: Number(pokemonId)}
  if (body.pokemon === 0 ) {
    alert('Digite um ID válido')
  }
  console.log(typeof pokemonId)

  const poke30 = await fetch('/_v/poke/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const poke30json = await poke30.json()
  setPokemonState(poke30json)
  console.log(poke30json)
}

  return (
 <form>
  <Card pokemonId={pokemon}/>
  <input 
  className={classNames(handles.input, 'flex')} 
  id='pokemonId' 
  name='pokemonId' 
  type='text' placeholder='Digite o ID do Pokemon'
  value={pokemonId}
  onChange={handleInputChange}/>

     <p className={classNames(handles.example, 'flex')}>
      This is an example component
    </p>
    <button 
    className={classNames(handles.button, 'flex')}
    type="button"
    onClick={() => setPokemon()}

    >
    Conheça o pokemon
    </button>
 </form>
  )
}

export default PokemonForm
