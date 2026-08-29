import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
// import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { appStore } from './store/store.ts'
// import { queryClient } from './api/client-service.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={appStore}>
      {/* <QueryClientProvider client={queryClient}> */}
      <App />
      {/* </QueryClientProvider> */}
    </Provider>
  </StrictMode>,
)