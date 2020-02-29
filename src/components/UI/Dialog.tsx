import React from 'react'
import MaterialUIDialog from '@material-ui/core/Dialog'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { DialogProps } from '@material-ui/core/Dialog/Dialog'
import styled from 'styled-components'

type Props = DialogProps &
  StyledSystemProps & {
    fullHeight?: boolean
  }

const Dialog: React.FC<Props> = props => {
  return <StyledDialog {...props} />
}

const StyledDialog = styledSystem(styled<any>(MaterialUIDialog)`
  .MuiPaper-root {
    min-height: ${props => (props.fullHeight ? 'calc(100vh - 64px)' : '100%')};
  }
`)

export default Dialog
