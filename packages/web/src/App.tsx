import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { SideBar } from './components/SideBar'
import { Calcs } from './pages/Calcs'
import { Overview } from './pages/Overview'
import { TransactionContextProvider } from './contexts/TransactionContext'

const App = () => {
  return (
    <div className="AppContainer">
      <BrowserRouter>
        <SideBar />
        <div className="pages container">
          <Routes>
            <Route
              path="/"
              element={
                <TransactionContextProvider>
                  <Overview />
                </TransactionContextProvider>
              }
            />
            <Route path="/calcs" element={<Calcs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export { App }
