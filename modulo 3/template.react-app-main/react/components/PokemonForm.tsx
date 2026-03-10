import type { FC } from 'react'
import React, { useState, useEffect } from 'react'

type PokemonData = {
  name: string
  height: number
  sprites: { front_default: string }
  types?: any[]
  id?: number
  [key: string]: any
}

type Status = 'idle' | 'loading' | 'success' | 'error_height' | 'error_api'

const TYPE_COLORS: Record<string, string> = {
  fire: '#FF6B35', water: '#4A90D9', grass: '#56C271', electric: '#F9D526',
  psychic: '#FF6FA0', ice: '#74D0F1', dragon: '#6A5ACD', dark: '#3D2B4E',
  fairy: '#FFB6C1', fighting: '#C0392B', poison: '#9B59B6', ground: '#D4A843',
  rock: '#8B7355', ghost: '#5D478B', steel: '#7F8C8D', bug: '#8BC34A',
  flying: '#81D4FA', normal: '#A8A878',
}

const getTypeColor = (types: string[]): string => TYPE_COLORS[types[0]] ?? '#6C63FF'

const STYLES = `
  .pkf-wrap {
    --pkc: #CC0000;
     border: 1.5px dashed #000;
    display: flex;
    justify-content: center;
    padding: 32px 16px;
    font-family: 'Nunito', 'Segoe UI', sans-serif;
  }
  .pkf-panel {
    width: 100%;
    max-width: 320px;
    min-height: 400px;
    border-radius: 16px;
    border: 1.5px solid #000;
    background: #fff;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
    overflow: hidden;
    transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  }
  .pkf-panel--success {
    border-color: var(--pkf-color-border, #c7c7ff);
    background: var(--pkf-color-light, #f0f0ff);
    box-shadow: 0 6px 28px rgba(108,99,255,0.18);
  }
  .pkf-view {
    display: flex;
    flex-direction: column;
    min-height: 400px;
    padding: 24px 20px 20px;
  }
  .pkf-view--consult {
    justify-content: space-between;
  }
  .pkf-view--result {
    justify-content: flex-start;
    gap: 10px;
  }
  .pkf-consult-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pkf-description {
    font-size: 14px;
    line-height: 1.65;
    color: #6B7280;
    text-align: center;
    padding: 14px;
    border: 1.5px dashed #000;
    border-radius: 10px;
    background:rgba(249,250,251,1);
  }
  .pkf-error-msg {
    font-size: 13px;
    line-height: 1.6;
    color: #B91C1C;
    background: #FEF2F2;
    border: 1px solid #FECACA;
    border-radius: 10px;
    padding: 12px 14px;
    text-align: center;
  }
  .pkf-form-controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
  .pkf-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .pkf-input {
    width: 100%;
    height: 42px;
    padding: 0 12px;
    font-size: 14px;
    font-family: inherit;
    color: #111827;
    background: #F9FAFB;
    border: 1.5px solid #000;
    border-radius: 10px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .pkf-input:focus {
    border-color: var(--pkc);
    background: #fff;
  }
  .pkf-input--error {
    border-color: #EF4444;
  }
  .pkf-input-error-text {
    font-size: 12px;
    color: #EF4444;
    padding-left: 2px;
  }
  .pkf-button {
    height: 42px;
    width: 100%;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: var(--pkc);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: filter 0.2s ease, transform 0.15s ease;
  }
  .pkf-button:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }
  .pkf-button:active {
    transform: translateY(0);
  }
  .pkf-button--ghost {
    background: transparent;
    color: var(--pkc);
    border: 1.5px solid #D1D5DB;
    font-weight: 600;
    font-size: 13px;
    margin-top: 4px;
  }
  .pkf-button--ghost:hover {
    background: rgba(108,99,255,0.06);
  }
  .pkf-img-area {
    width: 100%;
    aspect-ratio: 1 / 1;
    background: rgba(108,99,255,0.06);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .pkf-pokemon-img {
    width: 72%;
    height: 72%;
    object-fit: contain;
    image-rendering: pixelated;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.18));
  }
  .pkf-fields {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pkf-card-field {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    background: rgba(255,255,255,0.7);
    border: 1.5px solid #E5E7EB;
    border-radius: 8px;
    font-size: 13px;
  }
  .pkf-card-label {
    color: #6B7280;
    font-size: 12px;
    min-width: 48px;
  }
  .pkf-card-value {
    font-weight: 700;
    color: #111827;
    text-transform: capitalize;
  }
  .pkf-skeleton {
    border-radius: 10px;
    background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
    background-size: 200% 100%;
    animation: pkf-skel 1.4s ease infinite;
  }
  .pkf-skeleton--img {
    width: 100%;
    aspect-ratio: 1 / 1;
  }
  .pkf-skeleton--field {
    height: 40px;
    width: 100%;
  }
  .pkf-skeleton--short {
    width: 65%;
  }
  .pkf-spinner {
    display: inline-block;
    width: 17px;
    height: 17px;
    border: 2.5px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: pkf-spin 0.7s linear infinite;
  }
    .pkf-warning {
  color: #CC0000;
  font-size: 12px;
  margin-top: 4px;
}
  @keyframes pkf-skel {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @keyframes pkf-spin {
    100% { transform: rotate(360deg); }
  }
`

