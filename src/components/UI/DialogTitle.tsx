import React from 'react'
import MaterialUIDialogTitle from '@material-ui/core/DialogTitle'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { DialogTitleProps } from '@material-ui/core/DialogTitle/DialogTitle'
import styled from 'styled-components'

type Props = DialogTitleProps & StyledSystemProps

const DialogTitle = styledSystem(styled(props => (
  <MaterialUIDialogTitle {...props} />
))<Props>`
  h2 {
    font-size: inherit;
    color: inherit;
  }
`)

export default DialogTitle
