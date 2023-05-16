import createFeed from '@/api/endpoint/feed/create-feed'
import { SkeletonItem } from '@/components/Skeleton/SkeletonListArticleMobile'
import Sheet from '@/components/common/BottomSheet'
import { AuthContext } from '@/context/auth.context'
import { CategoryContext } from '@/context/categories.context'
import { resizeImage } from '@/utils/images'
import { convertUrlToTagHref, urlify } from '@/utils/string'
import getFeedOGP from '@api/endpoint/feed/get-feed-ogp'
import { Category, Feed, FeedOGP, PostContentParams } from 'Models'
import clsx from 'clsx'
import debounce from 'lodash.debounce'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'
import Avatar from '../Avatar'
import MeeyButton from '../Button/MeeyButton'
import PopOver from '../PopOver'
import BaseModal from './BaseModal'
import ModalCancelPost from './ModalCancelPost'

import { DeviceContext } from '@/context/device.context'
import router from 'next/router'
import { useOverflowLayout } from '@/hooks/useLayout'

interface PostContentModel {
  categoryName?: string
  category?: string
  comment: string
  link?: string
}

interface ModalPostFeedProps {
  open: boolean
  onClose: () => void
  loadFeedsAdded: (feed: Feed) => void
}

const ModalPostFeed = (props: ModalPostFeedProps) => {

  const { open, onClose, loadFeedsAdded } = props

  const editorRef = useRef(null)

  const { user, token } = useContext(AuthContext)
  const { categories } = useContext(CategoryContext)
  const { isMobile } = useContext(DeviceContext)

  const [feedOGP, setFeedOGP] = useState<FeedOGP[]>(null)
  const [loadingOGP, setLoadingOGP] = useState(false)
  const [postContent, setPostContent] = useState<PostContentModel>(null)
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [forceScroll, setForceScroll] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const handleCloseModal = () => {
    if (unsavedChanges) {
      setOpenModalConfirm(true)
      return
    }
    setOpenModalConfirm(false)
    return onClose()
  }

  const handleCloseModalConfirm = () => {
    setOpenModalConfirm(false)
    editorRef.current.focus()
  }

  const handleCloseAllModal = () => {
    setForceScroll(true)
    setOpenModalConfirm(false)
    onClose()
  }

  const onSubmit = async () => {
    const commentHtml = convertUrlToTagHref(postContent.comment)
    const payload: PostContentParams = {
      link: feedOGPSelected?.url,
      category: postContent?.category,
      comment: commentHtml
    }

    setLoadingSubmit(true)
    try {
      const feed: Feed = await createFeed(payload, token)
      setLoadingSubmit(false)
      if (!feed) {
        return toast.error(`Đã có lỗi xảy ra! Vui lòng thử lại!`)
      }
      toast.success(`Đăng bài thành công`)
      loadFeedsAdded(feed)
      onClose()

    } catch (err) {
      console.log(err, 'errr')
    }

  }

  const fetchFeedOGP = async (urls: string[]) => {
    if (!urls || urls.length <= 0) return setFeedOGP(null)
    const uniqueUrls = [...new Set(urls)]

    const fetchAll = async () => {
      let arr = []
      uniqueUrls?.forEach(async (link) => {
        arr.push(getFeedOGP(link))
      })

      return Promise.all(arr)
    }

    if (uniqueUrls && uniqueUrls?.length > 0) {
      setLoadingOGP(true)
      const res = await fetchAll()
      setLoadingOGP(false)
      setFeedOGP(res)
    }
  }

  const debounceFetchFeedOGP = useCallback(debounce((nextValue) => fetchFeedOGP(nextValue), 300), [])

  const onInputChange = (event) => {
    const value = event.target.value

    setPostContent((prevState) => ({
      ...prevState,
      comment: value
    }))
    const urls = urlify(value)

    if (loadingOGP || (urls && feedOGPSelected && urls[0] === feedOGPSelected.url) || (!urls && feedOGPSelected)) return
    debounceFetchFeedOGP(urls)
  }

  const onSelectDropdown = (option: IOptions) => {
    setPostContent((prevState) => ({
      ...prevState,
      category: option.value,
      categoryName: option.label
    }))
  }

  const onClearOGP = () => {
    setFeedOGP((previousArr) => previousArr.slice(1))
  }

  useEffect(() => {

    const eventTouchStart = (event) => {
      event.stopPropagation();
      event.preventDefault();
      editorRef.current.focus()

      editorRef.current.style.transform = 'TranslateY(-10000px)'
      setTimeout(function () { editorRef.current.style.transform = 'none' }, 100);
    }

    if (open) {
      editorRef.current.focus()
      editorRef.current.addEventListener('touchstart', eventTouchStart);

    }
    return () => {
      setFeedOGP(null)
      setPostContent(null)

    }
  }, [open])

  const feedOGPSelected: FeedOGP = useMemo(() => {
    return feedOGP && feedOGP?.length > 0 ? feedOGP[0] : null
  }, [feedOGP])


  const unsavedChanges = useMemo(() => {
    return postContent?.comment.trim()
  }, [postContent?.comment])

  const disabledButton: boolean = useMemo(() => {
    return !unsavedChanges || unsavedChanges.trim().length <= 0 || loadingSubmit
  }, [unsavedChanges, loadingSubmit])

  const optionsSelect = useCallback(() => {
    return categories?.length > 0
      ? categories.map((option: Category) => ({ value: option._id, label: option.name }))
      : []
  }, [categories])


  useEffect(() => {
    const warningText =
      'Sau khi bỏ, bài đang viết sẽ bị hủy.';
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!unsavedChanges) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!unsavedChanges) return;
      if (window.confirm(warningText)) return;
      router.events.emit('routeChangeError');


      if (router.asPath !== window.location.pathname) {
        window.history.pushState('', '', router.asPath);
      }
      throw 'routeChange aborted.';
    };
    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
  }, [unsavedChanges]);

  const CardOGP = () => {
    return loadingOGP ? (
      <SkeletonItem />
    ) : feedOGPSelected ? (
      <div>
        <div
          title={feedOGPSelected.metaTitle}
          className='w-full inline-block bg-dark-gray relative'
        >
          <div className='absolute right-3 top-3' onClick={onClearOGP}>
            <div className='backdrop hover:scale-110 transition-all duration-300 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer'>
              <span className='ms ms-close text-fs-14 text-white'></span>
            </div>
          </div>
          <img className='w-full max-h-[13rem] object-cover' src={feedOGPSelected.metaImage} alt='' />
          <div className='px-4 py-2'>
            <div className='text-base font-semibold text-grey-800 line-clamp-2'>
              {feedOGPSelected.metaTitle}
            </div>
          </div>
        </div>
      </div>
    ) : null
  }

  const CardHeader = () => {
    return (
      <div className='flex items-center'>
        <Avatar
          className='text-base mr-2'
          avatar={resizeImage(user?.avatar, 48, 48) || ''}
          username={user?.name || ''}
          size={48}
        />
        <div>
          <div className='text-base font-medium text-grey-800 mb-1 line-clamp-1'>{user?.name}</div>
          <SelectDropdown
            options={optionsSelect()}
            activeId={postContent?.category}
            categoryName={postContent?.categoryName}
            onClick={onSelectDropdown}
          />
        </div>
      </div>
    )
  }

  const renderModalContent = () => {
    return (
      <div className='flex flex-col'>
        <CardHeader />
        <TextareaAutosize
          onInput={onInputChange}
          minRows={10}
          maxRows={11}
          maxLength={5000}
          placeholder='Chia sẻ quan điểm về bất động sản *'
          ref={editorRef}
          className='my-2 text-grey-800 text-fs-14 overflow-y-auto scrollbar-thin scrollbar-thumb-grey-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full outline-none border-none resize-none'
        ></TextareaAutosize>
        <CardOGP />

        <MeeyButton
          btnType='filled'
          color='primary'
          className={clsx('md:flex items-center justify-center w-full mt-5 hidden')}
          aria-label='btn-cancel'
          onClick={onSubmit}
          disabled={disabledButton}
        >
          Đăng
        </MeeyButton>
      </div>
    )
  }

  useOverflowLayout(open && isMobile)

  return (
    <>
      {isMobile ? (
        <>
          {open && (
            <div className='fixed top-0 left-0 w-full  h-full bg-white z-20'>
              <div className='flex items-center justify-between border-b-grey-50 border-solid border-[1px] border-x-0 border-t-0 px-4 py-2'>
                <i className='ms ms-close text-fs-24 text-grey-700' onClick={handleCloseModal} />
                <div className='text-grey-800 text-fs-18 font-semibold'>Tạo bài đăng</div>
                <MeeyButton
                  btnType='filled'
                  color='primary'
                  className={clsx('flex items-center justify-center px-2 py-[6px] h-8')}
                  prefixIcon={null}
                  aria-label='btn-cancel'
                  onClick={onSubmit}
                  disabled={disabledButton}
                >
                  Đăng
                </MeeyButton>
              </div>
              <div className='p-4'>{renderModalContent()}</div>
            </div>
          )}
        </>
      ) : (
        <BaseModal modalTitle='Tạo bài viết mới' open={open} onClose={handleCloseModal}>
          {renderModalContent()}
        </BaseModal>
      )}
      <ModalCancelPost
        forceScroll={forceScroll}
        open={openModalConfirm}
        onClose={handleCloseModalConfirm}
        onCloseAll={handleCloseAllModal}
      />
    </>
  )
}

