import React from 'react'
import styled, { css } from 'styled-components'
import {
  grey,
  primaryColour,
  transitionDuration,
  white,
} from 'src/styles/variables'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'

type Props = {
  width?: number
  height?: number
  active?: boolean
  className?: string
} & StyledSystemProps

const TimeLineItemDot: React.FC<Props> = props => {
  return <Container {...props}>{props.children}</Container>
}

const activeStyle = css`
  border: 1px solid ${primaryColour};

  &::before {
    background: ${primaryColour};
  }

  &::after {
    border: 1px solid ${primaryColour};
  }
`

const Container = styledSystem(styled.div<Props>`
  width: ${props => (props.width ? `${`${props.width}px`}` : '24px')};
  height: ${props => (props.height ? `${`${props.height}px`}` : '24px')};
  background: ${white};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border: 1px solid ${grey};
  position: relative;
  transition: all ${transitionDuration};

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: ${grey};
    border-radius: 50%;
  }

  &::after {
    content: '';
    display: block;
    width: 10px;
    border: 1px solid ${grey};
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-1px);
  }

  ${props => (props.active ? activeStyle : '')}
`)

export default TimeLineItemDot
