import React from 'react'

import './styles.scss'

const Overview: React.FC = () => {
  return (
    <div className="OverviewPage">
      <section>
        <h1>Visão geral</h1>
      </section>
      <section className="widgets">
        <div className="balance"></div>
        <div className="higherExpenses"></div>

        <div className="balance"></div>
        <div className="higherExpenses"></div>
      </section>
    </div>
  )
}

export { Overview }
