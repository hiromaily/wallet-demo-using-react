import React, { useState } from 'react'
import Button from '@mui/material/Button'

// type ConnectButtonProps = {
//   onClick: () => void
// }

const buttonName = new Map<boolean, string>([
  [false, 'Connect to a wallet'],
  [true, 'Disconnect'],
])

//const ConnectButton = ({ onClick }: ConnectButtonProps) => {
const ConnectButton = () => {
  // TODO: this logic must be defined as hook
  const [isConnected, setConnectionStatus] = useState(false)

  const connectionHandler = () => {
    if (isConnected) {
      // TODO: disconnect

      // change status
      setConnectionStatus(false)
      return
    }
    // TODO: connect

    // change status
    setConnectionStatus(true)
  }

  return (
    <>
      <Button color='inherit' onClick={connectionHandler}>
        {buttonName.get(isConnected)}
      </Button>
    </>
  )
}

export default ConnectButton
