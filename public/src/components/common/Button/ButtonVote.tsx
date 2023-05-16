import { shortcutNumber } from '@/utils/number'
import clsx from 'clsx'
import { InteractionFeedStyle } from 'Models'
import debounce from 'lodash.debounce'

const ButtonVote = ({
  styles,
  upVoteCount,
  isDetailPage = true,
  className,
  isHorizontal = true,
  disable = false,
  onUpVote,
  onDownVote
}: {
  upVoteCount?: number
  isDetailPage?: boolean
  styles: InteractionFeedStyle
  className?: string
  disable?: boolean
  //isSubmitted?: boolean
  isHorizontal?: boolean
  onUpVote?: () => void
  onDownVote?: () => void
}) => {
  const debouncedUpVote = debounce(onUpVote, 300)

  const debouncedDownVote = debounce(onDownVote, 300)

  const totalVotes = shortcutNumber(upVoteCount)

  return isHorizontal ? (
    <div className={clsx('flex items-center justify-center cursor-pointer', className)}>
      <i
        className={clsx(
          'ms ms-up_1 text-fs-20 text-grey-400 mr-2 cursor-pointer',
          styles?.styleUpButton
        )}
        onClick={() => {
          if (!disable) debouncedUpVote()
        }}
      />
      <div className={clsx('text-fs-14 text-grey-700 flex items-center', styles?.styleText)}>
        <span
          className={clsx('mr-1', {
            hidden: upVoteCount === 0 && !isDetailPage
          })}
        >
          {totalVotes}
        </span>
        <span className={clsx({ hidden: isDetailPage })}>Vote</span>
      </div>
      <i
        className={clsx(
          'ms ms-down_1 text-fs-20 text-grey-400 ml-2 cursor-pointer',
          styles?.styleDownButton
        )}
        onClick={() => {
          if (!disable) debouncedDownVote()
        }}
      />
    </div>
  ) : (
    <>
      <div
        className={clsx(
          'w-[2.5rem] h-[2.5rem] rounded-full bg-white text-gray-300 mb-1 flex justify-center items-center cursor-pointer'
        )}
        onClick={() => {
          if (!disable) debouncedUpVote()
        }}
      >
        <i className={clsx('ms ms-up_1 text-fs-24 text-grey-400', styles?.styleUpButton)} />
      </div>
      <div
        className={clsx(
          'w-[2.5rem] mb-1 flex justify-center items-center text-fs-14 font-normal',
          styles?.styleText
        )}
      >
        {totalVotes}
      </div>
      <div
        className={clsx(
          'w-[2.5rem] h-[2.5rem] rounded-full bg-white text-gray-300 mb-[1.75rem] flex justify-center items-center cursor-pointer'
        )}
        onClick={() => {
          if (!disable) debouncedDownVote()
        }}
      >
        <i className={clsx('ms ms-down_1 text-fs-24 text-grey-400', styles?.styleDownButton)} />
      </div>
    </>
  )
}

export default ButtonVote
