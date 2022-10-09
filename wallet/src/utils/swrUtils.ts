import type { Middleware, SWRHook } from 'swr'

// e.g.
// useSWR(key, fetcher, { use: [endpoint] })
//  or
// <SWRConfig value={{ use: [endpoint] }}>
//   <Target />
// </SWRConfig>
const endpoint: Middleware = (useSWRNext: SWRHook) => {
  return (key, fetcher, config) => {
    let newKey = key
    if (process.env.API_ENDPOINT) newKey = `${process.env.API_ENDPOINT}${key}`
    console.log(`newKey: ${newKey}`)
    return useSWRNext(newKey, fetcher, config)
  }
}

const configs = {
  use: [endpoint],
  // onError: (error: any, key: string) => {
  //   // WIP how to skip Mock Service Worker specific error
  //   if (error && typeof error === 'string' && error.includes('SyntaxError: Unexpected token'))
  //     return
  // },
}

export { endpoint, configs }
