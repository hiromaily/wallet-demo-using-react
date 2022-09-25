import React, { useCallback } from 'react'
import Button from '@mui/material/Button'

type ConnectButtonProps = {
  //status: string
  // ethereum: any
  // connect: () => Promise<string[] | null>
  // switchChain: (chainId: string) => Promise<void>
  isConnected: boolean
  onClick: () => Promise<void>
}

const buttonName = new Map<boolean, string>([
  [false, 'Connect to a wallet'],
  [true, 'Disconnect'],
])

const ConnectButton = ({ isConnected, onClick }: ConnectButtonProps) => {
  //status === 'connected'
  return (
    <>
      <Button variant='outlined' size='medium' sx={{ minWidth: 200 }} onClick={onClick}>
        {buttonName.get(isConnected)}
      </Button>
    </>
  )
}

export default ConnectButton
