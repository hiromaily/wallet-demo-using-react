import { ReactNode } from 'react'
import Footer from './footer'
import Header from './header'
//import { MetaMaskProvider } from 'metamask-react'
import { MetaMaskProvider } from '../context/metamaskContext'

type LayoutProps = {
  children?: ReactNode
  title: string
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <MetaMaskProvider>
        <Header title={title} />
      </MetaMaskProvider>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
