import { resizeOnFlyUrl } from '@/utils/images'
import { IImageResizeProps } from 'Models'

const MeeyImage = ({
  src,
  alt,
  className,
  resizeOptions,
  resizeOnFly = true,
  id,
  width = 320,
  height = 200
}: IImageResizeProps) => {
  const { resizingType = 'fill', gravity = 'no' } = resizeOptions ?? {}

  return (
    <img
      id={id}
      className={className}
      alt={alt}
      width={`${width}px`}
      height={`${height}px`}
      src={
        resizeOnFly
          ? resizeOnFlyUrl({
              url: src || '',
              width,
              height,
              resizingType,
              gravity
            })
          : src
      }
    />
  )
}

export default MeeyImage
