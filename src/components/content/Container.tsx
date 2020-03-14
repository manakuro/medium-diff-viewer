import React, { useCallback, useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import getContent from 'src/utils/getContent'
import debounce from 'lodash/debounce'
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

let observer: MutationObserver
const Container: React.FC<Props> = props => {
  const [content, setContent] = useState<State['content']>({
    title: '',
    body: '',
  })
  const {
    diffs,
    hasBeenChangedSinceLastDiff,
    addDiff,
    groupDiffByDate,
  } = useDiffs()

  const setCurrentContent = useCallback(() => {
    setContent(getContent())
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const monitored = document.querySelector('[contenteditable="true"]')
      if (!monitored) return

      observer = new MutationObserver(
        debounce(async mutations => {
          if (hasBeenChangedSinceLastDiff()) {
            console.log('Add! ', mutations)
            await addDiff()
          }
        }, 2000),
      )
      observer.observe(monitored, {
        subtree: true,
        attributes: false,
        childList: true,
      })
    }, 5000)
    return () => {
      if (observer) observer.disconnect()
      clearTimeout(timer)
    }
  }, [addDiff, hasBeenChangedSinceLastDiff])

  console.log('diffs: ', diffs)
  if (!diffs.length) return null

  const groupedDiffsByDate = groupDiffByDate(diffs)

  return (
    <ContentComponent
      active={props.active}
      content={content}
      setCurrentContent={setCurrentContent}
      diffs={diffs}
      groupedDiffsByDate={groupedDiffsByDate}
    />
  )
}

export default Container
