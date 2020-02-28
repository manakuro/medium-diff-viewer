import React from 'react'
import ReactDOM from 'react-dom'
import Content from 'src/components/content/Container'
import { ThemeProvider } from 'styled-components'
import theme from 'src/styles/theme'
import GlobalStyle from 'src/styles/global'
import { DOCUMENT_APP_ID } from 'src/const'

type Props = {}

const App: React.FC<Props> = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Content />
      </>
    </ThemeProvider>
  )
}

const app = document.createElement('div')
app.id = DOCUMENT_APP_ID
document.body.appendChild(app)
ReactDOM.render(<App />, app)
