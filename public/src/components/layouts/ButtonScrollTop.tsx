import clsx from 'clsx'
import { useState } from 'react'

const ButtonScrollTop = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 500) {
      setVisible(true)
    } else if (scrolled <= 500) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <div
      className={clsx(
        'fixed rounded-full w-10 h-10 bottom-5 md:bottom-10 right-5 md:right-10 bg-white flex items-center justify-center cursor-pointer shadow-full',
        { hidden: !visible, block: visible }
      )}
      onClick={scrollToTop}
    >
      <i className='ms ms-arrow_next text-gray-400 text-fs-20 -rotate-90' />
    </div>
  )
}

export default ButtonScrollTop
