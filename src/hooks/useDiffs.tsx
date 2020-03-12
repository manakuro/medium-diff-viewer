import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const { getAllByIndex, add } = useIndexedDB(DB_STORE_NAME)
  const [diffs, setDiffs] = useState<Diff[]>([])

  const hasBeenChangedSinceLastDiff = useCallback(() => {
    const latest = diffs[0]

    return latest.content.body !== getContent().body
  }, [diffs])

  const fetchDiffs = useCallback(() => {
    return (async () => {
      return await getAllByIndex('mediumId', getMediumId())
    })()
  }, [getAllByIndex])

  const addDiff = useCallback(async () => {
    await add({
      mediumId: getMediumId(),
      content: getContent(),
      date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    })

    const storedDiffs = await fetchDiffs()
    setDiffs(storedDiffs)
  }, [add, fetchDiffs])

  const memoizedDiffs = useMemo(() => {
    const currentContent = getContent()
    const filtered = diffs.filter(d => d.content.body !== currentContent.body)

    return filtered.sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [diffs])

  useEffect(() => {
    ;(async () => {
      let storedDiffs = await fetchDiffs()
      if (!storedDiffs.length) {
        await addDiff()
        return
      }

      setDiffs(storedDiffs)
    })()
  }, [addDiff, fetchDiffs])

  return {
    diffs: memoizedDiffs,
    addDiff,
    hasBeenChangedSinceLastDiff,
  }
}
