import { useState, ReactNode } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEthers } from '@usedapp/core'
import { chainIDMap } from '../utils/chainid'
import NetworkDialog from './networkDialog'

type NetworkSwitcherProps = {
  children?: ReactNode
}

const NetworkSwitcher = ({ children }: NetworkSwitcherProps) => {
  const { chainId, switchNetwork } = useEthers()
  const [open, setOpen] = useState(false)
  const currentChain = chainIDMap[chainId || 1] || ''
  //console.log(`NetworkSwitcher() ${chainId}`)

  const [selectedValue, setSelectedValue] = useState(currentChain)

  const onClickOpen = () => {
    setOpen(true)
  }

  const onClickSelected = (key: string, value: string) => {
    //TODO switch
    if (parseInt(key)) {
      switchNetwork(parseInt(key))
    }

    onClickClose(value)
  }

  const onClickClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <>
      <Typography variant='subtitle1' component='div'>
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant='outlined' onClick={onClickOpen}>
        Open Network Dialog
      </Button>
      <NetworkDialog
        selectedValue={selectedValue}
        open={open}
        onClickClose={onClickClose}
        onClickSelected={onClickSelected}
      />
    </>
  )
}

export default NetworkSwitcher
