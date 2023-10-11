import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { SideBar } from './components/SideBar'
import { Calcs } from './pages/Calcs'
import { Overview } from './pages/Overview'

const App = () => {
  return (
    <div className="AppContainer">
      <BrowserRouter>
        <SideBar />
        <div className="pages container">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/calcs" element={<Calcs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export { App }
