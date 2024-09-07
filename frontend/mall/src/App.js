import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import root from './router/root';

// 싱글 페이지 SPA
function App() {
  return (
   <RouterProvider router={root}></RouterProvider>  
  );
}

export default App;
