import React from 'react'
import MaterialUIMenu from '@material-ui/core/Menu'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { MenuProps } from '@material-ui/core/Menu'
import styled from 'styled-components'

type Props = MenuProps & StyledSystemProps

const Wrapped: React.FC<Props> = ({ zIndex, ...props }) => (
  <MaterialUIMenu {...props} />
)

const Menu = styledSystem(styled(Wrapped)``)

export default Menu
