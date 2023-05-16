import BaseModal from './BaseModal'
import TextareaAutosize from 'react-textarea-autosize'
import { useState, useContext, useMemo } from 'react'
import { countCharactersEditor } from '@/utils/html'
import { MAX_LENGTH_REPORT } from '@/constants/number'
import { truncateString } from '@/utils/string'
import postReportFeed from '@/api/endpoint/feed/post-feed-report'
import { AuthContext } from '@/context/auth.context'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import { DeviceContext } from '@/context/device.context'
import Sheet from '@/components/common/BottomSheet'

interface ModalReportProps {
  open: boolean
  feedId: string
  onClose: () => void
}
const ModalReport = (props: ModalReportProps) => {
  const { open, feedId, onClose } = props
  const [reportValue, setReportValue] = useState('')
  const [countCharacter, setCountCharacter] = useState(0)
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const { isMobile } = useContext(DeviceContext)

  const onChange = (e) => {
    const value = e.target.value
    const countValue = countCharactersEditor(value ?? '')
    if (countValue <= MAX_LENGTH_REPORT) {
      setCountCharacter(countValue)
    }
    if (countValue >= MAX_LENGTH_REPORT) {
      setReportValue(truncateString(value, MAX_LENGTH_REPORT))
    } else {
      setReportValue(value)
    }
  }

  const onSubmit = async () => {
    const payload = {
      feed: feedId,
      description: reportValue
    }
    setLoading(true)
    const result = await postReportFeed(payload, token)
    setLoading(false)
    onClose()
    if (result) {
      toast.success('Cảm ơn bạn đã gửi phản hồi cho chúng tôi!')
    } else {
      toast.error(`Đã có lỗi xảy ra! Vui lòng thử lại!`)
    }
    setReportValue('')
    setCountCharacter(0)
  }
  const renderModalContent = () => {
    return (
      <>
        <div className='md:text-grey-700 text-grey-800 text-fs-14 mb-5'>
          Vui lòng nhập lý do vi phạm của bài đăng
        </div>
        <TextareaAutosize
          placeholder='Nhập nội dung'
          minRows={4}
          maxRows={4}
          value={reportValue}
          onChange={onChange}
          className='border-solid border-grey-50 rounded-lg w-full resize-none text-fs-14 p-3 outline-none focus:border-primary-400 duration-300'
        />
        <div className='mt-2 flex justify-end text-grey-400 text-fs-12 mb-[128px] md:mb-5'>
          {countCharacter} / {MAX_LENGTH_REPORT} ký tự
        </div>

        <div
          onClick={onSubmit}
          className={clsx(
            'w-full p-3 text-white text-fs-14 font-medium border-none flex items-center justify-center bg-primary-400 rounded-[8px] cursor-pointer',
            {
              'opacity-75 pointer-events-none': loading || countCharacter === 0
            }
          )}
        >
          Gửi báo cáo
        </div>
      </>
    )
  }

  return (
    <>
      {!isMobile ? (
        <BaseModal modalTitle='Báo cáo bài đăng' open={open} onClose={onClose}>
          {renderModalContent()}
        </BaseModal>
      ) : (
        <>
          <Sheet opened={open} onBackdropClick={onClose} title='Chia sẻ'>
            <div className='p-4'>{renderModalContent()}</div>
          </Sheet>
        </>
      )}
    </>
  )
}

export default ModalReport
