import React from 'react'
import clsx from 'clsx'

function ReplyIcon({ className, ...otherProps }: any) {
  return (
    <div className={clsx('h-fit flex items-center', className)} role='img' {...otherProps}>
      <svg
        className='w-[1em] h-[1em]'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12.6416 12.8333H13.8517L12.9945 13.6874L10.5951 16.0785C10.5951 16.0785 10.595 16.0786 10.595 16.0786C10.4654 16.2084 10.4655 16.425 10.5951 16.5547C10.7249 16.6844 10.9416 16.6844 11.0714 16.5547L14.888 12.738C15.0178 12.6083 15.0178 12.3915 14.888 12.2618L11.0714 8.44514L11.4249 8.09159L11.0714 8.44514C10.9416 8.3154 10.7249 8.3154 10.5951 8.44514C10.4655 8.57479 10.4654 8.79134 10.5949 8.92111C10.595 8.92119 10.5951 8.92128 10.5951 8.92137L12.9945 11.3124L13.8517 12.1666H12.6416L4.99992 12.1666H4.49992V11.6666L4.49992 4.16659C4.49992 3.98439 4.34878 3.83325 4.16659 3.83325C3.98439 3.83325 3.83325 3.98439 3.83325 4.16659L3.83325 12.4999C3.83325 12.6821 3.98439 12.8333 4.16659 12.8333L12.6416 12.8333Z'
          stroke='currentColor'
        />
      </svg>
    </div>
  )
}

export default ReplyIcon