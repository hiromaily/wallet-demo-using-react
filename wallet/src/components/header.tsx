//import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import Router from 'next/router'
import { useCallback } from 'react'
import ConnectButton from './connectButton'

// import Link from 'next/link'
// import Image from 'next/image'

// import material UI components
//import Box from "@mui/material/Box";

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  const onClickRouter = useCallback(() => {
    Router.push('/')
  }, [])
  const onClickExplorer = useCallback(() => {
    Router.push('/explorer')
  }, [])
  // const onClickConnect = useCallback(() => {
  //   console.log('click Connect Wallet')
  // }, [])

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
          <Button color='inherit' onClick={onClickRouter}>
            Router
          </Button>
          <Button color='inherit' onClick={onClickExplorer}>
            Explorer
          </Button>
          <ConnectButton />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
