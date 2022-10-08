const decodeHexString = (str: string): Uint8Array => {
  return Buffer.from(stripHexPrefix(str), 'hex')
}

const stripHexPrefix = (str: string): string => {
  if (typeof str !== 'string') {
    return str
  }
  return str.slice(0, 2) === '0x' ? str.slice(2) : str
}

// convert hex number to decimal number
const toDecimal = (hex: number): number => {
  return parseInt(hex.toString(), 10)
}

const hexStrToDecimal = (hex: string): number => {
  return parseInt(hex.toString(), 16)
}

export { decodeHexString, stripHexPrefix, toDecimal, hexStrToDecimal }
