import React, { useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'

type Props = {}

export type ContainerType = {
  sendBackground: (content: string) => void
}

const Container: React.FC<Props> = () => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      setActive(message.active)
    })
  }, [])

  return <ContentComponent active={active} />
}

export default Container
