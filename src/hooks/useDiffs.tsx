import { useCallback, useEffect, useState } from 'react'
import getContent, { Content } from 'src/utils/getContent'
import { useIndexedDB } from 'src/hooks/useIndexedDB'
import { DB_STORE_NAME } from 'src/const'
import format from 'date-fns/format'
import getMediumId from 'src/utils/getMediumId'

const mediumId = getMediumId()

export type Diff = {
  id: string
  mediumId: string
  date: string
  content: Content
}

export const useDiffs = () => {
  const { getAllByIndex, add } = useIndexedDB(DB_STORE_NAME)
  const [diffs, setDiffs] = useState<Diff[]>([])

  const addDiff = useCallback(() => {
    add({
      mediumId,
      content: getContent(),
      date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    })
  }, [add])

  useEffect(() => {
    ;(async () => {
      const storedDiffs = await getAllByIndex('mediumId', mediumId)
      if (storedDiffs.length) setDiffs(storedDiffs)
    })()
  }, [add, getAllByIndex])

  diffs.sort((a, b) => (a.date < b.date ? 1 : -1))

  return {
    diffs,
    addDiff,
  }
}
