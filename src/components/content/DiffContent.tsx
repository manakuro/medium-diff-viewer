import React, { useCallback, memo } from 'react'
import styledSystem from 'src/utils/styledSystem'
import styled from 'styled-components'
import theme from 'src/styles/theme'
import replaceLineBreaksWith from 'src/utils/replaceLineBreaksWith'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import parse from 'html-react-parser'
import { mediumStyle } from 'src/styles/medium'
import { Content } from 'src/utils/getContent'
import { Diff } from 'src/hooks/useDiffs'
import { formatDiffHistoryDate } from 'src/utils/formatDate'

type Props = {
  currentContent: Content
  oldDiff: Diff
}

const DIFF_CONTAINER_STYLE = {
  contentText: { fontSize: 16 },
}

const DiffContent: React.FC<Props> = props => {
  const renderContent = useCallback((str): any => {
    if (!str) return ''

    return parse(replaceLineBreaksWith(str, '<br />'))
  }, [])

  return (
    <Container>
      <SectionTitle>Diff Contents</SectionTitle>
      <Inner>
        <ReactDiffViewer
          oldValue={props.oldDiff.content.body}
          newValue={props.currentContent.body}
          splitView
          showDiffOnly={false}
          compareMethod={DiffMethod.SENTENCES}
          leftTitle={formatDiffHistoryDate(props.oldDiff.date)}
          rightTitle="Current version"
          renderContent={renderContent}
          styles={DIFF_CONTAINER_STYLE}
        />
      </Inner>
    </Container>
  )
}

const Container = styledSystem(styled.div`
  flex: 1;
  padding: 12px;
`)

const SectionTitle = styledSystem(styled.h3<{ show: boolean }>`
  font-size: 1rem;
  font-weight: ${theme.fontWeights.heading};
  margin-bottom: 24px;
`)

const Inner = styledSystem(styled.div`
  ${mediumStyle}

  // diff viewer style
  tr {
    td:nth-of-type(2),
    td:nth-of-type(5) {
      min-width: 13px;
    }

    td:nth-of-type(3) {
      padding-right: 20px;
    }
  }

  td {
    pre {
      span {
        font-size: 21px;
        font-family: medium-content-sans-serif-font, -apple-system,
          BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
          'Open Sans', 'Helvetica Neue', sans-serif;
        letter-spacing: 0;
        font-weight: 400;
        font-style: normal;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        color: rgba(0, 0, 0, 0.84);
        line-height: 1.4;
        display: block !important;
      }
    }
  }
`)

export default memo<Props>(DiffContent)
