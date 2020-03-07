import React, { useCallback, useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import getContent from 'src/utils/getContent'

type Props = {}

type State = {
  content: string
}

export type ContainerTypes = {
  setCurrentContent: () => void
}

const Container: React.FC<Props> = () => {
  const [active, setActive] = useState(false)
  const [content, setContent] = useState<State['content']>('')

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      setActive(message.active)
    })
  }, [])

  const setCurrentContent = useCallback(() => {
    setContent(getContent())
  }, [])

  if (!active) return null

  return (
    <ContentComponent
      active={active}
      content={content}
      setCurrentContent={setCurrentContent}
    />
  )
}

export default Container
