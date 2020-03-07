import React from 'react'
import styled, { css } from 'styled-components'
import { primaryColour } from 'src/styles/variables'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'

type Props = {
  horizontal?: boolean
  className?: string
} & StyledSystemProps

const TimeLine: React.FC<Props> = props => {
  return <Container {...props}>{props.children}</Container>
}

const horizontalStyle = css`
  &::before {
    content: none;
  }
`

const Container = styledSystem(styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  left: 10px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: '';
    height: 100%;
    width: 0;
    border: 1px solid ${primaryColour};
  }

  ${props => (props.horizontal ? horizontalStyle : '')}
`)

export default TimeLine
