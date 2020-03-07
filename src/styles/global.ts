import { css, createGlobalStyle } from 'styled-components'
import { Theme } from 'src/styles/theme'
import vendor from 'src/styles/vendor'

const global = css<Theme>``

const GlobalStyle = createGlobalStyle<Theme>`
    ${global}
    ${vendor}
`

export default GlobalStyle
