const useScroll = () => {
  const isClient = typeof window !== 'undefined'

  const onScrollTo = (target: string) => {
    if (isClient && target) {
      const element = document.getElementById(target)
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return {
    onScrollTo
  }
}

export default useScroll
