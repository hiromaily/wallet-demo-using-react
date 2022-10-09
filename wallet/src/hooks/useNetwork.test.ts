import { renderHook, waitFor, act } from '@testing-library/react'
import { rest } from 'msw'
import { useNetwork, networkURL } from './useNetwork'

// Mock Service Worker: setupServer()
// https://mswjs.io/docs/api/setup-server

let serverCounter = 0
const networkOptimism = {
  id: 10,
  name: 'Optimism',
  rpcUrls: [
    'https://mainnet.optimism.io',
    'https://rpc.ankr.com/optimism',
    'https://optimism-mainnet.public.blastapi.io',
  ],
  blockExplorerUrls: ['https://optimistic.etherscan.io/'],
}
const networkBNB = {
  id: 56,
  name: 'Binance Smart Chain Mainnet',
  rpcUrls: [
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
  ],
  blockExplorerUrls: ['https://bscscan.com/'],
}
const networkPolygon = {
  id: 137,
  name: 'Polygon Mainnet',
  rpcUrls: [
    'https://polygon-rpc.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.network',
  ],
  blockExplorerUrls: ['https://polygonscan.com/'],
}

const server = require('msw/node').setupServer(
  rest.get(networkURL, (req, res, ctx) => {
    //const id = req.url.searchParams.get('id') // null or value
    serverCounter++

    switch (serverCounter) {
      // first load
      case 1:
        return res(ctx.status(200), ctx.json([networkOptimism, networkBNB]))
      case 2:
        // mutate
        return res(ctx.status(200), ctx.json([networkOptimism, networkBNB, networkPolygon]))
      default:
        // error
        return res(ctx.status(400))
    }
  }),
)

describe('useFee hook test', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('first load', async () => {
    const { result } = renderHook(() => useNetwork())
    // result.current.network
    // result.current.error
    // result.current.isLoading
    // result.current.mutate

    // first result
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(undefined)

    await waitFor(() => {
      expect(result.current.network.length).toBe(2)
    })
  })

  test('load with query', async () => {
    const { result } = renderHook(() => useNetwork())

    act(() => {
      result.current.mutate()
    })

    await waitFor(() => {
      expect(result.current.network.length).toBe(3)
    })
  })

  test('bad status', async () => {
    const { result } = renderHook(() => useNetwork())

    act(() => {
      result.current.mutate()
    })

    await waitFor(() => {
      // maybe this error message is changeable
      expect(result.current.error.toString()).toContain('status code 400')
    })
  })
})
