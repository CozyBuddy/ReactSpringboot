import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

// 싱글 페이지 SPA
function App() {
  return (
    <QueryClientProvider client={queryClient}>
   <RouterProvider router={root}></RouterProvider> 
   </QueryClientProvider>
  );
}

export default App;
