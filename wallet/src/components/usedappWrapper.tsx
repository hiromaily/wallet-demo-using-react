import { ReactNode } from 'react'
import { DAppProvider } from '@usedapp/core'
import { getUseDAppConfig } from '../utils/chainid'

type UseDappComponentProps = {
  children?: ReactNode
}

const UseDappWrapper = ({ children }: UseDappComponentProps) => {
  const config = getUseDAppConfig()

  return <DAppProvider config={config}>{children}</DAppProvider>
}

export default UseDappWrapper
