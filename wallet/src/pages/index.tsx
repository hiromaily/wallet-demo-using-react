import * as React from 'react';
import type { NextPage } from 'next'
import Link from 'next/link'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Layout from "../components/layout"
//import Style from '../styles/index.module.scss'

const Index: NextPage = () => {
  return (
    <Layout title="Router">
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Box sx={{ bgcolor: 'rgb(49, 58, 95)', height: '100vh' }}>
            <ul>
              <li>
                <Link href='/blog'>
                  <a>To Blog</a>
                </Link>
              </li>
              <li>
                <Link href='/contact'>
                  <a>To Contact</a>
                </Link>
              </li>
            </ul>
          </Box>
        </Container>
      </React.Fragment>
    </Layout>
  )
}

export default Index
