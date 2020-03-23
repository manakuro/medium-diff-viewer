import React, { useCallback, useState } from 'react'
import ContentComponent from 'src/components/content/Component'
import getContent, { Content } from 'src/utils/getContent'
import { useDiffs } from 'src/hooks/useDiffs'
import useContentObserver from 'src/hooks/useContentObserver'

type Props = {
  active: boolean
}

export type ContainerTypes = {
  setCurrentContent: () => void
  handleUpdateDiffName: (value: string, id: number) => void
}

const Container: React.FC<Props> = props => {
  const [content, setContent] = useState<Content>({
    title: '',
    body: '',
  })
  const {
    diffs,
    shouldUpdateDiff,
    addDiff,
    groupDiffByDate,
    findDiff,
    updateDiff,
    loadingDiff,
  } = useDiffs()

  const setCurrentContent = useCallback(() => {
    setContent(getContent())
  }, [])

  const handleUpdateDiffName = useCallback(
    (value: string, id: number) => {
      const diff = findDiff(id)
      if (!diff) return
      if (diff.name === value) return

      diff.name = value

      updateDiff(diff)
    },
    [findDiff, updateDiff],
  )

  useContentObserver({ addDiff, shouldUpdateDiff })

  return (
    <ContentComponent
      content={content}
      setCurrentContent={setCurrentContent}
      diffs={diffs}
      groupedDiffsByDate={groupDiffByDate(diffs)}
      onUpdateDiffName={handleUpdateDiffName}
      loading={loadingDiff}
    />
  )
}

export default Container
