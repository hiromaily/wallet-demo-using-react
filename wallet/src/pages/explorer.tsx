import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import type { NextPage, GetServerSideProps } from 'next'
import * as React from 'react'

import Layout from '../components/layout'

type ExplorerProps = {
  message: string
}

const Explorer: NextPage<ExplorerProps> = ({ message }) => {
  return (
    <Layout title='Router'>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Box sx={{ bgcolor: 'rgb(49, 58, 95)', height: '100vh' }}>
            <h1>Explorer</h1>
            <p>{message}</p>
          </Box>
        </Container>
      </React.Fragment>
    </Layout>
  )
}

export default Explorer

// For SSR
export const getServerSideProps: GetServerSideProps<ExplorerProps> = async (context) => {
  const timestamp = new Date().toLocaleString()
  const message = `getStaticProps is called at ${timestamp}`

  return {
    props: {
      message,
    },
  }
}
