declare module 'Models' {
  export interface BaseSizeImage {
    width?: number
    height?: number
  }

  export interface BaseResizeOnFlyOption extends BaseSizeImage {
    resizingType?: 'fit' | 'fill' | 'auto' | 'fill-down' | 'force' | 'crop'
    gravity?:
      | 'no' // North (top edge)
      | 'so' // South (bottom edge)
      | 'ea' // East (right edge)
      | 'we' // West (left edge)
      | 'noea' // North-East (top-right corner)
      | 'nowe' // North-West (top-left corner)
      | 'soea' // South-East (bottom-right corner)
      | 'sowe' // South-West (bottom-left corner)
      | 'ce' // Center
      | 'sm' // Smart gravity. Detects the most “interesting” section of the image and considers it as the center of the resulting image.
    watermark?: boolean
    watermarkOptions?: string
  }

  export interface IResizeOnFlyOption extends BaseResizeOnFlyOption {
    url: string
  }

  export interface BaseImageProps extends BaseSizeImage {
    resizeOptions?: BaseResizeOnFlyOption
  }

  export interface IImageResizeProps extends BaseImageProps {
    id?: string
    alt?: string
    src?: string
    className?: string
    resizeOnFly?: boolean
  }
}
