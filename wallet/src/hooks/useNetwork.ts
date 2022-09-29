import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from '../utils/fetcher'

export type Network = {
  id: number
  name: string
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

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
  // TODO: call from client
  const { data, error } = useSWR(`http://127.0.0.1:8887/network.json`, fetcher)
  // type check
  if (!isNetwork(data)) {
    console.error(`invalid response`)
  }

  return {
    network: data,
    isLoading: !error && !data,
    isError: error,
  }
}
