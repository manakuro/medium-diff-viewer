import React from 'react'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import styled from 'styled-components'

type Props = StyledSystemProps

const Text: React.FC<Props> = props => {
  return <StyledText {...props} />
}

const StyledText = styledSystem(styled.span``)

export default Text
