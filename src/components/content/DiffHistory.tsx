import React, { memo, ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import { ContainerTypes } from 'src/components/content/Container'
import { tableHeaderColour } from 'src/styles/variables'
import { Diff, GroupedDiffsByDate } from 'src/hooks/useDiffs'
import ListItemText from 'src/components/UI/ListItemText'
import ListItem from 'src/components/UI/ListItem'
import List from 'src/components/UI/List'
import ListSubheader from 'src/components/UI/ListSubheader'
import { formatDiffHistoryDate, formatGroupedDate } from 'src/utils/formatDate'
import Box from 'src/components/UI/Box'
import Text from 'src/components/UI/Text'
import Heading from 'src/components/UI/Heading'
import DiffHistoryListItem from 'src/components/content/DiffHistoryListItem'

type Props = {
  onUpdateDiffName: ContainerTypes['handleUpdateDiffName']
  onDeleteDiff: ContainerTypes['handleDeleteDiff']
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
    onDeleteDiff,
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
        <Heading as="h3" mb={24} fontWeight="heading" fontSize="md">
          Diff History
        </Heading>
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
                          <DiffHistoryListItem
                            diff={d}
                            handleBlur={handleBlur}
                            selected={selected}
                            onDeleteDiff={onDeleteDiff}
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

const Sticky = styled(Box)`
  position: sticky;
  top: 0;
`

export default memo<Props>(DiffHistory)
