export const useCssHandles = (cssHandles: string[]) => {
  const handles: Record<string, string> = {}

  cssHandles.forEach((handle) => {
    handles[handle] = handle
  })
  const withModifiers = (className: string, modifiers: string) => {
    return `${className} ${className}--${modifiers}`
  }

  return { handles, withModifiers }
}

export const applyModifiers = (className: string, modifiers: string) => {
  return `${className} ${className}--${modifiers}`
}
