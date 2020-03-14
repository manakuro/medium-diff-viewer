import isToday from 'date-fns/isToday'
import isYesterday from 'date-fns/isYesterday'
import isThisYear from 'date-fns/isThisYear'
import format from 'date-fns/format'

export const formatGroupedDate = (date: string) => {
  const dateObj = new Date(date)
  if (isToday(dateObj)) return 'Today'
  if (isYesterday(dateObj)) return 'Yesterday'
  if (!isThisYear(dateObj)) return format(dateObj, 'MMMM d, yyyy')

  return format(dateObj, 'MMMM d')
}

export const formatDiffHistoryDate = (date: string) => {
  // const date = formatDistanceStrict(new Date(d.date), now, {
  //   addSuffix: true,
  // })

  return format(new Date(date), 'MMMM d, h:mm aaa')
}
