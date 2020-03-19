import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import styled from 'styled-components'

type Props = StyledSystemProps

const Wrapped: React.FC<Props> = props => <TextareaAutosize {...props} />

const Textarea = styledSystem(styled(Wrapped)``)

export default Textarea
