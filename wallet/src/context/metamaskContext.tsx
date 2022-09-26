import { createContext, useContext, ReactNode } from 'react'
import { useMetamask } from '../hooks/useMetamask'

// context requires actual property if it has, don't set `{}`
//const MetaMaskContext = createContext(getDefault())
const MetaMaskContext = createContext({} as any)

const useMetaMaskContext = () => {
  return useContext(MetaMaskContext)
}

type MetaMaskProviderProps = {
  children: ReactNode
}

// - wrap component which want to use useMetamask
// - child component must use
//  const {isConnected, isInstalled, connect, disconnect } = useContext(MetamaskContext)

const MetaMaskProvider = ({ children }: MetaMaskProviderProps) => {
  // use hook first
  //const [isConnected, setConnectionStatus] = useState(false)
  const { address, isConnected, isInstalled, connect, disconnect } = useMetamask()

  const value = {
    address,
    isConnected,
    isInstalled,
    connect,
    disconnect,
  }

  return <MetaMaskContext.Provider value={value}>{children}</MetaMaskContext.Provider>
}

export { useMetaMaskContext, MetaMaskProvider }
