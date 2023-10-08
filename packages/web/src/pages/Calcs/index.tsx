import React, { useContext } from 'react'

import './styles.scss'
import { CurrencyInput } from '../../components/Input/CurrencyInput'
import { StandardInput } from '../../components/Input'
import { CompoundInterestContext } from '../../contexts/CompoundInterestContext'

const Calcs: React.FC = () => {
  const {
    setInitialValue,
    setMonthlyContribution,
    setInterest,
    setTime,
    submit,
    results,
  } = useContext(CompoundInterestContext)

  return (
    <div className="CalcsPage">
      Compo
      <section className="CompoundInterest">
        <h1>Calculo de Juros Compostos</h1>
        <div className="InputsWrapper">
          <CurrencyInput
            setOutputValue={setInitialValue}
            label="Valor Inicial"
          />
          <CurrencyInput
            setOutputValue={setMonthlyContribution}
            label="Aporte Mensal"
          />
          <StandardInput
            inputType="number"
            setOutputValue={setInterest}
            label="Juros (ao mês)"
          />
          <StandardInput
            inputType="number"
            setOutputValue={setTime}
            label="Período (em meses)"
          />
          <button onClick={submit}>teste</button>
        </div>
        <div className="results">
          <p>
            Valor investido <br />
            <span>R$ {results?.totalInvested}</span>
          </p>
          <p>
            Valor final
            <br /> <span>R$ {results?.fv}</span>
          </p>
          <p>
            Dividendos <br />
            <span>R$ {results?.totalDividends}</span>
          </p>
        </div>
        <div className="graph"></div>
      </section>
    </div>
  )
}

export { Calcs }
