import { MAX_HEIGHT_COMMENT_INPUT, MAX_LENGTH_COMMENT_CONTENT } from '@/constants/number'
import { AuthContext } from '@/context/auth.context'
import { useProtected } from '@/hooks/useProtected'
import { countCharactersEditor } from '@/utils/html'
import { truncateString } from '@/utils/string'
import clsx from 'clsx'
import { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

interface FeedCommentInputProps {
  onSendComment: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  loading?: boolean
}
const FeedCommentInput = forwardRef((props: FeedCommentInputProps, ref: any) => {
  const { onSendComment, placeholder = 'Bình luận của bạn...', loading } = props

  const [visible, setVisible] = useState<boolean>(false)

  const [value, setValue] = useState('')

  const [rowHeight, setRowHeight] = useState(0)

  const protectedAction = useProtected()

  const { isLoggedIn, login } = useContext(AuthContext)

  const htmlElRef = useRef<HTMLTextAreaElement>(null)

  const refWrapper = useRef(null)

  const handleClickOutside = (event) => {
    const focused = document?.activeElement || event?.target
    //@ts-ignore
    if (refWrapper && refWrapper.current && !refWrapper.current.contains(focused)) {
      setVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const onChange = (e: any) => {
    if (isLoggedIn) {
      let value = e.target.value
      const content = countCharactersEditor(value ?? '')
      if (content > MAX_LENGTH_COMMENT_CONTENT) {
        setValue(truncateString(value, MAX_LENGTH_COMMENT_CONTENT))
      } else {
        setValue(value)
      }
    } else {
      login()
    }
  }

  const onKeydown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  const onFocus = (e?: any) => {
    setVisible(true)
  }

  const onSubmit = () => {
    if (value?.trim()?.length && isLoggedIn) {
      onSendComment(value)
      setValue('')
    }
  }

  return (
    <div ref={refWrapper}>
      <TextareaAutosize
        ref={htmlElRef as React.Ref<HTMLTextAreaElement>}
        minRows={1}
        maxRows={5}
        value={value}
        onClick={protectedAction(onChange)}
        onChange={onChange}
        onKeyDown={onKeydown}
        onFocus={onFocus}
        className={clsx(
          `border-solid border-grey-50 rounded-lg w-full resize-none text-fs-14 p-3 outline-none focus:border-primary-400 duration-300`,
          {
            'overflow-y-scroll max-h-[7.875rem] scrollbar-thin scrollbar-thumb-grey-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full':
              rowHeight === MAX_HEIGHT_COMMENT_INPUT
          }
        )}
        placeholder={placeholder}
        onHeightChange={(rowHeight) => {
          setRowHeight(rowHeight)
        }}
      />
      <div
        className={clsx('flex mt-2 justify-end', {
          block: visible && isLoggedIn,
          hidden: !visible || !isLoggedIn
        })}
      >
        <button
          className='bg-primary-400 text-white border-none rounded-md px-3 py-2 text-fs-14 flex items-center justify-center w-[6.375rem] disabled:opacity-50'
          type='button'
          onClick={onSubmit}
          disabled={loading}
        >
          <span>Gửi</span>
        </button>
      </div>
    </div>
  )
})

export default FeedCommentInput
