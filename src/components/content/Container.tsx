import React, { useCallback, useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import debounce from 'lodash/debounce'

type Props = {}

export type ContainerType = {
  sendBackground: (content: string) => void
}

const Container: React.FC<Props> = () => {
  const [active, setActive] = useState(false)

  const sendBackground = useCallback(
    debounce((content: string) => {
      chrome.runtime.sendMessage({ content })
    }, 500),
    [],
  )

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      setActive(message.active)
    })
  }, [])

  return <ContentComponent active={active} sendBackground={sendBackground} />
}

export default Container
