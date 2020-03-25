import React from 'react'
import MaterialUIMenuItem from '@material-ui/core/MenuItem'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { MenuItemProps } from '@material-ui/core/MenuItem'
import styled from 'styled-components'

type Props = MenuItemProps & StyledSystemProps

const Wrapped: React.FC<Props> = props => (
  <MaterialUIMenuItem {...(props as any)} />
)

const MenuItem = styledSystem(styled<any>(Wrapped)``)

export default MenuItem
