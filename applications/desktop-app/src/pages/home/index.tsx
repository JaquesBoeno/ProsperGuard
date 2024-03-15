import React from 'react'

import './styles.scss'
import { Greetings } from '~/components/greetings'

const Home: React.FC = () => {
  return (
    <div className="">
      <Greetings />
      <section>
        <h1>Overview</h1>
      </section>
      <div className="cards">
        <section>
          <h1>teste1</h1>
        </section>
        <section>
          <h1>teste 2</h1>
        </section>
      </div>
    </div>
  )
}

export { Home }
