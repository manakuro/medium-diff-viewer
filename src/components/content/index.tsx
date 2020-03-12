import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Content from 'src/components/content/Container'
import { ThemeProvider } from 'styled-components'
import theme from 'src/styles/theme'
import GlobalStyle from 'src/styles/global'
import { DOCUMENT_APP_ID } from 'src/const'
import { initDB } from 'src/utils/indexedDB'
import dbConfig from 'src/db/config'

initDB(dbConfig)

type Props = {}

const App: React.FC<Props> = () => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      setActive(message.active)
    })
  }, [])

  if (!active) return null

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Content active={active} />
      </>
    </ThemeProvider>
  )
}

const app = document.createElement('div')
app.id = DOCUMENT_APP_ID
document.body.appendChild(app)
ReactDOM.render(<App />, app)
