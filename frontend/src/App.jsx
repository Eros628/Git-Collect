import {BrowserRouter, Routes, Route} from 'react-router';
import './App.css'
import Header from './components/Header';
import Login from './Pages/Login';
import Home from './Pages/Home';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='home' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
 
  )
}
import { Form } from 'lucide-react';

export default App
