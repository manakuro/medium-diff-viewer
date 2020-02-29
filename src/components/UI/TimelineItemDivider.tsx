import React from 'react'
import styled, { css } from 'styled-components'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'

type Props = {
  horizontal?: boolean
  className?: string
} & StyledSystemProps

const TimeLineItemDivider: React.FC<Props> = props => {
  return <Container {...props}>{props.children}</Container>
}

const verticalStyle = css`
  transform: none;
`

const Container = styledSystem(styled.div<Props>`
  position: relative;
  min-width: 24px;
  display: flex;
  justify-content: center;
  transform: translateX(calc(-50% + 1px));

  ${props => (props.horizontal ? verticalStyle : '')}
`)

export default TimeLineItemDivider
