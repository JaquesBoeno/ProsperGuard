import { forwardRef } from 'react'

import './styles.scss'
type option = {
  name: string
  value: string
  selected?: boolean
}

interface SelectInputProps {
  label: string
  errors?: string
  options: option[]
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, options, errors, ...rest }, ref) => {
    return (
      <div className="InputComponent">
        <div>
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
        <p className="error">{errors}</p>
      </div>
    )
  }
)

export { SelectInput }
