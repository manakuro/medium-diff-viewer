import React from 'react'
import MaterialUIPopper from '@material-ui/core/Popper'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { PopperProps } from '@material-ui/core/Popper'
import styled from 'styled-components'
import { PopperPlacementType } from '@material-ui/core/Popper/Popper'

type Props = PopperProps & StyledSystemProps
export type PopperChildrenProps = {
  placement: PopperPlacementType
  TransitionProps?: {
    in: boolean
    onEnter: () => {}
    onExited: () => {}
  }
}

const Wrapped: React.FC<Props> = ({ zIndex, ...props }) => (
  <MaterialUIPopper {...props} />
)

const Popper = styledSystem(styled(Wrapped)``)

export default Popper
