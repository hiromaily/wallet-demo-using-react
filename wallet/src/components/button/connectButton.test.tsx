import { ButtonRoot } from '@mui/joy/Button/Button'
import { render, screen } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'

import ConnectButton from './connectButton'

const onClickConnect = async () => {
  console.log('onClickConnect')
}

describe('ConnectButton component', () => {
  // table driven test
  test.each([
    { title: 'connected', arg: true, result: 'Disconnect' },
    { title: 'not connected', arg: false, result: 'Connect to a wallet' },
  ])('$title', ({ arg, result }) => {
    render(<ConnectButton isConnected={arg} onClick={onClickConnect} />)

    const button = screen.getByRole('button')
    //screen.debug(button.textContent)
    expect(button.textContent).toBe(result)
  })
})
