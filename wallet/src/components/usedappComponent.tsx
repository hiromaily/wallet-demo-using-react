import { formatEther } from '@ethersproject/units'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEtherBalance, useEthers } from '@usedapp/core'
import styled from 'styled-components'
import { getConfig } from '../utils/useDApp'

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

const TextStyle = styled.p`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UseDappComponent = () => {
  const config = getConfig()

  const { account, activateBrowserWallet, deactivate, chainId } = useEthers()
  const etherBalance = useEtherBalance(account)
  //console.log(`UseDappComponent() ${chainId} ${account}`) // 1

  const onClickConnect = () => {
    activateBrowserWallet()
  }
  const onClickDisconnect = () => {
    deactivate()
  }

  if (!chainId || !config.readOnlyUrls![chainId]) {
    // error
    return <p>Please use either Mainnet or Goerli testnet.</p>
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
              useDApp
            </Typography>
            {!account && (
              <Button
                variant='outlined'
                size='medium'
                sx={{ minWidth: 120 }}
                onClick={onClickConnect}
              >
                Connect
              </Button>
            )}
            {account && (
              <Button
                variant='outlined'
                size='medium'
                sx={{ minWidth: 120 }}
                onClick={onClickDisconnect}
              >
                Disconnect
              </Button>
            )}

            {etherBalance && (
              <Box>
                <TextStyle>Balance:{formatEther(etherBalance)}</TextStyle>
                <TextStyle>{account}</TextStyle>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default UseDappComponent
