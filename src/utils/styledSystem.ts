import styled from 'styled-components'
import {
  compose,
  space,
  color,
  layout,
  typography,
  flexbox,
  border,
  background,
  position,
  grid,
  shadow,
  width,
  minWidth,
  height,
  minHeight,
  SpaceProps,
  WidthProps,
  MinWidthProps,
  ColorProps,
  LayoutProps,
  TypographyProps,
  FlexboxProps,
  BorderProps,
  BackgroundProps,
  PositionProps,
  GridProps,
  HeightProps,
  MinHeightProps,
} from 'styled-system'
import React from 'react'

type Tag = Parameters<typeof styled>[0]

export type StyledSystemProps = SpaceProps &
  ColorProps &
  LayoutProps &
  TypographyProps &
  FlexboxProps &
  BorderProps &
  BackgroundProps &
  PositionProps &
  GridProps &
  WidthProps &
  MinWidthProps &
  HeightProps &
  MinHeightProps & {
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
    forwardedAs?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  }

const styledSystem = (tag: Tag) => {
  return styled(tag)<StyledSystemProps>(
    compose(
      space,
      color,
      layout,
      typography,
      flexbox,
      border,
      background,
      position,
      grid,
      shadow,
      width,
      minWidth,
      height,
      minHeight,
    ),
  )
}

export default styledSystem
