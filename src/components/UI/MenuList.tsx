import React, { forwardRef } from 'react'
import MaterialUIMenuList from '@material-ui/core/MenuList'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { MenuListProps } from '@material-ui/core/MenuList'
import styled from 'styled-components'

type Props = MenuListProps & StyledSystemProps

const Wrapped: React.FC<Props> = forwardRef((props, ref) => (
  <MaterialUIMenuList {...(props as any)} ref={ref} />
))

const MenuList = styledSystem(styled<any>(Wrapped)``)

export default MenuList
