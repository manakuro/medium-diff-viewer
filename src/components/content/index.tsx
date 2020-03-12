import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Content from 'src/components/content/Container'
import { ThemeProvider } from 'styled-components'
import theme from 'src/styles/theme'
import GlobalStyle from 'src/styles/global'
import { DOCUMENT_APP_ID } from 'src/const'
import { initDB } from 'src/utils/indexedDB'
import dbConfig from 'src/db/config'
import { isMediumEditURL } from 'src/utils/isMediumURL'

initDB(dbConfig)

type Props = {}

const App: React.FC<Props> = () => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log('message: ', message)
      setActive(message.active)
    })
  }, [])

  // The application should not use window.onpopstate
  // because it can violate the original behaviour in Medium.
  // Instead, chrome.tabs.onUpdated detects the url changes.
  // @see src/eventPage.ts
  useEffect(() => {
    if (isMediumEditURL(window.location.href)) setActive(true)
  }, [])

  console.log('active: ', active)
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
