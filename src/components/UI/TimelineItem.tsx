import React from 'react'
import styled from 'styled-components'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'

type Props = {
  className?: string
} & StyledSystemProps &
  React.HTMLAttributes<HTMLDivElement>

const TimeLineItem: React.FC<Props> = props => {
  return <Container {...props}>{props.children}</Container>
}

const Container = styledSystem(styled.div`
  display: flex;
  width: auto;
`)

export default TimeLineItem
