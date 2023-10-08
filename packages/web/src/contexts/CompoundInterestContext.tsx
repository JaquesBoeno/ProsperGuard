import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'
import {
  FvWithMonthlyAndInitial,
  Results,
} from '../utils/formulasFinancialMathematics'

interface CompoundInterestContextProps {
  // Values
  initialValue?: number
  monthlyContribution?: number
  interest?: number
  time?: number

  // Sets Values functions
  setInitialValue: Dispatch<SetStateAction<number | undefined>>
  setMonthlyContribution: Dispatch<SetStateAction<number | undefined>>
  setInterest: Dispatch<SetStateAction<number | undefined>>
  setTime: Dispatch<SetStateAction<number | undefined>>

  // results
  submit: () => void
  results?: Results
}

export const CompoundInterestContext = createContext(
  {} as CompoundInterestContextProps
)

interface CountdownProviderProps {
  children: ReactNode
}

export const CompoundInterestContextProvider: React.FC<
  CountdownProviderProps
> = ({ children }) => {
  const [initialValue, setInitialValue] = useState<number>()
  const [monthlyContribution, setMonthlyContribution] = useState<number>()
  const [interest, setInterest] = useState<number>()
  const [time, setTime] = useState<number>()
  const [results, setResults] = useState<Results>()

  const submit = () => {
    if (initialValue && monthlyContribution && interest && time) {
      console.log(initialValue, monthlyContribution, interest, time)
      setResults(
        FvWithMonthlyAndInitial(
          initialValue,
          monthlyContribution,
          interest / 100,
          time
        )
      )
    }
  }
  return (
    <CompoundInterestContext.Provider
      value={{
        initialValue,
        monthlyContribution,
        interest,
        time,
        setInitialValue,
        setMonthlyContribution,
        setInterest,
        setTime,
        results,
        submit,
      }}
    >
      {children}
    </CompoundInterestContext.Provider>
  )
}
