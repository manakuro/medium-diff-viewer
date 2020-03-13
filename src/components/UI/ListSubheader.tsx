import React from 'react'
import MaterialUIListSubheader, {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import styled from 'styled-components'

type Props = ListSubheaderProps & StyledSystemProps

const Wrapped: React.FC<Props> = ({ backgroundColor, ...props }) => (
  <MaterialUIListSubheader {...(props as any)} />
)

const ListSubheader = styledSystem(styled(Wrapped)``)

export default ListSubheader
