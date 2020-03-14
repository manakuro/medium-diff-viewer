import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

export const formatGroupedDate = (date: string) => {
  const dateObj = new Date(date)
  if (isToday(dateObj)) return 'Today'

  return format(dateObj, 'MMM d')
}

export const formatDiffHistoryDate = (date: string) => {
  // const date = formatDistanceStrict(new Date(d.date), now, {
  //   addSuffix: true,
  // })

  return format(new Date(date), 'MMM d, K:m aaa')
}
