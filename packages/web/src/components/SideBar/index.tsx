import React from 'react'

import './styles.scss'
import { Link } from 'react-router-dom'

const SideBar: React.FC = () => {
  return (
    <aside>
      <h1>App logo</h1>
      <ul>
        <li>
          <Link to="/">juros composto</Link>
        </li>
      </ul>
    </aside>
  )
}

export { SideBar }