export default ModalPostFeed

interface IOptions {
  value: string
  label: string
}
interface SelectDropdownProps {
  options: IOptions[]
  activeId: string
  categoryName?: string
  onClick?: (option: IOptions) => void
}

const SelectDropdown = ({ options, activeId, onClick, categoryName }: SelectDropdownProps) => {
  const handleClick = (option: IOptions) => {
    onClick(option)
  }

  const [isOpen, setOpen] = useState(false)

  const { isMobile } = useContext(DeviceContext)

  const renderCategorySelect = () => {
    return (
      <div className={clsx('cursor-pointer py-1 px-2 h-6 flex items-center justify-center rounded-[6px] border-grey-400 border-solid border-[1px]',
        activeId && 'border-primary-400'
      )}>
        <div className='text-grey-700 text-fs-12 font-medium'>{categoryName && activeId ? <span className='text-primary-400'>{categoryName}</span> : 'Chủ đề'}</div>

        {!activeId && <i
          className={clsx(
            'ms ms-arrow_drop_down ml-1 text-grey-400 text-fs-14 transition-all duration-300 ',
            isOpen ? 'rotate-180' : ''
          )}
        />}

        {activeId &&
          <i className='ms ms-close_circle ml-1 text-primary-400 text-fs-14 transition-all duration-300'></i>
        }

      </div>
    )
  }

  const renderCategoryOptions = () => {
    return (
      <div className='md:w-[25rem] bg-white meey-dropdown-user md:max-h-[10rem] overflow-y-auto	scrollbar-thin scrollbar-thumb-grey-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
        {options?.map((item: IOptions) => {
          const isActive = activeId === item.value
          return (
            <div
              key={item.value}
              className={clsx(
                'cursor-pointer px-0 md:px-4 py-3 md:py-2.5 mx-4 md:mx-0 text-sm text-grey-800 flex items-center whitespace-nowrap hover:bg-light-blue md:border-0 border-b border-solid border-grey-50 border-t-0 border-x-0 ',
                isActive ? 'md:hover:bg-primary-50! md:bg-primary-50 text-primary-500 md:text-grey-800 active' : ''
              )}
              onClick={() => {
                handleClick(item)
              }}
            >
              {item.label}{' '}
              {isActive && <i className='ms ms-checked text-[24px] ml-auto text-primary-400'></i>}
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <>
      {isMobile ? (
        <>
          <Sheet opened={isOpen} onBackdropClick={() => setOpen(false)} title='Chủ đề' onOpen={() => {
            setOpen(true)
            if (activeId) {
              onClick({ value: '', label: 'Chủ đề' })
            }
          }} >
            {renderCategoryOptions()}
          </Sheet>
          <div
            className='flex'
            onClick={() => {
              if (activeId) {
                onClick({ value: '', label: 'Chủ đề' })
              }
              setOpen(true)
            }}
          >
            {renderCategorySelect()}
          </div>
        </>
      ) : (
        <PopOver
          position='center'
          onOpen={() => {
            setOpen(true)
            if (activeId) {
              onClick({ value: '', label: 'Chủ đề' })
            }
          }}
          onClose={() => {
            setOpen(false)
          }}
          content={
            <div className='w-[25rem] bg-white meey-dropdown-user max-h-[10rem] overflow-y-auto	scrollbar-thin scrollbar-thumb-grey-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
              {options?.map((item: IOptions) => {
                const isActive = activeId === item.value

                return (
                  <div
                    key={item.value}
                    className={clsx(
                      'cursor-pointer px-4 py-2.5 text-sm text-grey-800 flex items-center whitespace-nowrap hover:bg-light-blue',
                      isActive ? 'hover:bg-primary-50! bg-primary-50 active' : ''
                    )}
                    onClick={() => {
                      handleClick(item)
                    }}
                  >
                    {item.label}{' '}
                    {isActive && (
                      <i className='ms ms-checked text-fs-24 ml-auto text-primary-400'></i>
                    )}
                  </div>
                )
              })}
            </div>
          }
        >
          {renderCategorySelect()}
        </PopOver>
      )}
    </>
  )
}
