import React from 'react'
import { render } from '@vtex/test-tools/react'

import PokemonForm from '../../PokemonForm'

test('PokemonForm', () => {
  const { container } = render(<PokemonForm />)

  expect(container).toBeInTheDocument()
  expect(container.firstChild).toHaveClass('pokemon-form')
})
