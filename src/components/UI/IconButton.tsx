import React from 'react'
import MaterialUIIconButton from '@material-ui/core/IconButton'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { IconButtonProps } from '@material-ui/core/IconButton'
import styled from 'styled-components'

type Props = IconButtonProps & StyledSystemProps

const Wrapped: React.FC<Props> = ({
  zIndex,
  borderColor,
  backgroundColor,
  color,
  ...props
}) => <MaterialUIIconButton {...props} />

const IconButton = styledSystem(styled(Wrapped)`
  text-transform: none !important;
`)

export default IconButton
