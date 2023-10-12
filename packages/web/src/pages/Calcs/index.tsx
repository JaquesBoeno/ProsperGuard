import React from 'react'

import './styles.scss'
import { CompoundInterestCalculator } from '../../components/CompoundInterestCalculator'

const Calcs: React.FC = () => {
  return (
    <div className="CalcsPage">
      <CompoundInterestCalculator />
    </div>
  )
}

export { Calcs }
