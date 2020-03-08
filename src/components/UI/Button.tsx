import React from 'react'
import MaterialUIButton from '@material-ui/core/Button'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { ButtonProps } from '@material-ui/core/Button/Button'
import styled from 'styled-components'

type Props = ButtonProps & StyledSystemProps

const Wrapped: React.FC<Props> = ({ zIndex, borderColor, ...props }) => (
  <MaterialUIButton {...props} />
)

const Button = styledSystem(styled(Wrapped)`
  text-transform: none !important;
`)

export default Button
