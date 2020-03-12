import React, { useCallback, useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import getContent from 'src/utils/getContent'
import throttle from 'lodash/throttle'
import { useDiffs } from 'src/hooks/useDiffs'

type Props = {
  active: boolean
}

type State = {
  content: {
    title: string
    body: string
  }
}

export type ContainerTypes = {
  setCurrentContent: () => void
}

const Container: React.FC<Props> = props => {
  const [content, setContent] = useState<State['content']>({
    title: '',
    body: '',
  })
  const { diffs } = useDiffs()

  const setCurrentContent = useCallback(() => {
    setContent(getContent())
  }, [])

  useEffect(() => {
    const monitored = document.querySelector('h3')
    if (!monitored || !monitored.parentNode) return

    const observer = new MutationObserver(
      throttle(mutations => {
        console.log('Add! ', mutations)
      }, 1000),
    )
    observer.observe(monitored.parentNode, {
      subtree: true,
      attributes: false,
      childList: true,
    })
    return () => observer.disconnect()
  }, [])

  console.log('diffs: ', diffs)
  if (!diffs.length) return null

  return (
    <ContentComponent
      active={props.active}
      content={content}
      setCurrentContent={setCurrentContent}
      diffs={diffs}
    />
  )
}

export default Container
