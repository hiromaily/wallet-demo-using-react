import { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'

type LayoutProps = {
  children?: ReactNode
  title: string
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Header title={title} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
