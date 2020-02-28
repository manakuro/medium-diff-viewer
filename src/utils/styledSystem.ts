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
  MinHeightProps

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
