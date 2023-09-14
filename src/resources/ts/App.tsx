import React from 'react';
import Router from './router';
import {QueryClient, QueryClientProvider} from 'react-query';
import { Route } from 'react-router-dom';

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
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  )
}

export default App