import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.tsx'
import { Provider } from 'react-redux'
import {Auth0Provider} from '@auth0/auth0-react'
import { ApolloProvider } from '@apollo/client'
import client from './utils/apolloClient.ts'
import store  from './store/store.ts'
//import { PersistGate } from 'redux-persist/integration/react'
//import {auth} from './utils/firebase.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
    domain="dev-x5qghypom5284kf2.us.auth0.com"
    clientId="4Ii4N3HWkIJWXBPGX4D2VGl64pyEWvJh"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      
    <ApolloProvider client={client}>

    <App />
    </ApolloProvider>
  
    </Provider>
    </Auth0Provider>
  </StrictMode>,
)
