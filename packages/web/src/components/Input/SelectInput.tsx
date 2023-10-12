import { forwardRef } from 'react'

import './styles.scss'
type option = {
  name: string
  value: string
  selected?: boolean
}

interface SelectInputProps {
  label: string
  options: option[]
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, options, ...rest }, ref) => {
    return (
      <div className="InputComponent">
        <select ref={ref} className="SelectInput" required {...rest}>
          <option disabled selected className="default" value=""></option>

          {options.map((option, index) => {
            return (
              <option
                value={option.value}
                key={index}
                selected={option.selected ? option.selected : false}
              >
                {option.name}
              </option>
            )
          })}
        </select>
        <span>{label}</span>
      </div>
    )
  }
)

export { SelectInput }
