import { useCallback, useEffect, useMemo, useState } from 'react'
import getContent, { Content } from 'src/utils/getContent'
import { useIndexedDB } from 'src/hooks/useIndexedDB'
import { DB_STORE_NAME } from 'src/const'
import format from 'date-fns/format'
import getMediumId from 'src/utils/getMediumId'
import groupBy from 'lodash/groupBy'

export type Diff = {
  id: number
  mediumId: string
  date: string
  content: Content
}

export type Diffs = Diff[]
export type GroupedDiffsByDate = {
  [date: string]: Diffs
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

  const memoizedDiffs: Diffs = useMemo(() => {
    const currentContent = getContent()
    let filtered = diffs.filter(d => d.content.body !== currentContent.body)

    filtered.sort((a, b) => (a.date < b.date ? 1 : -1))

    return filtered
  }, [diffs])

  const groupDiffByDate = useCallback((val: Diffs): GroupedDiffsByDate => {
    return groupBy(val, diff => {
      return format(new Date(diff.date), 'yyyy-MM-dd')
    })
  }, [])

  useEffect(() => {
    ;(async () => {
      const storedDiffs = await fetchDiffs()
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
    groupDiffByDate,
  }
}