const PokemonForm: FC = () => {
  const [pokemonId, setPokemonId] = useState('')
  const [inputError, setInputError] = useState('')
  const [pokemon, setPokemonState] = useState<PokemonData | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [dominantColor, setDominantColor] = useState<string | null>(null)

  // Injeta o CSS uma única vez no <head>
  useEffect(() => {
    const id = 'pkf-styles'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = STYLES
      document.head.appendChild(style)
    }
  }, [])

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
    setStatus('loading')

    try {
      const response = await fetch('/_v/poke/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemon: Number(pokemonId) }),
      })

      if (!response.ok) {
        setStatus(response.status === 400 ? 'error_height' : 'error_api')
        return
      }

      const data: PokemonData = await response.json()
      setPokemonState(data)
      setStatus('success')

      if (data.types) {
        const typeNames = data.types.map((t: any) =>
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
    } catch {
      setStatus('error_api')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setPokemonState(null)
    setDominantColor(null)
    setPokemonId('')
    setInputError('')
  }

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
    <div className="pkf-wrap">
      <div
        className={`pkf-panel${status === 'success' ? ' pkf-panel--success' : ''}`}
        style={colorStyle}
      >

        {/* PAINEL A — Consulta */}
        {!showResult && (
          <div className="pkf-view pkf-view--consult">
            <div className="pkf-consult-body">
              {!showError ? (
                <p className="pkf-description">
                  Consulte o seu pokémon favorito pelo ID para saber sua altura,
                  nome e ver como ele é
                </p>
              ) : (
                <div className="pkf-error-msg">
                  {status === 'error_height'
                    ? '⚠️ Este pokémon é muito alto! Tente um com altura menor que 15.'
                    : '❌ Erro interno. Verifique o ID e tente novamente.'}
                </div>
              )}
            </div>

            <div className="pkf-form-controls">
              <div className="pkf-input-wrapper">
                <input
                  className={`pkf-input${inputError ? ' pkf-input--error' : ''}`}
                  type="text"
                  inputMode="numeric"
                  placeholder="ID do Pokémon"
                  value={pokemonId}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  maxLength={4}
                  autoComplete="off"
                />
                {inputError && <span className="pkf-input-error-text">{inputError}</span>}
              </div>
              <button className="pkf-button" type="button" onClick={fetchPokemon}>
                Consultar
              </button>
            </div>
          </div>
        )}

        {/* PAINEL B — Resultado */}
        {showResult && (
          <div className="pkf-view pkf-view--result">
            <div className="pkf-img-area">
              {isLoading ? (
                <div className="pkf-skeleton pkf-skeleton--img" />
              ) : (
                pokemon?.sprites?.front_default && (
                  <img
                    className="pkf-pokemon-img"
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                  />
                )
              )}
            </div>

            <div className="pkf-fields">
              {isLoading ? (
                <>
                  <div className="pkf-skeleton pkf-skeleton--field" />
                  <div className="pkf-skeleton pkf-skeleton--field pkf-skeleton--short" />
                </>
              ) : pokemon && (
                <>
                  <div className="pkf-card-field">
                    <span className="pkf-card-label">Nome:</span>
                    <span className="pkf-card-value">{pokemon.name}</span>
                  </div>
                  <div className="pkf-card-field">
                    <span className="pkf-card-label">Altura:</span>
                    <span className="pkf-card-value">{pokemon.height}</span>
                  </div>
                </>
              )}
            </div>

            {!isLoading && (
              <button className="pkf-button pkf-button--ghost" type="button" onClick={handleReset}>
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
