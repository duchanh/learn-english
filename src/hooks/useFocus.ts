import { useRef } from 'react'

const useFocus = <T>() => {
  const htmlElRef = useRef<T>(null)

  const setFocus = () => {
    //@ts-ignore
    htmlElRef.current && htmlElRef.current.focus()
  }

  return [htmlElRef, setFocus]
}

export default useFocus
