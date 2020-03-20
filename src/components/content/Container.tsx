import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import getContent, { Content } from 'src/utils/getContent'
import debounce from 'lodash/debounce'
import { useDiffs } from 'src/hooks/useDiffs'

type Props = {
  active: boolean
}

export type ContainerTypes = {
  setCurrentContent: () => void
  handleInputDiff: (e: ChangeEvent<HTMLInputElement>, id: number) => void
}

let observer: MutationObserver
const Container: React.FC<Props> = props => {
  const [content, setContent] = useState<Content>({
    title: '',
    body: '',
  })
  const {
    diffs,
    shouldUpdateDiff,
    addDiff,
    groupDiffByDate,
    findDiff,
    updateDiff,
  } = useDiffs()

  const setCurrentContent = useCallback(() => {
    setContent(getContent())
  }, [])

  const handleInputDiff = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: number) => {
      const value = e.target.value
      const diff = findDiff(id)
      if (!diff) return
      if (diff.name === value) return

      diff.name = value

      updateDiff(diff)
    },
    [findDiff, updateDiff],
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      const monitored = document.querySelector('[contenteditable="true"]')
      if (!monitored) return

      observer = new MutationObserver(
        debounce(async mutations => {
          if (shouldUpdateDiff()) {
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
    }, 3000)
    return () => {
      if (observer) observer.disconnect()
      clearTimeout(timer)
    }
  }, [addDiff, shouldUpdateDiff])

  console.log('diffs: ', diffs)

  return (
    <ContentComponent
      content={content}
      setCurrentContent={setCurrentContent}
      diffs={diffs}
      groupedDiffsByDate={groupDiffByDate(diffs)}
      onInputDiff={handleInputDiff}
    />
  )
}

export default Container
