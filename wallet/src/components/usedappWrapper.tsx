import { ReactNode } from 'react'
import { DAppProvider } from '@usedapp/core'
import { getConfig } from '../utils/useDApp'

type UseDappComponentProps = {
  children?: ReactNode
}

const UseDappWrapper = ({ children }: UseDappComponentProps) => {
  const config = getConfig()

  return <DAppProvider config={config}>{children}</DAppProvider>
}

export default UseDappWrapper
