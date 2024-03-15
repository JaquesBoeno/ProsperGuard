import './App.scss'
import { SideBar } from '~/components/SideBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '~/pages/login'
import { Home } from '~/pages/home'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="GlobalContainer">
          <SideBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/transactions" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
