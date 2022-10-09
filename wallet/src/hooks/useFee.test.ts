import { renderHook, waitFor, act } from '@testing-library/react'
import { rest } from 'msw'
import { useFee, feeURL } from './useFee'

// Mock Service Worker: setupServer()
// https://mswjs.io/docs/api/setup-server

const server = require('msw/node').setupServer(
  rest.get(feeURL, (req, res, ctx) => {
    const id = req.url.searchParams.get('id') // null or value

    switch (id) {
      case '1':
        return res(
          ctx.status(200),
          ctx.json({
            gas: 10,
            bridgeFee: 5,
          }),
        )
      case '99':
        return res(ctx.status(400))
      default:
        // first load
        return res(
          ctx.status(200),
          ctx.json({
            gas: 0.05,
            bridgeFee: 1.5,
          }),
        )
    }
  }),
)

describe('useFee hook test', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('first load', async () => {
    const { result } = renderHook(() => useFee())
    // result.current.fee
    // result.current.error
    // result.current.isLoading
    // result.current.setQueryparams

    // first result
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(undefined)

    await waitFor(() => {
      expect(result.current.fee.gas).toBe(0.05)
    })
    await waitFor(() => {
      expect(result.current.fee.bridgeFee).toBe(1.5)
    })
  })

  test('load with query', async () => {
    const { result } = renderHook(() => useFee())

    const ts = Date.now().toString()
    act(() => {
      result.current.setQueryparams(`?id=1`)
    })

    await waitFor(() => {
      expect(result.current.fee.gas).toBe(10)
    })
    await waitFor(() => {
      expect(result.current.fee.bridgeFee).toBe(5)
    })
  })

  test('bad status', async () => {
    const { result } = renderHook(() => useFee())

    act(() => {
      result.current.setQueryparams(`?id=99`)
    })

    await waitFor(() => {
      expect(result.current.fee).toBe(undefined)
    })

    await waitFor(() => {
      // maybe this error message is changeable
      expect(result.current.error.toString()).toContain('status code 400')
    })
  })
})
