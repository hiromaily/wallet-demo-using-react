import '../styles/globals.css'
import type { AppProps } from 'next/app'

if (process.env.NODE_ENV === 'development') {
  const mockServer = () => import('@/mocks/worker')
  mockServer()
  //require('@/mocks/worker')
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
