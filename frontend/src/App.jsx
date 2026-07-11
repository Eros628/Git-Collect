import {BrowserRouter, Routes, Route} from 'react-router';
import './App.css'
import Header from './components/Header';
import Login from './Pages/Login';
import Home from './Pages/Home';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { SkeletonTheme } from 'react-loading-skeleton';
import Repository from './Pages/Repository';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444" >
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='home' element={<Home />}></Route>
            <Route path='repository' element={<Repository />}></Route>
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </QueryClientProvider>
 
  )
}


export default App
