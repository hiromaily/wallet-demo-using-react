import { Mainnet } from '@usedapp/core'
import type { Config } from '@usedapp/core'
import { providers, getDefaultProvider } from 'ethers'

// TODO: handle various network by args
const getConfig = (): Config => {
  return {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/b8d655803ca04f6890611b8a1e43f466',
      [56]: new providers.JsonRpcProvider('https://bsc-dataseed1.binance.org'),
    },
  }
}

export { getConfig }
