
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://many-bull-70.hasura.app/v1/graphql', 
  headers: {
    'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN, 
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;