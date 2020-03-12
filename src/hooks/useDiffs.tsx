import { useCallback, useEffect, useState } from 'react'
import getContent, { Content } from 'src/utils/getContent'
import { useIndexedDB } from 'src/hooks/useIndexedDB'
import { DB_STORE_NAME } from 'src/const'
import format from 'date-fns/format'
import getMediumId from 'src/utils/getMediumId'

export type Diff = {
  id: string
  mediumId: string
  date: string
  content: Content
}

export const useDiffs = () => {
  const { getAllByIndex, add, getByID } = useIndexedDB(DB_STORE_NAME)
  const [diffs, setDiffs] = useState<Diff[]>([])

  const addDiff = useCallback(async () => {
    return await add({
      mediumId: getMediumId(),
      content: getContent(),
      date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    })
  }, [add])

  useEffect(() => {
    ;(async () => {
      let storedDiffs = await getAllByIndex('mediumId', getMediumId())
      if (!storedDiffs.length) {
        const addedId = await addDiff()
        const addedDiff = await getByID(addedId)
        if (addedDiff) storedDiffs = [addedDiff]
      }

      setDiffs(storedDiffs)
    })()
  }, [addDiff, getAllByIndex, getByID])

  diffs.sort((a, b) => (a.date < b.date ? 1 : -1))

  return {
    diffs,
    addDiff,
  }
}
