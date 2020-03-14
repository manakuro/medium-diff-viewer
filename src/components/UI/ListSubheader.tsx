import React from 'react'
import MaterialUIListSubheader, {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import styled, { css } from 'styled-components'

type Props = ListSubheaderProps &
  StyledSystemProps & {
    divider?: boolean
  }

const Wrapped: React.FC<Props> = ({
  backgroundColor,
  lineHeight,
  divider,
  ...props
}) => <MaterialUIListSubheader {...(props as any)} />

const dividerStyle = css`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-clip: padding-box;
`
const ListSubheader = styledSystem(styled(Wrapped)`
  ${props => (props.divider ? dividerStyle : '')}
`)

export default ListSubheader
