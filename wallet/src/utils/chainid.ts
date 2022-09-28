import { Mainnet, DEFAULT_SUPPORTED_CHAINS } from '@usedapp/core'
import type { Config, Chain } from '@usedapp/core'
import { providers } from 'ethers'

type ChainID = {
  [key: number]: string
}

// chainList
//  https://chainlist.org/
// about ethereum testnet
//  https://ethereum.org/en/developers/docs/networks/
// - Sepolia
// - Goerli
// - Ropsten (deprecated)
// - Rinkeby (deprecated)
// - Kovan (deprecated)
export const chainIDMap: ChainID = {
  1: 'Ethereum Main Network',
  //3: 'Ropsten Test Network',
  //4: 'Rinkeby Test Network',
  //5: 'Goerli Test Network',
  10: 'Optimism',
  //42: 'Kovan Test Network',
  56: 'Binance Smart Chain',
  //137: 'Polygon Mainnet',
  //11155111: 'Sepolia Test Network'
}

interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

type ChainIDParam = {
  [key: number]: AddEthereumChainParameter
}

export const chainIDParamMap: ChainIDParam = {
  10: {
    chainId: '0xa', // 10
    chainName: 'Optimism',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [
      'https://mainnet.optimism.io',
      'https://rpc.ankr.com/optimism',
      'https://optimism-mainnet.public.blastapi.io',
    ],
    blockExplorerUrls: ['https://optimistic.etherscan.io/'],
  },
  56: {
    chainId: '0x38', // 56
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: [
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed1.defibit.io',
    ],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  137: {
    chainId: '0x89', // 137
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      'https://polygon-rpc.com',
      'https://rpc-mainnet.maticvigil.com',
      'https://rpc-mainnet.matic.network',
      'https://rpc-mainnet.matic.quiknode.pro',
    ],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  // 11155111: {
  // 	chainId: '0xaa36a7', // 11155111
  // 	chainName: 'Sepolia Test Network',
  // 	nativeCurrency: {
  // 		name: 'SEP',
  // 		symbol: 'SEP',
  // 		decimals: 18
  // 	},
  // 	rpcUrls: ['https://nunki.htznr.fault.dev/rpc', 'https://rpc.sepolia.dev', 'https://rpc.sepolia.online', 'https://www.sepoliarpc.space', 'https://rpc.sepolia.org', 'https://rpc-sepolia.rockx.com'],
  // 	blockExplorerUrls: ['https://sepolia.etherscan.io/']
  // }
}

// // e.g.
// const optimismChain: Chain = {
//   chainId: 10,
//   chainName: 'Optimism',
//   multicallAddress: '',
//   rpcUrl: 'https://mainnet.optimism.io',
//   blockExplorerUrl: 'https://optimistic.etherscan.io/',
//   nativeCurrency: {
//     name: 'ETH',
//     symbol: 'ETH',
//     decimals: 18,
//   }
// }

// TODO set readOnlyUrls from definition
const getUseDAppConfig = (): Config => {
  return {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/b8d655803ca04f6890611b8a1e43f466',
      [10]: new providers.JsonRpcProvider('https://mainnet.optimism.io'),
      [56]: new providers.JsonRpcProvider('https://bsc-dataseed1.binance.org'),
    },
    networks: [...DEFAULT_SUPPORTED_CHAINS],
  }
}

export { getUseDAppConfig }
