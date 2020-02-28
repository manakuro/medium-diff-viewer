import React from 'react'
import MaterialUICard from '@material-ui/core/Card'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { CardProps } from '@material-ui/core/Card/Card'

type Props = CardProps & StyledSystemProps

const Card: React.FC<Props> = props => {
  return <StyledCard {...props} />
}

const StyledCard = styledSystem(MaterialUICard)

export default Card
