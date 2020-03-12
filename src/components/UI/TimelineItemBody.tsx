import React from 'react'
import styled from 'styled-components'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'

type Props = {
  className?: string
  show?: boolean
} & StyledSystemProps

const TimeLineItemBody: React.FC<Props> = props => {
  return <Container {...props}>{props.children}</Container>
}

const Container = styledSystem(styled.div<Props>`
  display: flex;
  width: 100%;
  height: auto;
`)

export default TimeLineItemBody
