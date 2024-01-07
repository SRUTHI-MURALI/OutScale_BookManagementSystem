import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import Store from './Components/Redux/Store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="http://379707791102-nnqqs48pvp8ncpdphe660658gd0b9ifp.apps.googleusercontent.com">
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  </GoogleOAuthProvider>
)
