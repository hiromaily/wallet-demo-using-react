import AddIcon from '@mui/icons-material/Add'
import PersonIcon from '@mui/icons-material/Person'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import { blue } from '@mui/material/colors'
import { chainIDMap } from '../utils/chainid'

export interface NetworkDialogProps {
  open: boolean
  selectedValue: string
  onClickClose: (value: string) => void
  onClickSelected: (key: string, value: string) => void
}

const NetworkDialog = (props: NetworkDialogProps) => {
  const { onClickClose, onClickSelected, selectedValue, open } = props

  const handleClose = () => {
    onClickClose(selectedValue)
  }

  const handleListItemClick = (key: string, value: string) => {
    onClickSelected(key, value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Network</DialogTitle>
      <List sx={{ pt: 0 }}>
        {Object.entries(chainIDMap).map(([key, network]) => (
          <ListItem button onClick={() => handleListItemClick(key, network)} key={key}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={network} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default NetworkDialog
