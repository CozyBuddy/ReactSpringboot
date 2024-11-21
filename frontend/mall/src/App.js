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
    <QueryClientProvider client={queryClient} > 
      <div className="h-full">
   <RouterProvider router={root} className="h-full"></RouterProvider> 
   </div>
   </QueryClientProvider>
  );
}

export default App;
