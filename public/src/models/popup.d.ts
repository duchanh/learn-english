declare module 'Models' {
  export type PopOverPositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'

  export interface PopOverProps {
    className?: string
    wrapperClassName?: string
    dropdownClassName?: string
    children?: React.ReactNode
    content?: React.ReactNode
    position?: PopOverPositionType
    trigger?: 'click' | 'hover'
    open?: boolean
    onOpen?: () => void
    onClose?: () => void
    onReset?: () => void
  }
}
