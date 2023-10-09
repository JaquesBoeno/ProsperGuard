import React from 'react'

import './styles.scss'
import { CompoundInterestCalculator } from '../../components/CompoundInterestCalculator'
import { CompoundInterestContextProvider } from '../../contexts/CompoundInterestContext'

const Calcs: React.FC = () => {
  return (
    <div className="CalcsPage">
      <CompoundInterestContextProvider>
        <CompoundInterestCalculator />
      </CompoundInterestContextProvider>
    </div>
  )
}

export { Calcs }
