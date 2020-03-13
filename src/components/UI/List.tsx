import React from 'react'
import MaterialUIList, { ListProps } from '@material-ui/core/List'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import styled from 'styled-components'

type Props = ListProps & StyledSystemProps

const Wrapped: React.FC<Props> = props => <MaterialUIList {...(props as any)} />

const List = styledSystem(styled(Wrapped)``)

export default List
