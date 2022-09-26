import { useState } from 'react'
import axios from 'axios'
import type { Network } from '../types/network'

// custom hook for getting network list
export const useFetchNetworks = () => {
  const [networkList, setNetworkList] = useState([] as Network[])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  type FetchNetworkResponse = {
    data: Network[]
  }

  // get network list
  const fetchNetwork = () => {
    // loading:on、error:off while clicking button
    setIsLoading(true)
    setIsError(false)

    // Execute API
    // TODO: cache
    axios
      .get('http://127.0.0.1:8887/networkList.json')
      .then((result: FetchNetworkResponse) => {
        const networks = result.data.map((network: Network) => ({
          id: network.id,
          name: network.name,
          rpc: network.rpc,
        }))
        // update network list
        setNetworkList(networks)
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }

  return { networkList, isLoading, isError, fetchNetwork }
}
