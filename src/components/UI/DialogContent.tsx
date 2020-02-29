import React from 'react'
import MaterialUIDialogContent from '@material-ui/core/DialogContent'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { DialogContentProps } from '@material-ui/core/DialogContent/DialogContent'

type Props = DialogContentProps & StyledSystemProps

const DialogContent: React.FC<Props> = props => {
  return <StyledDialogContent {...props} />
}

const StyledDialogContent = styledSystem(MaterialUIDialogContent)

export default DialogContent
