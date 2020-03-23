import React, { ChangeEvent, useCallback, useState } from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import styled, { css } from 'styled-components'

type Props = StyledSystemProps &
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & {
    active?: boolean
  }

const Wrapped: React.FC<Props> = ({ active, ...props }) => {
  const [value, setValue] = useState(props.value)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return <TextareaAutosize onChange={handleChange} {...props} value={value} />
}

const activeStyle = css`
  pointer-events: initial;

  &:hover {
    pointer-events: initial;
    border: 1px solid rgba(0, 0, 0, 0.3);
    cursor: text;
  }
`

const Textarea = styledSystem(styled(Wrapped)`
  pointer-events: none;
  padding: 4px 6px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  resize: none;

  ${props => (props.active ? activeStyle : '')}
`)

export default Textarea
