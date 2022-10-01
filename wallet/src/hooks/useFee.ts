import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { queryFetcher } from '../utils/fetcher'
import { filterError } from '../utils/swrUtils'

export type Fee = {
  gas: number
  bridgeFee: number
}

//export const feeURL = 'http://127.0.0.1:8887/fee.json'
export const feeURL = '/fee'

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

  // Note: when using Mock Service Worker, API can't response for a while after server started
  const { data, error } = useSWR(mounted ? [feeURL, queryParams] : null, queryFetcher)
  // type check
  if (!isFee(data)) {
    // while using Mock Service Worker (MSW), this happens
    //console.error(`invalid response`)
  }
  let newError = filterError(error)

  return {
    fee: data,
    isLoading: !newError && !data,
    error: newError,
    setQueryparams: setQueryparams,
  }
}
