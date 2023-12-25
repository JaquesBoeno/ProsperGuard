import React, { useState } from 'react'

import './styles.scss'
import { FiSidebar } from 'react-icons/fi'
import { MdLogout, MdOutlineDarkMode } from 'react-icons/md'
import { LuHome, LuCalculator } from 'react-icons/lu'
import { GrTransaction } from 'react-icons/gr'
import { Link } from 'react-router-dom'

const SideBar: React.FC = () => {
  const [visible, setVisible] = useState(true)
  const toggleVisible = () => {
    setVisible(!visible)
  }
  return (
    <aside className={'closed-' + visible}>
      <button className="indicator" onClick={toggleVisible}>
        <FiSidebar />
      </button>
      <div className="TopBox">
        <img className="imagotipo" src="/logos/imagotipo.svg" alt="Finance Manager" />
        <img className="isotipo" src="/logos/isotipo.svg" alt="Finance Manager" />
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
      <div className="BottomBox">
        <button className="Logout">
          <MdLogout />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export { SideBar }
