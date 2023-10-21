import { createSignal, onMount, Show, splitProps } from 'solid-js'
import styles from '../../../assets/index.css'
import { BubbleButton } from './BubbleButton'

import { BubbleParams } from '../types'
import { WebBot, BotProps } from '../../../components/WebBot'
import useIsSmallScreen from '@/utils/useIsSmallScreen'
import MobileBot from '@/components/MobileBot'

export type BubbleProps = BotProps & BubbleParams

export const Bubble = (props: BubbleProps) => {
  const [bubbleProps] = splitProps(props, ['theme'])
  let botScrollContainer: HTMLDivElement | undefined

  const isSmallScreen = useIsSmallScreen()

  const [isBotOpened, setIsBotOpened] = createSignal(false)
  const [isBotStarted, setIsBotStarted] = createSignal(false)

  onMount(() => {
    !isSmallScreen() && openBot()
    document.querySelector('.w-webflow-badge')?.remove() // Removes Webflow badge
  })

  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true)
    if (!isBotOpened()) setIsBotOpened(true)

    if (isSmallScreen()) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
    }
  }

  const closeBot = () => {
    setIsBotOpened(false)
    if (isSmallScreen()) {
      document.body.style.overflow = 'auto'
      document.body.style.position = 'static'
      document.body.style.width = 'auto'
      document.body.style.height = 'auto'
    }
  }

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot()
  }

  return (
    <>
      <style>{styles}</style>

      <BubbleButton
        {...bubbleProps.theme?.button}
        toggleBot={toggleBot}
        isBotOpened={isBotOpened()}
      />

      <div
        part='bot'
        ref={botScrollContainer}
        id='bot-container'
        style={{
          height: isSmallScreen() ? '100%' : '600px',
          bottom: isSmallScreen() ? '0' : '100px',
          transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',

          transition: 'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
          'transform-origin': 'bottom right',
          'box-shadow': 'rgb(0 0 0 / 16%) 0px 5px 40px',
          'background-color': bubbleProps.theme?.chatWindow?.backgroundColor || '#ffffff',
          'z-index': 42424242,
        }}
        class={
          `fixed sm:right-5 rounded-lg w-full sm:w-[500px] ` +
          // (isSmallScreen() ? 'pt-16' : ``) +
          (isSmallScreen() ? '' : ` max-h-[704px] `) +
          (isBotOpened() ? ' opacity-1' : ' opacity-0 pointer-events-none')
        }
      >
        <Show when={isBotStarted()}>
          <WebBot
            badgeBackgroundColor={bubbleProps.theme?.chatWindow?.backgroundColor}
            welcomeMessage={bubbleProps.theme?.chatWindow?.welcomeMessage}
            poweredByTextColor={bubbleProps.theme?.chatWindow?.poweredByTextColor}
            textInput={bubbleProps.theme?.chatWindow?.textInput}
            botMessage={bubbleProps.theme?.chatWindow?.botMessage}
            userMessage={bubbleProps.theme?.chatWindow?.userMessage}
            fontSize={bubbleProps.theme?.chatWindow?.fontSize}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
            toggleBot={toggleBot}
            botScrollContainer={botScrollContainer}
          />
        </Show>
      </div>
    </>
  )
}
