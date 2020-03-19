import React from 'react'
import MaterialUIListItemText from '@material-ui/core/ListItemText'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { ListItemTextProps } from '@material-ui/core/ListItemText'
import styled from 'styled-components'

type Props = ListItemTextProps & StyledSystemProps

const Wrapped: React.FC<Props> = ({
  zIndex,
  borderColor,
  backgroundColor,
  color,
  ...props
}) => <MaterialUIListItemText {...props} />

const ListItemText = styledSystem(styled(Wrapped)`
  > span,
  > p {
    font-size: inherit !important;
    color: inherit !important;
  }
`)

export default ListItemText
