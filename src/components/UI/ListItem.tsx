import React from 'react'
import MaterialUIListItem, { ListItemProps } from '@material-ui/core/ListItem'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import styled from 'styled-components'
import { hoverColour } from 'src/styles/variables'

type Props = ListItemProps & StyledSystemProps

const Wrapped: React.FC<Props> = props => (
  <MaterialUIListItem {...(props as any)} />
)

const ListItem = styledSystem(styled(Wrapped)`
  background-color: ${props => (props.selected ? hoverColour : '')};

  cursor: pointer;

  &:hover {
    background-color: ${hoverColour};
  }
`)

export default ListItem
