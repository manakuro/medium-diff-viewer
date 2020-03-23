import React, { useCallback, useState, memo, useEffect } from 'react'
import Dialog from 'src/components/UI/Dialog'
import DialogContent from 'src/components/UI/DialogContent'
import DialogActions from 'src/components/UI/DialogActions'
import DialogTitle from 'src/components/UI/DialogTitle'
import Button from 'src/components/UI/Button'
import styledSystem from 'src/utils/styledSystem'
import styled from 'styled-components'
import { ContainerTypes } from 'src/components/content/Container'
import { Z_INDEX_CONTENT, Z_INDEX_LINK } from 'src/styles/variables'
import { Content } from 'src/utils/getContent'
import { Diff, GroupedDiffsByDate } from 'src/hooks/useDiffs'
import Icon from 'src/components/UI/Icon'
import IconButton from 'src/components/UI/IconButton'
import DiffHistory from 'src/components/content/DiffHistory'
import DiffContent from 'src/components/content/DiffContent'

type Props = {
  content: Content
  setCurrentContent: ContainerTypes['setCurrentContent']
  onUpdateDiffName: ContainerTypes['handleUpdateDiffName']
  diffs: Diff[]
  groupedDiffsByDate: GroupedDiffsByDate
  loading: boolean
}

const DEFAULT_MAX_WIDTH = 'xl' as const
const DEFAULT_SCROLL = 'paper' as const
const initialDiff: Diff = {
  id: 0,
  mediumId: '',
  name: '',
  date: '',
  content: {
    title: '',
    body: '',
  },
}

const Component: React.FC<Props> = props => {
  const { setCurrentContent, loading } = props
  const [open, setOpen] = useState(false)
  const hasDiff = props.diffs.length
  const disabledViewDiffButton = !hasDiff
  const latestDiff = hasDiff ? props.diffs[0] : initialDiff
  const [oldDiff, setOldDiff] = useState<Diff>(latestDiff)

  useEffect(() => {
    if (latestDiff.id !== initialDiff.id) setOldDiff(latestDiff)
  }, [latestDiff])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleViewDiff = useCallback(() => {
    setCurrentContent()
    setOpen(true)
  }, [setCurrentContent])

  const handleClickViewHistory = useCallback(
    (id: number) => {
      if (oldDiff.id === id) return

      setOldDiff(props.diffs.find(d => d.id === id) as Diff)
    },
    [oldDiff.id, props.diffs, setOldDiff],
  )

  return (
    <>
      <Button
        fontSize="xs"
        position={'fixed !important' as any}
        top={20}
        right={30}
        zIndex={Z_INDEX_LINK}
        variant="outlined"
        size="small"
        disabled={disabledViewDiffButton}
        onClick={handleViewDiff}
      >
        {loading ? 'Saving...' : 'View diff'}
      </Button>
      {hasDiff && (
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          fullHeight
          maxWidth={DEFAULT_MAX_WIDTH}
          scroll={DEFAULT_SCROLL}
          fullScreen
          aria-labelledby="dialog-title"
          zIndex={Z_INDEX_CONTENT}
        >
          <DialogTitle id="dialog-title" fontSize="1rem">
            <TitleInner>
              <IconButton
                color="inherit"
                aria-label="back"
                onClick={handleClose}
                mr={'10px !important' as any}
              >
                <Icon name="faChevronLeft" />
              </IconButton>
              <Title>{props.content.title}</Title>
            </TitleInner>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentInner>
              <DiffHistory
                onUpdateDiffName={props.onUpdateDiffName}
                groupedDiffsByDate={props.groupedDiffsByDate}
                oldDiff={oldDiff}
                onClickViewHistory={handleClickViewHistory}
              />
              <DiffContent currentContent={props.content} oldDiff={oldDiff} />
            </DialogContentInner>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              color="white"
              borderColor="primary"
              backgroundColor="primary"
              fontSize="sm"
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

const Title = styledSystem(styled.div`
  line-height: 1;
  margin-bottom: 2px;
`)

const TitleInner = styledSystem(styled.div`
  display: flex;
  align-items: center;
`)

const DialogContentInner = styledSystem(styled.div`
  display: flex;
`)

export default memo<Props>(Component)
