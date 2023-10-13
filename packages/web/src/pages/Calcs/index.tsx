import React from 'react'

import './styles.scss'
import { CompoundInterestCalculator } from '../../components/CompoundInterestCalculator'
import { EquivalenceOfFees } from '../../components/EquivalenceOfFees'

const Calcs: React.FC = () => {
  return (
    <div className="CalcsPage">
      <CompoundInterestCalculator />
      <EquivalenceOfFees />
    </div>
  )
}

export { Calcs }
