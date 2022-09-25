import { useState, useEffect } from 'react'
import { Metamask, isMetamaskInstalled } from '../utils/metamask'

// Take care when using window object with Next.js
// This custom hook must be used along with multiple components

let meta: Metamask | undefined

const getMatamask = (): Metamask | undefined => {
  if (meta) return meta
  if (typeof window !== 'undefined') return new Metamask(window.ethereum)
  return undefined
}

// custom hook for metamask connecting network
export const useMetamask = () => {
  const [isConnected, setConnectionStatus] = useState(false)

  useEffect(() => {
    meta = getMatamask()
    // check initial connection
    if (meta?.isConnected()) setConnectionStatus(true)
  }, [])

  // metamask installation
  const isInstalled = (): boolean => {
    return isMetamaskInstalled()
  }

  // connect network
  const connect = async () => {
    console.log('connect()')
    const meta = getMatamask()
    if (!meta) return

    // connection
    const account = await meta?.getAccount()
    console.log(`account: ${account}`)

    // connected
    setConnectionStatus(true)
  }

  const disconnect = () => {
    // TODO: disconnect from metamask
    console.log('disconnect()')

    // disconnected
    setConnectionStatus(false)
  }

  return { isConnected, isInstalled, connect, disconnect }
}
