import { useState, useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from '../utils/fetcher'

export type Network = {
  id: number
  name: string
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

export const networkURL = '/network'

const isNetwork = (arg: any): arg is Network => {
  if (arg === undefined) return true
  if (!Array.isArray(arg)) return false
  if (arg.length === 0) return true
  const val = arg[0]

  return (
    val.id !== undefined &&
    val.name !== undefined &&
    val.rpcUrls !== undefined &&
    val.blockExplorerUrls !== undefined
  )
}

export const useNetwork = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // call from client
  // this mutate is for Refetch Mutation
  const { mutate } = useSWRConfig()

  const muteWithKey = () => {
    mutate(networkURL)
  }

  // Note: when using Mock Service Worker, API can't response for a while after server started
  const { data, error } = useSWR(mounted ? networkURL : null, fetcher)
  // type check
  if (!isNetwork(data)) {
    // while using Mock Service Worker (MSW), this happens
  }

  return {
    network: data,
    isLoading: !error && !data,
    error: error,
    mutate: muteWithKey,
  }
}
