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
import styled, { css } from 'styled-components'
import theme from 'src/styles/theme'
import replaceLineBreaksWith from 'src/utils/replaceLineBreaksWith'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import parse from 'html-react-parser'
import { ContainerTypes, Diff } from 'src/components/content/Container'
import { Z_INDEX_CONTENT, Z_INDEX_LINK } from 'src/styles/variables'

type Props = {
  active: boolean
  content: string
  setCurrentContent: ContainerTypes['setCurrentContent']
  diffs: Diff[]
}

const DEFAULT_MAX_WIDTH = 'xl' as const
const DEFAULT_SCROLL = 'paper' as const

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
      <Link
        position="fixed"
        top={23}
        right={30}
        textDecoration="underline"
        fontSize="md"
        zIndex={Z_INDEX_LINK}
        onClick={handleViewDiff}
      >
        View diff
      </Link>
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
                                {d.date}
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
                      return parse('<pre></pre>')
                    }

                    return parse(replaceLineBreaksWith(str, '<br />'))
                  }}
                />
              </DiffContainer>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" fontSize="1rem">
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

const resetCss = css`
  blockquote,
  dd,
  dl,
  figure,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  menu,
  ol,
  p,
  pre,
  ul {
    margin: 0;
  }

  menu,
  ol,
  ul {
    padding: 0;
    list-style: none;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }

  canvas {
    display: none;
  }
`

const DiffContainer = styledSystem(styled.div`
  position: relative;
  outline: 0;
  word-break: break-word;
  word-wrap: break-word;

  ${resetCss}

  &:focus {
    outline: 0;
    word-break: break-word;
    word-wrap: break-word;
  }

  font-family: medium-content-sans-serif-font, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  letter-spacing: 0;
  font-weight: 400;
  font-style: normal;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  color: rgba(0, 0, 0, 0.84);
  font-size: 20px;
  line-height: 1.4;

  td {
    img {
      width: 100%;
      margin: 0 !important;
      padding: 0 !important;
    }
  }

  h1,
  h3 {
    margin-top: 56px;
    font-weight: 600;
    --x-height-multiplier: 0.342;
    --baseline-multiplier: 0.22;
    font-family: medium-content-sans-serif-font, 'Lucida Grande',
      'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif;
    font-style: normal;
    font-size: 34px;
    line-height: 1.15;
    letter-spacing: -0.015em;
  }

  h4 {
    margin-top: 30px;
    font-weight: 600;
    --x-height-multiplier: 0.342;
    --baseline-multiplier: 0.22;
    font-family: medium-content-sans-serif-font, 'Lucida Grande',
      'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif;
    font-style: normal;
    font-size: 26px;
    line-height: 1.22;
    letter-spacing: -0.012em;
  }

  p {
    margin-top: 29px;
    margin-bottom: 0;
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman',
      Times, serif;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
  }

  menu,
  ol,
  ul {
    margin-top: 29px;
  }

  li {
    margin-left: 30px;
    margin-bottom: 14px;
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman',
      Times, serif;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
  }

  b,
  strong {
    font-weight: 700;
  }

  blockquote {
    margin-top: 29px;
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman',
      Times, serif;
    font-weight: 400;
    font-style: italic;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
    border-left: 3px solid rgba(0, 0, 0, 0.84);
    padding-left: 20px;
    margin-left: -23px;
    padding-bottom: 2px;
  }

  figure {
    margin-top: 43px;
    position: relative;
    clear: both;
    outline: 0;
    box-sizing: border-box;
    user-select: auto;
    z-index: 100;
  }

  // diff viewer style
  td {
    min-width: 30px !important;
  }
`)

export default Component
