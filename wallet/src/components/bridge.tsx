import * as React from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

type BridgeProps = {
  message: string
}

const Bridge = ({ message }: BridgeProps) => {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: 'rgb(49, 58, 95)', height: '100vh' }}>
          <h1>Router</h1>
          <p>{message}</p>
          <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
        </Box>
      </Container>
    </>
  )
}

export default Bridge
