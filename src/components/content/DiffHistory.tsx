import React, { memo, ChangeEvent, useCallback } from 'react'
import styledSystem from 'src/utils/styledSystem'
import styled from 'styled-components'
import theme from 'src/styles/theme'
import { ContainerTypes } from 'src/components/content/Container'
import { tableHeaderColour } from 'src/styles/variables'
import { Diff, GroupedDiffsByDate } from 'src/hooks/useDiffs'
import ListItemText from 'src/components/UI/ListItemText'
import ListItem from 'src/components/UI/ListItem'
import List from 'src/components/UI/List'
import ListSubheader from 'src/components/UI/ListSubheader'
import { formatDiffHistoryDate, formatGroupedDate } from 'src/utils/formatDate'
import Textarea from 'src/components/UI/Textarea'

type Props = {
  onUpdateDiffName: ContainerTypes['handleUpdateDiffName']
  groupedDiffsByDate: GroupedDiffsByDate
  oldDiff: Diff
  onClickViewHistory: (id: number) => void
}

const DiffHistory: React.FC<Props> = props => {
  const {
    oldDiff,
    onUpdateDiffName,
    groupedDiffsByDate,
    onClickViewHistory,
  } = props

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: number) => {
      onUpdateDiffName(e.target.value, id)
    },
    [onUpdateDiffName],
  )

  return (
    <Container>
      <Sticky>
        <SectionTitle>Diff History</SectionTitle>
        <DiffHistoryWrapper>
          {Object.keys(groupedDiffsByDate).map(k => {
            const diffs = groupedDiffsByDate[k]
            const groupedDate = formatGroupedDate(k)

            return (
              <List
                p={'0 !important'}
                key={k}
                subheader={
                  <ListSubheader
                    backgroundColor={tableHeaderColour}
                    fontSize="xs"
                    lineHeight={'30px !important' as any}
                    divider
                  >
                    {groupedDate}
                  </ListSubheader>
                }
              >
                {diffs.map((d, i) => {
                  const selected = d.id === oldDiff.id
                  const diffHistoryDate = formatDiffHistoryDate(d.date)

                  return (
                    <ListItem
                      divider
                      alignItems="flex-start"
                      selected={selected}
                      onClick={() => onClickViewHistory(d.id)}
                      key={d.id}
                      pt={'10px !important' as any}
                      pb={'10px !important' as any}
                      pl={'32px !important' as any}
                    >
                      <ListItemText
                        fontSize="sm"
                        color="text.primary"
                        primary={
                          <Textarea
                            value={d.name}
                            name={d.date}
                            active={selected}
                            onBlur={(e: ChangeEvent<HTMLInputElement>) =>
                              handleBlur(e, d.id)
                            }
                          />
                        }
                        secondary={
                          <DiffHistoryDate fontSize="xs">
                            {diffHistoryDate}
                          </DiffHistoryDate>
                        }
                      />
                    </ListItem>
                  )
                })}
              </List>
            )
          })}
        </DiffHistoryWrapper>
      </Sticky>
    </Container>
  )
}

const Container = styledSystem(styled.div<{ open: boolean }>`
  width: 15%;
  padding: 12px;
`)

const SectionTitle = styledSystem(styled.h3<{ show: boolean }>`
  font-size: 1rem;
  font-weight: ${theme.fontWeights.heading};
  margin-bottom: 24px;
`)

const Sticky = styledSystem(styled.div`
  position: sticky;
  top: 0;
`)

const DiffHistoryWrapper = styledSystem(styled.div`
  width: 100%;
  height: 600px;
  overflow-y: scroll;
`)

const DiffHistoryDate = styledSystem(styled.span`
  padding-left: 7px;
  font-style: italic;
`)

export default memo<Props>(DiffHistory)
