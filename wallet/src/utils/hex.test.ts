import { stripHexPrefix, toDecimal, hexStrToDecimal } from './hex'

// temporarily skipped by xdescribe
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

  // table driven test
  test.each([
    { title: 'toDecimal 1', arg: 0x73f, result: 1855 },
    { title: 'toDecimal 2', arg: 0x1a6, result: 422 },
    { title: 'toDecimal 3', arg: 0x185f8, result: 99832 },
  ])('$title', ({ arg, result }) => {
    expect(toDecimal(arg)).toBe(result)
  })

  test('hexStrToDecimal works', () => {
    expect(hexStrToDecimal('0x3e8')).toBe(1000)
  })
})
