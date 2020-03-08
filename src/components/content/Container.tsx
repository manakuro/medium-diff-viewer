import React, { useCallback, useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import getContent from 'src/utils/getContent'
import format from 'date-fns/format'
import { useIndexedDB } from 'src/hooks/useIndexedDB'
import getMediumId from 'src/utils/getMediumId'
import { DB_STORE_NAME } from 'src/const'

type Props = {
  active: boolean
}

type State = {
  content: string
  diffs: Diff[]
}

export type ContainerTypes = {
  setCurrentContent: () => void
}

export type Diff = {
  id: string
  mediumId: string
  date: string
  content: string
}

const mediumId = getMediumId()

const Container: React.FC<Props> = props => {
  const [content, setContent] = useState<State['content']>('')
  const [diffs, setDiffs] = useState<State['diffs']>([])
  const { getAllByIndex, add } = useIndexedDB(DB_STORE_NAME)

  const setCurrentContent = useCallback(() => {
    setContent(getContent())
  }, [])

  useEffect(() => {
    ;(async () => {
      const storedDiffs = await getAllByIndex('mediumId', mediumId)
      if (storedDiffs.length) {
        setDiffs(storedDiffs)
      }
      console.log('storedDiffs: ', storedDiffs)

      if (!storedDiffs.length) {
        add({
          mediumId,
          content: getContent(),
          date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        })
      }
    })()
  }, [add, getAllByIndex])

  diffs.sort((a, b) => (a.date < b.date ? 1 : -1))

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
