import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ConnectButton from './connectButton'

const onClickConnect = async () => {
  console.log('onClickConnect')
}

describe('ConnectButton component', () => {
  test('button name works', () => {
    render(<ConnectButton isConnected={false} onClick={onClickConnect} />)

    const button = screen.getByRole('Button')
    expect(button).toHaveTextContent('Connect to a wallet')
  })
})
