import React, {
  memo,
  ChangeEvent,
  useState,
  useCallback,
  MouseEvent,
} from 'react'
import Textarea from 'src/components/UI/Textarea'
import Box from 'src/components/UI/Box'
import Icon from 'src/components/UI/Icon'
import { Diff } from 'src/hooks/useDiffs'
import { Z_INDEX_CONTENT_MENU } from 'src/styles/variables'
import MenuItem from 'src/components/UI/MenuItem'
import MenuList from 'src/components/UI/MenuList'
import Popper, { PopperChildrenProps } from 'src/components/UI/Popper'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { ContainerTypes } from 'src/components/content/Container'

type Props = {
  diff: Diff
  handleBlur: (e: ChangeEvent<HTMLInputElement>, id: number) => void
  onDeleteDiff: ContainerTypes['handleDeleteDiff']
  selected: boolean
}

const DiffHistoryListItem: React.FC<Props> = props => {
  const { handleBlur, diff, selected, onDeleteDiff } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }, [])

  return (
    <Box display="flex" alignItems="center">
      <Textarea
        value={diff.name}
        name={diff.date}
        active={selected}
        onBlur={(e: ChangeEvent<HTMLInputElement>) => handleBlur(e, diff.id)}
        width="80%"
      />
      <Icon
        name="MoreHorizOutlined"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
      <Popper
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        placement="bottom-start"
        zIndex={Z_INDEX_CONTENT_MENU}
        transition
      >
        {({ TransitionProps }: PopperChildrenProps) => (
          <Fade {...TransitionProps} timeout={250}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="diff-history-menu">
                  <MenuItem onClick={() => onDeleteDiff(diff.id)} fontSize="xs">
                    Delete this version
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  )
}

export default memo<Props>(DiffHistoryListItem)
