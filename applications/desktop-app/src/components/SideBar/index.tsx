import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.scss'
import { FiHome } from 'react-icons/fi'
import { LuArrowUpDown } from 'react-icons/lu'
import { UserCard } from '~/components/UserCard'

const SideBar: React.FC = () => {
  // const location = useLocation()
  // let path = ['/', '/singup']
  // let show = !path.includes(location.pathname)
  let show = true
  return (
    <>
      {show && (
        <aside className="SideBar">
          <div>
            <div className="logo">
              <h1>ImagoTipo</h1>
            </div>
            <nav>
              <ul>
                <li>
                  <NavLink to={'/home'}>
                    <FiHome />
                    <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/transactions'}>
                    <LuArrowUpDown />
                    <span>Transactions</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <UserCard />
        </aside>
      )}
    </>
  )
}

export { SideBar }
