import React from 'react'

export const Link = ({
  link,
  children,
}: {
  link: string
  children: React.ReactElement
}) => (
  <div>
    <a href={link}>{children}</a>
  </div>
)

export const useRuntime = jest.fn()
