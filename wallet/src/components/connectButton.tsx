import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { useConnection } from '../hooks/useConnection'

// type ConnectButtonProps = {
//   onClick: () => void
// }

const buttonName = new Map<boolean, string>([
  [false, 'Connect to a wallet'],
  [true, 'Disconnect'],
])

//const ConnectButton = ({ onClick }: ConnectButtonProps) => {
const ConnectButton = () => {
  // connection hook
  const { isConnected, connect, disconnect } = useConnection()

  const connectionHandler = () => {
    if (isConnected) {
      disconnect()
      return
    }
    connect()
  }

  return (
    <>
      <Button variant='outlined' size='medium' sx={{ minWidth: 200 }} onClick={connectionHandler}>
        {buttonName.get(isConnected)}
      </Button>
    </>
  )
}

export default ConnectButton
