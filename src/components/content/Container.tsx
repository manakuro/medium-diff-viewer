import React, { useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import removeAttrs from 'src/utils/removeAttrs'

type Props = {}

type State = {
  content: string
}

const getContent = () => {
  const title = document.querySelector('h3')
  if (!title || !title.parentNode) {
    return ''
  }

  const nodes = title.parentNode.cloneNode(true).childNodes as NodeListOf<
    HTMLElementTagNameMap['div']
  >

  nodes.forEach(node => {
    removeAttrs(node)
  })

  return Array.from(nodes).reduce((acc, node) => {
    return `${acc}\n${node.outerHTML}`
  }, '')
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
