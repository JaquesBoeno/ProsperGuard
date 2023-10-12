import { createContext, ReactNode, useState } from 'react'
import { TransactionType } from '../components/Transaction'

interface TransactionContextData {
  transactions: TransactionType[] | undefined
  createTransaction: ({}: TransactionType) => void
}

interface TransactionContextProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextData)

export const TransactionContextProvider = ({
  children,
}: TransactionContextProviderProps) => {
  const [transactions, setTransactions] = useState<
    TransactionType[] | undefined
  >()

  const createTransaction = ({
    type,
    name,
    description,
    value,
    date,
  }: TransactionType) => {
    if (transactions) {
      setTransactions([
        ...transactions,
        {
          type,
          name,
          description,
          value,
          date,
        },
      ])
    } else {
      setTransactions([
        {
          type,
          name,
          description,
          value,
          date,
        },
      ])
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
