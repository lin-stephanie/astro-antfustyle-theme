// https://unocss.dev/presets/attributify#typescript-support-jsx-tsx
import type {
  AttributifyAttributes,
  AttributifyNames,
} from 'unocss/preset-attributify'

type Prefix = 'u-' // change it to your prefix

declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes
      extends AttributifyAttributes,
        Partial<Record<AttributifyNames<Prefix>, string>> {}
  }
}
