import React, { useCallback, useState } from 'react'
import Dialog from 'src/components/UI/Dialog'
import DialogContent from 'src/components/UI/DialogContent'
import DialogActions from 'src/components/UI/DialogActions'
import DialogTitle from 'src/components/UI/DialogTitle'
import Button from 'src/components/UI/Button'
import Grid from 'src/components/UI/Grid'
import TimeLine from 'src/components/UI/Timeline'
import TimeLineItem from 'src/components/UI/TimelineItem'
import TimeLineItemDivider from 'src/components/UI/TimelineItemDivider'
import TimeLineItemDot from 'src/components/UI/TimelineItemDot'
import TimeLineItemBody from 'src/components/UI/TimelineItemBody'
import Link from 'src/components/UI/Link'
import TimeLineItemDate from 'src/components/UI/TimelineItemDate'
import styledSystem from 'src/utils/styledSystem'
import styled from 'styled-components'
import theme from 'src/styles/theme'
import replaceLineBreaksWith from 'src/utils/replaceLineBreaksWith'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import parse from 'html-react-parser'
import { ContainerTypes, Diff } from 'src/components/content/Container'
import { Z_INDEX_CONTENT, Z_INDEX_LINK } from 'src/styles/variables'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import { mediumStyle } from 'src/styles/medium'

type Props = {
  active: boolean
  content: string
  setCurrentContent: ContainerTypes['setCurrentContent']
  diffs: Diff[]
}

const DEFAULT_MAX_WIDTH = 'xl' as const
const DEFAULT_SCROLL = 'paper' as const
const NOW = new Date()

const Component: React.FC<Props> = props => {
  const { setCurrentContent } = props
  const [open, setOpen] = useState(false)
  const [oldDiff, setOldDiff] = useState(props.diffs[0])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleViewDiff = useCallback(() => {
    setCurrentContent()
    setOpen(true)
  }, [setCurrentContent])

  const handleClickViewHistory = useCallback(
    (index: number) => {
      setOldDiff(props.diffs[index])
    },
    [props.diffs],
  )

  return (
    <>
      <Button
        color="primary"
        borderColor="primary"
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
          Creating a UI Component with Atomic Design, React and Styled-Component
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={2}>
              <Sticky>
                <Title>Diff History</Title>
                <DiffHistoryWrapper>
                  <TimeLine>
                    {props.diffs.map((d, index) => {
                      const active = d.date === oldDiff.date

                      return (
                        <TimeLineItem key={index} mb={24}>
                          <TimeLineItemDivider>
                            <TimeLineItemDot
                              width={12}
                              height={12}
                              active={active}
                            />
                          </TimeLineItemDivider>
                          <TimeLineItemBody>
                            <TimeLineItemDate active={active}>
                              <Link
                                noLink
                                onClick={() => handleClickViewHistory(index)}
                              >
                                {formatDistanceStrict(new Date(d.date), NOW, {
                                  addSuffix: true,
                                })}
                              </Link>
                            </TimeLineItemDate>
                          </TimeLineItemBody>
                        </TimeLineItem>
                      )
                    })}
                  </TimeLine>
                </DiffHistoryWrapper>
              </Sticky>
            </Grid>
            <Grid item xs={10}>
              <Title>Diff</Title>
              <DiffContainer className="postArticle-content">
                <ReactDiffViewer
                  oldValue={oldDiff.content}
                  newValue={props.content}
                  splitView
                  showDiffOnly={false}
                  compareMethod={DiffMethod.SENTENCES}
                  leftTitle={oldDiff.date}
                  rightTitle="Current"
                  renderContent={(str): any => {
                    if (!str) {
                      return parse('<pre />')
                    }

                    return parse(replaceLineBreaksWith(str, '<br />'))
                  }}
                />
              </DiffContainer>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            borderColor="primary"
            fontSize="sm"
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const Title = styledSystem(styled.h3`
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

  // diff viewer style
  td {
    min-width: 30px !important;
  }
`)

export default Component
