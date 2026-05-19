import {BrowserRouter, Routes, Route} from 'react-router';
import './App.css'
import Header from './components/Header';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path='login' element={<Login />}></Route>
 
      </Routes>
    </BrowserRouter>
  )
}

export default App
