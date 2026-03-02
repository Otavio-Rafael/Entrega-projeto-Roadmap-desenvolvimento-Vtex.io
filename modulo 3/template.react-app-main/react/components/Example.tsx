import type { FC } from 'react'
import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import "./style.css"

const CSS_HANDLES = ['example'] as const

/**
 * @description Example React Component.
 * @version 1.0.0
 */
const Example: FC = () => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const body = {pokemon: '25'}
const setPokemon = async () => {
  const poke30 = await fetch('/_v/poke/', {
    method: 'POST',
    body: JSON.stringify(body)
  })
  const poke30json = await poke30.json()
  console.log(poke30json)
}

  useEffect(() => {
    console.log('Example component mounted')
    setPokemon()
  }, [])
  return (
    <p className={classNames(handles.example, 'flex')}>
      This is an example component
    </p>
  )
}

export default Example
