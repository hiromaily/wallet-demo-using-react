import List from '@mui/joy/List'
import ListDivider from '@mui/joy/ListDivider'
import ListItem from '@mui/joy/ListItem'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
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
  console.log(`network: ${network}, isLoading: ${isLoading}, error: ${error}`)

  const onClickConnect = () => {
    console.log('click connect')

    mutate()
  }

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
              {isLoading && <CircularProgress />}
              {error && <TextStyle>{error}</TextStyle>}
              <List>
                {network &&
                  network.map((nt: Network) => {
                    return (
                      <ListItem key={nt.id}>
                        <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                          {nt.name}
                        </ListItemDecorator>
                      </ListItem>
                    )
                  })}
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default NetworkAPI
