import React, { useCallback, useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import getContent from 'src/utils/getContent'
import format from 'date-fns/format'
import { useIndexedDB } from 'react-indexed-db'
import getMediumId from 'src/utils/getMediumId'
import { DB_STORE_NAME } from 'src/const'

type Props = {
  active: boolean
}

type State = {
  content: string
}

export type ContainerTypes = {
  setCurrentContent: () => void
}

export type Diff = {
  date: string
  content: string
}

const mediumId = getMediumId()

const Container: React.FC<Props> = props => {
  const [content, setContent] = useState<State['content']>('')
  const { getByIndex, openCursor, add } = useIndexedDB(DB_STORE_NAME)

  const setCurrentContent = useCallback(() => {
    setContent(getContent())
  }, [])

  useEffect(() => {
    ;(async () => {
      // const diffs = await getByIndex('mediumId', mediumId)
      // console.log('diffs: ', diffs)
      const diffs: any = []

      await openCursor((event: any) => {
        const cursor = event.target.result
        if (cursor && cursor.value.mediumId === mediumId) {
          diffs.push(cursor.value)
          cursor.continue()
        }
      })
      console.log('diffs: ', diffs)

      if (!diffs) {
        add({
          mediumId,
          content: getContent(),
          date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        })
      }
    })()
  }, [add, getByIndex, openCursor])

  return (
    <ContentComponent
      active={props.active}
      content={content}
      setCurrentContent={setCurrentContent}
      diffs={[{ content: '', date: '2020/02/02 00:00:00' }]}
    />
  )
}

export default Container
