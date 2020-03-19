import { useCallback, useEffect, useMemo, useState } from 'react'
import getContent, { Content } from 'src/utils/getContent'
import { useIndexedDB } from 'src/hooks/useIndexedDB'
import { DB_STORE_NAME } from 'src/const'
import format from 'date-fns/format'
import getMediumId from 'src/utils/getMediumId'
import groupBy from 'lodash/groupBy'
import { formatDiffHistoryDate } from 'src/utils/formatDate'

export type Diff = {
  id: number
  mediumId: string
  date: string
  name: string
  content: Content
}

export type Diffs = Diff[]
export type GroupedDiffsByDate = {
  [date: string]: Diffs
}

export const useDiffs = () => {
  const { getAllByIndex, add, update } = useIndexedDB(DB_STORE_NAME)
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
    const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    await add({
      mediumId: getMediumId(),
      content: getContent(),
      name: formatDiffHistoryDate(now),
      date: now,
    })

    const storedDiffs = await fetchDiffs()
    setDiffs(storedDiffs)
  }, [add, fetchDiffs])

  const updateDiff = useCallback(
    async (diff: Diff) => {
      try {
        await update(diff)
      } catch (e) {
        // error handling
        console.log(e)
      }

      const storedDiffs = await fetchDiffs()
      setDiffs(storedDiffs)
    },
    [fetchDiffs, update],
  )

  const findDiff = useCallback((id: number) => diffs.find(d => d.id === id), [
    diffs,
  ])

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
    updateDiff,
    findDiff,
  }
}
