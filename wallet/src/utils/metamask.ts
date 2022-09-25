import detectEthereumProvider from '@metamask/detect-provider'
import MetaMaskOnboarding from '@metamask/onboarding'
import { chainIDParamMap } from './chainid'
//import { storeChainID } from '$lib/metamask/store';
import { toDecimal } from './hex'

class Metamask {
  private provider: any

  constructor(provider: any) {
    this.provider = provider
  }

  // TODO: send transaction
  // https://docs.metamask.io/guide/sending-transactions.html

  // getAccount is equivalent to deprecated ethereum.enable()
  public async getAccount(): Promise<string> {
    // https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts
    const accounts = await this.provider.request({ method: 'eth_requestAccounts' })
    return accounts[0]
  }

  // get chainID
  public async chainID(): Promise<string> {
    //https://docs.metamask.io/guide/ethereum-provider.html#ethereum-chainid-deprecated
    return await this.provider.request({ method: 'eth_chainId' })
  }

  // get network version (would not use)
  public async networkVersion(): Promise<number> {
    // https://docs.metamask.io/guide/ethereum-provider.html#ethereum-networkversion-deprecated
    //return this.provider.networkVersion; // 1
    return await this.provider.request({ method: 'net_version' })
  }

  // get address array
  public async getAddress(): Promise<string[] | null> {
    // https://docs.metamask.io/guide/ethereum-provider.html#ethereum-selectedaddress-deprecated
    //return this.provider.selectedAddress; // null
    return await this.provider.request({ method: 'eth_accounts' })
  }

  // check current connection status
  public isConnected(): boolean {
    return this.provider.isConnected
  }

  // add network if not added yet
  // if network is already added, it automatically switch
  public async addEthereumChain(chainID: number) {
    // get chainParam
    if (!chainIDParamMap[chainID]) {
      // switch chain
      await this.switchEthereumChain(chainID)
      return
    }

    await this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [chainIDParamMap[chainID]],
    })
  }

  // switch network
  public async switchEthereumChain(chainID: number) {
    //const chainIDStr = '0x' + chainID.toString(16).toUpperCase();
    const chainIDStr = '0x' + chainID.toString(16)

    await this.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIDStr }],
    })
  }

  // Requests that the user tracks the token in MetaMask.
  // Returns a boolean indicating if the token was successfully added.
  public async watchAsset(token: string) {
    this.provider
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
            symbol: 'FOO',
            decimals: 18,
            image: 'https://foo.io/token-image.svg',
          },
        },
      })
      .then((success: boolean) => {
        if (success) {
          console.log(`${token} was successfully added to wallet!`)
        } else {
          throw new Error('Something went wrong.')
        }
      })
      .catch(console.error)
  }

  // set events
  public readyEvent() {
    // TODO: events
    // https://docs.metamask.io/guide/ethereum-provider.html#events
    this.provider.on('accountsChanged', (accounts: any) => {
      // Time to reload your interface with accounts[0]!
      console.log(`event[accountsChanged]: ${accounts[0]}`)
    })
    this.provider.on('chainChanged', (chainId: number) => {
      console.log(`event[chainChanged]: ${chainId}`)
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      //window.location.reload();

      // convert
      const chainId_ = toDecimal(chainId)
      console.log(`event[chainChanged] decimal: ${chainId}`)
      // FIXME: store chainId_ somewhere
      //storeChainID.set(chainId_);
    })
  }
}

const isMetamaskInstalled = (): boolean => {
  if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
    return true
  }
  return false
}

const getProvider = async (): Promise<unknown | undefined> => {
  const provider = await detectEthereumProvider()
  // FIXME: how to handle??
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?')
    return undefined
  }
  return provider
}

const openExtension = () => {
  // const link =
  // 	'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related';
  // window.open(link);
  const onboarding = new MetaMaskOnboarding()
  onboarding.startOnboarding()
}

export { Metamask, isMetamaskInstalled, getProvider, openExtension }
