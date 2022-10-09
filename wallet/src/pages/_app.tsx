import '../styles/globals.css'
import type { AppProps } from 'next/app'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const mockServer = () => import('@/mocks/worker')
  mockServer()
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
