import { useState } from 'react'

// custom hook for connecting network
export const useConnection = () => {
  const [isConnected, setConnectionStatus] = useState(false)

  // connect network
  const connect = () => {
    if (isConnected) return
    // TODO: connect to metamask
    console.log('connect()')

    // connected
    setConnectionStatus(true)
  }

  const disconnect = () => {
    if (!isConnected) return
    // TODO: disconnect from metamask
    console.log('disconnect()')

    // disconnected
    setConnectionStatus(false)
  }

  return { isConnected, connect, disconnect }
}
