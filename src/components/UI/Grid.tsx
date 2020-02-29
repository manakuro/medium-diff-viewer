// @see https://material-ui.com/components/grid/

import React from 'react'
import MaterialUiGrid, { GridProps } from '@material-ui/core/Grid'
import theme from 'src/styles/theme'
import styled, { css } from 'styled-components'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'

type Props = {
  className?: string
  center?: boolean
  flex?: boolean
} & GridProps &
  StyledSystemProps

const Grid: React.FC<Props> = props => {
  const spacing = props.container ? { spacing: theme.main.grid.spacing } : {}

  return (
    <StyledGrid {...spacing} {...props}>
      {props.children}
    </StyledGrid>
  )
}

const centerStyle = css`
  margin: 0 auto !important;
`

const StyledGrid = styledSystem(styled(({ center, ...props }) => (
  <MaterialUiGrid {...props} />
))<Props>`
  ${props => (props.center ? centerStyle : '')}
`)

export default Grid
