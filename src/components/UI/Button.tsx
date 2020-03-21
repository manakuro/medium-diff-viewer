import React from 'react'
import MaterialUIButton from '@material-ui/core/Button'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { ButtonProps } from '@material-ui/core/Button/Button'
import styled, { css } from 'styled-components'
import theme from 'src/styles/theme'

type Props = ButtonProps & StyledSystemProps

const Wrapped: React.FC<Props> = ({
  color,
  zIndex,
  backgroundColor,
  borderColor,
  ...props
}) => <MaterialUIButton {...props} />

const primaryStyle = css`
  color: ${theme.colors.white};
  border-color: ${theme.colors.primary};
  background-color: ${theme.colors.primary};
`

const Button = styledSystem(styled(Wrapped)`
  text-transform: none !important;

  ${props => (!props.disabled ? primaryStyle : '')}
`)

export default Button
