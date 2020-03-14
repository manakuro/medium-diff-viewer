import React, { useCallback, useState, memo, useEffect } from 'react'
import Dialog from 'src/components/UI/Dialog'
import DialogContent from 'src/components/UI/DialogContent'
import DialogActions from 'src/components/UI/DialogActions'
import DialogTitle from 'src/components/UI/DialogTitle'
import Button from 'src/components/UI/Button'
import styledSystem from 'src/utils/styledSystem'
import styled from 'styled-components'
import theme from 'src/styles/theme'
import replaceLineBreaksWith from 'src/utils/replaceLineBreaksWith'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import parse from 'html-react-parser'
import { ContainerTypes } from 'src/components/content/Container'
import {
  tableHeaderColour,
  Z_INDEX_CONTENT,
  Z_INDEX_LINK,
} from 'src/styles/variables'
import { mediumStyle } from 'src/styles/medium'
import { Content } from 'src/utils/getContent'
import { Diff, GroupedDiffsByDate } from 'src/hooks/useDiffs'
import Icon from 'src/components/UI/Icon'
import IconButton from 'src/components/UI/IconButton'
import ListItemText from 'src/components/UI/ListItemText'
import ListItem from 'src/components/UI/ListItem'
import List from 'src/components/UI/List'
import ListSubheader from 'src/components/UI/ListSubheader'
import { formatDiffHistoryDate, formatGroupedDate } from 'src/utils/formatDate'

type Props = {
  active: boolean
  content: Content
  setCurrentContent: ContainerTypes['setCurrentContent']
  diffs: Diff[]
  groupedDiffsByDate: GroupedDiffsByDate
}

const DEFAULT_MAX_WIDTH = 'xl' as const
const DEFAULT_SCROLL = 'paper' as const
const DIFF_CONTAINER_STYLE = {
  contentText: { fontSize: 16 },
}

const Component: React.FC<Props> = props => {
  const { setCurrentContent } = props
  const [open, setOpen] = useState(false)
  const [oldDiff, setOldDiff] = useState<Diff>(props.diffs[0])

  useEffect(() => {
    if (props.diffs && props.diffs[0]) setOldDiff(props.diffs[0])
  }, [props.diffs])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleViewDiff = useCallback(() => {
    setCurrentContent()
    setOpen(true)
  }, [setCurrentContent])

  const handleClickViewHistory = useCallback(
    (id: number) => {
      setOldDiff(props.diffs.find(d => d.id === id) as Diff)
    },
    [props.diffs],
  )

  const renderContent = useCallback((str): any => {
    if (!str) return ''

    return parse(replaceLineBreaksWith(str, '<br />'))
  }, [])

  return (
    <>
      <Button
        color="white"
        borderColor="primary"
        backgroundColor="primary"
        fontSize="xs"
        position={'fixed !important' as any}
        top={20}
        right={30}
        zIndex={Z_INDEX_LINK}
        variant="outlined"
        size="small"
        onClick={handleViewDiff}
      >
        View diff
      </Button>
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
            <DiffHistory>
              <Sticky>
                <SectionTitle>Diff History</SectionTitle>
                <DiffHistoryWrapper>
                  {Object.keys(props.groupedDiffsByDate).map(k => {
                    const diffs = props.groupedDiffsByDate[k]
                    const groupedDate = formatGroupedDate(k)

                    return (
                      <List
                        p={'0 !important'}
                        subheader={
                          <ListSubheader
                            backgroundColor={tableHeaderColour}
                            fontSize="xs"
                            lineHeight={'30px !important' as any}
                            divider
                          >
                            {groupedDate}
                          </ListSubheader>
                        }
                        key={k}
                      >
                        {diffs.map((d, i) => {
                          const selected = d.id === oldDiff.id
                          const diffHistoryDate = formatDiffHistoryDate(d.date)

                          return (
                            <ListItem
                              button
                              divider
                              alignItems="flex-start"
                              selected={selected}
                              onClick={() => handleClickViewHistory(d.id)}
                              key={d.id}
                              pt={'12px !important' as any}
                              pb={'12px !important' as any}
                              pl={'32px !important' as any}
                            >
                              <ListItemText
                                primary={diffHistoryDate}
                                fontSize="xs"
                                color="text.primary"
                              />
                            </ListItem>
                          )
                        })}
                      </List>
                    )
                  })}
                </DiffHistoryWrapper>
              </Sticky>
            </DiffHistory>
            <DiffContent>
              <SectionTitle>Diff Contents</SectionTitle>
              <DiffContainer>
                <ReactDiffViewer
                  oldValue={oldDiff.content.body}
                  newValue={props.content.body}
                  splitView
                  showDiffOnly={false}
                  compareMethod={DiffMethod.SENTENCES}
                  leftTitle={formatDiffHistoryDate(oldDiff.date)}
                  rightTitle="Current version"
                  renderContent={renderContent}
                  styles={DIFF_CONTAINER_STYLE}
                />
              </DiffContainer>
            </DiffContent>
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
const DiffHistory = styledSystem(styled.div<{ open: boolean }>`
  width: 15%;
  padding: 12px;
`)
const DiffContent = styledSystem(styled.div`
  flex: 1;
  padding: 12px;
`)

const SectionTitle = styledSystem(styled.h3<{ show: boolean }>`
  font-size: 1rem;
  font-weight: ${theme.fontWeights.heading};
  margin-bottom: 24px;
`)

const Sticky = styled.div`
  position: sticky;
  top: 0;
`

const DiffHistoryWrapper = styled.div`
  width: 100%;
  height: 600px;
  overflow-y: scroll;
`

const DiffContainer = styledSystem(styled.div`
  ${mediumStyle}

  tr {
    td:nth-of-type(2),
    td:nth-of-type(5) {
      min-width: 13px;
    }

    td:nth-of-type(3) {
      padding-right: 20px;
    }
  }
`)

export default memo<Props>(Component)
