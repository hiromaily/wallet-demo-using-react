import { useState, useEffect, ReactNode } from 'react'
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

  const [selectedValue, setSelectedValue] = useState('')

  const onClickOpen = () => {
    setOpen(true)
  }

  const onClickSelected = (chainId: string) => {
    if (parseInt(chainId)) switchNetwork(parseInt(chainId))
    onClickClose()
  }

  const onClickClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!chainId) return
    const currentChain = chainIDMap[chainId || 1] || ''
    setSelectedValue(currentChain)
  }, [chainId])

  return (
    <>
      <Typography variant='subtitle1' component='div'>
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant='outlined' size='medium' sx={{ minWidth: 120 }} onClick={onClickOpen}>
        Network Dialog
      </Button>
      <NetworkDialog open={open} onClickClose={onClickClose} onClickSelected={onClickSelected} />
    </>
  )
}

export default NetworkSwitcher
