import React from 'react';
import Router from './router';
import {QueryClient, QueryClientProvider} from 'react-query';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './hooks/AuthContext'

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {// 主にデータを更新する際に使用
        retry: false,
      }
    }
  })
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
          <ToastContainer hideProgressBar={true} />
        </QueryClientProvider>
      </AuthProvider>
    </>
  )
}

export default App