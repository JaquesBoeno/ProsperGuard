import React, { useContext, useEffect, useState } from 'react'

import './styles.scss'
import { CurrencyInput } from '../../components/Input/CurrencyInput'
import { StandardInput } from '../../components/Input'
import { CompoundInterestContext } from '../../contexts/CompoundInterestContext'
import { Line } from 'react-chartjs-2'
import { FvWithMonthlyAndInitial } from '../../utils/formulasFinancialMathematics'

import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  Filler,
} from 'chart.js'
import { formatDigits } from '../../utils/formatNumber'

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  Filler
)
interface DataInterface {
  fv: Array<Number>
  totalInvested: Array<Number>
  labels: Array<String>
}

const Calcs: React.FC = () => {
  const [data, setData] = useState<DataInterface>({
    fv: [0],
    totalInvested: [0],
    labels: ['0'],
  })

  const {
    setInitialValue,
    setMonthlyContribution,
    setInterest,
    setTime,
    submit,
    results,
    initialValue,
    interest,
    monthlyContribution,
    time,
  } = useContext(CompoundInterestContext)

  useEffect(() => {
    if (initialValue && monthlyContribution && interest && time) {
      let tempData = []
      if (time >= 120 && time % 12 == 0) {
        for (let i = 0; i <= time / 12; i++) {
          tempData.push(
            FvWithMonthlyAndInitial(
              initialValue,
              monthlyContribution,
              interest,
              i * 12
            )
          )
        }

        setData({
          fv: tempData.map((i) => {
            return i.fv
          }),
          totalInvested: tempData.map((i) => {
            return i.totalInvested
          }),
          labels: tempData.map((_i, key) => {
            return key.toString()
          }),
        })
      } else {
        for (let i = 0; i < time; i++) {
          tempData.push(
            FvWithMonthlyAndInitial(
              initialValue,
              monthlyContribution,
              interest,
              i
            )
          )
        }
        setData({
          fv: tempData.map((i) => {
            return i.fv
          }),
          totalInvested: tempData.map((i) => {
            return i.totalInvested
          }),
          labels: tempData.map((_i, key) => {
            return (key + 1).toString()
          }),
        })
      }
    }
  }, [results])

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
            <span>R$ {formatDigits(results?.totalInvested)}</span>
          </p>
          <p>
            Valor final
            <br /> <span>R$ {formatDigits(results?.fv)}</span>
          </p>
          <p>
            Dividendos <br />
            <span>R$ {formatDigits(results?.totalDividends)}</span>
          </p>
        </div>

        <div className="graph">
          <Line
            datasetIdKey="CompoundInterestGraph"
            data={{
              labels: data.labels,
              datasets: [
                {
                  label: 'valor investido',
                  data: data.totalInvested,
                  fill: true,
                  backgroundColor: 'rgb(75, 192, 192,0.5)',
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1,
                },
                {
                  label: 'valor total',
                  data: data.fv,
                  fill: true,
                  backgroundColor: 'rgb(156, 204, 101,0.5)',
                  borderColor: 'rgb(156, 204, 101)',
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
      </section>
    </div>
  )
}

export { Calcs }
