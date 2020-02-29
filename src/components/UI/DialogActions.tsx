import React from 'react'
import MaterialUIDialogActions from '@material-ui/core/DialogActions'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { DialogActionsProps } from '@material-ui/core/DialogActions/DialogActions'

type Props = DialogActionsProps & StyledSystemProps

const DialogActions: React.FC<Props> = props => {
  return <StyledDialogActions {...props} />
}

const StyledDialogActions = styledSystem(MaterialUIDialogActions)

export default DialogActions
