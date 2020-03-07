import React, { useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import getContent from 'src/utils/getContent'

type Props = {}

type State = {
  content: string
}

const Container: React.FC<Props> = () => {
  const [active, setActive] = useState(false)
  const [content, setContent] = useState<State['content']>('')

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      setActive(message.active)
    })
  }, [])

  useEffect(() => {
    setContent(getContent())
  }, [])

  if (!active) return null

  return <ContentComponent active={active} content={content} />
}

export default Container
