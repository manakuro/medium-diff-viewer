import React from 'react'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import styled from 'styled-components'

type Props = StyledSystemProps

const Heading: React.FC<Props> = props => {
  return <Styled {...props} />
}

const Styled = styledSystem(styled.h2``)

export default Heading
