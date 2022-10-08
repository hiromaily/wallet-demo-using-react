import { stripHexPrefix, toDecimal, hexStrToDecimal } from './hex'

describe('hex functions', () => {
  test('stripHexPrefix works', () => {
    expect(stripHexPrefix('0x9cf8dbb8ebd')).toBe('9cf8dbb8ebd')
  })

  test('check how toString and parseInt work', () => {
    // enough to convert to decimal by toString
    expect((0x3e8).toString()).toBe('1000')
    expect(parseInt('1000', 10)).toBe(1000)

    expect(parseInt('1f4', 16)).toBe(500)
    expect(parseInt('3e8', 16)).toBe(1000)
  })

  test('toDecimal works', () => {
    expect(toDecimal(0x3e8)).toBe(1000)
  })

  test('hexStrToDecimal works', () => {
    expect(hexStrToDecimal('0x3e8')).toBe(1000)
  })
})
