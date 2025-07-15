import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import './styles/main.scss';
import App from './views/App'
import { Provider } from 'react-redux'
import store from './store/store'
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './components/AuthContext/AuthContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider anchorOrigin={{vertical: 'top', horizontial: 'right'}}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
