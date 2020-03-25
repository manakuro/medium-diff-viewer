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
import Box from 'src/components/UI/Box'
import Text from 'src/components/UI/Text'

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
    <Box width="15%" p={12}>
      <Sticky>
        <SectionTitle>Diff History</SectionTitle>
        <Box width="100%" height={600} overflowY="scroll">
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
                          <Text
                            fontSize="xs"
                            pl={7}
                            fontStyle="italic"
                            as="span"
                          >
                            {diffHistoryDate}
                          </Text>
                        }
                      />
                    </ListItem>
                  )
                })}
              </List>
            )
          })}
        </Box>
      </Sticky>
    </Box>
  )
}

const SectionTitle = styledSystem(styled.h3`
  font-size: 1rem;
  font-weight: ${theme.fontWeights.heading};
  margin-bottom: 24px;
`)

const Sticky = styled(Box)`
  position: sticky;
  top: 0;
`

export default memo<Props>(DiffHistory)
