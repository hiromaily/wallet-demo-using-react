import { useState, useEffect } from 'react'

import List from '@mui/joy/List'
import ListDivider from '@mui/joy/ListDivider'
import ListItem from '@mui/joy/ListItem'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'
import { useFee } from '../hooks/useFee'
import type { Fee } from '../hooks/useFee'

const commonStyles = {
  bgcolor: 'rgb(67, 77, 115)',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  borderRadius: '16px',
  width: '200px',
  height: '260px',
  //display: 'flex',
  //justifyContent: 'center',
}

const TextStyle = styled.p`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const NetworkAPI = () => {
  // API call
  const { fee, isLoading, error, setQueryparams } = useFee()
  console.log(`fee: ${fee}, isLoading: ${isLoading}, error: ${error}`)

  const onClickConnect = () => {
    console.log('click connect')
    const ts = Date.now().toString()

    setQueryparams(`?timestamp=${ts}`)
  }

  return (
    <>
      <Box sx={{ marginLeft: '10px' }}>
        <Box sx={{ ...commonStyles }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, marginTop: '10px', marginBottom: '20px' }}
            >
              Fee API
            </Typography>
            <Button
              variant='outlined'
              size='medium'
              sx={{ minWidth: 120 }}
              onClick={onClickConnect}
            >
              Connect
            </Button>

            <Box>
              {isLoading && <CircularProgress />}
              {error && <TextStyle>error</TextStyle>}
              {fee && (
                <>
                  <p>{fee.gas}</p>
                  <p>{fee.bridgeFee}</p>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default NetworkAPI
