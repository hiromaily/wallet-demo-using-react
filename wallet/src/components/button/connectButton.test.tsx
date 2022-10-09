import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import ConnectButton from './connectButton'

const onClickConnect = async () => {
  console.log('onClickConnect')
}

describe('ConnectButton component', () => {
  afterEach(() => cleanup())

  // table driven test
  test.each([
    { title: 'name when connected', arg: true, result: 'Disconnect' },
    { title: 'name when not connected', arg: false, result: 'Connect to a wallet' },
  ])('$title', ({ arg, result }) => {
    render(<ConnectButton isConnected={arg} onClick={onClickConnect} />)

    const button = screen.getByRole('button')
    //screen.debug(button.textContent)
    expect(button).toHaveTextContent(result)
  })

  // just different way to check name
  test('button name', () => {
    render(<ConnectButton isConnected={false} onClick={onClickConnect} />)
    expect(screen.getByText('Connect to a wallet')).toBeInTheDocument()
  })

  test('button click', async () => {
    const logSpy = jest.spyOn(console, 'log')

    render(<ConnectButton isConnected={false} onClick={onClickConnect} />)
    const button = screen.getByRole('button')
    // event requires await
    await userEvent.click(button)

    // check console log
    expect(logSpy).toHaveBeenCalledWith('onClickConnect')
  })
})
