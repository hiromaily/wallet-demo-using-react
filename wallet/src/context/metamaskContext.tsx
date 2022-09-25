import { createContext, ReactNode } from 'react'
import { useMetamask } from '../hooks/useMetamask'

// context requires actual property if it has, don't set `{}`
const MetaMaskContext = createContext({
  isConnected: false,
  isInstalled: (): boolean => {
    return false
  },
  connect: async () => {
    return ''
  },
  disconnect: () => {},
})

type MetaMaskProviderProps = {
  children: ReactNode
}

// - wrap component which want to use useMetamask
// - child component must use
//  const {isConnected, isInstalled, connect, disconnect } = useContext(MetamaskContext)

const MetaMaskProvider = ({ children }: MetaMaskProviderProps) => {
  // use hook first
  //const [isConnected, setConnectionStatus] = useState(false)
  const { isConnected, isInstalled, connect, disconnect } = useMetamask()

  const value = {
    isConnected,
    isInstalled,
    connect,
    disconnect,
  }

  return <MetaMaskContext.Provider value={value}>{children}</MetaMaskContext.Provider>
}

export { MetaMaskContext, MetaMaskProvider }
