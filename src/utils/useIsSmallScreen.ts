import { createSignal, onCleanup } from 'solid-js'

function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = createSignal(window.innerWidth < 640)

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 640)
  }

  // Attach an event listener for window resize
  window.addEventListener('resize', handleResize)

  // Cleanup the event listener when the hook is no longer used
  onCleanup(() => {
    window.removeEventListener('resize', handleResize)
  })

  return isSmallScreen
}

export default useIsSmallScreen
