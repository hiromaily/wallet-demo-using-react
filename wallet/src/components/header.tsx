import Head from 'next/head'
import Router from 'next/router'
import { useContext, useCallback } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
//import { useMetaMask } from 'metamask-react'
//import { useMetamask } from '../hooks/useMetamask'
import { MetaMaskContext } from '../context/metamaskContext'
import { openExtension } from '../utils/metamask'
import ConnectButton from './button/connectButton'

// import Link from 'next/link'
// import Image from 'next/image'

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  // useMetamask may be buggy
  //const { status, ethereum, connect, switchChain } = useMetaMask()

  // metamask hook
  //const { isConnected, isInstalled, connect, disconnect } = useMetamask()

  // use context to get data from useMetamask()
  const { address, isConnected, isInstalled, connect, disconnect } = useContext(MetaMaskContext)

  const onClickRouter = () => {
    Router.push('/')
  }
  const onClickExplorer = () => {
    Router.push('/explorer')
  }

  // const onClickConnect = useCallback(async () => {
  //   console.log('onClickConnect is called')
  //   console.log(status)

  //   if (status === 'connected') {
  //     console.log('[connected] status is ', status)
  //   } else if (status === 'notConnected') {
  //     console.log('[notConnected] status is ', status)

  //     // Switch to Ethereum Mainnet
  //     await switchChain('0x1') //0x89
  //     // connect
  //     const account = await connect()
  //     console.log(`account: ${account}`)
  //   } else {
  //     // WIP for connecting
  //     console.log(status)
  //     // connect
  //     const account = await connect()
  //     console.log(`account: ${account}`)
  //   }
  // }, [])

  const onClickConnect = useCallback(async () => {
    console.log('onClickConnect is called:', isInstalled, isConnected)
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

  // useLayoutEffect(() => {
  // }, [isConnected])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppBar sx={{ bgcolor: 'rgb(27, 33, 59)' }} position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
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
