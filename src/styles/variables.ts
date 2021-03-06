// Colour
import { css } from 'styled-components'

export const grey = 'rgba(224, 224, 224, 1)' as const
export const white = '#fff' as const
export const black = '#2f2f2f' as const
export const lightBlue = '#f5f8ff' as const
export const lightGrey = '#fafbfc' as const

export const primaryColour = '#03a87c' as const
export const backgroundColour = '#FCFCFC' as const
export const textColour = black
export const textSubColour = 'rgba(47, 47, 47, 0.78)'
export const tableCellBorderColour = grey
export const tableRowHoverColour = lightBlue
export const hoverColour = 'rgba(3, 168, 124, 0.16) !important' as const
export const tableHeaderColour = `${lightGrey} !important`

// Transition
export const transitionDuration = '0.25s' as const

// Z-index
export const Z_INDEX_LINK = 100000000
export const Z_INDEX_CONTENT = `${Z_INDEX_LINK + 1} !important`
export const Z_INDEX_CONTENT_MENU = `${Z_INDEX_LINK + 2} !important`

// effect
export const hover = css`
  transition: opacity ${transitionDuration};

  &:hover {
    opacity: 0.7;
  }
`
