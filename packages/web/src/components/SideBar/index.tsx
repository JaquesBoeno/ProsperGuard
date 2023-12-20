import React from 'react'

import './styles.scss'
import { MdLogout } from 'react-icons/md'
import { LuHome, LuCalculator } from 'react-icons/lu'
import { GrTransaction } from 'react-icons/gr'
import { Link } from 'react-router-dom'

const SideBar: React.FC = () => {
  return (
    <aside>
      <div className="TopBox">
        <img src="/logos/imagotipo.svg" alt="Finance Manager" />
        <ul>
          <li>
            <Link to="/">
              <LuHome />
              <span>Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link to="/transactions">
              <GrTransaction />
              <span>Transações</span>
            </Link>
          </li>
          <li>
            <Link to="/calcs">
              <LuCalculator />
              <span>Calculadora</span>
            </Link>
          </li>
        </ul>
      </div>
      <button className="Logout">
        <MdLogout />
        <span>Logout</span>
      </button>
    </aside>
  )
}

export { SideBar }
