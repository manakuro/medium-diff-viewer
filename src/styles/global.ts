import { css, createGlobalStyle } from 'styled-components'
// import ress from 'src/styles/ress'
import { Theme } from 'src/styles/theme'
import vendor from 'src/styles/vendor'

const global = css<Theme>`
  // html {
  //   scroll-behavior: smooth;
  // }
  //
  // body {
  //   font-family: ${props => props.theme.main.font};
  //   background: ${props => props.theme.main.background};
  // }
  //
  // table {
  //   border-collapse: collapse;
  //   border-spacing: 0;
  // }
  //
  // ul {
  //   list-style-type: none;
  // }
`

const GlobalStyle = createGlobalStyle<Theme>`
    ${global}
    ${vendor}
`

export default GlobalStyle
