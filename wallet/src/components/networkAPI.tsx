import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'
import { useNetwork } from '../hooks/useNetwork'
import type { Network } from '../hooks/useNetwork'

const commonStyles = {
  bgcolor: 'rgb(67, 77, 115)',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  borderRadius: '16px',
  width: '260px',
  height: '260px',
  //display: 'flex',
  //justifyContent: 'center',
}

const TextStyle = styled.p`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const NetworkAPI = () => {
  // API call
  const { network, isLoading, error, mutate } = useNetwork()
  //console.log(`network: ${network}, isLoading: ${isLoading}, error: ${error}`)
  if (error) console.log(error)

  const onClickConnect = () => {
    console.log('click connect')

    mutate()
  }

  // network items
  const listItems = network?.map((nt: Network) => (
    <ListItem key={nt.id}>
      <ListItemText primary={nt.name} />
    </ListItem>
  ))

  return (
    <>
      <Box sx={{ marginLeft: '10px' }}>
        <Box sx={{ ...commonStyles }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, marginTop: '10px', marginBottom: '20px' }}
            >
              Network API
            </Typography>
            <Button
              variant='outlined'
              size='medium'
              sx={{ minWidth: 120 }}
              onClick={onClickConnect}
            >
              Connect
            </Button>
            <Box>
              {(isLoading || error) && <CircularProgress />}
              {/* error && <TextStyle>error</TextStyle> */}
              {listItems && <List>{listItems}</List>}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default NetworkAPI
