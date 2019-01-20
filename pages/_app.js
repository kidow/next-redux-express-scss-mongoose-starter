import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import 'styles/index.scss'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import reducer from 'store'

const makeStore = () => {
  if (process.env.NODE_ENV === 'development') createStore(reducer)
  else createStore(reducer)
}

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Head>
          <title>MERNS</title>
        </Head>
        <Component {...pageProps} />
        {/* <Provider store={store}>
          <Component {...pageProps} />
        </Provider> */}
      </Container>
    )
  }
}

// export default withRedux(makeStore)(CustomApp)
export default CustomApp
