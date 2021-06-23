import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://stirring-lacewing-70.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret':
      'UMHLZq62QZ4SkDR6VCAV0lbrMsNWDrLPlfzJK0M9gLujXGc4R0IBu5rSRxLN7pKd',
  },
})

const ApolloClientProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default ApolloClientProvider
