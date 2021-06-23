import ApolloClientProvider from '../client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloClientProvider>
      <Component {...pageProps} />
    </ApolloClientProvider>
  )
}

export default MyApp
