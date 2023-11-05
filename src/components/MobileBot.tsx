import { BotProps } from './WebBot'
import ChatContainer from './ChatContainer'

const MobileBot = (props: BotProps & { class?: string }) => {
  return (
    <div
      part='bot'
      id='bot-container'
      style={{
        height: '100%',
        width: '100vw',
        top: 0,
        transition: 'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
        'transform-origin': 'bottom right',
        transform: props.isBotOpened?.() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
        'box-shadow': 'rgb(0 0 0 / 16%) 0px 5px 40px',
        'background-color': '#ffffff',
        'z-index': 42424242,
      }}
      class={
        `fixed sm:right-5 rounded-lg w-full sm:w-[500px] ` +
        (props.isBotOpened?.() ? ' opacity-1' : ' opacity-0 pointer-events-none')
      }
    >
      {/* Top bar  */}
      <div class='flex w-full p-4 justify-between '>
        <h2
          style={{
            'font-size': '20px',
            'font-weight': 600,
            color: '#303235',
          }}
        >
          Beta
        </h2>

        <button
          part='button'
          onClick={() => props.toggleBot?.()}
          class={`w-7 h-7  shadow-md rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in`}
        >
          <svg
            viewBox='0 0 24 24'
            style={{ fill: '#303235' }}
            class='absolute duration-200 transition w-3 h-3'
          >
            <line x1='0' y1='0' x2='24' y2='24' stroke='#333' stroke-width='2' />
            <line x1='0' y1='24' x2='24' y2='0' stroke='#333' stroke-width='2' />
          </svg>
        </button>
      </div>

      <ChatContainer {...props} />
    </div>
  )
}

export default MobileBot
