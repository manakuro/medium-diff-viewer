import React from 'react'
import MaterialUIButton from '@material-ui/core/Button'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { ButtonProps } from '@material-ui/core/Button/Button'

type Props = ButtonProps & StyledSystemProps

const Button: React.FC<Props> = props => {
  return <StyledButton {...props} />
}

const StyledButton = styledSystem(MaterialUIButton)

export default Button
