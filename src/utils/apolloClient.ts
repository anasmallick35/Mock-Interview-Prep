
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://many-bull-70.hasura.app/v1/graphql', 
  headers: {
    'x-hasura-admin-secret': 'pDluVTLhrXA67czMb3TfqIWuxlL0s7GbU7Gugg4Io7Tmm99j0rqGSM4eE2mbdIJg'
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;