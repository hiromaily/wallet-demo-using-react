import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { useMetaMaskContext } from '../context/metamaskContext'
import API from './api'
import UseDappConnect from './usedappConnect'
import UseDappSwitch from './usedappSwitch'
import UseDappWrapper from './usedappWrapper'

type BridgeProps = {
  message: string
}

const Bridge = ({ message }: BridgeProps) => {
  // use context to get data from useMetamask()
  const { address } = useMetaMaskContext()

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: 'rgb(49, 58, 95)', height: '100vh' }}>
          <h1>Router</h1>
          <p>{message}</p>
          <p>{address}</p>
          <UseDappWrapper>
            <Box
              sx={{
                width: 500,
                height: 230,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <UseDappConnect />
              <UseDappSwitch />
            </Box>
          </UseDappWrapper>
          <API />
        </Box>
      </Container>
    </>
  )
}

export default Bridge
