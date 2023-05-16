import { getAvatarName } from '@/utils/index'
import clsx from 'clsx'
import MeeyImage from './MeeyImage'

interface IAvatarProps {
  avatar?: any
  username?: string
  email?: string
  size?: number
  className?: string
  textClassName?: string
}

const Avatar = (props: IAvatarProps) => {
  const { avatar, username, email, size = 32, className, textClassName } = props
  return (
    <div className={clsx(`flex`, className)}>
      {avatar || avatar?.url || avatar?.uri ? (
        <>
          {typeof avatar === 'string' ? (
            <img
              src={avatar}
              alt='avatar'
              width={size}
              height={size}
              className='rounded-full object-cover'
              style={{
                width: `${size}px`,
                height: `${size}px`
              }}
            />
          ) : (
            <>
              {avatar.uri ? (
                <MeeyImage
                  className='rounded-full object-cover'
                  width={size}
                  height={size}
                  src={avatar.uri}
                  resizeOnFly={true}
                  alt='avatar'
                />
              ) : (
                <img
                  src={avatar.url}
                  alt='avatar'
                  width={size}
                  height={size}
                  className='rounded-full object-cover'
                  style={{
                    width: `${size}px`,
                    height: `${size}px`
                  }}
                />
              )}
            </>
          )}
        </>
      ) : (
        <div
          className={clsx(
            'flex items-center justify-center text-primary-400 bg-primary-100 rounded-full',
            textClassName
          )}
          style={{
            width: `${size}px`,
            height: `${size}px`
          }}
        >
          <span>{getAvatarName(username, email)}</span>
        </div>
      )}
    </div>
  )
}

export default Avatar
