// Colour
import { css } from 'styled-components'

export const lightGrey = '#F2F2F2' as const
export const grey = 'rgba(224, 224, 224, 1)' as const
export const white = '#fff' as const
export const black = '#2f2f2f' as const
export const lightBlue = '#f5f8ff' as const

export const primaryColour = '#06dca3' as const
export const backgroundColour = '#FCFCFC' as const
export const textColour = black
export const textSubColour = 'rgba(47, 47, 47, 0.54)'
export const tableCellBorderColour = grey
export const tableRowHoverColour = lightBlue

// Transition
export const transitionDuration = '0.25s' as const

// Z-index
export const Z_INDEX_CONTENT = 9999999999999

// effect
export const hover = css`
  transition: opacity ${transitionDuration};

  &:hover {
    opacity: 0.7;
  }
`
