import './App.scss'
import { SideBar } from '~/components/SideBar'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from '~/pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <SideBar />
        <Login />
      </>
    ),
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
