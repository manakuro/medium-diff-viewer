import React from 'react'
import styled, { css } from 'styled-components'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { primaryColour } from 'src/styles/variables'
import theme from 'src/styles/theme'

type Props = {
  className?: string
  active?: boolean
} & StyledSystemProps

const TimeLineItemDate: React.FC<Props> = props => {
  return <Container fontSize={{ sm: 'xs' }} color="text.primary" {...props} />
}

const activeStyle = css`
  color: ${primaryColour} !important;
  font-weight: ${theme.fontWeights.heading};
`

const Container = styledSystem(styled.span<Props>`
  display: inline-block;
  font-family: ${props => props.theme.main.headingFont};
  font-weight: 300;

  ${props => (props.active ? activeStyle : '')}
`)

export default TimeLineItemDate
