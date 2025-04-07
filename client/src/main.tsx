import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SocketContextProvider from './contexts/SocketContext.tsx'
import ChatUserContextProvider from './contexts/chatUserContext.tsx'

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
       <SocketContextProvider>
         <ChatUserContextProvider>
           <App />
         </ChatUserContextProvider>
       </SocketContextProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>,
)
