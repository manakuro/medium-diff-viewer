import React from 'react'
import styled, { css } from 'styled-components'
import Person from '@material-ui/icons/Person'
import AccessTime from '@material-ui/icons/AccessTime'
import Delete from '@material-ui/icons/Delete'
import FileCopy from '@material-ui/icons/FileCopy'
import Build from '@material-ui/icons/Build'
import DirectionsSubway from '@material-ui/icons/DirectionsSubway'
import Group from '@material-ui/icons/Group'
import PersonPin from '@material-ui/icons/PersonPin'
import Menu from '@material-ui/icons/Menu'
import Launch from '@material-ui/icons/Launch'
import CheckCircle from '@material-ui/icons/CheckCircle'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import BubbleChart from '@material-ui/icons/BubbleChart'
import ListAlt from '@material-ui/icons/ListAlt'
import WbIncandescentOutlined from '@material-ui/icons/WbIncandescentOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { hover, primaryColour, textSubColour } from 'src/styles/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { width, height } from 'styled-system'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'

type Props = {
  name: Icons
  className?: string
  hover?: boolean
  primary?: boolean
  onClick?: () => void
} & StyledSystemProps

export type Icons = keyof typeof icons

// @see https://material-ui.com/components/material-icons/
const icons = {
  AccessTime,
  Delete,
  FileCopy,
  Person,
  Build,
  DirectionsSubway,
  Group,
  PersonPin,
  CheckCircle,
  CheckCircleOutline,
  BubbleChart,
  Launch,
  ListAlt,
  WbIncandescentOutlined,
  ExpandMoreIcon,
  Menu,
  faTwitter: () => <FontAwesomeIcon icon={faTwitter} />,
  faGithub: () => <FontAwesomeIcon icon={faGithub} />,
  faChevronRight: () => <FontAwesomeIcon icon={faChevronRight} />,
  faChevronLeft: () => <FontAwesomeIcon icon={faChevronLeft} />,
}

const Icon: React.FC<Props> = props => {
  const Component = icons[props.name]
  return (
    <Container {...props}>
      <Component>{props.children}</Component>
    </Container>
  )
}

const hoverTransition = css`
  ${hover};
  cursor: pointer;
`

const Container = styledSystem(styled.span<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;

  ${props => (props.hover ? hoverTransition : '')};

  color: ${props => (props.primary ? primaryColour : textSubColour)};

  svg {
    width: 18px;
    height: 18px;

    ${width};
    ${height};
  }
`)

export default Icon
