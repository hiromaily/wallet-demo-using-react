import { renderHook, waitFor } from '@testing-library/react'
import { server } from '../mocks/server'
import { useFee } from './useFee'

// Mock Service Worker: setupServer()
// https://mswjs.io/docs/api/setup-server

describe('useFee hook test', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('something works', async () => {
    const { result } = renderHook(() => useFee())

    console.log(result.current)
    // result.current.fee
    // result.current.error
    // result.current.isLoading
    // result.current.setQueryparams

    // first result
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(undefined)

    // act(() => {
    //   jest.advanceTimersByTime(3000);
    // });

    await waitFor(() => {
      expect(result.current.fee.gas).toBe(0.05)
    })
    await waitFor(() => {
      expect(result.current.fee.bridgeFee).toBe(1.5)
    })
  })
})
