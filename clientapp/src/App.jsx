import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import ForgotPassword from './Components/ForgotPassword'
import Dashboard from './Pages/Dashboard'
import ItemGroup from './Pages/Itemgroup'
import Item from './Pages/Item'

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
      <Route path="/itemgroup" element={<ItemGroup />}></Route>
      <Route path="/items" element={<Item />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

