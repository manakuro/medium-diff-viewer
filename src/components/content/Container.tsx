import React, { useCallback, useEffect, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import getContent from 'src/utils/getContent'
import { useLocalStorage, writeStorage } from '@rehooks/local-storage'
import { LOCAL_STORAGE_KEY } from 'src/const'
import format from 'date-fns/format'

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

const Container: React.FC<Props> = props => {
  const [content, setContent] = useState<State['content']>('')
  const [diffs] = useLocalStorage<Diff[]>(LOCAL_STORAGE_KEY)

  const setCurrentContent = useCallback(() => {
    setContent(getContent())
  }, [])

  useEffect(() => {
    if (!diffs) {
      // items.sort((a: Diff, b: Diff) => (a.date < b.date ? 1 : -1))

      writeStorage(LOCAL_STORAGE_KEY, [
        {
          date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          content: getContent(),
        },
      ])
    }
  }, [diffs])

  return (
    <ContentComponent
      active={props.active}
      content={content}
      setCurrentContent={setCurrentContent}
      diffs={diffs || []}
    />
  )
}

export default Container
