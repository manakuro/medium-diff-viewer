import React from 'react'
import MaterialUIDialog from '@material-ui/core/Dialog'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { DialogProps } from '@material-ui/core/Dialog/Dialog'
import styled from 'styled-components'

type Props = DialogProps & StyledSystemProps & StyledProps

type StyledProps = {
  fullHeight?: boolean
}

const WrappedDialog: React.FC<Props> = ({ fullHeight, zIndex, ...props }) => (
  <MaterialUIDialog {...props} />
)

const Dialog = styledSystem(styled<any>(WrappedDialog)`
  .MuiPaper-root {
    min-height: ${props => (props.fullHeight ? 'calc(100vh - 64px)' : '100%')};
  }
`)

export default Dialog
