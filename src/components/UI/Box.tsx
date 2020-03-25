import React from 'react'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import styled from 'styled-components'

type Props = StyledSystemProps

const Box: React.FC<Props> = props => {
  return <StyledBox {...props} />
}

const StyledBox = styledSystem(styled.div``)

export default Box
