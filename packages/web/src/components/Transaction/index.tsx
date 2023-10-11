import './styles.scss'

import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6'

export type TransactionType = {
  type: 'expense' | 'income'
  name: string
  description: string
  value: number
  date: string
}

const Transaction = ({
  type,
  name,
  description,
  value,
  date,
}: TransactionType) => {
  return (
    <div className="Transaction">
      <span className="type">
        {type == 'income' ? (
          <FaArrowDownLong color="var(--green)" />
        ) : (
          <FaArrowUpLong color="var(--red)" />
        )}
      </span>
      <span className="name">{name}</span>
      <span className="description">{description}</span>
      <span className="value">R$ {value.toFixed(2)}</span>
      <span className="date">{date}</span>
    </div>
  )
}

export { Transaction }
