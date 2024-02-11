import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.scss'

const SideBar: React.FC = () => {
  return (
    <aside className="SideBar">
      <h1>teste</h1>
      <nav>
        <ul>
          <li>
            <NavLink to={'/'}>OverView</NavLink>
          </li>
          <li>
            <NavLink to={'/'}>OverView</NavLink>
          </li>
          <li>
            <NavLink to={'/'}>OverView</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export { SideBar }
