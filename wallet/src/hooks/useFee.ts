import { useState, useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { queryFetcher } from '../utils/fetcher'

export type Fee = {
  gas: number
  bridgeFee: number
}

const isFee = (arg: any): arg is Fee => {
  if (arg === undefined) return true
  if (!Array.isArray(arg)) return false
  if (arg.length === 0) return true
  const val = arg[0]

  return val.gas !== undefined && val.bridgeFee !== undefined
}

export const useFee = () => {
  const [mounted, setMounted] = useState(false)
  const [queryParams, setQueryparams] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  // call from client
  const { data, error } = useSWR(
    mounted ? [`http://127.0.0.1:8887/fee.json`, queryParams] : null,
    queryFetcher,
  )
  // type check
  if (!isFee(data)) {
    console.error(`invalid response`)
  }

  return {
    fee: data,
    isLoading: !error && !data,
    error: error,
    setQueryparams: setQueryparams,
  }
}
