import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SocketContextProvider from './contexts/SocketContext.tsx'

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
       <SocketContextProvider>
         <App />
       </SocketContextProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>,
)
