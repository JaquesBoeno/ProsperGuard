import React from 'react'

import './styles.scss'
import { LuLogOut } from 'react-icons/lu'

const UserCard: React.FC = () => {
  return (
    <div className="UserCard">
      <div>
        <img src="http://github.com/JaquesBoeno.png" />
        <div>
          <span>JaquesBoeno</span>
          <span>Premium</span>
        </div>
      </div>
      <button>
        <LuLogOut />
      </button>
    </div>
  )
}

export { UserCard }
