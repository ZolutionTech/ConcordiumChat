import { ShortTextInput } from './ShortTextInput'
import { SendButton } from '@/components/SendButton'
import { getShadowRoot } from '@/utils'
// import { getShadowRoot } from '@/utils'
import useIsSmallScreen from '@/utils/useIsSmallScreen'
import { createSignal, onMount } from 'solid-js'

type Props = {
  placeholder?: string
  backgroundColor?: string
  textColor?: string
  sendButtonColor?: string
  defaultValue?: string
  fontSize?: number
  onSubmit: (value: string) => void
  scrollToBottom?: () => void
}

const defaultBackgroundColor = '#ffffff'
const defaultTextColor = '#303235'

export const TextInput = (props: Props) => {
  const [inputValue, setInputValue] = createSignal(props.defaultValue ?? '')
  let inputRef: HTMLInputElement | HTMLTextAreaElement | undefined
  let inputContainerRef: HTMLDivElement | undefined

  const handleInput = (inputValue: string) => setInputValue(inputValue)

  const isSmallScreen = useIsSmallScreen()

  const checkIfInputIsValid = () => inputValue() !== '' && inputRef?.reportValidity()

  const submit = () => {
    if (checkIfInputIsValid()) props.onSubmit(inputValue())
    setInputValue('')
  }

  const submitWhenEnter = (e: KeyboardEvent) => {
    // Check if IME composition is in progress
    const isIMEComposition = e.isComposing || e.keyCode === 229
    if (e.key === 'Enter' && !isIMEComposition) {
      submit()
      inputRef?.blur()
    }
  }

  onMount(() => {
    if (inputRef) {
      inputRef.focus()
      if (isSmallScreen()) {
        inputRef.blur()
      }
    }
  })

  const onFocus = (event: FocusEvent) => {
    // Scroll to bottom on mobile. The container id is 'bot-container'
    if (isSmallScreen()) {
      setTimeout(() => {
        const isKeyboardOnTop = window.scrollY === 0

        const root = getShadowRoot()

        if (root) {
          const botContainer = root.getElementById('chat-container')
          if (botContainer) botContainer.style.height = 'calc(100% -  270px)'
        }

        isKeyboardOnTop &&
          window.scrollBy({
            top: 270,
            behavior: 'smooth',
          })
      }, 100)
    }
  }

  const onBlur = (event: FocusEvent) => {
    // Scroll to bottom on mobile. The container id is 'bot-container'
    if (isSmallScreen()) {
      setTimeout(() => {
        const root = getShadowRoot()

        if (root) {
          const botContainer = root.getElementById('chat-container')
          if (botContainer) botContainer.style.height = 'calc(100%)'
        }

        // if (inputContainerRef) {
        //   inputContainerRef.style.transform = 'translateY(0px)'
        // }
      }, 100)
    }
  }

  return (
    <div
      ref={inputContainerRef}
      class={'flex items-end justify-between chatbot-input'}
      data-testid='input'
      style={{
        'border-top': '1px solid #eeeeee',
        position: 'absolute',
        left: '20px',
        right: '20px',
        bottom: '40px',
        margin: 'auto',
        transition: 'transform 200ms ease-in-out, opacity 150ms ease-out',
        'z-index': 1000,
        'background-color': props.backgroundColor ?? defaultBackgroundColor,
        color: props.textColor ?? defaultTextColor,
      }}
      onKeyDown={submitWhenEnter}
    >
      <ShortTextInput
        ref={inputRef as HTMLInputElement}
        onInput={handleInput}
        value={inputValue()}
        fontSize={props.fontSize}
        placeholder={props.placeholder ?? 'Type your question'}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <SendButton
        sendButtonColor={props.sendButtonColor}
        type='button'
        isDisabled={inputValue() === ''}
        class='my-2 ml-2'
        on:click={submit}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Send</span>
      </SendButton>
    </div>
  )
}
