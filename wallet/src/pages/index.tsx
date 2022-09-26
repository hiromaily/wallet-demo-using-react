import * as React from 'react'
import type { NextPage, GetStaticProps } from 'next'
import Bridge from '../components/bridge'
import Layout from '../components/layout'
//import Style from '../styles/index.module.scss'

type IndexProps = {
  message: string
}

const Index: NextPage<IndexProps> = ({ message }) => {
  return (
    <Layout title='Router'>
      <Bridge message={message} />
    </Layout>
  )
}

export default Index

// For SSG
export const getStaticProps: GetStaticProps<IndexProps> = async (context) => {
  const timestamp = new Date().toLocaleString()
  const message = `getStaticProps is called at ${timestamp}`
  return {
    props: {
      message,
    },
  }
}
