declare module 'Models' {
  export interface FileS3 {
    name: string
    url: string
    uri: string
    s3Key: string
    mimeType: string
    size: number
  }
  export interface ImageS3 extends FileS3 {
    size: number
    width: number
    height: number
  }

  export interface VideoS3 extends FileS3 {
    duration: number
  }
}
