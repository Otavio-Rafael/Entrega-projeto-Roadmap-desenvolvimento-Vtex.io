import type { FC } from 'react'
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import classNames from 'classnames'
import { CSS_HANDLES, TYPE_COLORS } from '../utils'
import { PokemonData, Status } from '../typings/pokemon'
import "./style.css"

const getTypeColor = (types: string[]): string => TYPE_COLORS[types[0]] ?? '#6C63FF'


const PokemonForm: FC = () => {
  const [pokemonId, setPokemonId] = useState('')
  const [inputError, setInputError] = useState('')
  const [pokemon, setPokemonState] = useState<PokemonData | null>(null)
  const [status, setStatus] = useState<Status>('search')
  const [dominantColor, setDominantColor] = useState<string | null>(null)
  const reqCount = React.useRef(0)
  const reqWindowStart = React.useRef(Date.now())
  const { handles } = useCssHandles(CSS_HANDLES)


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const onlyDigits = raw.replace(/\D/g, '')
    const sanitized = onlyDigits.replace(/^0+/, '')

    if (raw !== onlyDigits || (onlyDigits !== '' && sanitized === '')) {
      setInputError('Para poder fazer a consulta insira apenas números acima de zero')
    } else {
      setInputError('')
    }

      setPokemonId(sanitized)
    }
  const validate = (): boolean => {
    if (pokemonId === '') {
      setInputError('Digite um ID válido (número maior que zero).')
      return false
    }
    return true
  }

 const fetchPokemon = async () => {
  if (!validate()) return

  const now = Date.now()
    if (now - reqWindowStart.current > 30000) {
    reqCount.current = 1
    reqWindowStart.current = now
  } else if (reqCount.current >= 5) {
    setInputError('Muitas consultas em pouco tempo. Aguarde alguns segundos.')
    return
  } else {
    reqCount.current += 1
  }           

    setStatus('loading')        

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch('/_v/poke/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemon: Number(pokemonId) }),
        signal: controller.signal,
    })

    clearTimeout(timeoutId)

      if (!response.ok) {
        setStatus(response.status === 400 ? 'error_height' : 'error_api')
      return
    }

    const data: PokemonData = await response.json()
      setPokemonState(data)
      setStatus('success')

      if (data.types) {
        const typeNames = data.types.map((t) =>
          typeof t === 'string' ? t : t?.type?.name ?? ''
      )
      setDominantColor(getTypeColor(typeNames))
    }

      if (typeof window !== 'undefined') {
        ;(window as any).dataLayer = (window as any).dataLayer || []
        ;(window as any).dataLayer.push({
          event: 'pokemonSearch',
          pokemonSearch: { id: data.id ?? Number(pokemonId), name: data.name, height: data.height },
      })
    }
  } catch (err) {
  const error = err as { name?: string }
  if (error.name === 'AbortError') {
    setStatus('error_api')
  } else {
    setStatus('error_api')
  }
  }
}                            
  
  const handleReset = () => {
    setStatus('search')
    setPokemonState(null)
    setDominantColor(null)
    setPokemonId('')
    setInputError('')
  }
console.log('Renderizando PokemonForm, status:', status, 'pokemon:', pokemon)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') fetchPokemon()
  }

  const isLoading = status === 'loading'
  const showResult = status === 'success' || status === 'loading'
  const showError = status === 'error_height' || status === 'error_api'

  // Monta CSS variables de cor dinamicamente via style inline no painel
  const colorStyle = dominantColor ? {
    '--pkc': dominantColor,
    '--pkf-color-light': `${dominantColor}1e`,  // 12% opacity hex
    '--pkf-color-border': `${dominantColor}66`, // 40% opacity hex
  } as React.CSSProperties : {}

  return (
  <div className={classNames(handles.pkfWrap)}>
    <div
      className={classNames(handles.pkfPanel, { [handles.pkfPanelSuccess]: status === 'success' })}
      style={colorStyle}
    >
      
      {/* PAINEL A — Consulta */}
      {!showResult && (
        <div className={classNames(handles.pkfView, handles.pkfViewConsult)}>
          <div className={classNames(handles.pkfConsultBody)}>
            {!showError ? (
              <p className={classNames(handles.pkfDescription)}>
                Consulte o seu pokémon favorito pelo ID para saber sua altura,
                nome e ver como ele é
              </p>
            ) : (
              <div className={classNames(handles.pkfErrorMsg)}>
                {status === 'error_height'
                  ? '⚠️ Este pokémon é muito alto! Tente um com altura menor que 15.'
                  : '❌ Erro interno. Verifique o ID e tente novamente.'}
              </div>
            )}
          </div>

          <div className={classNames(handles.pkfFormControls)}>
            <div className={classNames(handles.pkfInputWrapper)}>
              <input
                className={classNames(handles.pkfInput, { [handles.pkfInputError]: !!inputError })}
                type="text"
                inputMode="numeric"
                placeholder="ID do Pokémon"
                value={pokemonId}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                maxLength={4}
                autoComplete="off"
              />
              {inputError && (
                <span className={classNames(handles.pkfInputErrorText)}>{inputError}</span>
              )}
            </div>
            <button className={classNames(handles.pkfButton)} type="button" onClick={fetchPokemon}>
              Consultar
            </button>
          </div>
        </div>
      )}

      {/* PAINEL B — Resultado */}
      {showResult && (
        <div className={classNames(handles.pkfView, handles.pkfViewResult)}>
          <div className={classNames(handles.pkfImgArea)}>
            {isLoading ? (
              <div className={classNames(handles.pkfSkeleton, handles.pkfSkeletonImg)} />
            ) : (
              pokemon?.sprites?.front_default && (
                <img
                  className={classNames(handles.pkfPokemonImg)}
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              )
            )}
          </div>

          <div className={classNames(handles.pkfFields)}>
            {isLoading ? (
              <>
                <div className={classNames(handles.pkfSkeleton, handles.pkfSkeletonField)} />
                <div className={classNames(handles.pkfSkeleton, handles.pkfSkeletonField, handles.pkfSkeletonShort)} />
              </>
            ) : pokemon && (
              <>
                <div className={classNames(handles.pkfCardField)}>
                  <span className={classNames(handles.pkfCardLabel)}>Nome:</span>
                  <span className={classNames(handles.pkfCardValue)}>{pokemon.name}</span>
                </div>
                <div className={classNames(handles.pkfCardField)}>
                  <span className={classNames(handles.pkfCardLabel)}>Altura:</span>
                  <span className={classNames(handles.pkfCardValue)}>{pokemon.height}</span>
                </div>
              </>
            )}
          </div>

          {!isLoading && (
            <button
              className={classNames(handles.pkfButton, handles.pkfButtonGhost)}
              type="button"
              onClick={handleReset}
            >
              ← Nova consulta
            </button>
          )}
        </div>
      )}

    </div>
  </div>
)
}

export default PokemonForm
