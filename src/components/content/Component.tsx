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

type Props = {
  active: boolean
}

const DEFAULT_MAX_WIDTH = 'xl' as const
const DEFAULT_SCROLL = 'paper' as const

const Component: React.FC<Props> = props => {
  const [open, setOpen] = useState(true)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  if (!props.active) return null

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      fullHeight
      maxWidth={DEFAULT_MAX_WIDTH}
      scroll={DEFAULT_SCROLL}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title" fontSize="1rem">
        Creating a UI Component with Atomic Design, React and Styled-Component
      </DialogTitle>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={2}>
            <Title>Diff History</Title>
            <TimeLine>
              {[...new Array(5)].map((i, index) => {
                const active = index === 0

                return (
                  <TimeLineItem key={index} mb={24}>
                    <TimeLineItemDivider>
                      <TimeLineItemDot width={12} height={12} active={active} />
                    </TimeLineItemDivider>
                    <TimeLineItemBody>
                      <TimeLineItemDate active={active}>
                        <Link noLink>2020/02/01 20:00:20</Link>
                      </TimeLineItemDate>
                    </TimeLineItemBody>
                  </TimeLineItem>
                )
              })}
            </TimeLine>
          </Grid>
          <Grid item xs={5}>
            <Title>2020/02/01 20:00:20</Title>
          </Grid>
          <Grid item xs={5}>
            <Title>Current</Title>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary" fontSize="1rem">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Title = styledSystem(styled.h3`
  font-size: 1rem;
  font-weight: ${theme.fontWeights.heading};
  margin-bottom: 24px;
`)

export default Component
