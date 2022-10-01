import { setupServer } from 'msw/node'
//import { setupServer } from 'msw/node/lib/index.js'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
