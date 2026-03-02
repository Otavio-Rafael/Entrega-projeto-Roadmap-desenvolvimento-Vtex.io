import type { FunctionComponent } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericObject = Record<string, any>

declare global {
  interface StoreFrontFC<P = GenericObject> extends FunctionComponent<P> {
    getSchema?(props: P): GenericObject
    schema?: GenericObject
  }
}
