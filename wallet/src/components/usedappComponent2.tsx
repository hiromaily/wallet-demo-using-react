import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEtherBalance, useEthers } from '@usedapp/core'
import styled from 'styled-components'
import { getConfig } from '../utils/useDApp'
import NetworkSwitcher from './networkSwitcher'

const commonStyles = {
  bgcolor: 'rgb(67, 77, 115)',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  borderRadius: '16px',
  width: '200px',
  height: '200px',
  //display: 'flex',
  //justifyContent: 'center',
}

const AddressStyle = styled.p`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UseDappComponent2 = () => {
  const config = getConfig()

  const { account, chainId, switchNetwork } = useEthers()
  const etherBalance = useEtherBalance(account)

  if (!chainId || !config.readOnlyUrls![chainId]) {
    // error
    return <p>Not available</p>
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
              useDApp2
            </Typography>
            <NetworkSwitcher></NetworkSwitcher>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default UseDappComponent2
