import { createEffect, onMount, splitProps } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'

type ShortTextInputProps = {
  ref: HTMLInputElement | undefined
  onInput: (value: string) => void
  fontSize?: number
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'onInput'>

export const ShortTextInput = (props: ShortTextInputProps) => {
  const [local, others] = splitProps(props, ['ref', 'onInput'])

  // Listen to input value changes and fire onInput callback
  createEffect(() => {
    const flowise = document.querySelectorAll('flowise-chatbot')

    if (flowise.length > 1) {
      const input = flowise[1].shadowRoot?.querySelectorAll('#chatbot-text-input')

      input?.forEach((i) => {
        i.addEventListener('input', (e: any) => {
          props.onInput(e.target.value)
        })
      })
    }

    // const input = flowise?.shadowRoot?.querySelectorAll('#chatbot-text-input')

    // input?.addEventListener('input', (e) => {
    //   console.log(e.target.value)
    //   // props.ref &&
    //   //   props.ref?.addEventListener('input', (e) => {
    //   //     console.log(e.target.value)
    //   //   })
    // })
  })

  return (
    <input
      ref={props.ref}
      class='focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input'
      type='text'
      style={{ 'font-size': props.fontSize ? `${props.fontSize}px` : '16px' }}
      onInput={(e) => local.onInput(e.currentTarget.value)}
      {...others}
    />
  )
}
