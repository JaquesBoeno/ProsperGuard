import { ComponentProps, MutableRefObject, forwardRef } from 'react'

import './styles.scss'
import { useIMask } from 'react-imask'
import { StandardInput } from '.'

type Props = ComponentProps<typeof StandardInput>

const DateInput = forwardRef<HTMLInputElement, Props>(({ label, ...rest }, ref) => {
  const pattern = 'd{/}`m{/}`Y'

  const format = (date: Date) => {
    if (!date) return ''
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return [day, month, year].join('/')
  }

  const parse = (str: string) => {
    const [day, month, year] = str.split('/').map(Number)
    return new Date(year, month - 1, day)
  }

  const { ref: IMaskInput } = useIMask({
    mask: Date,
    pattern: pattern,
    format: (value: any) => format(value),
    parse: (value: any) => parse(value),
  })

  const inputMaskRef = IMaskInput as MutableRefObject<HTMLInputElement>

  function handleRefs(instance: HTMLInputElement | null) {
    if (ref) {
      if (typeof ref === 'function') {
        ref(instance)
      } else {
        ref.current = instance
      }
    }

    if (instance) {
      inputMaskRef.current = instance
    }
  }

  return <StandardInput ref={handleRefs} label={label} {...rest} />
})

export { DateInput }
