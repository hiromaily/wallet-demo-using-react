import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { SWRConfig } from 'swr'
import { useMetaMaskContext } from '../context/metamaskContext'
import { endpoint, configs } from '../utils/swrUtils'
import FeeAPI from './feeAPI'
import NetworkAPI from './networkAPI'
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
          <Box
            sx={{
              width: 600,
              height: 300,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {/** <SWRConfig value={{ use: [endpoint] }}> **/}
            <SWRConfig value={configs}>
              <NetworkAPI />
              <FeeAPI />
            </SWRConfig>
            {/** </SWRConfig> **/}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Bridge
