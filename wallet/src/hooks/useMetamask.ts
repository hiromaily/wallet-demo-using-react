import { useState, useEffect } from 'react'
import { Metamask, isMetamaskInstalled, getProvider } from '../utils/metamask'

// Take care when using window object with Next.js
// This custom hook must be used along with multiple components

let meta: Metamask | undefined

const getMatamask = async (): Promise<Metamask | undefined> => {
  if (meta) return meta
  //if (typeof window !== 'undefined') return new Metamask(window.ethereum)
  const provider = await getProvider()
  if (provider === 'undefined') return provider
  return new Metamask(provider)
}

// custom hook for metamask connecting network
export const useMetamask = () => {
  const [isConnected, setConnectionStatus] = useState(false)
  const [address, setAddress] = useState('')

  useEffect(() => {
    ;(async () => {
      console.log('check connection')
      meta = await getMatamask()
      // FIXME to detect initial connection status
      //if (meta?.isConnected()) setConnectionStatus(true)

      // when already connected, account can be retrieved without popup
      // however,when not connected, popup is shown
      // const account = await meta?.getAccount()
      // console.log(`account: ${account}`)
    })()
  }, [])

  // useEffect(() => {
  //   meta = getMatamask()
  //   if (meta?.isConnected()) setConnectionStatus(true)
  // }, [])

  // metamask installation
  const isInstalled = (): boolean => {
    return isMetamaskInstalled()
  }

  // connect network
  // return account address
  const connect = async (): Promise<void> => {
    console.log('connect()')
    const meta = await getMatamask()
    if (!meta) return

    // connection
    const account = await meta?.getAccount()
    console.log(`account: ${account}`)
    setAddress(account)

    // connected
    setConnectionStatus(true)
  }

  const disconnect = () => {
    // TODO: disconnect from metamask
    console.log('disconnect()')

    // disconnected
    setConnectionStatus(false)
  }

  return { address, isConnected, isInstalled, connect, disconnect }
}