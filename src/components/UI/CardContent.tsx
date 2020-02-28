import React from 'react'
import MaterialUICardContent from '@material-ui/core/CardContent'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import { CardContentProps } from '@material-ui/core/CardContent/CardContent'

type Props = CardContentProps & StyledSystemProps

const CardContent: React.FC<Props> = props => {
  return <StyledCard {...props} />
}

const StyledCard = styledSystem(MaterialUICardContent)

export default CardContent
