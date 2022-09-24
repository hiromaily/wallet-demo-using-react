const decodeHexString = (str: string): Uint8Array => {
  return Buffer.from(stripHexPrefix(str), 'hex')
}

const stripHexPrefix = (str: string): string => {
  if (typeof str !== 'string') {
    return str
  }
  return str.slice(0, 2) === '0x' ? str.slice(2) : str
}

const toDecimal = (hex: number): number => {
  return parseInt(hex.toString(), 16)
}

export { decodeHexString, toDecimal }
