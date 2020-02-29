import React, { useCallback, useState } from 'react'
import Dialog from 'src/components/UI/Dialog'
import DialogContent from 'src/components/UI/DialogContent'
import DialogActions from 'src/components/UI/DialogActions'
import DialogTitle from 'src/components/UI/DialogTitle'
import Button from 'src/components/UI/Button'
import Grid from 'src/components/UI/Grid'

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
            hi
          </Grid>
          <Grid item xs={5}>
            prev diff
          </Grid>
          <Grid item xs={5}>
            current diff
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

export default Component
