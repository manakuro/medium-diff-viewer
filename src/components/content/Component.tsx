import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
import Card from 'src/components/UI/Card'
import CardContent from 'src/components/UI/CardContent'
import styledSystem from 'src/utils/styledSystem'
import styled from 'styled-components'
import useWindowSize from 'src/hooks/useWindowSize'
import { Z_INDEX_CONTENT } from 'src/styles/variables'
import useWindowSelection from 'src/hooks/useWindowSelection'
import replaceLineBreaksWith from 'src/utils/replaceLineBreaksWith'
import sanitizeHtml from 'src/utils/sanitizeHtml'
import { ContainerType } from 'src/components/content/Container'

type Props = {
  active: boolean
} & Pick<ContainerType, 'sendBackground'>

const DEFAULT_WIDTH = 320
const DEFAULT_HEIGHT = 480

const PopupComponent: React.FC<Props> = props => {
  const windowSize = useWindowSize()
  const windowSelectionText = useWindowSelection()
  const [content, setContent] = useState('')

  if (windowSelectionText && content !== windowSelectionText) {
    props.sendBackground(windowSelectionText)
    setContent(windowSelectionText)
  }

  if (!props.active) return null

  return (
    <Container>
      <Rnd
        default={{
          x: windowSize.width - DEFAULT_WIDTH - 20,
          y: 20,
          width: DEFAULT_WIDTH,
          height: DEFAULT_HEIGHT,
        }}
      >
        <Card
          raised
          width="100%"
          height="100%"
          overflow="scroll !important"
          style={{ userSelect: 'none' }}
          opacity={0.9}
        >
          <CardContent>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(replaceLineBreaksWith(content, '<br />')),
              }}
            />
          </CardContent>
        </Card>
      </Rnd>
    </Container>
  )
}

const Container = styledSystem(styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${Z_INDEX_CONTENT};
`)

export default PopupComponent
