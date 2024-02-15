import './App.scss'
import { SideBar } from '~/components/SideBar'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import { Login } from '~/pages/login'

function App() {
  return (
    <>
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Login />} />
          <Route path="/transactions" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
