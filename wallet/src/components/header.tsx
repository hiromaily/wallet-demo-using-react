import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useCallback } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useMetaMaskContext } from '../context/metamaskContext'
import { openExtension } from '../utils/metamask'
import ConnectButton from './button/connectButton'

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  // use context to get data from useMetamask()
  const { address, isConnected, isInstalled, connect, disconnect } = useMetaMaskContext()

  const onClickRouter = () => {
    Router.push('/')
  }
  const onClickExplorer = () => {
    Router.push('/explorer')
  }

  const onClickConnect = useCallback(async () => {
    console.log(
      `onClickConnect is called: isInstalled: ${isInstalled}, isConnected: ${isConnected}`,
    )
    if (!isInstalled) {
      openExtension()
      return
    }

    if (isConnected) {
      disconnect()
    } else {
      await connect()
    }
  }, [isInstalled, isConnected, address])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppBar sx={{ bgcolor: 'rgb(27, 33, 59)' }} position='static'>
        <Toolbar>
          <Box sx={{ marginRight: '20px' }}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </Box>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Wallet Header
          </Typography>
          {address !== '' && <Chip sx={{ color: 'white' }} label={address} variant='outlined' />}
          <Button color='inherit' onClick={onClickRouter}>
            Router
          </Button>
          <Button color='inherit' onClick={onClickExplorer}>
            Explorer
          </Button>
          <ConnectButton isConnected={isConnected} onClick={onClickConnect} />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
