import React from 'react'
import { render } from '@vtex/test-tools/react'

import Example from '../../Example'

test('Example', () => {
  const { container } = render(<Example />)

  expect(container).toBeInTheDocument()
  expect(container.firstChild).toHaveClass('example')
})
