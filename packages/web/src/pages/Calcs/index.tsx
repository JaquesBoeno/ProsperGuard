import React from 'react'

import './styles.scss'
import { CompoundInterestCalculator } from '../../components/CompoundInterestCalculator'
import { EquivalenceOfFeesCalculator } from '../../components/EquivalenceOfFeesCalculator'

const Calcs: React.FC = () => {
  return (
    <div className="CalcsPage">
      <CompoundInterestCalculator />
      <EquivalenceOfFeesCalculator />
    </div>
  )
}

export { Calcs }
