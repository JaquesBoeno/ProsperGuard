import { ChangeEvent, ComponentProps, MutableRefObject, forwardRef } from 'react'

import './styles.scss'
import { useIMask } from 'react-imask'
import { StandardInput } from '.'

type Props = ComponentProps<typeof StandardInput>

const CurrencyInput = forwardRef<HTMLInputElement, Props>(({ label, onChange, ...rest }, ref) => {
  const { ref: IMaskInput } = useIMask(
    {
      mask: 'R$ num',
      blocks: {
        num: {
          mask: Number,
          scale: 2,
          thousandsSeparator: '.',
          padFractionalZeros: true,
          radix: ',',
          mapToRadix: ['.'],
        },
      },
    },
    {
      onAccept(_value, _maskRef, e?) {
        if (!e) return

        onChange?.(e as unknown as ChangeEvent<HTMLInputElement>)
      },
    }
  )

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

export { CurrencyInput }
