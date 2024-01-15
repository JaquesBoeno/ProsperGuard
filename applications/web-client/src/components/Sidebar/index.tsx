import React from 'react'

import './styles.scss'
import { UserCard } from '../UserCard'

const Sidebar: React.FC = () => {
  return (
    <aside>
      <div>Logo ImagoTipo</div>
      <nav>
        <ul>
          <li>OverView</li>
          <li>Transactions</li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </nav>
      <UserCard />
    </aside>
  )
}

export { Sidebar }
