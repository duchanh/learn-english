import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface IMeeyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large'
  btnType?: 'filled' | 'outline' | 'link'
  color?: 'primary' | 'secondary' | 'default' | 'danger'
  children?: ReactNode
  suffixIcon?: ReactNode
  prefixIcon?: ReactNode
  className?: string
}

export default function MeeyButton({
  size = 'large',
  btnType = 'outline',
  color = 'primary',
  children,
  prefixIcon,
  suffixIcon,
  className,
  ...otherProps
}: IMeeyButtonProps) {
  return (
    <button
      className={clsx(
        'meey-button',
        prefixIcon ? 'meey-button-prefix-icon' : '',
        suffixIcon ? 'meey-button-suffix-icon' : '',
        children ? '' : 'meey-button-icon-only',
        `meey-button-${size}`,
        `meey-button-${btnType}`,
        `meey-button-${color}`,
        className
      )}
      {...otherProps}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </button>
  )
}
