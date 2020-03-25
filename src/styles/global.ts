import { css, createGlobalStyle } from 'styled-components'
import { Theme } from 'src/styles/theme'

const global = css<Theme>``

const GlobalStyle = createGlobalStyle<Theme>`
    ${global}
`

export default GlobalStyle
