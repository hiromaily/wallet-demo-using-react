import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { useMetaMaskContext } from '../context/metamaskContext'
import UseDappComponent from './usedappComponent'
import UseDappComponent2 from './usedappComponent2'
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
          <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          <UseDappWrapper>
            <Box
              sx={{
                width: 500,
                height: 400,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <UseDappComponent />
              <UseDappComponent2 />
            </Box>
          </UseDappWrapper>
        </Box>
      </Container>
    </>
  )
}

export default Bridge
