import React from 'react'
import styled from 'styled-components'
import pick from 'lodash/pick'
import { hover } from 'src/styles/variables'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'

export type Props = {
  className?: string
  textDecoration?: string
  onClick?: (e: MouseEvent) => void
} & (
  | {
      external?: false | null
      noLink?: false | null
    }
  | ({
      external: true
      noLink?: false | null
    } & AnchorLinkProps)
  | {
      noLink: true
      external?: false | null
    }
) &
  StyledSystemProps

type AnchorLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

const ANCHOR_LINK_PROPS = [
  'download',
  'href',
  'hrefLang',
  'media',
  'ping',
  'rel',
  'target',
  'type',
  'referrerPolicy',
  'ref',
] as const

const Link: React.FC<Props> = props => {
  const anchorLinkProps: AnchorLinkProps = pick(
    props as AnchorLinkProps,
    ANCHOR_LINK_PROPS,
  )

  if (props.noLink) {
    return (
      <Span className={props.className} onClick={props.onClick}>
        {props.children}
      </Span>
    )
  }

  return (
    <AnchorLink
      {...anchorLinkProps}
      className={props.className}
      textDecoration={props.textDecoration}
      onClick={props.onClick}
    >
      {props.children}
    </AnchorLink>
  )
}

const AnchorLink = styledSystem(styled.a<any>`
  display: inline-block;
  text-decoration: ${props =>
    props.textDecoration ? props.textDecoration : 'none'};
  color: inherit;

  ${hover}
`)

const Span = styledSystem(styled.span<any>`
  display: inline-block;
  color: inherit;
  cursor: pointer;

  ${hover}
`)

export default Link
