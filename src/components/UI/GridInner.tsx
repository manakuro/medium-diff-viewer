import React from 'react'
import styled from 'styled-components'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'

type Props = {
  className?: string
} & StyledSystemProps

const GridInner: React.FC<Props> = props => {
  return <Container {...props}>{props.children}</Container>
}

const Container = styledSystem(styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`)

export default GridInner
