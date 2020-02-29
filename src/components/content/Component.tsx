import React, { useCallback, useState } from 'react'
import Dialog from 'src/components/UI/Dialog'
import DialogContent from 'src/components/UI/DialogContent'
import DialogActions from 'src/components/UI/DialogActions'
import Button from 'src/components/UI/Button'

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
    >
      <DialogContent>hi</DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Component
